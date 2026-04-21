import React from 'react';
import { Languages, History, Search, BookOpen, Info, LogOut, Menu, Settings, FileText, Users, Download } from 'lucide-react';

const Sidebar = ({ isOpen = true, onToggle = () => {}, onLogout = () => {}, vistaActual = 'traductor', setVistaActual = null, esAdmin = false }) => {
  const handleSetVista = (vista) => {
    if (setVistaActual) {
      setVistaActual(vista);
    }
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
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (onLogout) onLogout();
  };
//estilos
  const styles = {
    sidebar: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
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
      justifyContent: isOpen ? 'flex-start' : 'center'
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
      transition: 'opacity 0.2s'
    },
    logoutBtn: {
      marginTop: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '0.8rem',
      cursor: 'pointer',
      color: '#C4451C',
      borderRadius: '0.5rem',
      justifyContent: isOpen ? 'flex-start' : 'center'
    }
  };

  return (
    <aside style={styles.sidebar}>
      <div style={styles.header}>
        <button onClick={onToggle} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <Menu size={24} color="#5D4037" />
        </button>
        {isOpen && <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#5D4037' }}>RunaShimi</span>}
      </div>

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

      <div style={styles.logoutBtn} onClick={handleLogout}>
        <LogOut size={20} />
        {isOpen && <span style={styles.navText}>Cerrar Sesión</span>}
      </div>
    </aside>
  );
};

export default Sidebar;