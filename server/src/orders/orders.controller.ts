import { Controller, Post, Body, Request, Get, Response, HttpException } from '@nestjs/common';
import { Order } from './interfaces/order.interface';
import { OrdersService } from './orders.service';
import { ShoppingCartService } from 'src/shopping-cart/shopping-cart.service';
import { OpenOrderControllerDto } from './dto/open-order-controller.dto';
import { ProductsService } from 'src/products/products.service';
import Stripe from 'stripe';
import * as Express from 'express';


@Controller('api/orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly shoppingCartService: ShoppingCartService,
    private readonly productsService: ProductsService
  ) {}
  
  @Post('open')
  async openOrder(@Request() req, @Body() openOrderControllerDto: OpenOrderControllerDto): Promise<Order> {
    const cart = await this.shoppingCartService.getCart(req.cookies["mm-cartid"]);
    let openOrderDto = {
      "cart": cart,
      "customer": openOrderControllerDto.customer,
      "trainingSessions": (openOrderControllerDto.trainingSessions !== undefined) ? openOrderControllerDto.trainingSessions : [] 
    }
    return this.ordersService.openOrder(req.cookies["mm-orderid"], openOrderDto);
  }

  /**
   * Accepts the webhook from Stripe after paymentintent complete.
   *  
   * */
  @Post('process-order')
  async processOrder(@Body() stripeEvent: Stripe.Event): Promise<Order | undefined> {
    if(stripeEvent.type === "payment_intent.succeeded") {
      const paymentIntentObject = <Stripe.PaymentIntent>stripeEvent.data.object;
      const order = await this.ordersService.getOrder(paymentIntentObject.metadata["orderid"]);
      const cart = await this.shoppingCartService.destroyCart(order.cart._id);
      for (const item of cart.items) {
        let product = item.product;
        product.available -= item.qty;
        this.productsService.update(product._id, product);
      }
      return this.ordersService.processOrder(paymentIntentObject.metadata["orderid"], {
        chargeId: paymentIntentObject.charges.data[0].id,
        receiptNo: paymentIntentObject.charges.data[0].receipt_number,
        processed: new Date(),
        receiptUrl: paymentIntentObject.charges.data[0].receipt_url,
      })
    }
  }

  @Get('initialise')
  async initialise(@Request() req, @Response() res: Express.Response): Promise<void> {
    let orderId = undefined
    if(!req.cookies["mm-orderid"]) {
      let order = await this.ordersService.intitialiseOrder();
      res.cookie("mm-orderid", order._id, { httpOnly: true });
      orderId = order._id
    } else {
      orderId = req.cookies["mm-orderid"];
    }
    res.json(await this.ordersService.getOrder(orderId));
  }

  /**
   * The following is used to remove the cartid and orderid cookies after payment success received by the client.
   *  */ 
  @Get('deinitialise')
  async deinitialise(@Request() req, @Response() res: Express.Response): Promise<void> {
    res.clearCookie("mm-orderid", {httpOnly: false});
    res.clearCookie("mm-cartid", {httpOnly: false});

    res.status(200).json({ id: req.cookies["mm-orderid"]});
  }
  
}
