import { IsNotEmpty, IsString, IsPositive, IsNumber } from 'class-validator';
import bigDecimal = require('js-big-decimal');

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: bigDecimal;
}
