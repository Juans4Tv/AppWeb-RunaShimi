import React, { useState } from 'react'; // Importamos React y los hooks necesarios
import logo from '../../assets/logo.png'; // importamos el logo

// Componente de recuperación de contraseña
const Recuperar = ({ onGoToLogin }) => {

  //Estado para guardar el correo electronico ingresado por el usuario
  const [correo, setCorreo] = useState('');

  // Función que se ejecuta al enviar el formulario de recuperación
  const handleRecuperar = (e) => {
    e.preventDefault(); // Evitamos que la página se recargue al enviar el formulario
    // Validamos que el campo de correo no esté vacío
    if (correo.trim() === '') {
      alert("Por favor, ingresa tu correo electrónico.");
      return;
    }
    alert(`Enlace de recuperación enviado a: ${correo}`);
  };
 // Estilos para el componente de recuperación de contraseña CC en JS
  const styles = {
    // Contenedor principal
    canvas: {
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#F4E6D4',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Open Sans', sans-serif",
      margin: 0,
      padding: '20px',
      boxSizing: 'border-box',
      overflowX: 'hidden'
    },
    // Tarjeta principal 
    card: {
      width: '100%',
      maxWidth: '600px',
      backgroundColor: '#FFF4DC',
      borderRadius: '27px',
      position: 'relative',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: '30px'
    },
    // Encabezado con ondas SVG
    waveHeader: {
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      borderTopLeftRadius: '27px',
      borderTopRightRadius: '27px'
    },
    //Estilos para las ondas SVG
    waveSvg: {
      display: 'block',
      width: '100%',
      height: 'auto'
    },
    // Estilo para las formas de las ondas
    waveShape: {
      fill: '#C4451C'
    },
    // Cuerpo de la tarjeta
    body: {
      width: '100%',
      padding: '0 20px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    // Contenedor del logo
    logoWrapper: {
      marginTop: '-30px',
      width: '60%',
      maxWidth: '240px',
      height: '90px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '5px',
      zIndex: 2
    },
    // Título principal
    title: {
      fontSize: '26px',
      fontWeight: 'bold',
      color: '#5D4037',
      margin: '20px 0 10px 0',
      textAlign: 'center'
    },
    // subtitulo o textos secundarios
    slogan: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#5D4037',
      margin: '0 0 10px 0',
      textAlign: 'center'
    },
    //formulario de recuperación
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px',
      width: '100%',
      maxWidth: '400px'
    },
    // input del correo electrónico
    input: {
      width: '100%',
      height: '50px',
      borderRadius: '100px',
      border: '2px solid #5D4037',
      padding: '0 20px',
      boxSizing: 'border-box',
      outline: 'none',
      fontSize: '16px'
    },
    // Boton de enviar enlace de recuperación
    submitBtn: {
      width: '100%',
      height: '50px',
      backgroundColor: '#C7856A',
      color: 'white',
      border: 'none',
      borderRadius: '100px',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '10px',
      transition: 'background-color 0.3s'
    },
    //Boton para volver al inicio de sesión
    buttonLink: {
      background: 'none',
      border: 'none',
      color: '#5D4037',
      textDecoration: 'underline',
      cursor: 'pointer',
      marginTop: '20px',
      fontSize: '16px'
    }
  };

  // Renderizamos el componeentes 
  return (
    // Contenedor principal 
    <div style={styles.canvas}>
      <div style={styles.card}>
        {/* Encabezado con ondas SVG */}
        <div style={styles.waveHeader}>
          <svg style={styles.waveSvg} viewBox="0 0 100 30" preserveAspectRatio="none">
           {/* Primera onda */}
            <path style={styles.waveShape} d="M0,10 C15,0 35,20 50,10 C65,0 85,20 100,10 V0 H0 Z" />
            {/* Segunda onda */}
            <path style={styles.waveShape} d="M0,15 C10,10 20,20 30,15 C40,10 50,20 60,15 C70,10 80,20 90,15 C100,10 110,20 120,15 V0 H0 Z" opacity="0.6" />
          </svg>
        </div>
        <div style={styles.body}>
          {/* Logo */}
          <div style={styles.logoWrapper}>
            <img src={logo} alt="Logo Traductor Runa Shimi" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          {/* Título y slogan */}
          <h1 style={styles.title}>Traductor Runa Shimi</h1>
          <p style={styles.slogan}>Recupera tu acceso ancestral</p>
          

          <h2 style={styles.title}>¿Olvidaste tu contraseña?</h2>
          <p style={styles.slogan}>
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
          </p>
          {/* Formulario  */}
          <form onSubmit={handleRecuperar} style={styles.form}>
            <input
              style={styles.input}
              type="email"
              placeholder="Ingresa tu correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}//actualiza el estado del correo al escribir
            />
           {/* Botón para enviar el enlace de recuperación */}
            <button type="submit" style={styles.submitBtn}>
              Enviar enlace
            </button>
          </form>
         {/* Botón para volver al inicio de sesión */}
          <button onClick={onGoToLogin} style={styles.buttonLink}>
            Volver al Inicio de Sesión
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default Recuperar;
