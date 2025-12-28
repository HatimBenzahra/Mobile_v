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
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    let httpsOptions = undefined;
    if (fs.existsSync('./ssl/key.pem') && fs.existsSync('./ssl/cert.pem')) {
        httpsOptions = {
            key: fs.readFileSync('./ssl/key.pem'),
            cert: fs.readFileSync('./ssl/cert.pem'),
        };
        logger.log('🔒 SSL certificates found - Starting in HTTPS mode');
    }
    else {
        logger.log('🌐 No SSL certificates - Starting in HTTP mode');
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        httpsOptions,
    });
    const proxyLogger = new common_1.Logger('LiveKitProxy');
    app.use('/livekit-proxy', (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: process.env.LK_HOST || 'http://100.68.221.26:7880',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
            '^/livekit-proxy': '',
        },
        onProxyReqWs: (_proxyReq, req, _socket) => {
            proxyLogger.log(`🔌 WebSocket connection request: ${req.url}`);
            proxyLogger.log(`🎯 Target: ${process.env.LK_HOST || 'http://100.68.221.26:7880'}`);
            proxyLogger.debug(`📋 Headers: ${JSON.stringify(req.headers)}`);
        },
        onOpen: (_proxySocket) => {
            proxyLogger.log('✅ WebSocket connection opened to LiveKit');
        },
        onClose: (_res, _socket, _head) => {
            proxyLogger.log('🔌 WebSocket connection closed');
        },
        onError: (err, _req, _res) => {
            proxyLogger.error(`❌ Proxy Error: ${err.message}`);
            proxyLogger.error(`❌ Error stack: ${err.stack}`);
        }
    }));
    await app.listen(3000, '0.0.0.0');
}
void bootstrap();
//# sourceMappingURL=main.js.map