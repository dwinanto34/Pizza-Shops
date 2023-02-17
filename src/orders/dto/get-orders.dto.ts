import { IsUUID } from 'class-validator';

export class GetOrdersDto {
  @IsUUID()
  id: string;
}
