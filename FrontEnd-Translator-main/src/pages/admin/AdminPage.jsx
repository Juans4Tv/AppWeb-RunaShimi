/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { Upload, FileText, Users, Trash2, Download, Plus, X } from 'lucide-react';

const API_URL = "http://localhost:4000/api";

const AdminPage = ({ isSidebarOpen, onToggleSidebar = () => {}, onLogout }) => {
  const [vistaActual, setVistaActual] = useState('diccionario');
  const [users, setUsers] = useState([]);
  const [translations, setTranslations] = useState([]);
  const [palabras, setPalabras] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
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

  const styles = {
    container: { display: 'flex', minHeight: '100vh', backgroundColor: '#F4E6D4' },
    main: { flex: 1, marginLeft: isSidebarOpen ? '15.625rem' : '3.75rem', padding: '2rem', overflowY: 'auto', transition: 'margin-left 0.3s ease' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    title: { fontSize: '2rem', color: '#5D4037', margin: 0 },
    btnVolver: { padding: '0.5rem 1rem', backgroundColor: '#C4451C', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' },
    tabs: { display: 'flex', gap: '1rem', marginBottom: '2rem' },
    tab: (active) => ({ padding: '0.75rem 1.5rem', backgroundColor: active ? '#5D4037' : 'white', color: active ? 'white' : '#5D4037', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 'bold' }),
    card: { backgroundColor: 'white', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1rem', boxShadow: '0 0.25rem 0.625rem rgba(0,0,0,0.1)' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid #5D4037', color: '#5D4037' },
    td: { padding: '0.75rem', borderBottom: '1px solid #ddd' },
    input: { padding: '0.5rem', border: '1px solid #ddd', borderRadius: '0.25rem', marginRight: '0.5rem' },
    uploadArea: { border: '2px dashed #5D4037', borderRadius: '1rem', padding: '2rem', textAlign: 'center', cursor: 'pointer', marginBottom: '1rem' },
    success: { color: 'green', marginBottom: '1rem' },
    error: { color: 'red', marginBottom: '1rem' },
    badge: (role) => ({ padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.8rem', backgroundColor: role === 'admin' ? '#C4451C' : '#4A7C59', color: 'white' })
  };

  const renderVista = () => {
    switch (vistaActual) {
      case 'diccionario':
        return (
          <div>
            <div style={styles.card}>
              <h3>Importar Diccionario (Excel)</h3>
              <p style={{color: '#666', marginBottom: '1rem'}}>El Excel debe tener columnas: source, target, language</p>
              <label style={styles.uploadArea, { display: 'block' }}>
                <input type="file" accept=".xlsx,.xls" onChange={handleUploadExcel} style={{display: 'none'}} />
                <Upload size={32} color="#5D4037" />
                <p>Click o arrastra archivo Excel</p>
              </label>
              {success && <p style={styles.success}>{success}</p>}
              {error && <p style={styles.error}>{error}</p>}
            </div>


            <div style={styles.card}>
              <h3>Palabras del Diccionario ({palabras.length})</h3>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Español</th>
                    <th style={styles.th}>Runa Shimi</th>
                    <th style={styles.th}>Idioma</th>
                    <th style={styles.th}>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {palabras.map((p, i) => (
                    <tr key={p._id || i}>
                      <td style={styles.td}>{p.source}</td>
                      <td style={styles.td}><b>{p.target}</b></td>
                      <td style={styles.td}>{p.language}</td>
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
          </div>
        );

      case 'usuarios':
        return (
          <div style={styles.card}>
            <h3>Usuarios Registrados ({users.length})</h3>
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
                {users.map((u, i) => (
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
        );

      case 'traducciones':
        return (
          <div style={styles.card}>
            <h3>Últimas Traducciones ({translations.length})</h3>
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
                {translations.map((t, i) => (
                  <tr key={t._id || i}>
                    <td style={styles.td}>{t.userId?.username || 'Usuario'}</td>
                    <td style={styles.td}>{t.input}</td>
                    <td style={styles.td}><b>{t.output}</b></td>
                    <td style={styles.td}>{new Date(t.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <Sidebar isOpen={isSidebarOpen} onToggle={onToggleSidebar} setVistaActual={setVistaActual} esAdmin={true} vistaActual={vistaActual} />
      <main style={styles.main}>
        <div style={styles.header}>
          <h1 style={styles.title}>Panel de Administrador</h1>
          <button style={styles.btnVolver} onClick={onLogout}>Cerrar Sesión</button>
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