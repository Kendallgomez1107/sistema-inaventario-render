require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Importación de rutas
const authRoutes = require('./routes/auth');
const proveedoresRouter = require('./routes/proveedores');
const productosRouter = require('./routes/productos');
const categoriasRouter = require('./routes/categorias');
const movimientosRouter = require('./routes/movimientos_inventario');
const ventasRouter = require('./routes/ventas');
const detallesVentaRouter = require('./routes/detalles_venta');
const configuracionRouter = require('./routes/configuracion');
const usuariosRouter = require('./routes/usuarios');

// Configuración mejorada de CORS
const corsOptions = {
  origin: [
    'http://127.0.0.1:5500', 
    'http://localhost:5500',
    'https://sistema-inaventario-render.onrender.com' // Reemplaza con tu dominio en producción
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middlewares
app.use(cors(corsOptions)); // Usa la configuración personalizada
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Manejo de preflight requests
app.options('*', cors(corsOptions));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando correctamente!');
});

// Rutas de la API
app.use('/api', authRoutes);
app.use('/api/proveedores', proveedoresRouter);
app.use('/api/categorias', categoriasRouter);
app.use('/api/productos', productosRouter);
app.use('/api/movimientos', movimientosRouter);
app.use('/api/ventas', ventasRouter);
app.use('/api/detalles_venta', detallesVentaRouter);
app.use('/api/configuracion', configuracionRouter);
app.use('/api/usuarios', usuariosRouter);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
