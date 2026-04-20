// Importamos React 
import React from 'react';

// Importamos los componentes de autenticación
import Login from '../components/auth/Login';
import Registrar from '../components/auth/Registrar';
import Recuperar from '../components/auth/Recuperar';

// Componente principal de autenticación
// Recibe varias propiedades para controlar qué vista mostrar
const AuthPage = ({ currentView, onLoginSuccess, onGoToRegister, onGoToLogin, onGoToRecuperar }) => {

  // Usamos un switch para decidir qué componente renderizar
  // dependiendo del valor de currentView
  switch (currentView) {

    // Si currentView es 'register', mostramos el componente Registrar
    case 'register':
      return <Registrar onGoToLogin={onGoToLogin} />;

    // Si currentView es 'recuperar', mostramos el componente Recuperar
    case 'recuperar':
      return <Recuperar onGoToLogin={onGoToLogin} />;

    // En cualquier otro caso , mostramos el Login
    default:
      return (
        <Login 
          // Función que se ejecuta cuando el login es exitoso
          onLoginSuccess={onLoginSuccess}

          // Función para cambiar a la vista de registro
          onGoToRegister={onGoToRegister}

          // Función para cambiar a la vista de recuperar contraseña
          onGoToRecuperar={onGoToRecuperar}
        />
      );
  }
};

// Exportamos el componente 
export default AuthPage;