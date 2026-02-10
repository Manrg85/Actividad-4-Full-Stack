const request = require('supertest');
const app = require('../app');

async function obtenerToken() {
  await request(app).post('/register').send({ username: 'u1', password: 'p1' });
  const res = await request(app).post('/login').send({ username: 'u1', password: 'p1' });
  return res.body.token;
}

describe('Productos routes', () => {
  it('CRUD básico', async () => {
    const token = await obtenerToken();

    const crear = await request(app)
      .post('/productos')
      .set('Authorization', `Bearer ${token}`)
      .send({ titulo: 'T1', descripcion: 'D1' });

    expect(crear.status).toBe(201);
    const tareaId = crear.body.producto._id;

    const listar = await request(app)
      .get('/productos')
      .set('Authorization', `Bearer ${token}`);

    expect(listar.status).toBe(200);
    expect(listar.body.total).toBe(1);

    const actualizar = await request(app)
      .put(`/productos/${tareaId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ completada: true });

    expect(actualizar.status).toBe(200);
    expect(actualizar.body.producto.completada).toBe(true);

    const eliminar = await request(app)
      .delete(`/productos/${tareaId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(eliminar.status).toBe(200);
  });
});
