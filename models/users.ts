import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface usersAttributes {
  user_id?: number;
  user_name?: string;
  user_phone?: string;
  user_email?: string;
  user_pass?: string;
}

@Table({ tableName: 'users', schema: 'public', timestamps: false })
export class users
  extends Model<usersAttributes, usersAttributes>
  implements usersAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('users_user_id_seq'::regclass)"),
  })
  @Index({ name: 'users_pkey', using: 'btree', unique: true })
  user_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  user_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(15) })
  user_phone?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  user_email?: string;

  @Column({ allowNull: true, type: DataType.STRING(250) })
  user_pass?: string;
}
