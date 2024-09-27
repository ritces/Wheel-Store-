import { StripeService } from './stripe.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
export declare class StripeController {
    private stripeService;
    constructor(stripeService: StripeService);
    createCheckoutSession(body: CreateCheckoutDto): Promise<import("stripe").Stripe.Checkout.Session>;
    getCheckoutSession(sessionId: string): Promise<import("stripe").Stripe.Response<import("stripe").Stripe.ApiList<import("stripe").Stripe.LineItem>>>;
}
