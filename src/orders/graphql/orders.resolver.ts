import { Resolver, Query, Args } from '@nestjs/graphql';
import { Client } from '@elastic/elasticsearch';
import { OrdersService } from '../orders.service';

const esClient = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'gQO6zKXAle72M3NmJq=O'
  },
  tls: {
    rejectUnauthorized: false
  }
});

@Resolver('Orders')
export class OrdersResolver {
  constructor(
    private readonly ordersService: OrdersService
  ) {}

  @Query()
  async orders(
    @Args('productName', { nullable: true }) productName: string,
    @Args('from', { nullable: true }) from: string,
    @Args('to', { nullable: true }) to: string,
  ) {

    const query = {
      bool: {
        must: [
          {
            range: {
              orderDate: {
                gte: from,
                lte: to,
              },
            },
          },
        ],
      },
    };

    if (productName && productName.length > 0) {
      (query.bool.must as any).push({
        terms: {
          productName: [productName],
        },
      });
    }

    const result = await esClient.search({
      index: 'orders',
      body: {
        size: 0,
        query: query,
        aggs: {
          products: {
            terms: {
              field: 'productName',
              size: 10,
            },
            aggs: {
              total_unit_sold: {
                sum: {
                  field: 'quantity',
                },
              },
              total_cost: {
                sum: {
                  field: 'totalIngredientCost',
                },
              },
              total_sales: {
                sum: {
                  field: 'totalSoldPrice',
                },
              },
              total_profit: {
                sum: {
                  field: 'totalProfit',
                },
              },
              ingredients: {
                nested: {
                  path: 'ingredients',
                },
                aggs: {
                  sum_by_ingredients: {
                    terms: {
                      field: 'ingredients.name',
                      size: 10,
                    },
                    aggs: {
                      total_cost: {
                        sum: {
                          field: 'ingredients.price',
                        },
                      },
                      total_quantity: {
                        sum: {
                          field: 'ingredients.quantity',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!result.aggregations) {
      return [];
    }

    const products = (result.aggregations.products as any).buckets.map((bucket) => {
      const ingredientBuckets = (bucket.ingredients.sum_by_ingredients as any).buckets.map((ingredientBucket) => {
          return {
            name: ingredientBucket.key,
            cost: ingredientBucket.total_cost.value,
            quantity: ingredientBucket.total_quantity.value,
          };
        },
      );

      return {
        productName: bucket.key,
        totalUnitSold: bucket.total_unit_sold.value,
        totalCost: bucket.total_cost.value,
        totalSales: bucket.total_sales.value,
        totalProfit: bucket.total_profit.value,
        ingredients: ingredientBuckets,
      };
    });

    return products;
  }
}
