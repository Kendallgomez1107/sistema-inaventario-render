const express = require('express');
const router = express.Router();
const pool = require('../db');

// Listar productos
router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM productos');
  res.json(result.rows);
});

// Crear producto
router.post('/', async (req, res) => {
  const {
    nombre, descripcion, id_categoria, id_proveedor,
    precio_compra, precio_venta, stock_actual, stock_minimo,
    codigo_barras, estado
  } = req.body;

  const result = await pool.query(
    `INSERT INTO productos 
    (nombre, descripcion, id_categoria, id_proveedor, precio_compra, precio_venta, stock_actual, stock_minimo, codigo_barras, estado)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
    [nombre, descripcion, id_categoria, id_proveedor, precio_compra, precio_venta, stock_actual, stock_minimo, codigo_barras, estado]
  );

  res.json(result.rows[0]);
});

// Actualizar producto
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    nombre, descripcion, id_categoria, id_proveedor,
    precio_compra, precio_venta, stock_actual, stock_minimo,
    codigo_barras, estado
  } = req.body;

  const result = await pool.query(
    `UPDATE productos SET
    nombre=$1, descripcion=$2, id_categoria=$3, id_proveedor=$4,
    precio_compra=$5, precio_venta=$6, stock_actual=$7, stock_minimo=$8,
    codigo_barras=$9, estado=$10 WHERE id_producto=$11 RETURNING *`,
    [nombre, descripcion, id_categoria, id_proveedor, precio_compra, precio_venta, stock_actual, stock_minimo, codigo_barras, estado, id]
  );

  res.json(result.rows[0]);
});

// Eliminar producto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM productos WHERE id_producto = $1', [id]);
  res.sendStatus(204);
});

module.exports = router;
