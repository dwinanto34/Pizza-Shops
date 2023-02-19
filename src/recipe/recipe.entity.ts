import { Column, Entity, OneToOne, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Products } from '../product/product.entity'
import { Ingredient } from '../ingredient/ingredient.entity'

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ManyToOne(() => Products, (product) => product.recipe)
  product: Products;
  
  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipe)
  ingredient: Ingredient;

  @Column()
  quantity: number;
}
