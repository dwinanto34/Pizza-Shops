import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../product/product.entity'
import { Ingredient } from '../ingredient/ingredient.entity'

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Product)
  product: Product;

  @OneToOne(() => Ingredient)
  ingredient: Ingredient;

  @Column()
  quantity: number;
}
