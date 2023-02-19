import { IsNotEmpty, IsNumber, IsString, IsPositive } from 'class-validator';
import bigDecimal = require('js-big-decimal');

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: bigDecimal;
}
