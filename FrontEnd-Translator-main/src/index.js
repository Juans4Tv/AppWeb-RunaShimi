// Importamos React
import React from 'react';

// Importamos ReactDOM para renderizar en el navegador
import ReactDOM from 'react-dom/client';

// Importamos el componente principal
import App from './App.jsx';

// Importamos estilos globales
import './styles/globals.css';

// Creamos la raíz de la aplicación en el div con id "root"
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizamos la app
root.render(
  <React.StrictMode> {/* Modo estricto para detectar errores */}
    <App /> {/* Componente principal */}
  </React.StrictMode>
);