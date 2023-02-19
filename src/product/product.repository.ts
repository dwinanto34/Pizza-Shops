import {
    ConflictException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { EntityRepository, Repository } from 'typeorm';
  import { CreateProductDto } from './dto/create-product.dto';
  import { Products } from './product.entity'
  
  @EntityRepository(Products)
  export class ProductRepository extends Repository<Products> {
    async createProduct(createProductDto: CreateProductDto): Promise<Products> {
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
  