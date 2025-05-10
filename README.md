# 📦 Sistema de Inventario - API

Esta es una API RESTful desarrollada para gestionar un sistema de inventario. Permite administrar productos, categorías, proveedores y usuarios. Está construida con Node.js y utiliza PostgreSQL como base de datos.

🌐 URL Base: `https://sistema-inaventario-render.onrender.com/api`

## 🔧 Tecnologías

- Node.js
- Express.js
- PostgreSQL
- Render (deployment)

---

## 📁 Endpoints

### 📦 Productos

| Método | Endpoint                     | Descripción                         |
|--------|------------------------------|-------------------------------------|
| GET    | `/api/productos`             | Obtener todos los productos         |
| GET    | `/api//productos/:id`        | Obtener un producto por ID          |
| POST   | `/api//productos`            | Crear un nuevo producto             |
| PUT    | `/api//productos/:id`        | Actualizar un producto existente    |
| DELETE | `/api//productos/:id`        | Eliminar un producto                |

---

### 🏷️ Categorías

| Método | Endpoint                     | Descripción                         |
|--------|------------------------------|-------------------------------------|
| GET    | `/api/categorias`            | Obtener todas las categorías        |
| GET    | `/api//categorias/:id`       | Obtener una categoría por ID        |
| POST   | `/api//categorias`           | Crear una nueva categoría           |
| PUT    | `/api//categorias/:id`       | Actualizar una categoría existente  |
| DELETE | `/api//categorias/:id`       | Eliminar una categoría              |

---

### 🏭 Proveedores

| Método | Endpoint                     | Descripción                         |
|--------|------------------------------|-------------------------------------|
| GET    | `/api/proveedores`           | Obtener todos los proveedores       |
| GET    | `/api//proveedores/:id`      | Obtener un proveedor por ID         |
| POST   | `/api//proveedores`          | Crear un nuevo proveedor            |
| PUT    | `/api//proveedores/:id`      | Actualizar un proveedor existente   |
| DELETE | `/api//proveedores/:id`      | Eliminar un proveedor               |

---

### 👤 Usuarios

| Método | Endpoint                     | Descripción                         |
|--------|------------------------------|-------------------------------------|
| GET    | `/api//usuarios`             | Obtener todos los usuarios          |
| GET    | `/api//usuarios/:id`         | Obtener un usuario por ID           |
| POST   | `/api//usuarios`             | Crear un nuevo usuario              |
| PUT    | `/api//usuarios/:id`         | Actualizar un usuario existente     |
| DELETE | /api/`/usuarios/:id`         | Eliminar un usuario                 |

---

## 🚀 Despliegue

Esta API está desplegada en [Render](https://render.com). Puedes consumirla desde aplicaciones frontend o herramientas como Postman.

---

## 🧑‍💻 Autor

**Kendall Val Kilmer Gomez**  
Proyecto de gestión de inventario - 2025
