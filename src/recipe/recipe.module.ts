import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeController } from './recipe.controller';
import { RecipeRepository } from './recipe.repository';
import { RecipeService } from './recipe.service';
import { ProductService } from '../product/product.service';
import { IngredientService } from '../ingredient/ingredient.service';
import { ProductRepository } from '../product/product.repository';
import { IngredientRepository } from '../ingredient/ingredient.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeRepository])],
  controllers: [RecipeController],
  providers: [RecipeService, ProductService, IngredientService, ProductRepository, IngredientRepository],
  exports: [RecipeService],
})
export class RecipeModule {}