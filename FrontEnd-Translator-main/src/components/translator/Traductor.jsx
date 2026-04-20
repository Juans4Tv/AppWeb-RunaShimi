// Importamos React y los hooks necesarios
import React, { useState, useEffect } from 'react';

// Importamos iconos
import { ArrowLeftRight, RefreshCw, Copy } from 'lucide-react';

// Importamos componentes 
import Historial from './Historial';
import Diccionario from './Diccionario';
import Acerca from './Acerca'
import FrasesComunes from './FrasesComunes';

const API_URL = "http://localhost:4000/api";
const translateAPI = API_URL + "/translate";
const historyAPI = API_URL + "/history";

// Componente principal del Traductor
const Traductor = ({ onGoToLogin}) => {

  // Texto que escribe el usuario
  const [text, setText] = useState('');

  // Texto traducido (resultado)
  const [translatedText, setTranslatedText] = useState('');

  // Detecta si es móvil
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Controla el idioma 
  const [isEspanolToRuna, setIsEspanolToRuna] = useState(true);

  // Estado de carga
  const [loading, setLoading] = useState(false);

  // Error
  const [error, setError] = useState('');

  // Función para traducir
  const handleTranslate = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      const direction = isEspanolToRuna ? 'espanolToRuna' : 'runaToEspanol';
      
      const response = await fetch(translateAPI, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': token } : {})
        },
        body: JSON.stringify({ text, direction })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTranslatedText(data.data.translated_text || data.data);
        loadHistory();
      } else {
        setError(data.error || 'Error en traducción');
      }
    } catch (err) {
      setError('No se pudo conectar al servidor');
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const response = await fetch(historyAPI, {
        headers: { 'Authorization': token }
      });
      const data = await response.json();
      setHistorial(data);
    } catch (err) {
      console.error('Error loading history:', err);
    }
  };

  // Historial de traducciones 
  const [historial, setHistorial] = useState([]);


  // Detectar cambios de tamaño de pantalla 
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);

    window.addEventListener('resize', handleResize);

    // Limpieza del evento
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    loadHistory();
  }, []);
  
  // Función para intercambiar idiomas
  const handleSwapLanguages = () => {

    // Cambia el estado del idioma
    setIsEspanolToRuna(!isEspanolToRuna); 
    
    // Intercambia el texto escrito con la traducción
    const tempText = text;
    setText(translatedText);
    setTranslatedText(tempText);
  };

 
  // Estilos en CSS en JS
  const styles = {

    // Contenedor principal
    container: {
      flex: 1,
      width: '100%',
      minHeight: '100vh',
      overflowY: 'auto',
      paddingTop: '2.5rem',
      paddingRight: isMobile ? '0.9375rem' : '1.25rem',
      paddingBottom: '1.25rem',
      paddingLeft: isMobile ? '1rem' : '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxSizing: 'border-box',
    },

    // Encabezado
    headerText: {
      textAlign: 'center',
      color: '#5d4037',
      width: '100%',
      maxWidth: '37.5rem',
      marginBottom: '1.5625rem',
      boxSizing: 'border-box',
      wordWrap: 'break-word',
    },

    // Tarjeta del traductor
    card: {
      backgroundColor: 'white', 
      width: '100%',
      maxWidth: '53.125rem', 
      borderRadius: '1.875rem',
      padding: isMobile ? '1.25rem' : '2.1875rem',
      boxShadow: '0 0.25rem 0.9375rem rgba(0,0,0,0.05)',
      border: '0.0625rem solid #f4e6d4',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column'
    },

    // Etiqueta de idioma
    langLabel: {
      backgroundColor: '#c64c24', 
      color: 'white',
      padding: '0.5rem 1.5625rem',
      borderRadius: '0.75rem',
      fontWeight: 'bold',
      fontSize: '1rem',
      display: 'inline-block',
      marginBottom: '0.625rem' 
    },

    // Contenedor de textarea
    textareaWrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    },

    // Área de texto
    textarea: {
      width: '100%',
      border: '0.0625rem solid #ddd',
      borderRadius: '0.9375rem',
      padding: '0.9375rem',
      minHeight: isMobile ? '7.5rem' : '11.25rem',
      outline: 'none',
      resize: 'none',
      fontSize: '1rem',
      color: '#444',
      boxSizing: 'border-box', 
      fontFamily: 'inherit',
      backgroundColor: 'white'
    },

    // Pie de cada textarea
    footerRow: {
      display: 'flex',
      justifyContent: 'space-between', 
      alignItems: 'center',
      marginTop: '0.5rem',
      padding: '0 0.3125rem',
      color: '#888',
      fontSize: '0.8rem'
    },

    // Botón circular de intercambio
    swapCircle: {
      backgroundColor: 'white',
      border: '0.0625rem solid #f4e6d4',
      borderRadius: '50%',
      width: '2.8125rem',
      height: '2.8125rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#8d6e63',
      margin: isMobile ? '0.9375rem auto' : '0 auto', 
      cursor: 'pointer',
    },

    // Botón traducir
    btnTranslate: {
      backgroundColor: '#3d8c56', 
      color: 'white',
      border: 'none',
      padding: '0.75rem 2.1875rem',
      borderRadius: '1.875rem',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '0.625rem',
      cursor: 'pointer',
      margin: '1.5625rem auto 0'
    },

    // Grid para encabezado en PC
    pcHeaderGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center',
      justifyItems: 'center',
      gap: '1.25rem',
      marginBottom: '0.9375rem'
    },

    // Grid para inputs en PC
    pcInputsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1.875rem',
      width: '100%'
    },
  };

  // Render del componente
  return (
    <div style={styles.container}>
      
      {/* ENCABEZADO */}
      <div id="traductor" style={styles.headerText}>
        <h1> Traductor De Runa Shimi 🌿</h1>
        <p>
          Conecta con las raíces ancestrales a través de la lengua Runa Shimi.
        </p>
      </div>

      {/* TARJETA PRINCIPAL */}
      <div style={styles.card}>
        
        {/* VISTA MÓVIL  */}
        {isMobile ? (
          <>
            {/* TEXTO DE ORIGEN */}
            <div style={styles.textareaWrapper}>
              {/*Etiqueta del idioma actual  */}
              <div style={{alignSelf: 'flex-start'}}>
                <div style={styles.langLabel}>
                  {isEspanolToRuna ? 'ESPAÑOL' : 'RUNA SHIMI'}
                </div>
              </div>
              {/* Informacion dentro de la tarjeta */}
              <textarea 
                style={styles.textarea}
                placeholder={isEspanolToRuna ? "Escribe aquí en español..." : "Escribe aquí en runa shimi..."}
                value={text} //valor del estado 
                onChange={(e) => setText(e.target.value)}  // Cada vez que el usuario escribe, actualiza el estado
                maxLength={300}
              />
             {/* Permite maximo 300 caracteres */}
              <div style={styles.footerRow}>
                <span>{text.length}/300</span>
              </div>
            </div>

            {/* Boton intercambiar el idioma  */}
            <div style={styles.swapCircle} onClick={handleSwapLanguages}//funcion que invierte 
            > 
              <ArrowLeftRight size={20} />
            </div>

            {/* TEXTO TRADUCIDO */}
            <div style={styles.textareaWrapper}>
               {/* Etiqueta del idioma destino */}
              <div style={{alignSelf: 'flex-start'}}>
                <div style={styles.langLabel}>
                  {isEspanolToRuna ? 'RUNA SHIMI' : 'ESPAÑOL'}
                </div>
              </div>

               {/* Área donde aparece la traducción */}
              <textarea 
                style={styles.textarea}
                placeholder="La traducción aparecerá aquí..."
                value={translatedText}
                readOnly
              />

              <div style={styles.footerRow}>
                <span></span> 
                <Copy size={18} style={{cursor: 'pointer'}} />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* VISTA PC */}
            <div style={styles.pcHeaderGrid}>
              <div style={styles.langLabel}>
                {isEspanolToRuna ? 'ESPAÑOL' : 'RUNA SHIMI'}
              </div>

              {/* BOTÓN INTERCAMBIO */}
              <div style={styles.swapCircle} onClick={handleSwapLanguages}>
                <ArrowLeftRight size={20} />
              </div>

              <div style={styles.langLabel}>
                {isEspanolToRuna ? 'RUNA SHIMI' : 'ESPAÑOL'}
              </div>
            </div>

            {/* INPUTS */}
            <div style={styles.pcInputsGrid}>
              {/* ORIGEN */}
              <div style={styles.textareaWrapper}>
                <textarea 
                  style={styles.textarea}
                  placeholder={isEspanolToRuna ? "Escribe aquí en español..." : "Escribe aquí en runa shimi..."}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  maxLength={300}
                />

                <div style={styles.footerRow}>
                  <span>{text.length}/300</span>
                </div>
              </div>

              {/* DESTINO */}
              <div style={styles.textareaWrapper}>
                <textarea 
                  style={styles.textarea}
                  placeholder="La traducción aparecerá aquí..."
                  value={translatedText}
                  readOnly
                />

                <div style={styles.footerRow}>
                  <span></span>
                  <Copy size={20} style={{cursor: 'pointer'}} />
                </div>
              </div>
            </div>
          </>
        )}

        {/* BOTÓN TRADUCIR */}
        <button 
          style={{...styles.btnTranslate, opacity: loading ? 0.7 : 1}} 
          onClick={handleTranslate}
          disabled={loading}
        >
          {loading ? 'Traduciendo...' : 'Traducir'} <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
        </button>

        {/* Error */}
        {error && <p style={{color: 'red', marginTop: '0.5rem'}}>{error}</p>}

      </div>

      {/*  OTROS COMPONENTES*/}
      <FrasesComunes />
      <Historial historial={historial} />
      
      <div style={{ width: '100%', marginBottom: '5rem', display: 'flex', flexDirection: 'column' }}>
        <Diccionario />
      </div>
      
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Acerca />
      </div>
      
    </div>
  );
}

// Exportamos el componente
export default Traductor;