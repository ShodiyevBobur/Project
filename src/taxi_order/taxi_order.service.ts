  import { Injectable } from "@nestjs/common";
  import { CreateTaxiOrderDto } from "./dto/create-taxi_order.dto";
  import { UpdateTaxiOrderDto } from "./dto/update-taxi_order.dto";
  import { TaxiOrder } from "./model/taxi_order.model";
  import { InjectModel } from "@nestjs/sequelize";
  import { District } from "../districts/models/district.model";

  @Injectable()
  export class TaxiOrderService {
    constructor(
      @InjectModel(TaxiOrder) private taxiOrderRepo: typeof TaxiOrder
    ) {}

    create(createTaxiOrderDto: CreateTaxiOrderDto) {
      return this.taxiOrderRepo.create(createTaxiOrderDto);
    }

    findAll() {
      return this.taxiOrderRepo.findAll({
        include: [
          { model: District, as: "fromDistrict" },
          { model: District, as: "toDistrict" },
        ],
      });
    }

    findOne(id: number) {
      return this.taxiOrderRepo.findByPk(id, {
        include: [
          { model: District, as: "fromDistrict" },
          { model: District, as: "toDistrict" },
        ],
      });
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
