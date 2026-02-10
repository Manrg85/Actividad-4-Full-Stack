const request = require('supertest');
const app = require('../app');

describe('Auth routes', () => {
  it('register -> login', async () => {
    const registerRes = await request(app)
      .post('/register')
      .send({ username: 'user1', password: 'pass123' });

    expect(registerRes.status).toBe(201);
    expect(registerRes.body.usuario.username).toBe('user1');

    const loginRes = await request(app)
      .post('/login')
      .send({ username: 'user1', password: 'pass123' });

    expect(loginRes.status).toBe(200);
    expect(loginRes.body.token).toBeTruthy();
  });

  it('login falla con credenciales invalidas', async () => {
    const loginRes = await request(app)
      .post('/login')
      .send({ username: 'nope', password: 'nope' });

    expect(loginRes.status).toBe(401);
  });
});
