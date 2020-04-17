import { Controller, Get } from '@nestjs/common';

@Controller('shopping-cart')
export class ShoppingCartController {

  @Get() 
  find():string {
    return "shopping cart returned";
  }
}
