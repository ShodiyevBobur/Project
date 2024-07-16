import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateDriverDto } from "./dto/create-driver.dto";
import { UpdateDriverDto } from "./dto/update-driver.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Driver } from "./entities/driver.entity";
import { LoginDriverDto } from "./dto/login-driver.dto";
import { Op } from "sequelize";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { Response } from "express";
import { SummaDto } from "./dto/summa-driver.dto";
import { Region } from "../region/model/region.model";
import { from } from "rxjs";

import { DeliveryOrder } from "src/delivery_order/entities/delivery_order.entity";
import { TaxiOrder } from "src/taxi_order/model/taxi_order.model";


@Injectable()
export class DriverService {
  constructor(
    @InjectModel(Driver) private driverRepo: typeof Driver,
    @InjectModel(Region) private regionRepo: typeof Region,

    @InjectModel(TaxiOrder) private orderRepo: typeof TaxiOrder,

    private jwtService: JwtService,
    private cloudinaryService: CloudinaryService,
  ) {}

  // Get tokens service
  async getTokens(driver: Driver) {
    const payload = {
      id: driver.id,
      isActive: driver.isActive,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY_DR,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY_DR,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  // register driver

  async register(
    createDriverDto: CreateDriverDto,
    photo: Express.Multer.File,
    prava: Express.Multer.File,
    res: Response
  ) {
    const parol: number = 12345;
    const findDriver = await this.driverRepo.findOne({
      where: { phone: createDriverDto.phone },
    });
    if (findDriver) throw new BadRequestException("Driver already exists!");

    if (!photo || !prava) throw new BadRequestException("Photos are required!");

    if (!createDriverDto.otp_pass || createDriverDto.otp_pass != parol)
      throw new BadRequestException({ message: createDriverDto.otp_pass });

    const img = (await this.cloudinaryService.uploadImage(photo)).url;
    const img1 = (await this.cloudinaryService.uploadImage(prava)).url;

    createDriverDto.password = await bcrypt.hash(createDriverDto.password, 7);
    delete createDriverDto.otp_pass;

    const driver = await this.driverRepo.create({
      photo: img,
      prava: img1,
      ...createDriverDto,
    });

    const tokens = await this.getTokens(driver);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    driver.hashed_refresh_token = hashed_refresh_token;
    await driver.save();

    // Set refresh_token cookie
    res.cookie("refresh_token", tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // Example: 15 days
      httpOnly: true,
    });

    return {
      message: "Driver registered successfully",
      id: driver.id,
      tokens,
    };
  }

  // login driver

  async login(loginDriverDto: LoginDriverDto, res: Response) {
    const find = await this.driverRepo.findOne({
      where: { phone: loginDriverDto.phone },
    });
    if (!find)
      throw new NotFoundException(
        "Phone number not found! or invalid password"
      );
    const isMatch = await bcrypt.compare(
      loginDriverDto.password,
      find.password
    );
    if (!isMatch)
      throw new NotFoundException(
        "Phone number not found! or invalid password"
      );
    if (!find.isActive)
      throw new UnauthorizedException("Driver is not active!");
    const tokens = await this.getTokens(find);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    const updatedUser = await this.driverRepo.update(
      {
        hashed_refresh_token,
        isActive: true,
      },
      { where: { id: find.id }, returning: true }
    );
    res.cookie("refresh_token", tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    delete updatedUser[1][0].password;
    delete updatedUser[1][0].isActive;

    const response = {
      message: "Admin logged in",
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  // get all admin isActive == false
  async getUADrivers() {
    return this.driverRepo.findAll({ where: { isActive: false } });
  }

  // activate driver

  async activeDriver(id: number) {
    const findDriver = await this.driverRepo.findByPk(id);
    if (!findDriver) throw new NotFoundException("Driver not found!");
    findDriver.isActive = true;
    findDriver.save();

    return { message: "Driver succesfuly activated!" };
  }

  // unactivate driver

  async unactiveDriver(id: number) {
    const findDriver = await this.driverRepo.findByPk(id);
    if (!findDriver) throw new NotFoundException("Driver not found!");
    findDriver.isActive = false;
    findDriver.save();
    console.log(findDriver);

    return findDriver;
  }

  // add balance

  async addMoney(id: number, summaDto: SummaDto) {
    const findDriver = await this.driverRepo.findByPk(id);
    if (!findDriver) throw new NotFoundException("Driver not foudn!");
    if (!summaDto.sum) throw new BadRequestException("Sum is required!");

    findDriver.total_balance = findDriver.total_balance + summaDto.sum;
    await findDriver.save();

    delete findDriver.password;
    delete findDriver.hashed_refresh_token;

    return {
      message: "Succesfuly added sum",
      data: findDriver,
    };
  }

  // remove balance

  async removeMoney(id: number, summaDto: SummaDto) {
    const findDriver = await this.driverRepo.findByPk(id);
    if (!findDriver) throw new NotFoundException("Driver not foudn!");
    if (!summaDto.sum) throw new BadRequestException("Sum is required!");

    if (summaDto.sum > findDriver.total_balance)
      throw new BadRequestException(
        "The given amount is more than the balance amount"
      );
    findDriver.total_balance = findDriver.total_balance - summaDto.sum;
    await findDriver.save();

    delete findDriver.password;
    delete findDriver.hashed_refresh_token;

    return {
      message: "Succesfuly added sum",
      data: findDriver,
    };
  }

  // search driver

  async findAll(searchParams: {
    name?: string;
    surname?: string;
    phone?: string;
  }): Promise<Driver[]> {
    const whereCondition = {};

    if (searchParams.name) {
      whereCondition["name"] = { [Op.like]: `%${searchParams.name}%` };
    }
    if (searchParams.surname) {
      whereCondition["surname"] = { [Op.like]: `%${searchParams.surname}%` };
    }
    if (searchParams.phone) {
      whereCondition["phone"] = { [Op.like]: `%${searchParams.phone}%` };
    }

    return this.driverRepo.findAll({
      where: whereCondition,
    });
  }

  // find by id driver

  async findOne(id: number) {
    const driver = await this.driverRepo.findByPk(id);
    if (!driver) throw new NotFoundException("Driver not found!");
    return driver;
  }

  // update driver

  async update(id: number, updateDriverDto: UpdateDriverDto) {
    const driver = await this.driverRepo.findByPk(id);
    if (!driver) throw new NotFoundException("Driver not found!");
    const parol = 12345;

    if (updateDriverDto.password) {
      const isMatch = await bcrypt.compare(
        updateDriverDto.password,
        driver.password
      );
      if (updateDriverDto.phone) {
        if (!updateDriverDto.otp_pass || updateDriverDto.otp_pass !== parol)
          throw new BadRequestException("Invalid otp password");
      }
      if (!isMatch) throw new BadRequestException("Invalid password!");
    }
    return this.driverRepo.update(updateDriverDto, { where: { id } });
  }

  async getMoneyTaxi(driver_id:number, taxi_order_id:number){
    const  driver = await this.driverRepo.findByPk(driver_id)
    const order = await this.taxi_OrderRepo.findByPk(taxi_order_id)

    if(!driver) throw new NotFoundException("Driver not found!");
    if(!order) throw new NotFoundException("Taxi order not found!");

    const money = Number(order.distance.split(" ")[0]);
    if(driver.total_balance < money){
      return "Balan yetarli emas Iltimos Balansingizni toldiring"
    }
    driver.total_balance -= money;

  }


  /// remove driver

  async remove(id: number) {
    const driver = await this.driverRepo.findByPk(id);
    if (!driver) throw new NotFoundException("Driver not found!");

    await driver.destroy();
    return "Successfuly deleted!";
  }

  // find order:

  async findOrder(findOrderDto: FindOrderDto) {
    const { from, to } = findOrderDto;
    const orders = await this.orderRepo.findAll({
      where: {
        from_district_id: { [Op.eq]: from },
        to_district_id: { [Op.eq]: to },
      },
      include: {all: true}
    });

    if (!orders.length) {
      throw new NotFoundException("No orders found for the specified criteria");
    }

    return orders;
  }
}
