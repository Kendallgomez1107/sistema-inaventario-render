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
    res.status(500).json({ error: 'Error al obtener productos', details: error.message });
  }
});

// Obtener un solo producto por ID
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
    res.status(500).json({ error: 'Error al obtener producto', details: error.message });
  }
});

// Crear producto (Versión mejorada)
router.post('/', async (req, res) => {
  try {
    const {
      nombre,
      descripcion = '',
      precio_venta,
      categoria_id,  // Aceptamos ambos nombres
      id_categoria = categoria_id, // Priorizamos id_categoria si viene
      id_proveedor = null,
      precio_compra = precio_venta * 0.8, // Precio calculado si no se especifica
      stock_actual = 0,
      stock_minimo = 5,
      codigo_barras = '',
      estado = 'activo'
    } = req.body;

    // Validación mejorada
    if (!nombre || !nombre.trim()) {
      return res.status(400).json({ error: 'El nombre del producto es obligatorio' });
    }

    if (!precio_venta || isNaN(precio_venta) || precio_venta <= 0) {
      return res.status(400).json({ error: 'El precio de venta debe ser un número positivo' });
    }

    if (!id_categoria) {
      return res.status(400).json({ error: 'La categoría es obligatoria' });
    }

    const result = await pool.query(
      `INSERT INTO productos 
      (nombre, descripcion, id_categoria, id_proveedor, precio_compra, precio_venta, stock_actual, stock_minimo, codigo_barras, estado)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        nombre.trim(),
        descripcion.trim(),
        id_categoria,
        id_proveedor,
        precio_compra,
        precio_venta,
        stock_actual,
        stock_minimo,
        codigo_barras,
        estado
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ 
      error: 'Error al crear producto',
      details: error.message,
      hint: 'Verifique que la categoría y proveedor existan en la base de datos'
    });
  }
});

// Actualizar producto (Versión mejorada)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const {
      nombre,
      descripcion,
      categoria_id,
      id_categoria = categoria_id,
      id_proveedor,
      precio_compra,
      precio_venta,
      stock_actual,
      stock_minimo,
      codigo_barras,
      estado
    } = req.body;

    // Validación mejorada
    if (!nombre || !nombre.trim()) {
      return res.status(400).json({ error: 'El nombre del producto es obligatorio' });
    }

    if (!precio_venta || isNaN(precio_venta) || precio_venta <= 0) {
      return res.status(400).json({ error: 'El precio de venta debe ser un número positivo' });
    }

    const result = await pool.query(
      `UPDATE productos SET
      nombre = $1, 
      descripcion = COALESCE($2, descripcion), 
      id_categoria = COALESCE($3, id_categoria), 
      id_proveedor = COALESCE($4, id_proveedor),
      precio_compra = COALESCE($5, precio_compra), 
      precio_venta = $6, 
      stock_actual = COALESCE($7, stock_actual), 
      stock_minimo = COALESCE($8, stock_minimo),
      codigo_barras = COALESCE($9, codigo_barras), 
      estado = COALESCE($10, estado) 
      WHERE id_producto = $11 
      RETURNING *`,
      [
        nombre.trim(),
        descripcion,
        id_categoria,
        id_proveedor,
        precio_compra,
        precio_venta,
        stock_actual,
        stock_minimo,
        codigo_barras,
        estado,
        id
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ 
      error: 'Error al actualizar producto',
      details: error.message 
    });
  }
});

// Eliminar producto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM productos WHERE id_producto = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ 
      message: 'Producto eliminado correctamente',
      deletedProduct: result.rows[0] 
    });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ 
      error: 'Error al eliminar producto',
      details: error.message,
      hint: 'Verifique que el producto no tenga relaciones con otras tablas'
    });
  }
});

module.exports = router;
