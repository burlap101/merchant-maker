import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';


@Module({
  imports: [
    MulterModule.register({
      dest: './media/'
    })
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService]
})
export class FileUploadModule {}
