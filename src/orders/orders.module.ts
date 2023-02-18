import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';
import { OrderCostDetail } from '../orders/order_cost_detail.entity';
import { Ingredient } from '../ingredient/ingredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersRepository, OrderCostDetail, Ingredient])],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
