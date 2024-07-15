import { Module } from "@nestjs/common";
import { TaxiOrderService } from "./taxi_order.service";
import { TaxiOrderController } from "./taxi_order.controller";
import { TaxiOrder } from "./model/taxi_order.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { JwtModule } from "@nestjs/jwt";
import { District } from "../districts/models/district.model";

@Module({
  imports: [SequelizeModule.forFeature([TaxiOrder, District]), JwtModule.register({})],

  controllers: [TaxiOrderController],
  providers: [TaxiOrderService],
})
export class TaxiOrderModule {}
