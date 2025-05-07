// routes/proveedores.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Obtener todos los proveedores
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM proveedores');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Crear un nuevo proveedor
router.post('/', async (req, res) => {
  const { nombre, contacto, telefono, email, direccion } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO proveedores (nombre, contacto, telefono, email, direccion) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, contacto, telefono, email, direccion]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Actualizar proveedor
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, contacto, telefono, email, direccion } = req.body;
  try {
    const result = await pool.query(
      'UPDATE proveedores SET nombre = $1, contacto = $2, telefono = $3, email = $4, direccion = $5 WHERE id_proveedor = $6 RETURNING *',
      [nombre, contacto, telefono, email, direccion, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Eliminar proveedor
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM proveedores WHERE id_proveedor = $1 RETURNING *', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;

  
  