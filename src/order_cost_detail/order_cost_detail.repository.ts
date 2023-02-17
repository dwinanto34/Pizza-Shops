import {
    ConflictException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { EntityRepository, Repository } from 'typeorm';
  import { CreateOrderCostDetailDto } from './dto/create-order-cost-detail.dto';
  import { OrderCostDetail } from './order_cost_detail.entity'

  @EntityRepository(OrderCostDetail)
  export class OrderCostDetailRepository extends Repository<OrderCostDetail> {
    async createOrderCostDetail(createOrderCostDetailDto: CreateOrderCostDetailDto): Promise<OrderCostDetail> {
      const { pizza_order_id, pizza_ingredient_id, indegredient_used, unit, cost_price } = createOrderCostDetailDto;
      const orderCostDetail = this.create({
        pizza_order_id,
        pizza_ingredient_id,
        indegredient_used,
        unit,
        cost_price,
      });
  
      try {
        await this.save(orderCostDetail);
      } catch (err) {
        if (err.code === '23505') {
          throw new ConflictException('Short name already exists');
        } else {
          throw new InternalServerErrorException();
        }
      }
  
      return orderCostDetail;
    }
  }