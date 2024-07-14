import { Module } from "@nestjs/common";
import { DriverService } from "./driver.service";
import { DriverController } from "./driver.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Driver } from "./entities/driver.entity";
import { JwtModule } from "@nestjs/jwt";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";
import { Region } from "../region/model/region.model";
import { TaxiOrder } from "../taxi_order/model/taxi_order.model";

@Module({
  imports: [
    SequelizeModule.forFeature([Driver, Region, TaxiOrder]),
    JwtModule,
    CloudinaryModule,
  ],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
