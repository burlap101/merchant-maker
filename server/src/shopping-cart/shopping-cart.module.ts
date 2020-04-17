import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingCartSchema } from './schemas/shopping-cart.schema';
import { ShoppingCartMiddleware } from './middleware/shopping-cart.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ShoppingCart', schema: ShoppingCartSchema }])
  ],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService]
})
export class ShoppingCartModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ShoppingCartMiddleware)
      .forRoutes(ShoppingCartController);
  }
}
