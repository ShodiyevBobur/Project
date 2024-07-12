import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";


interface ICreateDistrictAttr {
  name: string;
}

@Table({ tableName: "district" })
export class District extends Model<District, ICreateDistrictAttr> {
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
  name: string;


  @ApiProperty({ example: 1, description: "Taxi order Id unique" })
  @Column({ type: DataType.INTEGER })
  region_id: number;


}