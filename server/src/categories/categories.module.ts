import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategorySchema } from './schemas/category.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }])],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
