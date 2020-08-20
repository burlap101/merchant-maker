import { Module } from '@nestjs/common';
import { ShippingController } from './shipping.controller';
import { ShippingService } from './shipping.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ShippingMethodSchema } from './schemas/shipping-method.schema';
import { AuthModule } from 'src/auth/auth.module';
import { ShippingTypeSchema } from './schemas/shipping-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ShippingMethod', schema: ShippingMethodSchema },
      { name: 'ShippingType', schema: ShippingTypeSchema } 
    ]),
    AuthModule
  ], 
  controllers: [ShippingController],
  providers: [ShippingService],
})
export class ShippingModule {}
