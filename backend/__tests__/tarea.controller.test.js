const { crearTarea, obtenerTareas } = require('../controllers/tareaController');

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('Tarea controller', () => {
  it('crea y lista tareas', async () => {
    const reqCrear = {
      body: { titulo: 'X', descripcion: 'Y' },
      usuario: { username: 'tester' },
    };
    const resCrear = mockRes();

    await crearTarea(reqCrear, resCrear, jest.fn());
    expect(resCrear.status).toHaveBeenCalledWith(201);

    const reqListar = {};
    const resListar = mockRes();
    await obtenerTareas(reqListar, resListar, jest.fn());

    const payload = resListar.json.mock.calls[0][0];
    expect(payload.total).toBe(1);
  });
});
