const { register, login } = require('../controllers/authController');
const User = require('../models/User');

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('Auth controller', () => {
  it('register crea usuario', async () => {
    const req = { body: { username: 'c1', password: 'p1' } };
    const res = mockRes();

    await register(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(201);
    const user = await User.findOne({ username: 'c1' });
    expect(user).toBeTruthy();
  });

  it('login retorna token', async () => {
    const req = { body: { username: 'c2', password: 'p2' } };
    const res = mockRes();

    await register(req, res, jest.fn());

    const resLogin = mockRes();
    await login(req, resLogin, jest.fn());

    expect(resLogin.json).toHaveBeenCalled();
    const payload = resLogin.json.mock.calls[0][0];
    expect(payload.token).toBeTruthy();
  });
});
