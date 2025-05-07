// Variables globales
let productosData = [];
let categoriasData = [];
let productosFiltrados = [];

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  inicializarAplicacion();
});

// Función principal de inicialización
async function inicializarAplicacion() {
  try {
    await cargarDatosIniciales();
    configurarEventListeners();
    mostrarProductos(productosData);
  } catch (error) {
    mostrarError("Error al inicializar la aplicación", error);
  }
}

// Cargar todos los datos necesarios
async function cargarDatosIniciales() {
  try {
    const [productos, categorias] = await Promise.all([
      fetchData('productos'),
      fetchData('categorias')
    ]);
    
    productosData = productos;
    categoriasData = categorias;
    productosFiltrados = [...productosData];
    
    cargarSelectCategorias();
  } catch (error) {
    mostrarError("Error al cargar datos iniciales", error);
    throw error;
  }
}

// Función genérica para fetch
async function fetchData(endpoint) {
  try {
    const response = await fetch(`http://localhost:3000/api/${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error al cargar ${endpoint}:`, error);
    mostrarError(`Error al cargar ${endpoint}`, error);
    return [];
  }
}

// Configurar todos los event listeners
function configurarEventListeners() {
  const buscador = document.getElementById('buscador');
  const selectCategoria = document.getElementById('categoria');
  
  // Debounce para el buscador (mejor performance)
  buscador.addEventListener('input', debounce(filtrarProductos, 300));
  selectCategoria.addEventListener('change', filtrarProductos);
}

// Mostrar productos en el DOM
function mostrarProductos(productos) {
  const contenedor = document.getElementById('productos');
  
  // Mostrar mensaje si no hay productos
  if (!productos || productos.length === 0) {
    contenedor.innerHTML = '<div class="no-result">No se encontraron productos</div>';
    return;
  }
  
  contenedor.innerHTML = productos.map(producto => crearCardProducto(producto)).join('');
}

// Crear HTML para cada producto
function crearCardProducto(producto) {
  const categoria = categoriasData.find(c => c.id_categoria === producto.id_categoria);
  
  return `
    <div class="card" data-id="${producto.id_producto}">
      <div class="card-header">
        <h2>${producto.nombre}</h2>
        ${categoria ? `<span class="categoria-badge">${categoria.nombre}</span>` : ''}
      </div>
      <div class="card-body">
        <p class="descripcion">${producto.descripcion || 'Sin descripción'}</p>
        <div class="producto-info">
          <p class="precio">$${formatearPrecio(producto.precio_venta)}</p>
          <p class="stock">Stock: ${producto.stock_actual || 0}</p>
        </div>
      </div>
      <div class="card-footer">
        <button class="btn-detalle" onclick="verDetalle(${producto.id_producto})">
          Ver detalles
        </button>
      </div>
    </div>
  `;
}

// Cargar opciones en el select de categorías
function cargarSelectCategorias() {
  const select = document.getElementById('categoria');
  select.innerHTML = '';
  
  // Opción por defecto
  const opcionTodas = document.createElement('option');
  opcionTodas.value = "";
  opcionTodas.textContent = "Todas las categorías";
  select.appendChild(opcionTodas);
  
  // Ordenar categorías alfabéticamente
  categoriasData.sort((a, b) => a.nombre.localeCompare(b.nombre));
  
  // Agregar categorías
  categoriasData.forEach(categoria => {
    const option = document.createElement('option');
    option.value = categoria.id_categoria;
    option.textContent = categoria.nombre;
    select.appendChild(option);
  });
}

// Filtrar productos según búsqueda y categoría
function filtrarProductos() {
  const texto = document.getElementById('buscador').value.toLowerCase();
  const categoriaId = document.getElementById('categoria').value;
  
  productosFiltrados = productosData.filter(producto => {
    const coincideTexto = producto.nombre.toLowerCase().includes(texto) || 
                         (producto.descripcion && producto.descripcion.toLowerCase().includes(texto));
    
    const coincideCategoria = !categoriaId || producto.id_categoria == categoriaId;
    
    return coincideTexto && coincideCategoria;
  });
  
  mostrarProductos(productosFiltrados);
}

// Mostrar detalles del producto en un modal
function verDetalle(id) {
  const producto = productosData.find(p => p.id_producto === id);
  const categoria = categoriasData.find(c => c.id_categoria === producto.id_categoria);
  
  if (!producto) return;
  
  // Crear modal con los detalles
  const modalHTML = `
    <div class="modal-detalle">
      <div class="modal-content">
        <span class="close-modal" onclick="cerrarModal()">&times;</span>
        <h2>${producto.nombre}</h2>
        ${categoria ? `<p class="categoria">Categoría: ${categoria.nombre}</p>` : ''}
        <p class="descripcion">${producto.descripcion || 'Sin descripción'}</p>
        <div class="detalles">
          <p><strong>Precio:</strong> $${formatearPrecio(producto.precio_venta)}</p>
          <p><strong>Stock disponible:</strong> ${producto.stock_actual || 0}</p>
          ${producto.codigo ? `<p><strong>Código:</strong> ${producto.codigo}</p>` : ''}
        </div>
      </div>
    </div>
  `;
  
  // Mostrar modal
  const modalContainer = document.createElement('div');
  modalContainer.id = 'modal-container';
  modalContainer.innerHTML = modalHTML;
  document.body.appendChild(modalContainer);
  document.body.style.overflow = 'hidden';
}

// Cerrar modal
function cerrarModal() {
  const modal = document.getElementById('modal-container');
  if (modal) {
    modal.remove();
    document.body.style.overflow = '';
  }
}

// Helper para formatear precios
function formatearPrecio(precio) {
  const numero = parseFloat(precio);
  return isNaN(numero) ? '0.00' : numero.toFixed(2);
}

// Helper para debounce
function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

// Mostrar errores en la interfaz
function mostrarError(mensaje, error) {
  console.error(mensaje, error);
  
  const errorContainer = document.createElement('div');
  errorContainer.className = 'error-message';
  errorContainer.innerHTML = `
    <p>${mensaje}</p>
    ${error.message ? `<small>${error.message}</small>` : ''}
  `;
  
  const main = document.querySelector('main');
  main.prepend(errorContainer);
  
  // Eliminar después de 5 segundos
  setTimeout(() => errorContainer.remove(), 5000);
}