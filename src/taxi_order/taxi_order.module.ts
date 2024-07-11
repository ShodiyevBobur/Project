import { Module } from "@nestjs/common";
import { TaxiOrderService } from "./taxi_order.service";
import { TaxiOrderController } from "./taxi_order.controller";
import { TaxiOrder } from "./model/taxi_order.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [SequelizeModule.forFeature([TaxiOrder]), JwtModule.register({})],

  controllers: [TaxiOrderController],
  providers: [TaxiOrderService],
})
export class TaxiOrderModule {}
