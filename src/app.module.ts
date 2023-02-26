import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientModule } from './Ingredient/ingredient.module';
import { ProductModule } from './product/product.module';
import { OrdersModule } from './orders/orders.module';
import { RecipeModule } from './recipe/recipe.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'admin',
          database: 'pizza_shops',
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typeDefs: `
        type Ingredient {
          name: String!
          cost: Float!
          quantity: Int!
        }
        
        type Orders {
          productName: String!
          totalUnitSold: Int!
          totalCost: Float!
          totalSales: Float!
          totalProfit: Float!
          ingredients: [Ingredient!]!
        }

        type Query {
          orders(productName: String, from: String, to: String): [Orders!]!
        }
      `,
    }),
    ProductModule,
    IngredientModule,
    OrdersModule,
    RecipeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
