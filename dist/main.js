"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = handler;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_express_1 = require("@nestjs/platform-express");
const express_1 = __importDefault(require("express"));
const serverless_http_1 = __importDefault(require("serverless-http"));
let cachedServer;
async function bootstrap() {
    const expressApp = (0, express_1.default)();
    expressApp.use(express_1.default.json({ limit: '10mb' }));
    expressApp.use(express_1.default.urlencoded({ extended: true }));
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
    app.enableCors();
    await app.init();
    console.log('App initialized:', app);
    cachedServer = (0, serverless_http_1.default)(expressApp, {
        request: (req) => {
            if (typeof req.body === 'string') {
                try {
                    req.body = JSON.parse(req.body);
                }
                catch (error) {
                    console.error('JSON parse error:', error);
                }
            }
        },
    });
}
async function handler(event, context) {
    if (!cachedServer) {
        await bootstrap();
    }
    if (event.body && typeof event.body === 'string') {
        try {
            event.body = JSON.parse(event.body);
        }
        catch (error) {
            console.error('Failed to parse event body:', error);
        }
    }
    return cachedServer(event, context);
}
//# sourceMappingURL=main.js.map