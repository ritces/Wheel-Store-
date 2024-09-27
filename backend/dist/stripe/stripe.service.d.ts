import Stripe from 'stripe';
export declare class StripeService {
    private readonly apiKey;
    private stripe;
    constructor(apiKey: string);
    createCheckoutSession(data: any): Promise<Stripe.Checkout.Session>;
    getCheckoutSession(sessionId: string): Promise<Stripe.Response<Stripe.ApiList<Stripe.LineItem>>>;
}
