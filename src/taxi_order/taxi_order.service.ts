import { Injectable } from '@nestjs/common';
import { CreateTaxiOrderDto } from './dto/create-taxi_order.dto';
import { UpdateTaxiOrderDto } from './dto/update-taxi_order.dto';

@Injectable()
export class TaxiOrderService {
  create(createTaxiOrderDto: CreateTaxiOrderDto) {
    return 'This action adds a new taxiOrder';
  }

  findAll() {
    return `This action returns all taxiOrder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taxiOrder`;
  }

  update(id: number, updateTaxiOrderDto: UpdateTaxiOrderDto) {
    return `This action updates a #${id} taxiOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} taxiOrder`;
  }
}
