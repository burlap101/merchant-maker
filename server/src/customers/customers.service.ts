import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDto } from './dto/create-customer.dto';
import Stripe from 'stripe';


@Injectable()
export class CustomersService {
  constructor(@InjectModel('Customer') private readonly customerModel: Model<Customer>) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const createdCustomer = new this.customerModel({
      ...createCustomerDto,
      paymentIntents: []
    });
    return createdCustomer.save();
  }

  async findOneByIdAndDelete(id: string ) {
    return this.customerModel.findOneAndDelete({_id: id});
  }

  async findOneById(id: string | Stripe.Customer | Stripe.DeletedCustomer ): Promise<Customer> {
    return this.customerModel.findone({ _id: id });
  }

  async assignPaymentIntent(id: string, paymentIntentId: string): Promise<Customer> {
    let customer = await this.customerModel.findOne({ _id: id });
    console.log(paymentIntentId);
    customer.paymentIntents.push(paymentIntentId);
    return customer.save();
  }

  async findOneByPaymentIntent(paymentIntentId: string): Promise<Customer> {
    return this.customerModel.findOne({ paymentIntents: paymentIntentId });
  }
}
