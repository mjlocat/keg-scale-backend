import request from 'supertest';
import startServer from '../server.js';

let server;

beforeAll(() => {
  // Start the server before running tests
  server = startServer();
});

afterAll((done) => {
  // Close the server after tests
  server.close(done);
});

describe('Server Tests', () => {
  test('GET / should return a welcome message', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello from the backend!');
  });

  test('GET /nonexistent should return 404', async () => {
    const response = await request(server).get('/nonexistent');
    expect(response.status).toBe(404);
  });

  test('Auth routes should be set', async () => {
    const response = await request(server).get('/auth'); // Assuming /auth is a route
    expect(response.status).not.toBe(404); // Replace with actual route tests
  });

  test('Config routes should be set', async () => {
    const response = await request(server).get('/config'); // Assuming /config is a route
    expect(response.status).not.toBe(404); // Replace with actual route tests
  });
});