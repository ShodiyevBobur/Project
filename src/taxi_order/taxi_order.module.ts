import { Module } from '@nestjs/common';
import { TaxiOrderService } from './taxi_order.service';
import { TaxiOrderController } from './taxi_order.controller';

@Module({
  controllers: [TaxiOrderController],
  providers: [TaxiOrderService],
})
export class TaxiOrderModule {}
