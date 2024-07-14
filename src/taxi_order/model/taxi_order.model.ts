import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { District } from "../../districts/models/district.model";

interface ICreateTaxiOrderAttr {
  name: string;
}

@Table({ tableName: "taxiorder", createdAt: false, updatedAt: false })
export class TaxiOrder extends Model<TaxiOrder, ICreateTaxiOrderAttr> {
  @ApiProperty({
    example: 1,
    description: "Unique taxi order ID",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "A trip from downtown to airport",
    description: "Description of the taxi order",
  })
  @Column({
    type: DataType.STRING,
  })
  description: string;

  @ApiProperty({
    example: "2024-07-13T12:34:56Z",
    description: "Date and time of the taxi order",
  })
  @Column({
    type: DataType.STRING,
  })
  date: string;

  @ApiProperty({
    example: 101,
    description: "ID of the starting district",
  })
  @ForeignKey(() => District)
  @Column({
    type: DataType.INTEGER,
  })
  from_district_id: number;

  @BelongsTo(() => District, "from_district_id")
  fromDistrict: District;

  @ApiProperty({
    example: 202,
    description: "ID of the destination district",
  })
  @ForeignKey(() => District)
  @Column({
    type: DataType.INTEGER,
  })
  to_district_id: number;

  @BelongsTo(() => District, "to_district_id")
  toDistrict: District;

  @ApiProperty({
    example: "user123",
    description: "ID of the user who created the taxi order",
  })
  @Column({
    type: DataType.STRING,
  })
  user_id: string;

  @ApiProperty({
    example: "40.712776, -74.005974",
    description: "Starting location coordinates",
  })
  @Column({
    type: DataType.STRING,
  })
  location_start: string;
}
