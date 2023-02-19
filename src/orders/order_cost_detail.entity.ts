import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Orders } from '../orders/orders.entity'
import { BigDecimalTransformer } from '../helper/big-decimal.transformer';
import bigDecimal = require('js-big-decimal');

@Entity()
export class OrderCostDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Orders, (order) => order.orderCostDetails)
    order: Orders;

    @Column()
    ingredient_name: string;

    @Column()
    indegredient_used: number;

    @Column()
    unit: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, transformer: new BigDecimalTransformer() })
    cost_price: bigDecimal;
}

