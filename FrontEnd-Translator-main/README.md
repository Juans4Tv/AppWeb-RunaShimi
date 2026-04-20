# Traductor Runa Shimi

Una aplicación web de traducción bidireccional entre español y Runa Shimi (Quichua) diseñada para la preservación cultural y lingüística.

## Caracteristicas Principales

- Traducción Bidireccional: Interfaz dedicada para conversión entre español y Runa Shimi con capacidad de intercambio de idiomas.
- Diccionario Cultural: Base de datos categorizada y buscable de términos quichua.
- Historial de Traducciones: Seguimiento de traducciones anteriores con paginación.
- Gestión de Sesión: Sistema de autenticación con login, registro y recuperación.
- Diseño Responsivo: Enfoque mobile-first con layouts adaptativos.

## Stack Tecnologico

| Tecnologia       | Versión | Propósito                                        |
| ---------------- | ------- | ------------------------------------------------ |
| React            | 19.2.4  | Biblioteca principal para la interfaz de usuario |
| React DOM        | 19.2.4  | Renderizado del DOM virtual                      |
| React Router DOM | 7.14.0  | Gestión de rutas y navegación                    |
| Tailwind CSS     | 3.4.0   | Framework de estilos utilitario                  |
| Lucide React     | 1.8.0   | Biblioteca de iconos                             |
| React Scripts    | 5.0.1   | Build tool y configuración del proyecto          |

### Herramientas de Desarrollo

| Herramienta  | Versión | Uso                         |
| ------------ | ------- | --------------------------- |
| PostCSS      | 8.5.8   | Procesamiento de CSS        |
| Autoprefixer | 10.4.27 | Prefijos automáticos de CSS |

### Testing

| Herramienta                | Versión | Propósito                         |
| -------------------------- | ------- | --------------------------------- |
| Testing Library DOM        | 10.4.1  | Utilidades para testing del DOM   |
| Testing Library Jest DOM   | 6.9.1   | Matchers personalizados para Jest |
| Testing Library React      | 16.3.2  | Testing de componentes React      |
| Testing Library User Event | 13.5.0  | Simulación de eventos de usuario  |

## Instalación

1. Clona el repositorio:
   git clone <repository-url>
   cd traductor

2. Instala dependencias:
   npm install

3. Inicia el servidor de desarrollo:
   npm start

4. Abre http://localhost:3000 en tu navegador.

## Uso

### Autenticación

Para acceder a la aplicación, utiliza las siguientes credenciales:

- Usuario: admin
- Contraseña: 1234

### Navegación

La aplicación utiliza un estado centralizado para gestionar la navegación entre vistas:

- Traductor: Interfaz principal de traducción bidireccional
- Frases Comunes: Colección de expresiones frecuentes
- Diccionario: Consulta de términos quichua
- Historial: Registro de traducciones anteriores
- Acerca: Información cultural del proyecto

## Estructura del Proyecto

```
src/
├── components/
│   ├── auth/
│   │   ├── Login.jsx          # Componente de inicio de sesión
│   │   └── Registrar.jsx      # Componente de registro
│   │
│   ├── layout/
│   │   └── Sidebar.jsx        # Barra de navegación lateral
│   │
│   └── translator/
│       ├── Traductor.jsx      # Interfaz principal de traducción
│       ├── Diccionario.jsx    # Diccionario de términos
│       ├── Historial.jsx      # Historial de traducciones
│       ├── FrasesComunes.jsx  # Frases comunes
│       └── Acerca.jsx         # Información sobre el proyecto
│
├── pages/
│   ├── AuthPage.jsx           # Página de autenticación
│   └── TranslatorPage.jsx     # Página principal del traductor
│
├── assets/                    # Recursos estáticos
│
└── App.jsx                    # Componente raíz
```

---

## Scripts Disponibles

* start: `react-scripts start`
  Inicia el servidor de desarrollo.

* build: `react-scripts build`
  Construye la versión de producción.

* test: `react-scripts test`
  Ejecuta las pruebas.

* eject: `react-scripts eject`
  Expone la configuración de build.

---

## Arquitectura

El proyecto utiliza una arquitectura SPA (Single Page Application) basada en React:

* Estado gestionado localmente con hooks de React.
* Enrutamiento del lado del cliente con React Router DOM.
* Estilos responsive con Tailwind CSS y PostCSS.
* Build optimizado con Create React App.

---

## Licencia

Este proyecto está bajo la Licencia MIT.
