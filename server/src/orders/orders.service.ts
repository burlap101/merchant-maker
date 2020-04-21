import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './interfaces/order.interface';
import { ProcessOrderDto } from './dto/process-order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel('Order') private readonly orderModel: Model<Order>) {}

  async processOrder(processOrderDto: ProcessOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(processOrderDto);
    return createdOrder.save();
  }
}
