import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { ShoppingCartService } from '../shopping-cart.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ShoppingCartMiddleware implements NestMiddleware {
  constructor(
    private readonly shoppingCartService: ShoppingCartService,
    private readonly jwtService: JwtService
  ) {}
  
  async use(req: Request, res: Response, next: () => void) {
    console.log("request received")
    if(!req.cookies['mm-cartid'] && !req.cookies['jwt']) {
      const newCart = await this.shoppingCartService.createEmptyCart();
      res.cookie("mm-cartid", newCart._id, { httpOnly: true });
      req.cartid = newCart._id;
    } else if (req.cookies['jwt'] && !req.cookies['mm-cartid']) {
      let userId = this.jwtService.decode(req.cookies['jwt'])["_id"];
      const newCart = await this.shoppingCartService.createUserCart(userId);
      res.cookie("mm-cartid", newCart._id, { httpOnly: true});
      req.cartid = newCart._id
    } else {
      req.cartid = req.cookies['mm-cartid'];
    }
    next();
  }
}
