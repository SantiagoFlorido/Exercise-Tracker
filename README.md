# Exercise Tracker

This is the boilerplate for the Exercise Tracker project.  
Instructions for building your project can be found at:  
https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker

---

## 📌 API Endpoints

### 🌐 Rutas GET disponibles

---

### 1. Página principal

**`GET /`**  
Muestra el formulario HTML para crear usuarios y agregar ejercicios.

🔗 URL:  http://localhost:3000/

---

### 2. Documentación Swagger

**`GET /api/docs`**  
Interfaz visual para explorar y probar la API con Swagger UI.

🔗 URL:  http://localhost:3000/api/docs


---

### 3. Obtener todos los usuarios

**`GET /api/users`**  
Devuelve un array JSON con todos los usuarios registrados.

🔗 URL:  http://localhost:3000/api/users


🔗 Ejemplo sin filtros: http://localhost:3000/api/users/abc123/logs

🔗 Ejemplo con filtros: http://localhost:3000/api/users/abc123/logs?from=2024-01-01&to=2025-01-01&limit=5
 