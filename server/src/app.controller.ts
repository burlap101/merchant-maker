import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('media/:imgId')
  getImage(@Param('imgId') imgId, @Res() res) {
    return res.sendFile(imgId, { root: './media' })
  }

  // @Get('image/:imgpath')
  // getImageFile(@Param('imgpath') image, @Res() res) {
  //   return res.sendFile(image, { root: './media' })
  // }
}
