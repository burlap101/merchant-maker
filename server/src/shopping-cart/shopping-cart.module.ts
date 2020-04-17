import { Module } from '@nestjs/common';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingCartSchema } from './schemas/shopping-cart.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ShoppingCart', schema: ShoppingCartSchema }])
  ],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService]
})
export class ShoppingCartModule {}
