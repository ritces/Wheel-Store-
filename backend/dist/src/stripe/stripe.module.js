"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var StripeModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const stripe_controller_1 = require("./stripe.controller");
const stripe_service_1 = require("./stripe.service");
let StripeModule = StripeModule_1 = class StripeModule {
    static forRootAsync() {
        return {
            module: StripeModule_1,
            controllers: [stripe_controller_1.StripeController],
            imports: [config_1.ConfigModule.forRoot()],
            providers: [
                stripe_service_1.StripeService,
                {
                    provide: 'STRIPE_API_KEY',
                    useFactory: async (configService) => configService.get('STRIPE_API_KEY'),
                    inject: [config_1.ConfigService],
                },
            ],
        };
    }
};
exports.StripeModule = StripeModule;
exports.StripeModule = StripeModule = StripeModule_1 = __decorate([
    (0, common_1.Module)({})
], StripeModule);
//# sourceMappingURL=stripe.module.js.map