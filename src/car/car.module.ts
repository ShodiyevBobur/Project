import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Car } from "./entities/car.entity";
import { JwtModule } from "@nestjs/jwt";
import { CarsController } from "./car.controller";
import { CarsService } from "./car.service";


@Module({
  imports: [
    SequelizeModule.forFeature([Car]),
    JwtModule.register({}),
  ],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService],
})
export class CarModule {}
