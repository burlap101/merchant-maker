import { Module } from '@nestjs/common';
import { ShippingController } from './shipping.controller';
import { ShippingService } from './shipping.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ShippingMethodSchema } from './schemas/shipping-method.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ShippingMethod', schema: ShippingMethodSchema }
    ]),
    AuthModule
  ], 
  controllers: [ShippingController],
  providers: [ShippingService],
})
export class ShippingModule {}
