const request = require('supertest');
const { expect } = require('chai');
const app = require('../../server/mockServer');

describe('API Test #2 — Create Item', function () {
  let token;

  before(async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'password123' });
    token = res.body.token;
  });

  it('should create item successfully', async () => {
    const res = await request(app)
      .post('/api/items')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Book', price: 12 });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.keys('id', 'name', 'price');
  });
});
