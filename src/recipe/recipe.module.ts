import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeController } from './recipe.controller';
import { RecipeRepository } from './recipe.repository';
import { RecipeService } from './recipe.service';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeRepository])],
  controllers: [RecipeController],
  providers: [RecipeService],
  exports: [RecipeService],
})
export class RecipeModule {}