import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderCostDetailController } from './order_cost_detail.controller';
import { OrderCostDetailRepository } from './order_cost_detail.repository';
import { OrderCostDetailService } from './order_cost_detail.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderCostDetailRepository])],
  controllers: [OrderCostDetailController],
  providers: [OrderCostDetailService],
  exports: [OrderCostDetailService],
})
export class IngredientModule {}
