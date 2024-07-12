import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Region } from "../../region/model/region.model";

interface ICreateDistrictAttr {
  name: string;
}

@Table({ tableName: "district" })
export class District extends Model<District, ICreateDistrictAttr> {
  @ApiProperty({
    example: 1,
    description: " ID unikal raqami",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "Yashnaobod", description: "District name" })
  @Column({ type: DataType.STRING })
  name: string;

  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  region_id: number;

  @BelongsTo(() => Region)
  region: Region;
}
