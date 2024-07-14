import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";


import { UpdateDeliveryOrderDto } from "./dto/update-delivery_order.dto";
import { DeliveryOrder } from "./entities/delivery_order.entity";
import { CreateDeliveryOrderDto } from "./dto/create-delivery_order.dto";

@Injectable()
export class DeliveryOrderService {
  constructor(
    @InjectModel(DeliveryOrder)
    private readonly deliveryOrderModel: typeof DeliveryOrder
  ) {}

  async create(
    createDeliveryOrderDto: CreateDeliveryOrderDto
  ): Promise<DeliveryOrder> {
    return await this.deliveryOrderModel.create(createDeliveryOrderDto);
  }

  async findAll(): Promise<DeliveryOrder[]> {
    return await this.deliveryOrderModel.findAll();
  }

  async findOne(id: number): Promise<DeliveryOrder> {
    const deliveryOrder = await this.deliveryOrderModel.findByPk(id);
    if (!deliveryOrder) {
      throw new NotFoundException(`DeliveryOrder with id ${id} not found`);
    }
    return deliveryOrder;
  }

  async update(
    id: number,
    updateDeliveryOrderDto: UpdateDeliveryOrderDto
  ): Promise<DeliveryOrder> {
    const deliveryOrder = await this.findOne(id);
    await deliveryOrder.update(updateDeliveryOrderDto);
    return deliveryOrder;
  }

  async remove(id: number): Promise<void> {
    const deliveryOrder = await this.findOne(id);
    await deliveryOrder.destroy();
  }
}
