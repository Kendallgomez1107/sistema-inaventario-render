const express = require('express');
const router = express.Router();
const pool = require('../db');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Obtener un usuario por su ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE id_usuario = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
  const { nombre, email, contraseña, rol } = req.body; // ✅ corregido aquí
  try {
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, email, contraseña, rol) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, email, contraseña, rol]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al crear usuario:', err.stack);
    res.status(500).send('Error del servidor');
  }
});

// Actualizar usuario
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, email, contraseña, rol } = req.body; // ✅ corregido aquí también
  try {
    const result = await pool.query(
      'UPDATE usuarios SET nombre = $1, email = $2, contraseña = $3, rol = $4 WHERE id_usuario = $5 RETURNING *',
      [nombre, email, contraseña, rol, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al actualizar usuario:', err.stack);
    res.status(500).send('Error del servidor');
  }
});

// Eliminar usuario
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *',
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;

    

