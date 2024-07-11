import { Column, DataType, Table } from "sequelize-typescript";

@Table
export class Balance {
  @Column({ type: DataType.INTEGER, allowNull: false })
  amount: string;
  @Column({ type: DataType.STRING, allowNull: false })
  transfer_date: string;

  @Column({ type: DataType.STRING, allowNull: false })
  transfer_type: string;
}
