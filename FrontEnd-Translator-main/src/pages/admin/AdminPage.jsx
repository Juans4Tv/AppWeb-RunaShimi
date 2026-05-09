/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { Upload, FileText, Users, Trash2, Download, Search } from 'lucide-react';

const API_URL = "http://localhost:4000/api";

const AdminPage = ({ isSidebarOpen, onToggleSidebar = () => {}, onLogout }) => {
  const [vistaActual, setVistaActual] = useState('diccionario');
  const [users, setUsers] = useState([]);
  const [translations, setTranslations] = useState([]);
  const [palabras, setPalabras] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [busqueda, setBusqueda] = useState(""); 

  // PAGINACIÓN
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 5;

  // --- Lógica de Filtrado Dinámico ---
  const usuariosFiltrados = users.filter((u) =>
    u.username?.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.email?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const palabrasFiltradas = palabras.filter((p) =>
    p.source?.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.target?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const traduccionesFiltradas = translations.filter((t) =>
    t.input?.toLowerCase().includes(busqueda.toLowerCase()) ||
    t.output?.toLowerCase().includes(busqueda.toLowerCase()) ||
    t.userId?.username?.toLowerCase().includes(busqueda.toLowerCase())
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setBusqueda("");
    setPaginaActual(1); 

    if (vistaActual === 'usuarios') loadUsers();
    if (vistaActual === 'diccionario') loadDiccionario();
    if (vistaActual === 'traducciones') loadTranslations();
  }, [vistaActual]);

  const loadUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/admin/users`, {
        headers: { 'Authorization': token }
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError('Error al cargar usuarios');
    }
  };

  const loadDiccionario = async () => {
    try {
      const res = await fetch(`${API_URL}/dictionary`);
      const data = await res.json();
      setPalabras(data);
    } catch (err) {
      setError('Error al cargar diccionario');
    }
  };

  const loadTranslations = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/admin/translations`, {
        headers: { 'Authorization': token }
      });
      const data = await res.json();
      setTranslations(data);
    } catch (err) {
      setError('Error al cargar traducciones');
    }
  };

  const handleUploadExcel = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/admin/dictionary/upload`, {
        method: 'POST',
        headers: { 'Authorization': token },
        body: formData
      });
      const data = await res.json();
      if (data.imported) {
        setSuccess(`${data.imported} palabras importadas`);
        loadDiccionario();
      } else {
        setError(data.error || 'Error al importar');
      }
    } catch (err) {
      setError('Error al subir archivo');
    }
    setTimeout(() => { setSuccess(''); setError(''); }, 3000);
  };

  const handleDeletePalabra = async (id) => {
    if (!confirm('¿Eliminar palabra?')) return;
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_URL}/admin/dictionary/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': token }
      });
      loadDiccionario();
    } catch (err) {
      setError('Error al eliminar');
    }
  };

  const getPaginacion = (data) => {
    const ultimo = paginaActual * itemsPorPagina;
    const primero = ultimo - itemsPorPagina;

    return {
      itemsActuales: data.slice(primero, ultimo),
      totalPaginas: Math.ceil(data.length / itemsPorPagina)
    };
  };

  // --- ESTILOS RESPONSIVOS PARA CLAVAR EL DISEÑO ---
  const styles = {
    container: { display: 'flex', height: '100vh', backgroundColor: '#F4E6D4'},
    main: { flex: 1, marginLeft: isSidebarOpen ? (isMobile ? '0' : '15.625rem') : (isMobile ? '0' : '3.75rem'), padding: isMobile ? '1rem' : '2rem', overflowY: 'auto', transition: 'margin-left 0.3s ease' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    title: { fontSize: isMobile ? '1.5rem' : '2rem', color: '#5D4037', margin: 0, fontWeight: 'bold' },
    tabs: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' },
    tab: (active) => ({ padding: isMobile ? '0.5rem 1rem' : '0.75rem 1.5rem', backgroundColor: active ? '#5D4037' : 'white', color: active ? 'white' : '#5D4037', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: isMobile ? '0.9rem' : '1rem' }),
    card: { backgroundColor: 'white', borderRadius: '1rem', padding: isMobile ? '1rem' : '1.5rem', marginBottom: '1rem', boxShadow: '0 0.25rem 0.625rem rgba(0,0,0,0.1)' },
    cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' },
    table: { width: '100%', borderCollapse: 'collapse', minWidth: '600px' }, // Para evitar que se rompa en móvil
    th: { textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid #5D4037', color: '#5D4037' },
    td: { padding: '0.75rem', borderBottom: '1px solid #ddd' },
    searchContainer: { position: 'relative', display: 'flex', alignItems: 'center', width: isMobile ? '100%' : 'auto' },
    inputBusqueda: { padding: '0.6rem 1rem 0.6rem 2.5rem', border: '1px solid #D2B48C', borderRadius: '0.5rem', width: isMobile ? '100%' : '280px', outline: 'none', backgroundColor: '#FFFBF5', color: '#5D4037', boxSizing: 'border-box' },
    searchIcon: { position: 'absolute', left: '0.8rem', color: '#5D4037' },
    uploadArea: { border: '2px dashed #5D4037', borderRadius: '1rem', padding: '2rem', textAlign: 'center', cursor: 'pointer', marginBottom: '1rem' },
    badge: (role) => ({ padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.8rem', backgroundColor: role === 'admin' ? '#C4451C' : '#4A7C59', color: 'white' }),
    
    // --- NUEVOS ESTILOS EXACTOS DE PAGINACIÓN ---
   
paginationContainer: { 
  display: 'flex',
  alignItems: 'center', 
  justifyContent: 'center',
  gap: '1rem', 
  marginTop: '1.5rem',
  paddingBottom: '1rem'
},

pageButton: { 
  width: '2.2rem', 
  height: '2.2rem', 
  borderRadius: '50%', 
  border: 'none', 
  backgroundColor: '#F5F5F5', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center', 
  cursor: 'pointer', 
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)', // Sombra ligera
  color: '#5D4037',
  fontSize: '1rem', 
  fontWeight: 'bold',
  padding: 0
},

paginationTextContainer: {
  display: 'flex',
  alignItems: 'center',
  gap: '0.2rem' 
},

paginationNumber: { 
  fontSize: '1rem', 
  fontWeight: '700', 
  color: '#5D4037', 
  lineHeight: '1',
  margin: 0
},

paginationDots: {
  fontSize: '1rem',
  fontWeight: '700',
  color: '#5D4037',
  lineHeight: '1',
  letterSpacing: '0.05rem'
}
  };

  // --- RENDER EXACTO AL DE LA IMAGEN "1 ..." ---
  const renderPaginacion = (totalPaginas) => (
    <div style={styles.paginationContainer}>
      <button 
        onClick={() => setPaginaActual(paginaActual - 1)} 
        style={{...styles.pageButton, opacity: paginaActual === 1 ? 0.3 : 1, cursor: paginaActual === 1 ? 'default' : 'pointer'}}
        disabled={paginaActual === 1}
      >
        ‹
      </button>

      <div style={styles.paginationTextContainer}>
        <span style={styles.paginationNumber}>{paginaActual}</span>
        {totalPaginas > paginaActual && (
          <span style={styles.paginationDots}>...</span>
        )}
      </div>

      <button 
        onClick={() => setPaginaActual(paginaActual + 1)} 
        style={{...styles.pageButton, opacity: paginaActual === totalPaginas || totalPaginas === 0 ? 0.3 : 1, cursor: paginaActual === totalPaginas || totalPaginas === 0 ? 'default' : 'pointer'}}
        disabled={paginaActual === totalPaginas || totalPaginas === 0}
      >
        ›
      </button>
    </div>
  );

  const renderVista = () => {
    switch (vistaActual) {
      case 'diccionario':
        const paginacionPalabras = getPaginacion(palabrasFiltradas);
        return (
          <div>
            <div style={styles.card}>
              <h3>Importar Diccionario (Excel)</h3>
              <p style={{color: '#666', marginBottom: '1rem'}}>El Excel debe tener columnas: español | runa shimi | tipo de palabra</p>
              <label style={{ ...styles.uploadArea, display: 'block' }}>
                <input type="file" accept=".xlsx,.xls" onChange={handleUploadExcel} style={{display: 'none'}} />
                <Upload size={32} color="#5D4037" style={{margin: '0 auto'}} />
                <p>Click o arrastra archivo Excel</p>
              </label>
              {success && <p style={{color: 'green'}}>{success}</p>}
              {error && <p style={{color: 'red'}}>{error}</p>}
            </div>

            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={{margin: 0}}>Palabras ({palabrasFiltradas.length})</h3>
                <div style={styles.searchContainer}>
                  <Search size={18} style={styles.searchIcon} />
                  <input 
                    type="text" 
                    placeholder="Buscar palabra..." 
                    style={styles.inputBusqueda}
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                </div>
              </div>
              <div style={{overflowX: 'auto'}}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Español</th>
                      <th style={styles.th}>Runa Shimi</th>
                      <th style={styles.th}>Tipo</th>
                      <th style={styles.th}>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginacionPalabras.itemsActuales.map((p, i) => (
                      <tr key={p._id || i}>
                        <td style={styles.td}>{p.source}</td>
                        <td style={styles.td}><b>{p.target}</b></td>
                        <td style={styles.td}>{p.type || ''}</td>
                        <td style={styles.td}>
                          <button onClick={() => handleDeletePalabra(p._id)} style={{background: 'none', border: 'none', cursor: 'pointer', color: 'red'}}>
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {paginacionPalabras.totalPaginas > 0 && renderPaginacion(paginacionPalabras.totalPaginas)}
            </div>
          </div>
        );
      case 'usuarios':
        const paginacionUsuarios = getPaginacion(usuariosFiltrados);
        return (
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={{margin: 0}}>Usuarios ({usuariosFiltrados.length})</h3>
              <div style={styles.searchContainer}>
                <Search size={18} style={styles.searchIcon} />
                <input 
                  type="text" 
                  placeholder="Buscar nombre o email..." 
                  style={styles.inputBusqueda}
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
            </div>
            <div style={{overflowX: 'auto'}}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Usuario</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Rol</th>
                    <th style={styles.th}>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {paginacionUsuarios.itemsActuales.map((u, i) => (
                    <tr key={u._id || i}>
                      <td style={styles.td}>{u.username}</td>
                      <td style={styles.td}>{u.email}</td>
                      <td style={styles.td}><span style={styles.badge(u.role)}>{u.role}</span></td>
                      <td style={styles.td}>{new Date(u.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {paginacionUsuarios.totalPaginas > 0 && renderPaginacion(paginacionUsuarios.totalPaginas)}
          </div>
        );
      case 'traducciones':
        const paginacionTraducciones = getPaginacion(traduccionesFiltradas);
        return (
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={{margin: 0}}>Traducciones ({traduccionesFiltradas.length})</h3>
              <div style={styles.searchContainer}>
                <Search size={18} style={styles.searchIcon} />
                <input 
                  type="text" 
                  placeholder="Buscar texto o usuario..." 
                  style={styles.inputBusqueda}
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
            </div>
            <div style={{overflowX: 'auto'}}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Usuario</th>
                    <th style={styles.th}>Original</th>
                    <th style={styles.th}>Traducción</th>
                    <th style={styles.th}>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {paginacionTraducciones.itemsActuales.map((t, i) => (
                    <tr key={t._id || i}>
                      <td style={styles.td}>{t.userId?.username || 'Invitado'}</td>
                      <td style={styles.td}>{t.input}</td>
                      <td style={styles.td}><b>{t.output}</b></td>
                      <td style={styles.td}>{new Date(t.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {paginacionTraducciones.totalPaginas > 0 && renderPaginacion(paginacionTraducciones.totalPaginas)}
          </div>
        );
      default: return null;
    }
  };

  return (
    <div style={styles.container}>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={onToggleSidebar} 
        setVistaActual={setVistaActual} 
        esAdmin={true} 
        vistaActual={vistaActual}
        onLogout={onLogout}
      />
      <main style={styles.main}>
        <div style={styles.header}>
          <h1 style={styles.title}>Panel de Administrador</h1>
        </div>
        
        <div style={styles.tabs}>
          <button style={styles.tab(vistaActual === 'diccionario')} onClick={() => setVistaActual('diccionario')}>
            <FileText size={18} /> Diccionario
          </button>
          <button style={styles.tab(vistaActual === 'usuarios')} onClick={() => setVistaActual('usuarios')}>
            <Users size={18} /> Usuarios
          </button>
          <button style={styles.tab(vistaActual === 'traducciones')} onClick={() => setVistaActual('traducciones')}>
            <Download size={18} /> Traducciones
          </button>
        </div>

        {renderVista()}
      </main>
    </div>
  );
};

export default AdminPage;