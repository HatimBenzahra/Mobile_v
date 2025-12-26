import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configuration CORS pour permettre les requêtes du front
  app.enableCors({
    origin: true, // Autorise toutes les origines en dev
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Proxy WebSocket pour LiveKit
  // Permet de convertir WSS (Front) -> WS (LiveKit)
  app.use(
    '/livekit-proxy',
    createProxyMiddleware({
      target: process.env.LK_HOST || 'http://100.68.221.26:7880', // URL du serveur LiveKit
      ws: true, // Active le support WebSocket
      changeOrigin: true,
      pathRewrite: {
        '^/livekit-proxy': '', // Enlever le préfixe lors du transfert
      },
      // @ts-ignore - Type mismatch in library but valid option
      onProxyReqWs: (proxyReq, req, socket) => {
         console.log('🔌 WebSocket Proxy Connection:', req.url);
      },
      onError: (err, req, res) => {
        console.error('❌ Proxy Error:', err);
      }
    }),
  );

  await app.listen(3000, '0.0.0.0');
}
void bootstrap();
