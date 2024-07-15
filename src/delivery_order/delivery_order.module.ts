import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { DeliveryOrderService } from "./delivery_order.service";
import { DeliveryOrder } from "./entities/delivery_order.entity";
import { DeliveryOrderController } from "./delivery_order.controller";
import { Region } from "src/region/entities/region.entity";

@Module({
  imports: [SequelizeModule.forFeature([DeliveryOrder,Region])],
  providers: [DeliveryOrderService],
  exports: [DeliveryOrderService],
  controllers: [DeliveryOrderController],
})
export class DeliveryOrderModule {}
