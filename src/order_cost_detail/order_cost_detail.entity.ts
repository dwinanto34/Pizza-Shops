import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderCostDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pizza_order_id: string;

  @Column()
  pizza_ingredient_id: string;

  @Column()
  indegredient_used: number;

  @Column()
  unit: string;

  @Column()
  cost_price: number;
}