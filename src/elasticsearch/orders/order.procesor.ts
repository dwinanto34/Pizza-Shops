import { PizzaOrder } from "./model/order.dto";
import { Orders } from '../../orders/orders.entity';
import { OrderCostDetail } from '../../orders/order_cost_detail.entity';
const { Client } = require('@elastic/elasticsearch');
import { BigDecimalTransformer } from '../../helper/big-decimal.transformer';
import bigDecimal from "js-big-decimal";
const esClient = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'gQO6zKXAle72M3NmJq=O'
  },
  ssl: {
    rejectUnauthorized: false
  },
  tls: {
    rejectUnauthorized: false
  }
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
      if (!indexExists) {
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
      pizzaOrder.soldPrice = this.parse(orders.sold_price)
      pizzaOrder.totalSoldPrice = this.parse(orders.total_sold_price)
      pizzaOrder.ingredientCost = this.parse(orders.ingredient_cost)
      pizzaOrder.totalIngredientCost = this.parse(orders.total_ingredient_cost)
      pizzaOrder.totalProfit = this.parse(orders.total_profit)
  
      pizzaOrder.ingredients = orderCostDetail.map(detail => ({
          name: detail.ingredient_name,
          price: this.parse(detail.cost_price),
          quantity: detail.indegredient_used
      }));

      return pizzaOrder;
  }

  parse(val: bigDecimal): number {
    const bigDecimalTransformer = new BigDecimalTransformer();

    let floatValue = parseFloat(String(bigDecimalTransformer.to(val)))
    return parseFloat(floatValue.toFixed(2))
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