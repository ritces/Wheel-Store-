import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) { }

  @Post('/create-checkout-session')
  async createCheckoutSession(@Body() body: CreateCheckoutDto) {
    return await this.stripeService.createCheckoutSession(body);
  }

  @Get('/checkout-session/:sessionId')
  async getCheckoutSession(@Param('sessionId') sessionId: string) {
    return await this.stripeService.getCheckoutSession(sessionId);
  }
}