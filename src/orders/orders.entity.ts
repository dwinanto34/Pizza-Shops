import { Column, Entity, OneToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../product/product.entity'
import { OrderCostDetail } from './order_cost_detail.entity'

@Entity()
export class Orders {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => Product)
    product_id: string;

    @Column()
    order_date: Date;

    @Column()
    sold_price: number;

    @Column()
    ingredient_cost: number;

    @Column()
    quantity: number;

    @Column()
    total_sold_price: number;

    @Column()
    total_ingredient_cost: number;

    @OneToMany(() => OrderCostDetail, (orderCostDetail) => orderCostDetail.order)
    orderCostDetails: OrderCostDetail[]
}
