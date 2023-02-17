import { IsNotEmpty, IsNumber, IsString, IsPositive } from 'class-validator';

export class CreateOrderCostDetailDto {
  @IsString()
  @IsNotEmpty()
  pizza_order_id: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  pizza_ingredient_id: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  indegredient_used: number;

  @IsString()
  @IsNotEmpty()
  unit: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  cost_price: number;
}