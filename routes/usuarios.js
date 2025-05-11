// routes/usuarios.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt'); // AÑADIDO: Requerir bcrypt para hashing

// Obtener todos los usuarios (MODIFICADO: Excluir password en la respuesta)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT id_usuario, nombre, email, rol FROM usuarios'); // MODIFICADO
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Crear un nuevo usuario (COMPLETAMENTE MODIFICADO)
router.post('/', async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  // Validaciones básicas (AÑADIDO)
  if (!nombre || !email || !password || !rol) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    // Verificar si el email ya existe (AÑADIDO)
    const emailCheck = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Hash de la contraseña (AÑADIDO)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insertar el nuevo usuario (MODIFICADO)
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, $4) RETURNING id_usuario, nombre, email, rol', // MODIFICADO
      [nombre, email, hashedPassword, rol]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al crear usuario:', err.message); // MODIFICADO
    res.status(500).json({ 
      error: 'Error del servidor',
      details: err.message // AÑADIDO para debugging
    });
  }
});

// MANTENER ESTAS RUTAS SIN CAMBIOS (a menos que necesites hashear contraseñas en updates)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, email, password, rol } = req.body;
  
  try {
    // OPCIONAL: Si quieres actualizar contraseñas, añade hashing aquí
    let hashedPassword = password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const result = await pool.query(
      'UPDATE usuarios SET nombre = $1, email = $2, password = COALESCE($3, password), rol = $4 WHERE id_usuario = $5 RETURNING id_usuario, nombre, email, rol',
      [nombre, email, hashedPassword, rol, id]
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

// MANTENER ESTA RUTA SIN CAMBIOS
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM usuarios WHERE id_usuario = $1 RETURNING id_usuario, nombre, email', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;
