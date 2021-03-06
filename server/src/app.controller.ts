import { Controller, Get, Param, Res, UseGuards, Post, Request, Response, Render} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-location')
  getTestMessage(): string {
    return "This is a test message";
  }

  @Get('media/:imgId')
  getImage(@Param('imgId') imgId, @Res() res) {
    return res.sendFile(imgId, { root: './media' })
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Response() res) {
    let token = await this.authService.login(req.user);
    res.set("Set-cookie", "jwt=" + token + "; path=/; HttpOnly;")
    res.send({
      success: true,
      token
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('portal')
  @Render('portal')
  adminPortal(): Object {
    return { message: "hello there." };
  }

  @Get('portal/products')
  @Render ('portal')
  portalProducts() {
    return {};
  }

  @Get('portal/products/add')
  @Render('portal')
  portalAddProduct() {
    return {};
  }

  @Get('portal/products/edit/:id')
  @Render('portal')
  portalEditProduct() {
    return {};
  }

  @Get('portal/orders')
  @Render('portal')
  portalOrders() {
    return {};
  }

  @Get('portal/orders/edit/:id')
  @Render('portal')
  portalEditOrder() {
    return {};
  }

  @Get('portal/login')
  @Render('portal')
  portalLogin() {
    return {};
  }

  @Get('shopfront')
  @Render('shopfront')
  shopfront() {
    return {};
  }

  @Get('shopfront/overview')
  @Render('shopfront')
  shopfrontOverview() {
    return {};
  }

  @Get('cart')
  @Render('cart')
  cart() {
    return {}
  }

  @Get('cart/checkout')
  @Render('cart')
  cartCheckout() {
    return {}
  }

  @Get('cart/edit')
  @Render('cart')
  cartEdit() {
    return {}
  }

  @Get('cart/payment-success')
  @Render('cart')
  cartPaymentSuccess() {
    return {}
  }
}
