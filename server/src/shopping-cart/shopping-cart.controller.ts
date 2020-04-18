import { Controller, Get, Request, BadRequestException, Post, Param,  } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCart } from './interfaces/shopping-cart.interface';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Get() 
  findMyCart(@Request() req): Promise<ShoppingCart> {
    let cartId: string;
    if (req.cartId) {
      cartId = req.cartId;
    } else if (req.cookies["mm-cartid"]) {
      cartId = req.cookies["mm-cartid"];
    } else {
      throw new BadRequestException("Unable to determine valid cart.")
    }
    return this.shoppingCartService.getCart(cartId);
  }

  @Post('update') 
  async update(@Param() params, @Request() req): Promise<ShoppingCart> {
     
  }
}
