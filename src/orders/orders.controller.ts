import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { CreateOrdersDto } from './dto/create-orders.dto';
  import { GetOrdersDto } from './dto/get-orders.dto';
  import { UpdateOrdersDto } from './dto/update-orders.dto';
  import { Orders } from './orders.entity';
  import { OrdersService } from './orders.service';
  
  @Controller('orders')
  export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}
  
    @Get()
    getAllOrders(): Promise<Orders[]> {
      return this.ordersService.getAllOrders();
    }
  
    @Post()
    createOrders(@Body() createOrdersDto: CreateOrdersDto): Promise<Orders> {
      return this.ordersService.createOrders(createOrdersDto);
    }
  
    @Delete('/:id')
    deleteOrders(@Param() getOrdersDto: GetOrdersDto): Promise<void> {
      return this.ordersService.deleteOrders(getOrdersDto);
    }
  
    @Put('/:id')
    updateOrders(
      @Param() getOrdersDto: GetOrdersDto,
      @Body() updateOrdersDto: UpdateOrdersDto,
    ): Promise<Orders> {
      return this.ordersService.updateOrders(getOrdersDto, updateOrdersDto);
    }
  }
  