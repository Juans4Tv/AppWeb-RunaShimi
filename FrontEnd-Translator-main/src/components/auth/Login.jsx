import React, { useState } from 'react';
import logo from '../../assets/logo.png';

const API_URL = "http://localhost:4000/api/auth";

const Login = ({ onGoToRegister, onGoToRecuperar, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('¡Login exitoso! redirigiendo...');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLoginSuccess(data.user);
      } else {
        setError(data.error || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('No se pudo conectar al servidor');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
  canvas: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#F4E6D4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Open Sans', sans-serif",
    margin: 0,
    padding: '1.25rem',
    boxSizing: 'border-box',
    overflow: 'hidden'
  },

  card: {
    width: '100%',
    maxWidth: '37.5rem',
    backgroundColor: '#FFF4DC',
    borderRadius: '1.6875rem',
    borderTopLeftRadius: '2.5rem',
    borderTopRightRadius: '2.5rem',
    position: 'relative',
    boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '1.875rem'
  },

  waveHeader: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    borderTopLeftRadius: '2.5rem',
    borderTopRightRadius: '2.5rem'
  },

  waveSvg: {
    display: 'block',
    width: '100%',
    height: 'auto'
  },

  waveShape: {
    fill: '#C4451C'
  },

  cardBody: {
    width: '100%',
    padding: '0 1.25rem',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  logoWrapper: {
    marginTop: '-1.875rem',
    width: '100%',
    maxWidth: '20rem',
    height: '5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '0.3125rem',
    zIndex: 2
  },

  title: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#5D4037',
    margin: '0 0 0.625rem 0',
    textAlign: 'center'
  },

  slogan: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#5D4037',
    margin: '0 0 0.9375rem 0',
    textAlign: 'center'
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
    width: '100%',
    boxSizing: 'border-box'
  },

  inputGroup: {
  width: '100%',
  maxWidth: '35.4375rem',
  minHeight: '3.75rem',
  backgroundColor: '#F9FAFB',
  borderRadius: '6.25rem',
  border: '0.125rem solid #5D4037',
  display: 'flex',
  alignItems: 'center',
  padding: '0 0.8rem',
  boxSizing: 'border-box',
  overflow: 'hidden'
},

  iconWrapper: {
    width: '1.5rem',
    height: '1.5rem',
    marginRight: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },

  eyeIconWrapper: {
  width: '20px',
  height: '20px',
  minWidth: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  marginLeft: '4px'
},

 input: {
  flex: 1,
  width: '100%',
  minWidth: 0,
  border: 'none',
  backgroundColor: 'transparent',
  outline: 'none',
  fontSize: '1rem',
  color: '#5D4037'
},
  controlsRow: {
    width: '100%',
    maxWidth: '35.4375rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '0.3125rem',
    marginBottom: '1.25rem'
  },

  forgotPassword: {
    fontSize: '1rem',
    color: '#735240',
    textDecoration: 'none',
    cursor: 'pointer'
  },

  submitBtn: {
    width: '100%',
    maxWidth: '35.4375rem',
    height: '3.75rem',
    backgroundColor: '#C7856A',
    borderRadius: '1.6875rem',
    border: 'none',
    fontSize: '1.375rem',
    fontWeight: 'bold',
    color: '#FFFFFF',
    cursor: 'pointer',
    marginBottom: '1.5625rem'
  },

  registerText: {
    fontSize: '1rem',
    color: '#000000',
    margin: 0,
    textAlign: 'center'
  },

  registerLink: {
    fontWeight: 'bold',
    cursor: 'pointer'
  },

  checkboxWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.625rem',
    fontSize: '1rem',
    color: '#735240',
    cursor: 'pointer'
  },

  checkbox: {
    width: '1rem',
    height: '1rem',
    border: '0.125rem solid #5D4037',
    borderRadius: '0.25rem',
    backgroundColor: '#F9FAFB',
    cursor: 'pointer'
  },

  error: {
    color: '#D32F2F',
    backgroundColor: '#FFCDD2',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    width: '100%',
    maxWidth: '35.4375rem',
    textAlign: 'center',
    marginBottom: '0.5rem'
  },

  success: {
    color: '#388E3C',
    backgroundColor: '#C8E6C9',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    width: '100%',
    maxWidth: '35.4375rem',
    textAlign: 'center',
    marginBottom: '0.5rem'
  }
};
  return (
    <div style={styles.canvas}>
      <div style={styles.card}>
        <div style={styles.waveHeader}>
          <svg style={styles.waveSvg} viewBox="0 0 100 30" preserveAspectRatio="none">
  
  {/* Primera onda */}
  <path 
    style={styles.waveShape} 
    d="M0,10 C15,0 35,20 50,10 C65,0 85,20 100,10 V0 H0 Z" 
  />

  {/* Segunda onda (más suave y transparente) */}
  <path 
    style={styles.waveShape} 
    d="M0,15 C10,10 20,20 30,15 C40,10 50,20 60,15 C70,10 80,20 90,15 C100,10 110,20 120,15 V0 H0 Z" 
    opacity="0.6"
  />

</svg>
        </div>
        <div style={styles.cardBody}>
         <div style={styles.logoWrapper}>
           <img src={logo} alt="Logo Traductor Runa Shimi" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
         </div>
          <h1 style={styles.title}>Traductor Runa Shimi</h1>
          <p style={styles.slogan}>Conecta con tus raíces ancestrales</p>
          
          {error && <div style={styles.error}>{error}</div>}
          {success && <div style={styles.success}>{success}</div>}
          
          <form style={styles.form} onSubmit={handleLogin}>
            <div style={styles.inputGroup}>
              <div style={styles.iconWrapper}>
                <svg viewBox="0 0 448 512" fill="#5D4037" width="100%" height="100%">
                  <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/>
                </svg>
              </div>
              <input type="text" placeholder="Email" style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div style={styles.inputGroup}>
              <div style={styles.iconWrapper}>
                <svg viewBox="0 0 448 512" fill="#5D4037" width="100%" height="100%">
                  <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"/>
                </svg>
              </div>
              <input type={mostrarContrasena ? "text" : "password"} placeholder="Contraseña" style={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} />
             {/*ojo*/}
              <div
                  style={styles.eyeIconWrapper}
                  onClick={() => setMostrarContrasena(!mostrarContrasena)}>
                  {mostrarContrasena ? (
                  <svg viewBox="0 0 640 512" fill="#5D4037"style={{ width: '18px', height: '18px' }}>
                  <path d="M633.8 458.1L77.7 2C70.7-3.7 60.6-2.7 54.9 4.3L45.7 15.5C40 22.5 41 32.6 48 38.3l76.6 62.8C72.6 146.9 33.2 192.1 7.5 241.4a32.35 32.35 0 0 0 0 29.2C61.7 376.4 169.1 448 292 448c67.8 0 132.2-21.4 188.2-58.5l105.6 86.7c7 5.7 17.1 4.7 22.8-2.3l9.2-11.2c5.7-7 4.7-17.1-2.3-22.8zM320 400c-98.7 0-189.1-55-237.9-144a317.4 317.4 0 0 1 74.1-91.9l39.6 32.5A111.4 111.4 0 0 0 320 400zm0-224a110.8 110.8 0 0 0-32.7 4.9l85.8 70.4a55.8 55.8 0 0 0-69.4-69.4l-16.4-13.5A111 111 0 0 1 320 176zm313.3 65.4C579.1 135.6 471.7 64 348.8 64c-35.5 0-69.3 6.1-100.4 17.3l39.6 32.5A272.1 272.1 0 0 1 348.8 112c98.7 0 189.1 55 237.9 144a317.2 317.2 0 0 1-68.5 85.4l37.8 31A366.6 366.6 0 0 0 633.3 270.6a32.35 32.35 0 0 0 0-29.2z"/>
                  </svg>
                    ) : (
                      <svg
                        viewBox="0 0 576 512"
                        fill="#5D4037"
                        style={{ width: '18px', height: '18px' }}
                      >
                        <path d="M288 144a110.94 110.94 0 0 0-31.24 5 55.4 55.4 0 0 1 7.24 27 56 56 0 0 1-56 56 55.4 55.4 0 0 1-27-7.24A111.71 111.71 0 1 0 288 144zm284.52 97.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400c-98.65 0-189.09-55-237.93-144C98.91 167 189.34 112 288 112s189.09 55 237.93 144C477.1 345 386.66 400 288 400z"/>
                      </svg>
                    )}
                </div>
            </div>
            <div style={styles.controlsRow}>
               {/* Checkbox para recordar usuario */}
              <label style={styles.checkboxWrapper}>
                <input type="checkbox" style={styles.checkbox} /> Recordar
              </label>
              <span style={styles.forgotPassword} onClick={onGoToRecuperar}>¿Olvidaste tu contraseña?</span>
            </div>
            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? 'Iniciando...' : 'Iniciar Sesión'}
            </button>
          </form>
          <p style={styles.registerText}>
            ¿No tienes una cuenta? <span style={styles.registerLink} onClick={onGoToRegister}>Regístrate gratis Aquí</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;