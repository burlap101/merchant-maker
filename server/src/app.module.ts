import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import config from './localconfig/keys';
import { FileUploadModule } from './file-upload/file-upload.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { ShoppingCartMiddleware } from './shopping-cart/middleware/shopping-cart.middleware';
import { ShoppingCartController } from './shopping-cart/shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoUri), 
    ProductsModule,
    FileUploadModule,
    CategoriesModule,
    AuthModule,
    UsersModule,
    ShoppingCartModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ShoppingCartMiddleware)
      .forRoutes(ShoppingCartController);
  }
}
