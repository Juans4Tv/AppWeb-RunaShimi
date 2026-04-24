// Importamos React y los hooks necesarios
import React, { useState, useEffect } from "react";

// Importamos iconos para copiar y mostrar confirmación
import { Copy, Check } from 'lucide-react';

// Constantes para la API
const API_URL = "http://localhost:4000/api";

// Componente Historial
const Historial = () => {

  // Estado para detectar si el dispositivo es móvil
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Estado para el historial desde la base de datos
  const [historialData, setHistorialData] = useState([]);

  // Estado de carga
  const [loading, setLoading] = useState(true);

  // Estado de error
  const [error, setError] = useState('');

  // Detectar cambios en el tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cargar historial desde el backend
  const loadHistorial = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Inicia sesión para ver tu historial');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/history`, {
        headers: {
          'Authorization': token
        }
      });

      if (response.ok) {
        const data = await response.json();
        setHistorialData(data);
      } else {
        setError('Error al cargar historial');
      }
    } catch (err) {
      setError('No se pudo conectar al servidor');
    } finally {
      setLoading(false);
    }
  };

  // Cargar historial al iniciar
  useEffect(() => {
    loadHistorial();
  }, []);

  // Estado que contiene el historial de traducciones 
  const historial = historialData.length > 0 ? historialData : [
    { _id: 1, input: "Gracias", output: "Yupaychani", createdAt: "19 Mar, 10:30 AM" },
    { _id: 2, input: "Hola", output: "Imanalla", createdAt: "19 Mar, 11:00 AM" },
    { _id: 3, input: "tierra", output: "allpa", createdAt: "20 Mar, 10:00 AM" },
    { _id: 4, input: "Agua", output: "Yaku", createdAt: "21 Mar, 09:00 AM" },
    { _id: 5, input: "Sol", output: "Inti", createdAt: "21 Mar, 10:00 AM" },
    { _id: 6, input: "Luna", output: "Killa", createdAt: "22 Mar, 08:30 AM" },
  ];

  // --- Estado para saber que elemento se copio ---
  const [copiedId, setCopiedId] = useState(null);

  // --- LÓGICA DE PAGINACIÓN ---

  // Página actual
  const [paginaActual, setPaginaActual] = useState(1);

  // Cantidad de elementos por página
  const itemsPorPagina = 3;

  // Índices para cortar el array
  const ultimoIndice = paginaActual * itemsPorPagina;
  const primerIndice = ultimoIndice - itemsPorPagina;

  // Elementos que se muestran en la página actual
  const itemsActuales = historial.slice(primerIndice, ultimoIndice);

  // Total de páginas
  const totalPaginas = Math.ceil(historial.length / itemsPorPagina);

  // Ir a la siguiente página
  const irSiguiente = () => { 
    if (paginaActual < totalPaginas) 
      setPaginaActual(paginaActual + 1); 
  };

  // Ir a la página anterior
  const irAnterior = () => { 
    if (paginaActual > 1) 
      setPaginaActual(paginaActual - 1); 
  };

  // --- FUNCIÓN PARA COPIAR TEXTO ---
  const handleCopy = async (id, text) => {
    try {
      await navigator.clipboard.writeText(text); // Copia al portapapeles
      setCopiedId(id); // Marca el elemento como copiado

      // Después de 2 segundos vuelve al estado normal
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Error al copiar", err);
    }
  };

  // --- ESTILOS ---
  const styles = {

    // Contenedor principal adaptado para convivir con el menú lateral
    historialContainer: {
      width: '100%',
      // Limitamos el ancho en celular para forzar el centrado
      maxWidth: isMobile ? '20rem' : '50rem', 
      padding: isMobile ? '0 0.5rem' : '0',
      boxSizing: 'border-box',
      marginTop: '1.875rem',
      marginRight: 'auto',
      marginLeft: 'auto',
      position: 'relative', 
      zIndex: 1,
    },

    // Título
    header: {
      fontSize: isMobile ? '1.6rem' : '2rem', // Texto más pequeño en móvil
      color: '#5d4037',
      marginBottom: '1.25rem',
      textAlign: 'center',
    },

    // Mensaje de carga o error
    message: {
      textAlign: 'center',
      padding: '2rem',
      color: '#666',
    },

    // Botón de reintentar
    retryButton: {
      marginTop: '1rem',
      padding: '0.5rem 1rem',
      backgroundColor: '#C4451C',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      cursor: 'pointer',
    },

    // Tarjeta del historial
    cardHistorial: {
      backgroundColor: 'white',
      borderRadius: '0.9375rem',
      marginBottom: '1.25rem',
      overflow: 'hidden',
      boxShadow: '0 0.25rem 0.625rem rgba(0,0,0,0.1)',
    },

    // decoracion superior
    waveTop: {
      width: '100%',
      height: '1.25rem',
    },

    // SVG decorativo
    waveSvg: {
      width: '100%',
      height: '100%',
    },

    // Contenido interno de la tarjeta (Apilado en móvil)
    cardContent: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'flex-start' : 'center',
      justifyContent: 'space-between',
      padding: isMobile ? '0.8rem 1rem' : '0.625rem 0.9375rem',
      position: 'relative', // Crucial para posicionar el botón de copiar en móvil
      gap: isMobile ? '0.6rem' : '0',
    },

    // Sección izquierda de la fecha
    leftSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      minWidth: isMobile ? 'auto' : '8.125rem'
    },

    // Estilo de la fecha
    fecha: {
      fontSize: '0.75rem',
      color: '#444'
    },

    // Sección central del texto
    textSection: {
      flex: 1,
      width: '100%',
      fontSize: '0.8125rem',
      color: '#333'
    },

    // Botón de accion copiar (Flotante en móvil)
    actions: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: '#8e8e8e', 
      transition: '0.2s',
      padding: '5px',
      position: isMobile ? 'absolute' : 'static',
      top: isMobile ? '0.8rem' : 'auto',
      right: isMobile ? '1rem' : 'auto',
    },

    // Contenedor de paginación
    paginationContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.9375rem',
      marginTop: '1.25rem',
      paddingBottom: '1.875rem'
    },

    // Botones de paginación
    pageButton: {
      width: '2.1875rem',
      height: '2.1875rem',
      borderRadius: '50%',
      border: 'none',
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 0.125rem 0.3125rem rgba(0,0,0,0.1)',
      color: '#5b4d49',
      fontWeight: 'bold',
      transition: '0.3s'
    },

    // Texto de paginación
    pageInfo: {
      fontSize: '1.125rem',
      fontWeight: 'bold',
      color: '#5b4d49',
      letterSpacing: '0.125rem'
    }
  };

  // --- RENDERIZAMOS ---
  return (
    <div style={styles.historialContainer}>

      {/* Título */}
      <h1 style={styles.header}>
        Tu Historial de Traducciones <span>📚</span>
      </h1>

      {/* Mensaje de carga */}
      {loading && (
        <div style={styles.message}>
          <p>Cargando historial...</p>
        </div>
      )}

      {/* Mensaje de error */}
      {error && (
        <div style={styles.message}>
          <p>{error}</p>
          <button style={styles.retryButton} onClick={loadHistorial}>
            Reintentar
          </button>
        </div>
      )}

      {/* Tarjetas del historial */}
      {!loading && !error && itemsActuales.map((item, index) => (
        <div key={item._id || index} style={styles.cardHistorial}>

          {/* Barra decorativa superior */}
          <div style={{
            ...styles.waveTop,
            // Cambia el color según el índice de historial
            backgroundColor: 
              index % 3 === 0 ? '#C4451C' : 
              index % 3 === 1 ? '#4A7C59' : 
              '#5b4d49'
          }}>
            <svg viewBox="0 0 100 20" preserveAspectRatio="none" style={styles.waveSvg}>
              <path d="M0,10 C15,0 35,20 50,10 C65,0 85,20 100,10 V0 H0 Z" fill="white" />
            </svg>
          </div>

          {/* Contenido */}
          <div style={styles.cardContent}>

            {/* Fecha */}
            <div style={styles.leftSection}>
              <div>📅</div>
              <span style={styles.fecha}>
                {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}
              </span>
            </div>

            {/* Texto */}
            <div style={styles.textSection}>
              <p style={{ margin: '2px 0' }}>
                <strong>Español:</strong> {item.input}
              </p>
              <p style={{ margin: '2px 0' }}>
                <strong>Runa Shimi:</strong> {item.output}
              </p>
            </div>
            
            {/* Botón copiar */}
            <div 
              style={styles.actions} 
              onClick={() => handleCopy(item._id || index, item.output)}
              title="Copiar traducción"
            >
              {copiedId === (item._id || index) 
                ? <Check size={18} color="#4A7C59" /> 
                : <Copy size={18} />
              }
            </div>
          </div>
        </div>
      ))}

      {/* Paginación */}
      {!loading && !error && totalPaginas > 1 && (
        <div style={styles.paginationContainer}>
          {/* Botón para ir a la página anterior */}
          <button 
            onClick={irAnterior} 
            style={{...styles.pageButton, opacity: paginaActual === 1 ? 0.5 : 1}}
            disabled={paginaActual === 1}
          >
            ‹
          </button>
          
          {/* Texto que muestra las páginas */}
          <span style={styles.pageInfo}>
            {paginaActual} {paginaActual + 1 <= totalPaginas ? paginaActual + 1 : ''} ...
          </span>

          {/* Botón para ir a la siguiente página */}
          <button 
            onClick={irSiguiente} 
            style={{...styles.pageButton, opacity: paginaActual === totalPaginas ? 0.5 : 1}}
            disabled={paginaActual === totalPaginas}
          >
            ›
          </button>
        </div>
      )}

    </div>
  );
}

// Exportamos el componente
export default Historial;