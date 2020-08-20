import { Controller, Post, UseGuards, Body, Delete, Param, Get } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateShippingMethodDto } from './dto/create-shipping-method.dto';
import { ShippingMethod } from './interfaces/shipping-method.interface';
import { ShippingType } from './interfaces/shipping-type.interface';

@Controller('api/shipping')
export class ShippingController {
  constructor(
    private readonly shippingService: ShippingService
  ) {}
  
  @Roles('admin', 'superuser')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add')
  async create(@Body() createShippingMethodDto: CreateShippingMethodDto): Promise<ShippingMethod> {
    return this.shippingService.create(createShippingMethodDto);
  }

  @Roles('admin', 'superuser')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll(): Promise<ShippingMethod[]> {
    return this.shippingService.findAll();
  }

  @Get(':id')
  async find(@Param() params): Promise<ShippingMethod> {
    return this.shippingService.findOneById(params.id);
  }

  @Roles('admin', 'superuser')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('delete/:id')
  async deleteOneById(@Param() params): Promise<ShippingMethod> {
    return this.shippingService.findOneByIdAndDelete(params.id);
  }
  
  @Roles('admin', 'superuser')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('types')
  async getTypes(): Promise<ShippingType[]> {
    return this.shippingService.findAllTypes();
  }

  @Get('types/:id')
  async getType(@Param() params): Promise<ShippingType> {
    return this.shippingService.findOneTypeById(params.id);
  }

  @Roles('admin', 'superuser')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/types/delete/:id')
  async deleteOneTypeById(@Param() params): Promise<ShippingType> {
    return this.shippingService.destroyType(params.id);
  }

  @Roles('admin', 'superuser')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('types/update')
  async updateOneTypeById(@Body() shippingType: ShippingType) : Promise<ShippingType> {
    return this.shippingService.updateType(shippingType);
  }
}
