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
| GET    | `/productos`                 | Obtener todos los productos         |
| GET    | `/productos/:id`             | Obtener un producto por ID          |
| POST   | `/productos`                 | Crear un nuevo producto             |
| PUT    | `/productos/:id`             | Actualizar un producto existente    |
| DELETE | `/productos/:id`             | Eliminar un producto                |

---

### 🏷️ Categorías

| Método | Endpoint                     | Descripción                         |
|--------|------------------------------|-------------------------------------|
| GET    | `/categorias`                | Obtener todas las categorías        |
| GET    | `/categorias/:id`            | Obtener una categoría por ID        |
| POST   | `/categorias`                | Crear una nueva categoría           |
| PUT    | `/categorias/:id`            | Actualizar una categoría existente  |
| DELETE | `/categorias/:id`            | Eliminar una categoría              |

---

### 🏭 Proveedores

| Método | Endpoint                     | Descripción                         |
|--------|------------------------------|-------------------------------------|
| GET    | `/proveedores`               | Obtener todos los proveedores       |
| GET    | `/proveedores/:id`           | Obtener un proveedor por ID         |
| POST   | `/proveedores`               | Crear un nuevo proveedor            |
| PUT    | `/proveedores/:id`           | Actualizar un proveedor existente   |
| DELETE | `/proveedores/:id`           | Eliminar un proveedor               |

---

### 👤 Usuarios

| Método | Endpoint                     | Descripción                         |
|--------|------------------------------|-------------------------------------|
| GET    | `/usuarios`                  | Obtener todos los usuarios          |
| GET    | `/usuarios/:id`              | Obtener un usuario por ID           |
| POST   | `/usuarios`                  | Crear un nuevo usuario              |
| PUT    | `/usuarios/:id`              | Actualizar un usuario existente     |
| DELETE | `/usuarios/:id`              | Eliminar un usuario                 |

---

## 🚀 Despliegue

Esta API está desplegada en [Render](https://render.com). Puedes consumirla desde aplicaciones frontend o herramientas como Postman.

---

## 🧑‍💻 Autor

**Kendall Val Kilmer Gomez**  
Proyecto de gestión de inventario - 2025
