import { Controller, Post, Request, Body } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomersService } from './customers.service';
import { Customer } from './interfaces/customer.interface';
import { CheckoutDto } from './dto/checkout.dto';

@Controller('api/customers')
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService
  ) {}

  @Post('create')
  async create(@Body() createCustomerDto: CreateCustomerDto ): Promise<Customer> {
    return this.customersService.create(createCustomerDto);
  }
}
