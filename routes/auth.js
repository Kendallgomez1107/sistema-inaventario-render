const express = require('express');
const router = express.Router();

// Ruta de login temporal
router.post('/login', (req, res) => {
  res.json({ 
    token: 'token-temporario', 
    user: { id: 1, nombre: 'Admin', rol: 'admin' } 
  });
});

// Ruta de registro temporal
router.post('/register', (req, res) => {
  res.status(201).json({ id: 1, nombre: req.body.nombre, email: req.body.email });
});

module.exports = router;