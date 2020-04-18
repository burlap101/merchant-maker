import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingCartSchema } from './schemas/shopping-cart.schema';
import { ShoppingCartMiddleware } from './middleware/shopping-cart.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ShoppingCart', schema: ShoppingCartSchema }]),
    JwtModule
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
