import { Controller, Get, Request, BadRequestException, Post, Param, UseGuards, Delete, Body,  } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCart } from './interfaces/shopping-cart.interface';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ModifyCartQtyDto } from './dto/modify-cart-qty.dto';
import { OrdersService } from 'src/orders/orders.service';
import { Order } from 'src/orders/interfaces/order.interface';
import { CustomersService } from 'src/customers/customers.service';
import Stripe from 'stripe';


@Controller('api/shopping-cart')
export class ShoppingCartController {
  constructor(
    private readonly shoppingCartService: ShoppingCartService,
    private readonly jwtService: JwtService,
    private readonly ordersService: OrdersService,
    private readonly customersService: CustomersService
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

  @Post('modify-cart-qty')
  async modifyCart(@Request() req, @Body() modifyCartQtyDto: ModifyCartQtyDto): Promise<ShoppingCart> {
    return this.shoppingCartService.modifyItemInCart(
      req.cartid,
      modifyCartQtyDto.product,
      modifyCartQtyDto.qty
    );
  }

  @Get('secret')
  async createIntentAndRetrieveSecret(@Request() req): Promise<Object> {
    const cart = await this.shoppingCartService.getCart(req.cartid);
    const paymentIntent = await this.shoppingCartService.createPaymentIntent(cart.total, "aud");
    this.shoppingCartService.assignPaymentIntentToCart(cart._id, paymentIntent.id);
    let secretObj = {};
    secretObj["secret"] = paymentIntent.client_secret
    return secretObj;
  }

  /**
   * Accepts the webhook from Stripe after paymentintent complete.
   *  
   * */
  @Post('process-order')
  async processOrder(@Body() stripeEvent: Stripe.Event): Promise<Order | undefined> {
    if(stripeEvent.type === "payment_intent.succeeded"){
      const paymentIntentObject = <Stripe.PaymentIntent>stripeEvent.data.object;
      const cart = await this.shoppingCartService.getCartByPaymentIntent(paymentIntentObject.id);
      this.shoppingCartService.destroyCart(cart._id);
      const customer = await this.customersService.findOneByPaymentIntent(paymentIntentObject.id);
      return this.ordersService.processOrder({
        chargeId: paymentIntentObject.charges.data[0].id,
        receiptNo: paymentIntentObject.charges.data[0].receipt_number,
        processed: new Date(),
        receiptUrl: paymentIntentObject.charges.data[0].receipt_url,
        "cart": cart,
        "customer": customer 
      })
    } 
  }
}
