import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Rider {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  age!: number;

  @Column()
  phone!: string;

  @Column()
  vehicle!: string;

  @Column()
  address!: string;

  @OneToMany(() => Order, (order) => order.rider)
  orders!: Order[];
}