import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Orders {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    pizza_product_id: string;

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
}