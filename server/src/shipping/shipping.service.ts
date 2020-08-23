import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShippingMethod } from './interfaces/shipping-method.interface';
import { CreateShippingMethodDto } from './dto/create-shipping-method.dto';

@Injectable()
export class ShippingService {
  constructor(
    @InjectModel('ShippingMethod') private readonly shippingMethodModel: Model<ShippingMethod>
  ) {}

  async create(createShippingMethodDto: CreateShippingMethodDto): Promise<ShippingMethod> {
    const createdShippingMethod = new this.shippingMethodModel(createShippingMethodDto);
    return createdShippingMethod.save();
  }

  async findAll(): Promise<ShippingMethod[]> {
    return this.shippingMethodModel.find().exec();
  }

  async findOneById(id: string): Promise<ShippingMethod> {
    return this.shippingMethodModel.findById(id).exec();
  }

  async findOneByIdAndDelete(id: string): Promise<ShippingMethod> {
    return this.shippingMethodModel.findOneAndDelete({ _id: id });
  }

  async find(query: Object): Promise<ShippingMethod[]> {
    return this.shippingMethodModel.find(query).exec();
  }

  async update(id: string, newShippingMethod: CreateShippingMethodDto): Promise<ShippingMethod> {
    return this.shippingMethodModel.findOneAndReplace({_id: id}, newShippingMethod).exec();
  }
}
