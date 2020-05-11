import { Module } from '@nestjs/common';
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
import { OrdersModule } from './orders/orders.module';
import { CustomersModule } from './customers/customers.module';


@Module({
  imports: [
    MongooseModule.forRoot(config.mongoUri), 
    ProductsModule,
    FileUploadModule,
    CategoriesModule,
    AuthModule,
    UsersModule,
    ShoppingCartModule,
    OrdersModule,
    CustomersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
