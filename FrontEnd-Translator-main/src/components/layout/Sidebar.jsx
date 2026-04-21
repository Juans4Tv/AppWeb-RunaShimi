import React from 'react';
import { Languages, History, Search, BookOpen, Info, LogOut, Menu, FileText, Users, Download } from 'lucide-react';
import logo from '../../assets/logo.png'; 
import perfil from '../../assets/perfil.avif'; 

const Sidebar = ({ isOpen = true, onToggle = () => {}, onLogout, vistaActual = 'traductor', setVistaActual = null, esAdmin = false, isMobile }) => {
  
  const handleSetVista = (vista) => {
    if (setVistaActual) setVistaActual(vista);
  };

  const menuItems = esAdmin
    ? [
        { icon: <FileText size={20} />, text: 'Diccionario', vista: 'diccionario' },
        { icon: <Users size={20} />, text: 'Usuarios', vista: 'usuarios' },
        { icon: <Download size={20} />, text: 'Traducciones', vista: 'traducciones' },
      ]
    : [
        { icon: <Languages size={20} />, text: 'Traductor', vista: 'traductor' },
        { icon: <Search size={20} />, text: 'Frases Comunes', vista: 'frases' },
        { icon: <History size={20} />, text: 'Historial', vista: 'historial' },
        { icon: <BookOpen size={20} />, text: 'Diccionario', vista: 'diccionario' },
        { icon: <Info size={20} />, text: 'Acerca de Runa Shimi', vista: 'acerca' },
      ];

  const handleLogout = () => {
    // 1. Limpiar almacenamiento local
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // 2. Ejecutar la función onLogout que viene del padre (App.js)
    // Esto es vital para actualizar el estado de React
    if (onLogout) {
        onLogout();
    }
    
    // 3. Redirigir al login
    window.location.href = '/login';
  };

  const styles = {
    sidebar: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      boxSizing: 'border-box',
      backgroundColor: '#EBE0D0',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 1100,
      width: isOpen ? '15.625rem' : '3.75rem',
      maxWidth: '300px',
      transition: 'width 0.3s ease',
      padding: isOpen ? '1.5rem 1rem' : '1rem 0.5rem',
      boxShadow: '4px 0 15px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.8rem',
      marginBottom: '2rem',
      justifyContent: (!isOpen && !isMobile) ? 'center' : 'flex-start'
    },
    navItem: (active) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '0.8rem',
      cursor: 'pointer',
      fontWeight: '600',
      color: active ? '#bf360c' : '#5d4037',
      backgroundColor: active ? 'rgba(191, 54, 12, 0.1)' : 'transparent',
      borderRadius: '0.5rem',
      marginBottom: '0.2rem',
      whiteSpace: 'nowrap'
    }),
    navText: {
      opacity: isOpen ? 1 : 0,
      transition: 'opacity 0.2s',
      display: isOpen ? 'block' : 'none'
    },
    logoutContainer: {
      marginTop: 'auto',
      paddingTop: '1rem',
      paddingBottom: '0.5rem',
      borderTop: '1px solid rgba(93, 64, 55, 0.1)'
    },
    logoutBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '0.8rem',
      cursor: 'pointer',
      color: '#C4451C',
      fontWeight: '600',
      borderRadius: '0.5rem',
      justifyContent: isOpen ? 'flex-start' : 'center',
      transition: 'background-color 0.2s ease',
    }
  };

  return (
    <aside style={styles.sidebar}>
      <div style={styles.header}>
        <button onClick={onToggle} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <Menu size={24} color="#5D4037" />
        </button>
        {(isOpen || isMobile) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src={logo} alt="Logo Runa Shimi" style={{ width: '40px', height: 'auto' }} />
            <span style={{ fontWeight: '900', color: '#5d4037', letterSpacing: '1px' }}>RUNA SHIMI</span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          {(isOpen || isMobile) && (
            <>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '3px solid #5d4037', overflow: 'hidden' }}>
                  <img src={perfil} alt="Perfil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
              <p style={{ fontSize: '0.75rem', fontWeight: '800', color: '#2e1f1a', marginBottom: '1rem', paddingLeft: '0.5rem' }}>
                NAVEGACIÓN
              </p>
            </>
          )}

          {menuItems.map((item) => (
            <div
              key={item.vista}
              style={styles.navItem(vistaActual === item.vista)}
              onClick={() => handleSetVista(item.vista)}
            >
              {item.icon}
              {isOpen && <span style={styles.navText}>{item.text}</span>}
            </div>
          ))}
        </div>

        <div style={styles.logoutContainer}>
          <div style={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={20} />
            {isOpen && <span style={styles.navText}>Cerrar Sesión</span>}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;