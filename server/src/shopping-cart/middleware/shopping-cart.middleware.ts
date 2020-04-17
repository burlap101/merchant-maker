import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { ShoppingCartService } from '../shopping-cart.service';

@Injectable()
export class ShoppingCartMiddleware implements NestMiddleware {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}
  
  async use(req: Request, res: Response, next: () => void) {
    if(!req.cookies['mm-cartid'] && !req.cookies['jwt']) {
      const newCart = await this.shoppingCartService.createEmptyCart();
      res.cookie("mm-cartid", newCart._id, { httpOnly: true });
      req.cartid = newCart._id;
    } else if (req.cookies['jwt']) {
      
    }
    next();
  }
}
