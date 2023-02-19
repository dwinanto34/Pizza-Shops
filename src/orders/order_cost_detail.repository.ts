import {
    ConflictException,
    InternalServerErrorException,
  } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { OrderCostDetail } from './order_cost_detail.entity';

@EntityRepository(OrderCostDetail)
export class OrderCostDetailRepository extends Repository<OrderCostDetail> {
    async createOrderCostDetails(orderCostDetails: OrderCostDetail[]): Promise<OrderCostDetail[]> {
        try {
            await this.save(orderCostDetails);
        } catch (err) {
            if (err.code === '23505') {
                throw new ConflictException('Data already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }

        return orderCostDetails;
    }
}