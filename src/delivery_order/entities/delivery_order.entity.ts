import { ApiProperty } from "@nestjs/swagger";
import { Table, Column, Model, DataType } from "sequelize-typescript";

interface IDeliveryOrderInterface {
  from_district_id: number;
  to_district_id: number;
  date: string;
  time: string;
  user_id: number;
  load_name: string;
  weight: number;
  capacity: number;
  description: string;
  recipient_name: string;
  recipient_phone: string;
  location_start: string;
  type: string;
}

@Table({ tableName: "delivery-order" })
export class DeliveryOrder extends Model<DeliveryOrder, IDeliveryOrderInterface> {
  @ApiProperty({ example: 1, description: "ID of the starting district" })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  from_district_id: number;

  @ApiProperty({ example: 2, description: "ID of the destination district" })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  to_district_id: number;

  @ApiProperty({
    example: "2024-07-12",
    description: "Date of the delivery order",
  })
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  date: string;

  @ApiProperty({ example: "14:00", description: "Time of the delivery order" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  time: string;

  @ApiProperty({
    example: 1,
    description: "ID of the user who created the order",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @ApiProperty({ example: "Furniture", description: "Name of the load" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  load_name: string;

  @ApiProperty({ example: 100, description: "Weight of the load in kg" })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  weight: number;

  @ApiProperty({
    example: 10,
    description: "Capacity of the load in cubic meters",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  capacity: number;

  @ApiProperty({
    example: "Fragile items",
    description: "Description of the load",
    required: false,
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @ApiProperty({ example: "John Doe", description: "Name of the recipient" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  recipient_name: string;

  @ApiProperty({
    example: "+1234567890",
    description: "Phone number of the recipient",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  recipient_phone: string;

  @ApiProperty({
    example: "123 Main St",
    description: "Starting location of the delivery",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  location_start: string;

  @ApiProperty({ example: "Regular", description: "Type of delivery" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: string;
}
