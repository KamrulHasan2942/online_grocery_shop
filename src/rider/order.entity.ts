import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { Rider } from './rider.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  customerName!: string;

  @Column()
  product!: string;

  @Column()
  quantity!: number;

  @Column()
  price!: number;

  @Column()
  deliveryAddress!: string;

  @Column({
    default: 'Pending',
  })
  status!: string;

  @ManyToOne(
    () => Rider,
    (rider) => rider.orders,
  )
  rider!: Rider;
}