// routes/detalles_venta.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Obtener todos los detalles de venta
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM detalles_venta');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Crear un nuevo detalle de venta
router.post('/', async (req, res) => {
  const { id_venta, id_producto, cantidad, precio_unitario, subtotal } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO detalles_venta (id_venta, id_producto, cantidad, precio_unitario, subtotal) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id_venta, id_producto, cantidad, precio_unitario, subtotal]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;
