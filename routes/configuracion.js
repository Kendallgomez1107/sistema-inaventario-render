// routes/configuracion.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Obtener todas las configuraciones
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM configuracion');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Crear una nueva configuración
router.post('/', async (req, res) => {
  const { clave, valor, descripcion } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO configuracion (clave, valor, descripcion) VALUES ($1, $2, $3) RETURNING *',
      [clave, valor, descripcion]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;
