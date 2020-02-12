import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('file-upload')
export class FileUploadController {

  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@UploadedFile() file) {
    console.log(file);
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
