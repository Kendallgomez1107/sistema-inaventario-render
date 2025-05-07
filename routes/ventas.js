// routes/ventas.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Obtener todas las ventas
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ventas');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Crear una nueva venta
router.post('/', async (req, res) => {
  const { total, id_usuario } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO ventas (total, id_usuario) VALUES ($1, $2) RETURNING *',
      [total, id_usuario]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;
