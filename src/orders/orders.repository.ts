import { EntityRepository, Repository } from 'typeorm';
import { Orders } from './orders.entity'
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Orders)
export class OrdersRepository extends Repository<Orders> {
  async createOrders(order: Orders): Promise<Orders> {
    try {
      await this.save(order);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Data already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return order;
  }
}