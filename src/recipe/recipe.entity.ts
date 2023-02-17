import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pizza_product_id: string;

  @Column()
  pizza_ingredient_id: string;

  @Column()
  quantity: number;
}
