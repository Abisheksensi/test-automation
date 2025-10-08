const request = require('supertest');
const { expect } = require('chai');
const app = require('../../server/mockServer');

describe('API Test #1 — Auth/Login', function () {
  it('should login successfully and return token', async function () {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'password123' });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });
});
