import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Orders } from './orders.entity'
import { Ingredient } from '../ingredient/ingredient.entity'


@Entity()
export class OrderCostDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Orders, (order) => order.orderCostDetails)
  order: Orders;

  @OneToOne(() => Ingredient)
  ingredient: string;

  @Column()
  indegredient_used: number;

  @Column()
  unit: string;

  @Column()
  cost_price: number;
}

