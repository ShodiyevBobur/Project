
import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";


interface ICreateTaxiOrderAttr{
    name: string
}

@Table({ tableName: "taxiorder" })
export class TaxiOrder extends Model<TaxiOrder, ICreateTaxiOrderAttr> {
  @ApiProperty({
    example: 1,
    description: "taxi order ID unikal raqami",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: "Taxi order Id unique" })
  @Column({ type: DataType.STRING })
  description: string;

  @ApiProperty({ example: 1, description: "Taxi order Id unique" })
  @Column({ type: DataType.STRING })
  date: string;

  @ApiProperty({ example: 1, description: "Taxi order Id unique" })
  @Column({ type: DataType.STRING })
  from_distinct_id: string;

  @ApiProperty({ example: 1, description: "Taxi order Id unique" })
  @Column({ type: DataType.STRING })
  to_distinct_id: string;

  @ApiProperty({ example: 1, description: "Taxi order Id unique" })
  @Column({ type: DataType.STRING })
  user_id: string;

  @ApiProperty({ example: 1, description: "Taxi order Id unique" })
  @Column({ type: DataType.STRING })
  location_start: string;
}
