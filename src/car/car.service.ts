import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCarDto } from "./dto/create-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Car } from "./entities/car.entity";


@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Car) private readonly carRepo: typeof Car,
  ) {}

  async create(createCarDto: CreateCarDto) {
    const newCar = await this.carRepo.create(createCarDto);

    return { message: "Create new car successfully", car: newCar };
  }

  findAll() {
    return this.carRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const car = await this.carRepo.findByPk(id, { include: { all: true } });
    if (!car) {
      throw new NotFoundException("car not found");
    }
    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    const car = await this.carRepo.findByPk(id);
    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }

    const updateCar = await car.update(updateCarDto);

    return {
      message: `Car with ID ${id} updated successfully`,
      car: updateCar,
    };
  }

  async remove(id: number) {
    const rowsAffected = await this.carRepo.destroy({ where: { id } });
    if (rowsAffected === 0) {
      throw new NotFoundException("Car not found");
    }
    return { message: "Deleted Car" };
  }
}
