"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = require("stripe");
let StripeService = class StripeService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.stripe = new stripe_1.default(this.apiKey, {});
    }
    async createCheckoutSession(data) {
        const items = data.map((item) => {
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
    async getCheckoutSession(sessionId) {
        const session = await this.stripe.checkout.sessions.listLineItems(sessionId);
        return session;
    }
};
exports.StripeService = StripeService;
exports.StripeService = StripeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('STRIPE_API_KEY')),
    __metadata("design:paramtypes", [String])
], StripeService);
//# sourceMappingURL=stripe.service.js.map