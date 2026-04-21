// importamos react y los hooks 
import React, { useState, useEffect } from 'react';

// Componente Acerca del Runa Shimi
const Acerca = () => {
  // Estado para detectar si es móvil o no (Ajustado a 768px para mantener consistencia)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detecta cambios en el tamaño de la pantalla para actualizar el estado de isMobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    //Agregamos el event listener para detectar cambios en el tamaño de la pantalla
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  //Estilos 
  const styles = {
    //Contenedor principal 
    container: {
      width: '100%',
      // CLAVE: Limitamos el ancho en celular para forzar el centrado y proteger el layout del sidebar
      maxWidth: isMobile ? '22rem' : '53.125rem', 
      margin: '4rem auto 3rem',
      padding: isMobile ? '0 0.5rem' : '0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 1, // Permite que el menú lateral pase por encima sin problema
      clear: 'both',
    },
    // Titulo y Icono 
    headerContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.625rem',
      marginBottom: '2.5rem',
      textAlign: 'center',
      width: '100%',
      justifyContent: 'center',
    },
    // Estilo del titulo 
    headerText: {
      fontSize: isMobile ? '1.6rem' : '2rem', // Texto adaptado a celular
      color: '#5d4037',
      margin: 0,
    },
    // Circulo del icono del titulo
    iconCircle: {
      backgroundColor: '#f4e6d4',
      borderRadius: '50%',
      padding: '0.4rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.25rem',
    },
    //grid de tarjetas 
    grid: {
      display: 'grid',
      //cambia a una sola columna en movil
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: isMobile ? '1.5rem' : '1rem', // Un poco más de separación vertical en móvil
      width: '100%',
      boxSizing: 'border-box',
    },
    // Estilo de cada tarjeta
    card: {
      backgroundColor: 'white',
      borderRadius: '1.875rem', 
      boxShadow: '0 0.125rem 0.375rem rgba(0,0,0,0.05)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      paddingBottom: '1.5625rem',
      border: '0.0625rem solid #f4e6d4',
      width: '100%',
      boxSizing: 'border-box',
    },
    // Contenedor del blob SVG y el icono
    blobContainer: {
      width: '100%',
      height: '6.25rem',
      position: 'relative',
      overflow: 'visible',
    },
    //Estilo del SVG
    blobSvg: {
      width: '100%',
      height: '100%',
      display: 'block',
    },
    // Estilo del icono que flota
    iconBadge: {
      position: 'absolute',
      bottom: '-1.25rem',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'white',
      borderRadius: '50%',
      padding: '0.5rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 0.125rem 0.375rem rgba(0,0,0,0.1)',
      fontSize: '1.25rem',
      zIndex: 10,
    },
    //titulo de cada tarjeta
    cardTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginTop: '2.1875rem',
      marginBottom: '0.625rem',
    },
    //texto de cada tarjeta
    cardText: {
      textAlign: 'center',
      padding: '0 1.25rem',
      fontSize: '0.8125rem',
      color: '#5b4d49',
      lineHeight: '1.6',
      fontWeight: '500',
    },
    //linea de pie de pagina 
    footerLine: {
      marginTop: '3.125rem',
      borderTop: '0.125rem solid #d7c9b8',
      width: '100%',
      paddingTop: '0.9375rem',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '0.625rem',
    },
    //texto del pie de pagina
    footerText: {
      color: '#5a3d2b',
      fontSize: isMobile ? '0.75rem' : '0.875rem', // Ligeramente más pequeño en celular
      fontWeight: 'bold',
      textAlign: 'center',
    },
    //texto de advertencia final
    disclaimer: {
      marginTop: '0.9375rem',
      fontSize: isMobile ? '0.65rem' : '0.75rem',
      color: '#5a3d2b',
      textAlign: 'center',
      fontWeight: 'bold',
      padding: isMobile ? '0 1rem' : '0',
    }
  };

  // Información de las tarjetas (contenido dinámico)
  const cardsInfo = [
    {
      title: 'Origen',
      color: '#C64C24',
      text: 'El Runa Shimi es hablado por millones de personas en Ecuador, Perú, Bolivia y Colombia. Es la lengua del pueblo Inca y sus descendientes. 🦙',
      icon: '⛰️',
      // SVG decorativo
      svg: (
        <svg viewBox="0 0 100 45" preserveAspectRatio="none" style={styles.blobSvg}>
          <path d="M0,0 L100,0 L100,20 C85,35 75,5 50,25 C25,45 15,10 0,20 Z" fill="#C64C24"/>
          <circle cx="85" cy="25" r="2.5" fill="#C64C24" />
          <circle cx="18" cy="30" r="1.5" fill="#C64C24" />
        </svg>
      )
    },
    {
      title: 'Cosmovisión',
      color: '#3D8C56',
      text: 'Representa el Sumak Kawsay (Buen Vivir) ✨, una filosofía de vida en armonía con la Pachamama (Madre Tierra) 🌍 y la comunidad.',
      icon: '🌿',
      svg: (
        <svg viewBox="0 0 100 45" preserveAspectRatio="none" style={styles.blobSvg}>
          <path d="M0,0 L100,0 L100,15 C80,30 70,-5 40,20 C20,35 10,15 0,25 Z" fill="#3D8C56"/>
          <circle cx="90" cy="22" r="2" fill="#3D8C56" />
          <circle cx="10" cy="32" r="2" fill="#3D8C56" />
        </svg>
      )
    },
    {
      title: 'Preservación',
      // Tono ocre/tierra más vibrante para acompañar al terracota y al verde
      color: '#D48C29', 
      text: 'Ayuda a preservar esta lengua ancestral. Cada palabra que aprendas contribuye a mantener viva la cultura de los pueblos andinos. ☀️',
      icon: '🤲',
      svg: (
        <svg viewBox="0 0 100 45" preserveAspectRatio="none" style={styles.blobSvg}>
          <path d="M0,0 L100,0 L100,25 C75,45 65,10 40,25 C20,35 10,15 0,20 Z" fill="#D48C29"/>
          <circle cx="88" cy="28" r="2.5" fill="#D48C29" />
          <circle cx="25" cy="32" r="1.5" fill="#D48C29" />
        </svg>
      )
    }
  ];

  //Renderizamos
  return (
    <div style={styles.container}>
      {/* Título Principal */}
      <div style={styles.headerContainer}>
        <h2 style={styles.headerText}>Acerca del Runa Shimi</h2>
        <div style={styles.iconCircle}>🌱</div>
      </div>

      {/* Tarjetas */}
      <div style={styles.grid}>
        {cardsInfo.map((card, index) => (
          <div key={index} style={styles.card}>
            
             {/* Parte superior decorativa */}
            <div style={styles.blobContainer}>
              {card.svg}
              {/* Icono flotante */}
              <div style={styles.iconBadge}>
                {card.icon}
              </div>
            </div>
            
            {/* Título de la tarjeta */}
            <h3 style={{ ...styles.cardTitle, color: card.color }}>
              {card.title}
            </h3>
            
             {/* Texto de la tarjeta */}
            <p style={styles.cardText}>
              {card.text}
            </p>
          </div>
        ))}
      </div>

      {/* Footer del componente/ pie de pagina */}
      <div style={styles.footerLine}>
        <span style={styles.footerText}>🌿 Preservando las lenguas ancestrales ⛰️</span>
        <span style={styles.footerText}>Hecho con amor para la comunidad 🌍</span>
      </div>
      
      {/*nota final */}
      <p style={styles.disclaimer}>
        ✨ Este traductor es una herramienta educativa. Las traducciones pueden variar según la región y dialecto. ✨
      </p>
    </div>
  );
};

export default Acerca;