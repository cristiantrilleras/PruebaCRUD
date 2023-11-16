
// server.test.js
const request = require('supertest');
const { app, server, db } = require('../test/server.test.js');


describe('GET /productos', () => {
  test('debería devolver la lista de productos', async () => {
    // Insertar datos de prueba en la base de datos
    await db.run('INSERT INTO productos (id, nombre, descripcion, precio, stock) VALUES (?,?, ?, ?, ?)', ['8982','chocolate', '500gr', 10, 50]);

    // Realizar una solicitud HTTP GET a /productos
    const response = await request(app).get('/productos');

    // Verificar que la respuesta sea exitosa (código 200)
    expect(response.statusCode).toBe(200);

    // Verificar que la respuesta contenga la lista de productos
    expect(response.body.productos).toHaveLength(1);
    expect(response.body.productos[0].nombre).toBe('Producto1');
    // Agrega más expectativas según tus necesidades
  });
});
