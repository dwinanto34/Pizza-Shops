import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Products } from '../product/product.entity'
import { OrderCostDetail } from './order_cost_detail.entity'
import { BigDecimalTransformer } from '../helper/big-decimal.transformer';
import bigDecimal = require('js-big-decimal');

@Entity()
export class Orders {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Products, (product) => product.order)
    product: Products;

    @Column()
    order_date: Date;
    
    @Column({ type: 'decimal', precision: 10, scale: 2, transformer: new BigDecimalTransformer() })
    sold_price: bigDecimal;
    
    @Column({ type: 'decimal', precision: 10, scale: 2, transformer: new BigDecimalTransformer() })
    ingredient_cost: bigDecimal;

    @Column()
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, transformer: new BigDecimalTransformer() })
    total_sold_price: bigDecimal;

    @Column({ type: 'decimal', precision: 10, scale: 2, transformer: new BigDecimalTransformer() })
    total_ingredient_cost: bigDecimal;

    @OneToMany(() => OrderCostDetail, (orderCostDetail) => orderCostDetail.order)
    orderCostDetails: OrderCostDetail[]
}
