import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientController } from './ingredient.controller';
import { IngredientRepository } from './ingredient.repository';
import { IngredientService } from './ingredient.service';
import { Ingredient } from '../ingredient/ingredient.entity';
import { Products } from '../product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IngredientRepository, Products, Ingredient])],
  controllers: [IngredientController],
  providers: [IngredientService],
  exports: [IngredientService],
})
export class IngredientModule {}
