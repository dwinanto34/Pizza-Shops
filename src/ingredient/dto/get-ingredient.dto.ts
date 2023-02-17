import { IsUUID } from 'class-validator';

export class GetIngredientDto {
  @IsUUID()
  id: string;
}
