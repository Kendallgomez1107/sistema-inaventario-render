// routes/movimientos_inventario.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Obtener todos los movimientos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM movimientos_inventario');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Crear un nuevo movimiento
router.post('/', async (req, res) => {
  const { id_producto, tipo, cantidad, descripcion } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO movimientos_inventario (id_producto, tipo, cantidad, descripcion) VALUES ($1, $2, $3, $4) RETURNING *',
      [id_producto, tipo, cantidad, descripcion]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;
