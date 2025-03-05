"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const serverless_http_1 = __importDefault(require("serverless-http"));
let cachedServer;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    await app.init();
    const expressApp = app.getHttpAdapter().getInstance();
    return (0, serverless_http_1.default)(expressApp);
}
const handler = async (event, context) => {
    if (!cachedServer) {
        cachedServer = await bootstrap();
    }
    return cachedServer(event, context);
};
exports.handler = handler;
//# sourceMappingURL=main.js.map