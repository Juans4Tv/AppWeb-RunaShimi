import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import logo from '../../assets/logo.png';

const API_URL = "http://localhost:4000/api/auth";

const Registrar = ({ onGoToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[.*#@$!%?&])[A-Za-z\d.*#@$!%?&]{8,}$/;

if (!passwordRegex.test(password)) {
  setError('La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un carácter especial (.*, #, etc)');
  setLoading(false);
  return;
}
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('¡Registro exitoso! Se ha enviado un correo de confirmación a ' + email);
        setTimeout(() => {
          onGoToLogin();
        }, 3000);
      } else {
        setError(data.error || 'Error al registrar');
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
    fontFamily: "'Open Sans', sans-serif",
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1.25rem',
    boxSizing: 'border-box'
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
    paddingBottom: '1.2rem'
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
    height: '100px'
  },

  waveShape: {
    fill: '#C4451C'
  },

  cardBody: {
    width: '100%',
    padding: '0 1.5rem',
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
    height: '3rem',
    backgroundColor: '#F9FAFB',
    borderRadius: '6.25rem',
    border: '0.125rem solid #5D4037',
    display: 'flex',
    alignItems: 'center',
    padding: '0 1.25rem',
    boxSizing: 'border-box'
  },

  input: {
    flex: 1,
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
    fontSize: '1rem',
    color: '#5D4037',
    marginLeft: '0.75rem'
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

  loginText: {
    fontSize: '0.9rem',
    color: '#5D4037',
    marginTop: '1.5rem'
  },

  error: {
    color: '#D32F2F',
    backgroundColor: '#FFCDD2',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    width: '100%',
    textAlign: 'center',
    marginBottom: '0.5rem'
  },

  success: {
    color: '#388E3C',
    backgroundColor: '#C8E6C9',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    width: '100%',
    textAlign: 'center',
    marginBottom: '0.5rem'
  }
};

  return (
    <div style={styles.canvas}>
      <div style={styles.card}>
        <div style={styles.waveHeader}>
          <svg 
      style={styles.waveSvg} 
      viewBox="0 0 100 30" 
      preserveAspectRatio="none"
    >
      
      {/* Primera onda */}
      <path 
        style={styles.waveShape}
        d="M0,10 C15,0 35,20 50,10 C65,0 85,20 100,10 V0 H0 Z"
      />

      {/* Segunda onda */}
      <path 
        d="M0,15 C10,10 20,20 30,15 C40,10 50,20 60,15 C70,10 80,20 90,15 C100,10 110,20 120,15 V0 H0 Z"
        fill="#E07A5F"
        opacity="0.6"
      />

    </svg>
        </div>
        <div style={styles.cardBody}>
         <div style={styles.logoWrapper}>
            <img src={logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div> 
          <h1 style={styles.title}>Traductor Runa Shimi</h1>
          <p style={styles.slogan}>Crea una cuenta para conectarte<br/>con tus raíces ancestrales</p>
          
          {error && <div style={styles.error}>{error}</div>}
          {success && <div style={styles.success}>{success}</div>}
          
            <form style={styles.form} onSubmit={handleRegister}>
            <div style={styles.inputGroup}>
              <User size={20} color="#5D4037" />
              <input type="text" placeholder="Nombre de usuario" style={styles.input} value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div style={styles.inputGroup}>
              <Mail size={20} color="#5D4037" />
              <input type="email" placeholder="Correo electrónico" style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div style={styles.inputGroup}>
              <Lock size={20} color="#5D4037" />
              <input type={mostrarContrasena ? "text" : "password"} placeholder="Contraseña" style={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} />
              <div onClick={() => setMostrarContrasena(!mostrarContrasena)} style={{ cursor: 'pointer', display: 'flex' }}>
                {mostrarContrasena ? <EyeOff size={20} color="#5D4037" /> : <Eye size={20} color="#5D4037" />}
              </div>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#5D4037', margin: '5px 0' }}>
  La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un carácter especial.
</p>
            <div style={styles.inputGroup}>
              <Lock size={20} color="#5D4037" />
              <input type="password" placeholder="Confirmar contraseña" style={styles.input} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <p style={{ fontSize: '0.75rem', color: '#5D4037', margin: '10px 0' }}>
              Al registrarte, aceptas nuestros <b>Términos y Condiciones</b> y <b>Políticas de Privacidad.</b>
            </p>
            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? 'Registrando...' : 'Crear Cuenta'}
            </button>
          </form>
          <p style={styles.loginText}>
            ¿Ya tienes una cuenta? <span style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={onGoToLogin}>Inicia sesión</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registrar;