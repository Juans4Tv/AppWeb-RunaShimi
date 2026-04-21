// Importamos React y el hook useState
import React, { useState } from "react";

// Importamos iconos para copiar y mostrar confirmación
import { Copy, Check } from 'lucide-react';

// Componente Historial
const Historial = ({ historial = [] }) => {

  // Estado que contiene el historial de traducciones 
  const historialData = historial.length > 0 ? historial : [
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
  const itemsActuales = historialData.slice(primerIndice, ultimoIndice);

  // Total de páginas
  const totalPaginas = Math.ceil(historialData.length / itemsPorPagina);

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

  // --- ESTILOS 
  const styles = {

    // Contenedor principal
    historialContainer: {
      width: '100%',
      maxWidth: '50rem',
      marginTop: '1.875rem',
      marginRight: 'auto',
      marginLeft: 'auto',
    },

    // Título
    header: {
      fontSize: '2rem',
      color: '#5d4037',
      marginBottom: '1.25rem',
      textAlign: 'center',
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

    // Contenido interno de la tarjeta
    cardContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.625rem 0.9375rem',
    },

    // Sección izquierda de la fecha
    leftSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      minWidth: '8.125rem'
    },

    // Estilo de la fecha
    fecha: {
      fontSize: '0.75rem',
      color: '#444'
    },

    // Sección central del texto
    textSection: {
      flex: 1,
      fontSize: '0.8125rem',
      color: '#333'
    },

    // Botón de accion copiar
    actions: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: '#8e8e8e', 
      transition: '0.2s',
      padding: '5px',
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

      {/* Tarjetas del historial */}
      {itemsActuales.map((item, index) => (
        <div key={item.id || index} style={styles.cardHistorial}>

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
              <span style={styles.fecha}>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}</span>
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

         {/* Botón para ir a la siguiente página  */}
        <button 
          onClick={irSiguiente} 
          style={{...styles.pageButton, opacity: paginaActual === totalPaginas ? 0.5 : 1}}
          disabled={paginaActual === totalPaginas}  
        >
          ›
        </button>
      </div>

    </div>
  );
}

// Exportamos el componente
export default Historial;