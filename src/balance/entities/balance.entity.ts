import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

interface ICreateBalanceAttr {
  amount: number;
  driverId: number;
}

@Table({ tableName: "balance" })
export class Balance extends Model<Balance, ICreateBalanceAttr> {
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  amount: number;
  @Column({ type: DataType.INTEGER, allowNull: false })
  driverId: number;
}
