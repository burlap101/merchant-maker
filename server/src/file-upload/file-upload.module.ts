import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import config from '../localconfig/keys';


@Module({
  imports: [
    MulterModule.register({
      dest: config.mediaDir
    })
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService]
})
export class FileUploadModule {}
