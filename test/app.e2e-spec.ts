import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../server/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/health (GET)', () => {
    it('should return health status', () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect((res: any) => {
          expect(res.body.status).toBe('healthy');
          expect(res.body.message).toBe('Sports t-shirts collection');
          expect(res.body.data).toBeDefined();
          expect(Array.isArray(res.body.data)).toBe(true);
          expect(res.body.count).toBe(6);
        });
    });

    it('should return sports tshirts with correct structure', () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect((res: any) => {
          const firstTshirt = res.body.data[0];
          expect(firstTshirt).toHaveProperty('id');
          expect(firstTshirt).toHaveProperty('name');
          expect(firstTshirt).toHaveProperty('category');
          expect(firstTshirt).toHaveProperty('price');
          expect(firstTshirt).toHaveProperty('color');
          expect(firstTshirt).toHaveProperty('material');
          expect(firstTshirt).toHaveProperty('features');
          expect(firstTshirt).toHaveProperty('inStock');
        });
    });
  });

  describe('/api/messages (GET)', () => {
    it('should return an array of messages', () => {
      return request(app.getHttpServer())
        .get('/api/messages')
        .expect(200)
        .expect((res: any) => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });
  });

  describe('/api/messages (POST)', () => {
    it('should create a new message', () => {
      const newMessage = { content: 'Test message from e2e' };

      return request(app.getHttpServer())
        .post('/api/messages')
        .send(newMessage)
        .expect(201)
        .expect((res: any) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.content).toBe(newMessage.content);
        });
    });

    it('should return 400 for invalid message', () => {
      const invalidMessage = { content: '' };

      return request(app.getHttpServer())
        .post('/api/messages')
        .send(invalidMessage)
        .expect(400);
    });

    it('should return 400 for missing content', () => {
      return request(app.getHttpServer())
        .post('/api/messages')
        .send({})
        .expect(400);
    });
  });
});
