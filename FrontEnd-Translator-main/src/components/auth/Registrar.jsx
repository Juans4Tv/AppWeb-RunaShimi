import React, { useState } from 'react';//im
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

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

    if (password.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres');
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
        setSuccess('¡Registro exitoso! Ahora puedes iniciar sesión.');
        setTimeout(() => {
          onGoToLogin();
        }, 2000);
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
    canvas: { width: '100%', minHeight: '100vh', backgroundColor: '#F4E6D4', display: 'flex', fontFamily: "'Open Sans', sans-serif", justifyContent: 'center', alignItems: 'center', padding: '1.25rem', boxSizing: 'border-box' },
    card: { width: '100%', maxWidth: '450px', backgroundColor: '#FFF4DC', borderRadius: '1.6875rem', boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '1.875rem', overflow: 'hidden' },
    waveHeader: { width: '100%', backgroundColor: '#C4451C', lineHeight: 0 },
    cardBody: { width: '100%', padding: '0 1.5rem', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    title: { fontSize: '1.6rem', fontWeight: 'bold', color: '#5D4037', margin: '0.5rem 0', textAlign: 'center' },
    slogan: { fontSize: '1rem', color: '#5D4037', margin: '0 0 1.5rem 0', textAlign: 'center', lineHeight: '1.3' },
    inputGroup: { width: '100%', height: '3rem', backgroundColor: '#F9FAFB', borderRadius: '6.25rem', border: '2px solid #5D4037', display: 'flex', alignItems: 'center', padding: '0 1.25rem', boxSizing: 'border-box', marginBottom: '0.75rem' },
    input: { flex: 1, border: 'none', backgroundColor: 'transparent', outline: 'none', fontSize: '1rem', color: '#5D4037', marginLeft: '0.75rem' },
    submitBtn: { width: '100%', height: '3.5rem', backgroundColor: '#C7856A', borderRadius: '1.6875rem', border: 'none', fontSize: '1.2rem', fontWeight: 'bold', color: '#FFFFFF', cursor: 'pointer', marginTop: '0.5rem' },
    loginText: { fontSize: '0.9rem', color: '#5D4037', marginTop: '1.5rem' },
    error: { color: '#D32F2F', backgroundColor: '#FFCDD2', padding: '0.75rem', borderRadius: '0.5rem', width: '100%', textAlign: 'center', marginBottom: '0.5rem' },
    success: { color: '#388E3C', backgroundColor: '#C8E6C9', padding: '0.75rem', borderRadius: '0.5rem', width: '100%', textAlign: 'center', marginBottom: '0.5rem' }
  };

  return (
    <div style={styles.canvas}>
      <div style={styles.card}>
        <div style={styles.waveHeader}>
          <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{width: '100%', height: '70px'}}>
            <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,0.00 L0.00,0.00 Z" style={{stroke: 'none', fill: '#C4451C'}}></path>
          </svg>
        </div>
        <div style={styles.cardBody}>
          <h1 style={styles.title}>Traductor Runa Shimi</h1>
          <p style={styles.slogan}>Crea una cuenta para conectarte<br/>con tus raíces ancestrales</p>
          
          {error && <div style={styles.error}>{error}</div>}
          {success && <div style={styles.success}>{success}</div>}
          
          <form style={{ width: '100%' }} onSubmit={handleRegister}>
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