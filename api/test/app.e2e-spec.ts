import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let currentUserId: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/auth/login (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'john', password: 'changeme' });

    accessToken = response.body.access_token;
    expect(response.statusCode).toEqual(201);
  });

  it('/auth/login (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'azim', password: 'changeme1' });

    expect(response.statusCode).toEqual(401);
  });

  it('/auth/profile (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth/profile')
      .set({ Authorization: `Bearer ${accessToken}` });

    currentUserId = response.body.userId;
    expect(response.statusCode).toEqual(200);
    expect(response.body.userId).toBeDefined();
  });

  it('/auth/profile (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/auth/profile');

    expect(response.statusCode).toEqual(401);
  });

  it('/user/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/user/${currentUserId}`)
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(response.statusCode).toEqual(200);
    expect(response.body.id).toEqual(currentUserId);
  });

  it('/user (POST)', async () => {
    const username = 'azim';
    const response = await request(app.getHttpServer())
      .post('/user')
      .send({ username, password: 'changeme' })
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(response.statusCode).toEqual(201);
    expect(response.body.id).toBeTruthy();
    expect(response.body.username).toEqual(username);
  });

  it('/user (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/user')
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
