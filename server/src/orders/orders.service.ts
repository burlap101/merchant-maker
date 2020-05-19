import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './interfaces/order.interface';
import { ProcessOrderDto } from './dto/process-order.dto';
import { OpenOrderDto } from './dto/open-order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel('Order') private readonly orderModel: Model<Order>) {}

  async processOrder(id: string, processOrderDto: ProcessOrderDto): Promise<Order> {
    let order = await this.orderModel.findOne({ _id: id }).exec();
    let newOrder = Object.assign(order, processOrderDto);
    newOrder.status = "paid";
    return this.orderModel.findOneAndUpdate({ _id: id }, newOrder, {new: true, useFindAndModify: false}).exec();
  }

  async openOrder(id: string, openOrderDto: OpenOrderDto): Promise<Order> {
    let order = {
      ...openOrderDto,
      status: "open"
    }
    const openedOrder = this.orderModel.findOneAndUpdate({ _id: id }, order, {new: true, useFindAndModify: false});
    return openedOrder.exec();
  }

  async completeOrder(id: string): Promise<Order> {
    let order = this.orderModel.findOne({
      _id: id
    }).exec();
    order.status = "shipped";
    return this.orderModel.findOneAndUpdate({ _id: id}, order, {new: true, useFindAndModify: false}).exec();
    
  }

  async intitialiseOrder(): Promise<Order> {
    const order = new this.orderModel({status: "init"});
    return order.save();
  }

  async getOrder(id: string): Promise<Order> {
    return this.orderModel.findOne({ _id: id }).exec();
  }
}
