import { IsUUID } from 'class-validator';

export class GetRecipeDto {
  @IsUUID()
  id: string;
}
