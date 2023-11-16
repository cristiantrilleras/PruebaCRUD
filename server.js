// server.js
const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tienda'
});

// Conectar a la base de datos MySQL
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos MySQL establecida');
});

// Crear la tabla de productos si no existe
// db.query(`
//   CREATE TABLE IF NOT EXISTS productos (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     nombre VARCHAR(255),
//     descripcion TEXT,
//     precio DECIMAL(10, 2),
//     stock INT
//   )
// `, (err) => {
//   if (err) {
//     console.error('Error al crear la tabla de productos:', err);
//   }
// });

// Endpoint para obtener la lista de productos
app.get('/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ productos: results });
  });
});

// Iniciar el servidor
const server = app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

module.exports = { app, server, db };   
