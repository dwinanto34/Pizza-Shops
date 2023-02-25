import { PizzaOrder } from "./model/order.dto";
import { Orders } from '../../orders/orders.entity';
import { OrderCostDetail } from '../../orders/order_cost_detail.entity';
const { Client } = require('@elastic/elasticsearch');
const esClient = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'c7gSGHqV_Rnw+zt1bfIK'
  },
  ssl: { rejectUnauthorized: false }
});
const indexName = 'orders';

export class OrderProcessor {
  async processOrder(orders: Orders, orderCostDetail: OrderCostDetail[]): Promise<boolean> {
    try {
      const pizzaOrder = await this.constructData(orders, orderCostDetail);
      await this.storeData(pizzaOrder);
      return true;
    } catch (err) {
      console.error(`Error processing order: ${err}`);
      return false;
    }
  }

  async createIndexWithMapping() {
    try {
      const indexExists = await esClient.indices.exists({ index: indexName });
      if (!indexExists.body) {
        await esClient.indices.create({
          index: indexName,
          body: {
            mappings: {
              properties: {
                orderId: { type: 'keyword' },
                productName: { type: 'keyword' },
                orderDate: { type: 'date' },
                quantity: { type: 'long' },
                soldPrice: { type: 'scaled_float', scaling_factor: 100, coerce: false },
                totalSoldPrice: { type: 'scaled_float', scaling_factor: 100, coerce: false },
                ingredientCost: { type: 'scaled_float', scaling_factor: 100, coerce: false },
                totalIngredientCost: { type: 'scaled_float', scaling_factor: 100, coerce: false },
                totalProfit: { type: 'scaled_float', scaling_factor: 100, coerce: false },
                ingredients: {
                  type: 'nested',
                  properties: {
                    name: { type: 'keyword' },
                    price: { type: 'scaled_float', scaling_factor: 100, coerce: false },
                    quantity: { type: 'long' }
                  }
                }
              }
            }
          }
        });
      }
    } catch (err) {
      console.error(`Error creating index with mapping: ${err}`);
    }
  }

  async constructData(orders: Orders, orderCostDetail: OrderCostDetail[]): Promise<PizzaOrder> {
      let pizzaOrder = new PizzaOrder;
      pizzaOrder.orderId = orders.id
      pizzaOrder.productName = orders.product.name
      pizzaOrder.orderDate = orders.order_date
      pizzaOrder.quantity = orders.quantity
      pizzaOrder.soldPrice = orders.sold_price
      pizzaOrder.totalSoldPrice = orders.total_sold_price
      pizzaOrder.ingredientCost = orders.ingredient_cost
      pizzaOrder.totalIngredientCost = orders.total_ingredient_cost
      pizzaOrder.totalProfit = orders.total_profit
      
      pizzaOrder.ingredients = orderCostDetail.map(detail => ({
          name: detail.ingredient_name,
          price: detail.cost_price,
          quantity: detail.indegredient_used
      }));

      return pizzaOrder;
  }

  async storeData(data: PizzaOrder): Promise<boolean> {
    try {
      await this.createIndexWithMapping();
      await esClient.index({
        index: indexName,
        body: data
      });
      console.log('Data stored successfully!');
      return true;
    } catch (err) {
      console.error(`Error storing data: ${err}`);
      return false;
    }
  }
}