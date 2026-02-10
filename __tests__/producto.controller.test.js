const { crearProducto, obtenerProductos } = require('../controllers/productoController');

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('Producto controller', () => {
  it('crea y lista productos', async () => {
    const reqCrear = {
      body: { titulo: 'P1', descripcion: 'D1' },
      usuario: { username: 'tester' },
    };
    const resCrear = mockRes();

    await crearProducto(reqCrear, resCrear, jest.fn());
    expect(resCrear.status).toHaveBeenCalledWith(201);

    const reqListar = {};
    const resListar = mockRes();
    await obtenerProductos(reqListar, resListar, jest.fn());

    const payload = resListar.json.mock.calls[0][0];
    expect(payload.total).toBe(1);
  });
});
