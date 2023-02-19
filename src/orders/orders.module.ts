import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { ProductRepository } from '../product/product.repository';
import { OrdersRepository } from './orders.repository';
import { OrderCostDetailRepository } from './order_cost_detail.repository';
import { RecipeRepository } from '../recipe/recipe.repository';
import { IngredientRepository } from '../ingredient/ingredient.repository';
import { OrdersService } from './orders.service';
import { ProductService } from '../product/product.service';
import { RecipeService } from '../recipe/recipe.service';
import { IngredientService } from '../ingredient/ingredient.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersRepository, OrderCostDetailRepository, ProductRepository, IngredientRepository, RecipeRepository])],
  controllers: [OrdersController],
  providers: [OrdersService, ProductService, RecipeService, IngredientService],
  exports: [OrdersService],
})
export class OrdersModule {}
