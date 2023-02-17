import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { CreateOrderCostDetailDto } from './dto/create-order-cost-detail.dto';
  import { GetOrderCostDetailDto } from './dto/get-order-cost-detail.dto';
  import { UpdateOrderCostDetailDto } from './dto/update-order-cost-detail.dto';
  import { OrderCostDetail } from './order_cost_detail.entity';
  import { OrderCostDetailService } from './order_cost_detail.service';
  
  @Controller('order-cost-detail')
  export class OrderCostDetailController {
    constructor(private readonly orderCostDetailService: OrderCostDetailService) {}
  
    @Get()
    getAllOrderCostDetails(): Promise<OrderCostDetail[]> {
      return this.orderCostDetailService.getAllOrderCostDetails();
    }
  
    @Post()
    createOrderCostDetail(@Body() createOrderCostDetailDto: CreateOrderCostDetailDto): Promise<OrderCostDetail> {
      return this.orderCostDetailService.createOrderCostDetail(createOrderCostDetailDto);
    }
  
    @Delete('/:id')
    deleteOrderCostDetail(@Param() getOrderCostDetailDto: GetOrderCostDetailDto): Promise<void> {
      return this.orderCostDetailService.deleteOrderCostDetail(getOrderCostDetailDto);
    }
  
    @Put('/:id')
    updateOrderCostDetail(
      @Param() getOrderCostDetailDto: GetOrderCostDetailDto,
      @Body() updateOrderCostDetailDto: UpdateOrderCostDetailDto,
    ): Promise<OrderCostDetail> {
      return this.orderCostDetailService.updateOrderCostDetail(getOrderCostDetailDto, updateOrderCostDetailDto);
    }
  }
  