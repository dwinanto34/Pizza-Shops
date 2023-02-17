import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions } from 'typeorm';
import { CreateOrderCostDetailDto } from './dto/create-order-cost-detail.dto';
import { GetOrderCostDetailDto } from './dto/get-order-cost-detail.dto';
import { UpdateOrderCostDetailDto } from './dto/update-order-cost-detail.dto';
import { OrderCostDetail } from './order_cost_detail.entity';
import { OrderCostDetailRepository } from './order_cost_detail.repository';

@Injectable()
export class OrderCostDetailService {
  constructor(
    @InjectRepository(OrderCostDetailRepository)
    private readonly ingredientRepository: OrderCostDetailRepository,
  ) {}

  async getAllOrderCostDetails(): Promise<Array<OrderCostDetail>> {
    return this.ingredientRepository.find({});
  }
  
  async createOrderCostDetail(createOrderCostDetailDto: CreateOrderCostDetailDto): Promise<OrderCostDetail> {
    return this.ingredientRepository.createOrderCostDetail(createOrderCostDetailDto);
  }

  async getOrderCostDetail(conditions: FindConditions<OrderCostDetail>): Promise<OrderCostDetail> {
    const ingredient = await this.ingredientRepository.findOne(conditions);

    if (!ingredient) {
      throw new NotFoundException();
    }

    return ingredient;
  }

  async deleteOrderCostDetail(getOrderCostDetailDto: GetOrderCostDetailDto): Promise<void> {
    const { id } = getOrderCostDetailDto;
    const res = await this.ingredientRepository.delete({ id });

    if (res.affected === 0) {
      throw new NotFoundException(`OrderCostDetail with ID: "${id}" not found`);
    }
  }

  async updateOrderCostDetail(
    getOrderCostDetailDto: GetOrderCostDetailDto,
    updateOrderCostDetailDto: UpdateOrderCostDetailDto,
  ): Promise<OrderCostDetail> {
    const { id } = getOrderCostDetailDto;
    const ingredient = await this.getOrderCostDetail({ id });
    const { pizza_order_id, pizza_ingredient_id, indegredient_used, unit, cost_price } = updateOrderCostDetailDto;

    ingredient.pizza_order_id = pizza_order_id;
    ingredient.pizza_ingredient_id = pizza_ingredient_id;
    ingredient.indegredient_used = indegredient_used;
    ingredient.unit = unit;
    ingredient.cost_price = cost_price;

    await this.ingredientRepository.save(ingredient);

    return ingredient;
  }
}
