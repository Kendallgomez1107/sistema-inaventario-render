require('dotenv').config();
const express = require('express');


const app = express();
const authRoutes = require('./routes/auth');
const proveedoresRouter = require('./routes/proveedores');
const productosRouter = require('./routes/productos');
const categoriasRouter = require('./routes/categorias');
const movimientosRouter = require('./routes/movimientos_inventario');
const ventasRouter = require('./routes/ventas');
const detallesVentaRouter = require('./routes/detalles_venta');
const configuracionRouter = require('./routes/configuracion');
const usuariosRouter = require('./routes/usuarios');
const cors = require('cors');


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Servidor funcionando correctamente!');
});

app.use('/api', authRoutes);
app.use('/api/proveedores', proveedoresRouter);
app.use('/api/categorias', categoriasRouter);
app.use('/api/productos', productosRouter);
app.use('/api/movimientos', movimientosRouter);
app.use('/api/ventas', ventasRouter);
app.use('/api/detalles_venta', detallesVentaRouter);
app.use('/api/configuracion', configuracionRouter);
app.use('/api/usuarios', usuariosRouter);



app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
});
