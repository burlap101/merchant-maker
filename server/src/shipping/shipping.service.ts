import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShippingMethod } from './interfaces/shipping-method.interface';
import { ShippingType } from './interfaces/shipping-type.interface';
import { CreateShippingMethodDto } from './dto/create-shipping-method.dto';
import { CreateShippingTypeDto } from './dto/create-shipping-type.dto';

@Injectable()
export class ShippingService {
  constructor(
    @InjectModel('ShippingMethod') private readonly shippingMethodModel: Model<ShippingMethod>,
    @InjectModel('ShippingType') private readonly shippingTypeModel: Model<ShippingType>
  ) {}

  async create(createShippingMethodDto: CreateShippingMethodDto): Promise<ShippingMethod> {
    let type = createShippingMethodDto.type;
    if (createShippingMethodDto.type._id === undefined) {
      type = await this.createType(createShippingMethodDto.type);
    }
    const createdShippingMethod = new this.shippingMethodModel({
      "description": createShippingMethodDto.description,
      "type": type,
      "cost": createShippingMethodDto.cost,
      "discounts": createShippingMethodDto.discounts
    });
    return createdShippingMethod.save();
  }

  async createType(createShippingTypeDto: CreateShippingTypeDto): Promise<ShippingType> {
    const createdShippingType = new this.shippingTypeModel(createShippingTypeDto);
    return createdShippingType.save();
  }

  async updateType(shippingType: ShippingType): Promise<ShippingType> {
    return this.shippingTypeModel
      .findOneAndReplace({ _id: shippingType._id }, shippingType, {new: true})
      .exec();
  }

  async destroyType(id: string): Promise<ShippingType> {
    return this.shippingTypeModel.findOneAndDelete({ _id: id }).exec();
  }

  async findAll(): Promise<ShippingMethod[]> {
    return this.shippingMethodModel.find().exec();
  }

  async findOneById(id: string): Promise<ShippingMethod> {
    return this.shippingMethodModel.findById(id).exec();
  }

  async findOneTypeById(id: string): Promise<ShippingType> {
    return this.shippingTypeModel.findById(id).exec();
  }

  async findOneByIdAndDelete(id: string): Promise<ShippingMethod> {
    return this.shippingMethodModel.findOneAndDelete({ _id: id });
  }

  async find(query: Object): Promise<ShippingMethod[]> {
    return this.shippingMethodModel.find(query).exec();
  }

  async findAllTypes(): Promise<ShippingType[]> {
    return this.shippingTypeModel.find().exec();
  }
}
