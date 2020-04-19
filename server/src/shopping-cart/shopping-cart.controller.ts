import { Controller, Get, Request, BadRequestException, Post, Param, UseGuards, Delete, Body,  } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCart } from './interfaces/shopping-cart.interface';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ModifyCartQtyDto } from './dto/modify-cart-qty.dto';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(
    private readonly shoppingCartService: ShoppingCartService,
    private readonly jwtService: JwtService
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
    console.log(req.cartid);
    return this.shoppingCartService.addItemToCart(
      req.cartid,
      addToCartDto.product,
      addToCartDto.qty
    );
  }

  @Post('modify-cart-qty')
  async modifyCart(@Request() req, @Body() modifyCartQtyDto: ModifyCartQtyDto): Promise<ShoppingCart> {
    return this.shoppingCartService.modifyItemInCart(
      req.cartid,
      modifyCartQtyDto.product,
      modifyCartQtyDto.qty
    );
  }
}
