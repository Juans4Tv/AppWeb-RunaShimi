# Traductor Runa Shimi 🌿

Aplicación web para traducir entre Español y Runa Shimi (Kichwa).

## Requisitos Previos

- **Node.js** (v18 o superior)
- **Python** (v3.10 o superior)
- **MongoDB** (local o Atlas)

## Instalación

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd RunaShimi
```

### 2. Instalar dependencias del Frontend
```bash
cd FrontEnd-Translator-main
npm install
```

### 3. Instalar dependencias del Backend
```bash
cd ../backend
npm install
```

### 4. (Opcional) Instalar Python
```bash
cd ../ia-service
pip install -r requirements.txt
```

## Configuración

### Variables de entorno

Crea un archivo `backend/.env`:
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/runashimi
JWT_SECRET=tu_secreto_aqui
```

### MongoDB

Puedes usar MongoDB local o [MongoDB Atlas](https://www.mongodb.com/atlas).

## Ejecución

Necesitas ejecutar **3 servicios** en terminalesseparadas:

### Terminal 1 - IA Service (Puerto 5001)
```bash
cd ia-service
python main.py
```

### Terminal 2 - Backend (Puerto 4000)
```bash
cd backend
node src/app.js
```

### Terminal 3 - Frontend (Puerto 3000)
```bash
cd FrontEnd-Translator-main
npm start
```

## Usuarios

Se crean automáticamente al iniciar el backend:

| Rol | Email | Contraseña |
|-----|-------|------------|
| Admin | admin@runashimi.com | admin123 |
| Cliente | user@runashimi.com | 1234 |

## Estructura

```
RunaShimi/
├── FrontEnd-Translator-main/  # React frontend
├── backend/                   # Express backend
│   └── src/
│       ├── controllers/       # Lógica de negocio
│       ├── models/           # Modelos MongoDB
│       ├── routes/           # Rutas API
│       └── services/         # Servicios externos
└── ia-service/              # Servicio Python de traducción
```

## Funcionalidades

- **Traductor:** Español ↔ Runa Shimi
- **Diccionario:** Ver palabras del diccionario
- **Historial:** Guardar traducciones (requiere login)
- **Panel Admin:** Importar diccionario desde Excel

## Importar Diccionario (Admin)

El Excel debe tener estas columnas:
| source | target | language |
|--------|--------|----------|
| Casa | Wasi | es-kic |
| Agua | Yaku | es-kic |
