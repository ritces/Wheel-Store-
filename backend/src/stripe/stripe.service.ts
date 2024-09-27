import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(@Inject('STRIPE_API_KEY') private readonly apiKey: string) {
    this.stripe = new Stripe(this.apiKey, {
    });
  }

  async createCheckoutSession(data: any): Promise<Stripe.Checkout.Session> {

    const items = data.map((item: any) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: Number(item.totalPrice * 100),
        },
        quantity: 1,
      };
    });

    const session = await this.stripe.checkout.sessions.create({
      success_url: `${process.env.URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL}/`,
      line_items: items,
      mode: 'payment',
    });

    return session;
  }
  async getCheckoutSession(sessionId: string) {
    const session = await this.stripe.checkout.sessions.listLineItems(sessionId);
    return session;
  }
}