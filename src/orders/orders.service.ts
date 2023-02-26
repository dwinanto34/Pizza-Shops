import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, getConnection, getManager } from 'typeorm';
import { CreateOrdersDto } from './dto/create-orders.dto';
import { GetOrdersDto } from './dto/get-orders.dto';
import { OrderCostDetail } from './order_cost_detail.entity';
import { OrdersRepository } from './orders.repository';
import { OrderCostDetailRepository } from './order_cost_detail.repository';
import { ProductService } from '../product/product.service';
import { RecipeService } from '../recipe/recipe.service';
import { Products } from '../product/product.entity';
import { Orders } from './orders.entity';
import { OrderProcessor } from '../elasticsearch/orders/order.procesor';
import bigDecimal = require('js-big-decimal');

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersRepository)
    private readonly ordersRepository: OrdersRepository,
    private readonly orderCostDetailRepository: OrderCostDetailRepository,
    private readonly productService: ProductService,
    private readonly recipeService: RecipeService,
    private readonly orderProcessor: OrderProcessor,
  ) {}

  async getAllOrders(): Promise<Array<Orders>> {
    return this.ordersRepository.find({});
  }
  
  // CreateOrdersDto should have product_id, instead of the name
  // I do it for purpose to make it easier for me to put the data on PostMan
  async createOrders(createOrdersDto: CreateOrdersDto): Promise<Orders> {
    const product = await this.productService.getProduct({ name: createOrdersDto.product_name });
    if (!product) {
      throw new NotFoundException();
    }
    
    const recipes = await this.recipeService.getRecipesByProductName(product.name);
    if (!recipes || recipes.length == 0) {
      throw new NotFoundException();
    }

    // construct order
    // few fields information still mising (related to ingredient)
    let order = this.constructOrderFunc(product, createOrdersDto)
    let ingredient_cost: bigDecimal = new bigDecimal('0');

    // build order cost details
    const orderCostDetails: OrderCostDetail[] = [];
    recipes.forEach(recipe => {
      const ingredient = recipe.ingredient
      const orderCostDetail = new OrderCostDetail();
      orderCostDetail.order = order;
      orderCostDetail.ingredient_name = ingredient.name;
      orderCostDetail.indegredient_used = recipe.quantity;
      orderCostDetail.unit = ingredient.unit;
      orderCostDetail.cost_price = ingredient.average_price_per_unit.multiply(new bigDecimal(recipe.quantity.toString()));
      orderCostDetails.push(orderCostDetail);

      ingredient_cost = ingredient_cost.add(orderCostDetail.cost_price);
    });

    // filling orders information related to ingredient
    order.ingredient_cost = ingredient_cost;
    order.total_sold_price = new bigDecimal(String(createOrdersDto.sold_price)).multiply(new bigDecimal(createOrdersDto.quantity.toString()));

    let total_ingredient_cost: bigDecimal = ingredient_cost.multiply(new bigDecimal(createOrdersDto.quantity.toString()));
    order.total_ingredient_cost = total_ingredient_cost;
    order.total_profit = order.total_sold_price.subtract(order.total_ingredient_cost)

    // save order and order cost details
    let orders = this.saveData(order, orderCostDetails);
    if (orders != null) {
      const success = await this.orderProcessor.processOrder(order, orderCostDetails)
      if (!success) {
        console.error(`Error storing data into ES`);
      }
    }

    return orders;
  }

  async saveData(order: Orders, orderCostDetails: OrderCostDetail[]): Promise<Orders> {
    const manager = getManager();
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    let orders = null;
    try {
      await manager.transaction(async transactionManager => {
        orders = await this.ordersRepository.createOrders(order);
        await this.orderCostDetailRepository.createOrderCostDetails(orderCostDetails);

        await queryRunner.commitTransaction();
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      // TODO : THE EXCEPTION SHOULD NOT BE NOT FOUND EXCEPTION
      throw new NotFoundException();
    } finally {
      return orders;
    }
  }

  constructOrderFunc(product: Products, createOrdersDto: CreateOrdersDto): Orders {
    let order = new Orders;
    order.product = product;
    order.order_date = createOrdersDto.order_date;
    order.sold_price = new bigDecimal(String(createOrdersDto.sold_price));
    order.quantity = createOrdersDto.quantity;

    return order;
  }

  async getOrders(conditions: FindConditions<Orders>): Promise<Orders> {
    const orders = await this.ordersRepository.findOne(conditions);

    if (!orders) {
      throw new NotFoundException();
    }

    return orders;
  }

  async deleteOrders(getOrdersDto: GetOrdersDto): Promise<boolean> {
    const { id } = getOrdersDto;
    const res = await this.ordersRepository.delete({ id });

    if (res.affected === 0) {
      throw new NotFoundException(`Orders with ID: "${id}" not found`);
    }

    return true
  }
}
