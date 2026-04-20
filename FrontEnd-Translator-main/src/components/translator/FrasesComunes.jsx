// Importamos React y los hooks necesarios
import React, { useState, useEffect } from 'react';

// Componente FrasesComunes
const FrasesComunes = () => {

  // Estado para detectar si el dispositivo es móvil
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detectar cambios en el tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Actualiza estado si cambia el tamaño
    };

    // Escucha el evento resize
    window.addEventListener('resize', handleResize);

    // Limpia el evento cuando el componente se desmonta
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lista de frases comunes (datos estáticos)
  const frases = [
    { esp: "Buenos Días", runa: "Alli puncha", icon: "🌞" },
    { esp: "Gracias", runa: "Yupaychani", icon: "🙏" },
    { esp: "Hola", runa: "Imanalla", icon: "👋" },
    { esp: "Te quiero", runa: "Kanta kuyani", icon: "❤️" },
    { esp: "Bienvenido", runa: "Alli shamushka", icon: "🏠" },
    { esp: "Adiós", runa: "Kaykama", icon: "👋" },
  ];

  // Estilos en CSS en JS
  const styles = {

    // Título principal
    header: {
      fontSize: "2rem",
      color: "#5a3d2b",
      marginBottom: "1.875rem",
      display: "flex",
      alignItems: "center",
      gap: "0.625rem",
      justifyContent: "center", // Centra el título
    },

    // Contenedor en grid
    grid: {
      display: "grid",

      // Si es móvil → 1 columna
      // Si no → 2 columnas 
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 320px)",
      gap: "1.25rem",
      width: "100%",
      maxWidth: "50rem",
      margin: "0 auto", // Centra el grid
      padding: isMobile ? '0 0.5rem' : '0',
      boxSizing: 'border-box',
      justifyContent: "center",
    },

    // Tarjeta de cada frase
    frasescard: {
      backgroundColor: "white",
      borderRadius: "1.875rem",
      padding: "0.9375rem 1.5625rem",
      display: "flex",
      alignItems: "center",
      gap: "0.9375rem",
      boxShadow: "0 0.125rem 0.375rem rgba(0,0,0,0.05)",
    },

    // Icono 
    icon: {
      fontSize: "1.875rem",
    },

    // Contenedor de texto (español + runa)
    textContainer: {
      display: "flex",
      flexDirection: "column",
    },

    // Texto pequeño
    espText: {
      fontSize: "0.8125rem",
      color: "#7a7a7a",
    },

    // Texto en Runa Shimi el principal
    runaText: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      color: "#2d5a42",
      margin: 0,
    }
  };

  // Render del componente
  return (
    <div>

      {/* Título */}
      <h1 style={styles.header}>
        Frases Comunes <span>⛰️</span>
      </h1>

      {/* Grid de frases */}
      <div style={styles.grid}>
        {frases.map((item, index) => (

          // Tarjeta individual
          <div key={index} style={styles.frasescard}>

            {/* Icono */}
            <div style={styles.icon}>{item.icon}</div>

            {/* Texto */}
            <div style={styles.textContainer}>
              <span style={styles.espText}>{item.esp}</span>
              <h2 style={styles.runaText}>{item.runa}</h2>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

// Exportamos el componente
export default FrasesComunes;