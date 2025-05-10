const express = require('express');
const router = express.Router();
const pool = require('../db');

// Listar productos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// ✅ Obtener un solo producto por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM productos WHERE id_producto = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});

// Crear producto
router.post('/', async (req, res) => {
  try {
    const {
      nombre, descripcion, id_categoria, id_proveedor,
      precio_compra, precio_venta, stock_actual, stock_minimo,
      codigo_barras, estado
    } = req.body;

    // Validación básica
    if (!nombre || !precio_venta || isNaN(precio_venta)) {
      return res.status(400).json({ error: 'Nombre y precio_venta son obligatorios y deben ser válidos.' });
    }

    const result = await pool.query(
      `INSERT INTO productos 
      (nombre, descripcion, id_categoria, id_proveedor, precio_compra, precio_venta, stock_actual, stock_minimo, codigo_barras, estado)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [nombre, descripcion, id_categoria, id_proveedor, precio_compra, precio_venta, stock_actual, stock_minimo, codigo_barras, estado]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

// Actualizar producto
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    nombre, descripcion, id_categoria, id_proveedor,
    precio_compra, precio_venta, stock_actual, stock_minimo,
    codigo_barras, estado
  } = req.body;

  try {
    if (!nombre || !precio_venta || isNaN(precio_venta)) {
      return res.status(400).json({ error: 'Nombre y precio_venta son obligatorios y deben ser válidos.' });
    }

    const result = await pool.query(
      `UPDATE productos SET
      nombre=$1, descripcion=$2, id_categoria=$3, id_proveedor=$4,
      precio_compra=$5, precio_venta=$6, stock_actual=$7, stock_minimo=$8,
      codigo_barras=$9, estado=$10 WHERE id_producto=$11 RETURNING *`,
      [nombre, descripcion, id_categoria, id_proveedor, precio_compra, precio_venta, stock_actual, stock_minimo, codigo_barras, estado, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

// Eliminar producto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM productos WHERE id_producto = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

module.exports = router;
