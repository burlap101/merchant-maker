import { Controller, Post, Request, Body } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomersService } from './customers.service';
import { Customer } from './interfaces/customer.interface';
import { CheckoutDto } from './dto/checkout.dto';

@Controller('customers')
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService
  ) {}

  @Post('create')
  async create(@Request() req, @Body() createCustomerDto: CreateCustomerDto ): Promise<Customer> {
    return this.customersService.create(createCustomerDto);
  }

  @Post('create-assign-intent')
  async createAndAssignPaymentIntent(@Body() checkoutDto: CheckoutDto ): Promise<Customer> {
    console.log(checkoutDto)
    let customer = await this.customersService.create(checkoutDto.customer);
    console.log(customer);
    return this.customersService.assignPaymentIntent(customer._id, checkoutDto.paymentIntentId);
  }
}
