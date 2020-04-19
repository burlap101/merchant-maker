import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingCartSchema } from './schemas/shopping-cart.schema';
import { ShoppingCartMiddleware } from './middleware/shopping-cart.middleware';
import { JwtModule } from '@nestjs/jwt';
import keys from 'src/localconfig/keys';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ShoppingCart', schema: ShoppingCartSchema }]),
    JwtModule.register({
      secret: keys.cryptConsts.secret,
      signOptions: { expiresIn: '7d' },
    }),
    AuthModule
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
