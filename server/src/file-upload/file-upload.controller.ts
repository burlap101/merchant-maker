import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, Res, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from './utils/file-upload.utils';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import config from '../localconfig/keys';


@Controller('file-upload')
export class FileUploadController {

  @Roles('admin', 'superuser')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('image')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: config.mediaDir,
      filename: editFileName
    })
  }))
  uploadFile(@UploadedFile() file) {
    return {
      fieldname: file.fieldname,
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      size: file.size,
      destination: file.destination,
      filename: file.filename,
      path: file.path
    }
  }
}
