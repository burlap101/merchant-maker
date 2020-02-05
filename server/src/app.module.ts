import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import config from './localconfig/keys';

@Module({
  imports: [MongooseModule.forRoot(config.mongoUri), ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
