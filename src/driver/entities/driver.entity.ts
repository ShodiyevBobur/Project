import {
  Column,
  Model,
  Table,
  DataType,
  HasOne,
  HasMany,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Balance } from "../../balance/entities/balance.entity";
import { CarDriver } from "../../car_driver/entities/car_driver.entity";

@Table({ tableName: "drivers" })
export class Driver extends Model<Driver> {
  @ApiProperty({
    example: 1,
    description: "The unique identifier of the driver",
  })
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: "John", description: "The first name of the driver" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: "Doe", description: "The last name of the driver" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  surname: string;

  @ApiProperty({ example: 30, description: "The age of the driver" })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  age: number;

  @ApiProperty({
    example: "+123456789",
    description: "The phone number of the driver",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @ApiProperty({ example: "photo.jpg", description: "The photo of the driver" })
  @Column({
    type: DataType.STRING,
  })
  photo: string;

  @ApiProperty({
    example: "A1234567",
    description: "The passport number of the driver",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  passport: string;

  @ApiProperty({
    example: "B1234567",
    description: "The driving license number of the driver",
  })
  @Column({
    type: DataType.STRING,
  })
  prava: string;

  @ApiProperty({
    example: 1000,
    description: "The total balance of the driver",
  })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  })
  total_balance: number;

  @ApiProperty({
    example: "klsvndfvo",
    description: "The password of the driver",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({
    example: true,
    description: "The active status of the driver",
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isActive: boolean;

  @ApiProperty({
    example: "0594grjoitjrgijgrjjfrb",
    description: "hashed refresh token for driver",
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @HasOne(() => Balance)
  balance: Balance; 

  @HasMany(() => CarDriver)
  cars: CarDriver[];
}
