"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const http_proxy_middleware_1 = require("http-proxy-middleware");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    app.use('/livekit-proxy', (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: process.env.LK_HOST || 'http://100.68.221.26:7880',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
            '^/livekit-proxy': '',
        },
        onProxyReqWs: (proxyReq, req, socket) => {
            console.log('🔌 WebSocket Proxy Connection:', req.url);
        },
        onError: (err, req, res) => {
            console.error('❌ Proxy Error:', err);
        }
    }));
    await app.listen(3000, '0.0.0.0');
}
void bootstrap();
//# sourceMappingURL=main.js.map