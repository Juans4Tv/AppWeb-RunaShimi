// Importamos React y los hooks necesarios
import React, { useState, useEffect } from 'react';

// Importamos los componentes que se mostrarán en la página
import Sidebar from '../components/layout/Sidebar';
import Traductor from '../components/translator/Traductor';
import Historial from '../components/translator/Historial';
import Diccionario from '../components/translator/Diccionario';
import FrasesComunes from '../components/translator/FrasesComunes';
import Acerca from '../components/translator/Acerca';


// Componente principal de la página del traductor
const TranslatorPage = ({ isSidebarOpen, onToggleSidebar, onLogout }) => {

  // Estado para controlar qué vista se está mostrando 
  const [vistaActual, setVistaActual] = useState('traductor');

  // Estado para detectar si el usuario está en un dispositivo móvil
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // useEffect para escuchar cambios en el tamaño de la pantalla
  useEffect(() => {

    // Función que actualiza el estado según el ancho de la ventana
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    // Agregamos el evento resize
    window.addEventListener('resize', handleResize);

    // Limpiamos el evento cuando el componente se desmonta
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Función que decide qué componente renderizar según la vista actual
  const renderVista = () => {
    switch (vistaActual) {

      case 'traductor':
        return <Traductor />;

      case 'frases':
        return <FrasesComunes />;

      case 'historial':
        return <Historial />;

      case 'diccionario':
        return <Diccionario />;

      case 'acerca':
        return <Acerca />;

      // Si no coincide con ningún caso, muestra el traductor por defecto
      default:
        return <Traductor />;
    }
  };

  // Renderizado principal del componente
  return (
    <div style={{ position: 'relative', display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#F4E6D4', overflow: 'hidden' }}>
      
      {/* Fondo oscuro cuando el sidebar está abierto en móvil */}
      {isMobile && isSidebarOpen && (
        <div 
          onClick={onToggleSidebar} // Al hacer clic, cierra el sidebar
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // Fondo semitransparente
            zIndex: 1000 
          }}
        />
      )}

      {/* Barra Lateral */}
      <Sidebar 
        isOpen={isSidebarOpen}          // Controla si está abierta o cerrada
        onToggle={onToggleSidebar}      // Función para abrir/cerrar
        onLogout={onLogout}             // Función para cerrar sesión
        vistaActual={vistaActual}       // Vista actual activa
        setVistaActual={setVistaActual}  // Función para cambiar de vista
      />

      {/* Contenedor Principal donde se muestran las vistas */}
      <div style={{
        flex: 1,
        position: 'relative',
        zIndex: 100,
        marginLeft: isMobile ? '0' : (isSidebarOpen ? '15.625rem' : '3.75rem'),
        transition: 'margin-left 0.3s ease',
        height: '100%',
        overflowY: 'auto',
        width: '100%'
      }}>
        
        {/* Botón de menú solo en móvil cuando el sidebar está cerrado */}
        {isMobile && !isSidebarOpen && (
          <button 
            onClick={onToggleSidebar} // Abre el sidebar
            style={{ position: 'absolute', top: '15px', left: '15px', zIndex: 900, background: 'none', border: 'none', cursor: 'pointer', color: '#5d4037' }}
          >
            {/* Icono de menú */}
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        )}

        {/* Espacio donde se renderizan las vistas seleccionadas */}
        <div style={{ padding: isMobile ? '4rem 1rem 1rem 1rem' : '2rem', maxWidth: '1000px', margin: '0 auto' }}>
          {renderVista()}
        </div>

      </div>
    </div>
  );
};

// Exportamos el componente para usarlo en otras partes
export default TranslatorPage;