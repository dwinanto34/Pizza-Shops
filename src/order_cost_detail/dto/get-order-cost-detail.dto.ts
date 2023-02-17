import { IsUUID } from 'class-validator';

export class GetOrderCostDetailDto {
  @IsUUID()
  id: string;
}
