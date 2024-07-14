import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { DeliveryOrderService } from "./delivery_order.service";

import { UpdateDeliveryOrderDto } from "./dto/update-delivery_order.dto";
import { DeliveryOrder } from "./entities/delivery_order.entity";
import { CreateDeliveryOrderDto } from "./dto/create-delivery_order.dto";

@ApiTags("delivery")
@Controller("delivery")
export class DeliveryOrderController {
  constructor(private readonly deliveryOrderService: DeliveryOrderService) {}

  @Post()
  @ApiOperation({ summary: "Create a new delivery order" })
  @ApiResponse({
    status: 201,
    description: "The delivery order has been successfully created.",
    type: DeliveryOrder,
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  create(@Body() createDeliveryOrderDto: CreateDeliveryOrderDto) {
    return this.deliveryOrderService.create(createDeliveryOrderDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all delivery orders" })
  @ApiResponse({
    status: 200,
    description: "Return all delivery orders.",
    type: [DeliveryOrder],
  })
  findAll() {
    return this.deliveryOrderService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a delivery order by ID" })
  @ApiResponse({
    status: 200,
    description: "Return the delivery order with the specified ID.",
    type: DeliveryOrder,
  })
  @ApiResponse({ status: 404, description: "Delivery order not found." })
  findOne(@Param("id") id: string) {
    return this.deliveryOrderService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a delivery order by ID" })
  @ApiResponse({
    status: 200,
    description: "The delivery order has been successfully updated.",
    type: DeliveryOrder,
  })
  @ApiResponse({ status: 404, description: "Delivery order not found." })
  update(
    @Param("id") id: string,
    @Body() updateDeliveryOrderDto: UpdateDeliveryOrderDto
  ) {
    return this.deliveryOrderService.update(+id, updateDeliveryOrderDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a delivery order by ID" })
  @ApiResponse({
    status: 200,
    description: "The delivery order has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Delivery order not found." })
  remove(@Param("id") id: string) {
    return this.deliveryOrderService.remove(+id);
  }
}
