import { Controller, Get, Request, BadRequestException, Post, Param, UseGuards, Delete, Body, Query,  } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCart } from './interfaces/shopping-cart.interface';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ModifyCartQtyDto } from './dto/modify-cart-qty.dto';
import { Product } from 'src/products/interfaces/product.interface';
import { TrainingSession } from './interfaces/training-session.interface';


@Controller('api/shopping-cart')
export class ShoppingCartController {
  constructor(
    private readonly shoppingCartService: ShoppingCartService,
    private readonly jwtService: JwtService,
  ) {}

  @Get() 
  findMyCart(@Request() req): Promise<ShoppingCart> {
    let cartId: string;
    if(req.cartid) {
      cartId = req.cartid;
    } else {
      throw new BadRequestException("Unable to determine valid cart.")
    }
    return this.shoppingCartService.getCart(cartId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('assign-user-to-cart') 
  async assignUserToCart(@Request() req): Promise<ShoppingCart> {
    let username = await this.jwtService.decode(req.cookies['jwt'])['username'];
    return this.shoppingCartService.assignUserToCart(req.cartid, username);
  }

  @Roles('superuser', 'admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('delete/:id')
  async deleteOneById(@Param() params): Promise<ShoppingCart> {
    return this.shoppingCartService.destroyCart(params.id);
  }

  @Post('add-to-cart')
  async addToCart(@Request() req, @Body() addToCartDto: AddToCartDto): Promise<ShoppingCart> {
    return this.shoppingCartService.addItemToCart(
      req.cartid,
      addToCartDto.product,
      addToCartDto.qty
    );
  }

  @Post('add-ts-to-cart')
  async addTsToCart(@Request() req, @Body() trainingSession: TrainingSession): Promise<ShoppingCart> {
    return this.shoppingCartService.addTsItemToCart(
      req.cartid,
      trainingSession
    )
  }

  @Post('modify-cart-qty')
  async modifyCart(@Request() req, @Body() modifyCartQtyDto: ModifyCartQtyDto): Promise<ShoppingCart> {
    return this.shoppingCartService.modifyItemInCart(
      req.cartid,
      modifyCartQtyDto.product,
      modifyCartQtyDto.qty
    );
  }

  @Post('modify-ts-cart-qty')
  async modifyTsCart(@Request() req, @Body() trainingSession: TrainingSession): Promise<ShoppingCart> {
    return this.shoppingCartService.modifyTsItemInCart(
      req.cartid,
      trainingSession
    )
  }

  @Get('secret')
  async createIntentAndRetrieveSecret(@Request() req, @Query() q): Promise<Object> {
    const cart = await this.shoppingCartService.getCart(req.cartid);
    let tsTotal = 0;
    if (q.tsval !== undefined) {
      tsTotal += q.tsval
    }
    console.log(tsTotal);
    const paymentIntent = await this.shoppingCartService.createPaymentIntent((cart.total + tsTotal), "aud", {"orderid": req.cookies["mm-orderid"]});
    this.shoppingCartService.assignPaymentIntentToCart(req.cartid, paymentIntent.id);
    let secretObj = {};
    secretObj["secret"] = paymentIntent.client_secret
    return secretObj;
  }

  // @Get('secretbyval')
  // async createIntentAndRetrieveSecretWithValue(@Request() req, @Query() q): Promise<Object> {
  //   if (q.val === undefined) {
  //     throw Error()
  //   }
  //   const paymentIntent = await this.shoppingCartService.createPaymentIntent((q.val/100), "aud", {"orderid": req.cookies["mm-orderid"]});
  //   let secretObj = {};
  //   secretObj["secret"] = paymentIntent.client_secret;
  //   return secretObj;
  // }

  @Post('remove-item')
  async removeItemFromCart(@Request() req, @Body() product: Product): Promise<ShoppingCart> {
    return this.shoppingCartService.removeItemFromCart(req.cartid, product);
  }

  @Post('remove-ts-item')
  async removeTsItemFromCart(@Request() req, @Body() trainingSession: TrainingSession): Promise<ShoppingCart> {
    return this.shoppingCartService.removeTsItemFromCart(req.cartid, trainingSession);
  }

}
