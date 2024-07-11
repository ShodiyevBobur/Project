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
import { Response } from "express"; // Import Response from express

@Injectable()
export class DriverService {
  constructor(
    @InjectModel(Driver) private driverRepo: typeof Driver,
    private jwtService: JwtService,
    private cloudinaryService: CloudinaryService
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
        expiresIn: process.env.ACCESS_TOKEN_TIME_DR,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY_DR,
        expiresIn: process.env.REFRESH_TOKEN_TIME_DR,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async register(
    createDriverDto: CreateDriverDto,
    photo: Express.Multer.File,
    certificate: Express.Multer.File
  ) {
    const findDriver = await this.driverRepo.findOne({
      where: { phone: createDriverDto.phone },
    });
    if (findDriver) throw new BadRequestException("Driver already exist!");
    if (!photo) throw new BadRequestException("Photo is required!");
    if (!certificate)
      throw new BadRequestException("certificate photo is required!");
    const img = (await this.cloudinaryService.uploadImage(photo)).url;
    const cer = (await this.cloudinaryService.uploadImage(certificate)).url;

    createDriverDto.photo = img;
    createDriverDto.prava = cer;
    createDriverDto.password = await bcrypt.hash(createDriverDto.password, 7);

    const driver = await this.driverRepo.create(createDriverDto);

    const tokens = await this.getTokens(driver);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    driver.hashed_refresh_token = hashed_refresh_token;
    await driver.save();

    return {
      message: "Driver registered successfully",
      driver,
      tokens,
    };
  }

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

    const response = {
      message: "Admin logged in",
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

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

  async findOne(id: number) {
    const driver = await this.driverRepo.findByPk(id);
    if (!driver) throw new NotFoundException("Driver not found!");
    return driver;
  }

  async update(id: number, updateDriverDto: UpdateDriverDto) {
    const driver = await this.driverRepo.findByPk(id);
    if (!driver) throw new NotFoundException("Driver not found!");

    return this.driverRepo.update(updateDriverDto, { where: { id } });
  }

  async remove(id: number) {
    const driver = await this.driverRepo.findByPk(id);
    if (!driver) throw new NotFoundException("Driver not found!");

    await driver.destroy();
    return "Successfuly deleted!";
  }
}
