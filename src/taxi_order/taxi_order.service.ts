import { Injectable } from "@nestjs/common";
import { CreateTaxiOrderDto } from "./dto/create-taxi_order.dto";
import { UpdateTaxiOrderDto } from "./dto/update-taxi_order.dto";
import { TaxiOrder } from "./model/taxi_order.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class TaxiOrderService {
  constructor(
    @InjectModel(TaxiOrder) private taxiOrderRepo: typeof TaxiOrder
  ) {}
  create(createTaxiOrderDto: CreateTaxiOrderDto) {
    return this.taxiOrderRepo.create(createTaxiOrderDto);
  }

  findAll() {
    return this.taxiOrderRepo.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.taxiOrderRepo.findByPk(id);
  }

  update(id: number, updateTaxiOrderDto: UpdateTaxiOrderDto) {
    return this.taxiOrderRepo.update(updateTaxiOrderDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.taxiOrderRepo.destroy({ where: { id } });
  }
}
