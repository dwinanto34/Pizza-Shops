import {
    ConflictException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { EntityRepository, Repository } from 'typeorm';
  import { CreateProductDto } from './dto/create-product.dto';
  import { Product } from './product.entity'
  
  @EntityRepository(Product)
  export class ProductRepository extends Repository<Product> {
    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
      const { name, price } = createProductDto;
      const product = this.create({
        name,
        price,
      });
  
      try {
        await this.save(product);
      } catch (err) {
        if (err.code === '23505') {
          throw new ConflictException('Data already exists');
        } else {
          throw new InternalServerErrorException();
        }
      }
  
      return product;
    }
  }
  