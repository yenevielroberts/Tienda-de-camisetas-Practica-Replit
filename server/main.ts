import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configurar CORS
  app.enableCors();

  // Configurar validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  // Configurar JSON parsing
  app.useBodyParser('json', { limit: '10mb' });
  app.useBodyParser('urlencoded', { limit: '10mb', extended: true });

  // Servir archivos estáticos en producción
  if (process.env.NODE_ENV === 'production') {
    const clientPath = join(__dirname, '..', 'client', 'dist');
    app.use(express.static(clientPath));
    
    // Servir index.html para todas las rutas que no sean API
    app.use((req: any, res: any, next: any) => {
      if (!req.path.startsWith('/api') && req.path !== '/health') {
        res.sendFile(join(clientPath, 'index.html'));
      } else {
        next();
      }
    });
  }

  // Logging middleware personalizado
  app.use((req: any, res: any, next: any) => {
    const start = Date.now();
    const path = req.path;

    res.on('finish', () => {
      const duration = Date.now() - start;
      if (path.startsWith('/api') || path === '/health') {
        const formattedTime = new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
        console.log(
          `${formattedTime} [nestjs] ${req.method} ${path} ${res.statusCode} in ${duration}ms`,
        );
      }
    });

    next();
  });

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  const port = parseInt(process.env.PORT || '5000', 10);

  await app.listen(port, '0.0.0.0', () => {
    const formattedTime = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
    console.log(`${formattedTime} [nestjs] Server running on port ${port}`);
  });
}

bootstrap();
