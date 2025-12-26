"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const fs = __importStar(require("fs"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
async function bootstrap() {
    let httpsOptions = undefined;
    if (fs.existsSync('./ssl/key.pem') && fs.existsSync('./ssl/cert.pem')) {
        httpsOptions = {
            key: fs.readFileSync('./ssl/key.pem'),
            cert: fs.readFileSync('./ssl/cert.pem'),
        };
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        httpsOptions,
    });
    const allowedOrigins = process.env.VITE_FRONTEND_URL?.split(',') || [
        'https://localhost:5173',
        'https://192.168.1.107:5173',
    ];
    app.enableCors({
        origin: allowedOrigins,
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