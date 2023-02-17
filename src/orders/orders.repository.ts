import {
    ConflictException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { EntityRepository, Repository } from 'typeorm';
  import { CreateOrdersDto } from './dto/create-orders.dto';
  import { Orders } from './orders.entity'

  @EntityRepository(Orders)
  export class OrdersRepository extends Repository<Orders> {
    async createOrders(createOrdersDto: CreateOrdersDto): Promise<Orders> {
      const { pizza_product_id, order_date, sold_price, ingredient_cost, quantity, total_sold_price, total_ingredient_cost } = createOrdersDto;
      const orders = this.create({
        pizza_product_id,
        order_date,
        sold_price,
        ingredient_cost,
        quantity,
        total_sold_price,
        total_ingredient_cost,
      });
  
      try {
        await this.save(orders);
      } catch (err) {
        if (err.code === '23505') {
          throw new ConflictException('Short name already exists');
        } else {
          throw new InternalServerErrorException();
        }
      }
  
      return orders;
    }
  }