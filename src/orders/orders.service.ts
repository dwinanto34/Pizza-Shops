import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions } from 'typeorm';
import { CreateOrdersDto } from './dto/create-orders.dto';
import { GetOrdersDto } from './dto/get-orders.dto';
import { UpdateOrdersDto } from './dto/update-orders.dto';
import { Orders } from './orders.entity';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersRepository)
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async getAllOrders(): Promise<Array<Orders>> {
    return this.ordersRepository.find({});
  }
  
  async createOrders(createOrdersDto: CreateOrdersDto): Promise<Orders> {
    return this.ordersRepository.createOrders(createOrdersDto);
  }

  async getOrders(conditions: FindConditions<Orders>): Promise<Orders> {
    const orders = await this.ordersRepository.findOne(conditions);

    if (!orders) {
      throw new NotFoundException();
    }

    return orders;
  }

  async deleteOrders(getOrdersDto: GetOrdersDto): Promise<void> {
    const { id } = getOrdersDto;
    const res = await this.ordersRepository.delete({ id });

    if (res.affected === 0) {
      throw new NotFoundException(`Orders with ID: "${id}" not found`);
    }
  }

  async updateOrders(
    getOrdersDto: GetOrdersDto,
    updateOrdersDto: UpdateOrdersDto,
  ): Promise<Orders> {
    const { id } = getOrdersDto;
    const orders = await this.getOrders({ id });
    const { product_id, order_date, sold_price, ingredient_cost, quantity, total_sold_price, total_ingredient_cost } = updateOrdersDto;
    orders.product_id = product_id
    orders.order_date = order_date;
    orders.sold_price = sold_price;
    orders.ingredient_cost = ingredient_cost;
    orders.quantity = quantity;
    orders.total_sold_price = total_sold_price;
    orders.total_ingredient_cost = total_ingredient_cost;

    await this.ordersRepository.save(orders);

    return orders;
  }
}
