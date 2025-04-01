import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { colors, typography, textStyles, buttons, layout } from '../../styles/styles';
import { API_URL } from '../../config';

const RecuperacionPassword = () => {
  const navigate = useNavigate();
  
  // Estados para los diferentes pasos
  const [paso, setPaso] = useState(1);
  const [email, setEmail] = useState('');
  const [preguntaSecreta, setPreguntaSecreta] = useState('');
  const [respuestaSecreta, setRespuestaSecreta] = useState('');
  const [token, setToken] = useState('');
  const [tokenGenerado, setTokenGenerado] = useState('');
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  
  // Estados para mensajes de error y carga
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [exito, setExito] = useState('');
  
  // Estilos personalizados basados en styles.js
  const styles = {
    container: {
      ...layout.container,
      paddingTop: '50px',
      paddingBottom: '50px',
    },
    card: {
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    cardHeader: {
      backgroundColor: colors.primaryDark,
      color: colors.white,
      padding: '15px 20px',
      borderRadius: '10px 10px 0 0',
      fontFamily: typography.fontPrimary,
    },
    cardBody: {
      padding: '30px',
      backgroundColor: colors.white,
    },
    titulo: {
      ...textStyles.title,
      marginBottom: '20px',
      textAlign: 'center',
    },
    subtitulo: {
      ...textStyles.subtitle,
      marginBottom: '20px',
    },
    label: {
      ...textStyles.paragraph,
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    input: {
      borderColor: colors.primaryLight,
      padding: '10px 15px',
      borderRadius: '5px',
      fontSize: '16px',
      marginBottom: '20px',
    },
    botonPrimario: {
      ...buttons.primary,
      width: '100%',
      marginTop: '20px',
    },
    botonSecundario: {
      ...buttons.secondary,
      width: '100%',
      marginTop: '10px',
    },
    pasos: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '30px',
    },
    paso: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: colors.accent,
      color: colors.white,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
    },
    pasoActivo: {
      backgroundColor: colors.primaryDark,
    },
    lineaPaso: {
      flex: 1,
      height: '4px',
      backgroundColor: colors.accent,
      alignSelf: 'center',
      margin: '0 5px',
    },
    lineaPasoActiva: {
      backgroundColor: colors.primaryDark,
    },
  };

// 1. Función para verificar email
const verificarEmail = async (e) => {
  e.preventDefault();
  console.log("🔍 FRONTEND - Iniciando verificación de email:", email);
  setError('');
  setCargando(true);
  
  try {
    console.log("🔍 FRONTEND - Intentando conectar con API para verificar email");
    const response = await fetch(`${API_URL}/recuperacion/verificar-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    const data = await response.json();
    console.log("🔍 FRONTEND - Respuesta API verificarEmail:", data);
    
    if (!response.ok) {
      throw new Error(data.message || 'Error al verificar email');
    }
    
    // Si todo va bien, establecer la pregunta secreta y pasar al siguiente paso
    setPreguntaSecreta(data.preguntaSecreta);
    setPaso(2);
    setExito('Correo verificado correctamente');
    setTimeout(() => setExito(''), 3000);
  } catch (error) {
    console.error("❌ FRONTEND - Error al verificar email:", error);
    setError(error.message || 'Error al verificar el correo electrónico');
  } finally {
    setCargando(false);
  }
};

// 2. Función para verificar respuesta secreta
const verificarRespuestaSecreta = async (e) => {
  e.preventDefault();
  console.log("🔍 FRONTEND - Iniciando verificación de respuesta secreta para:", email);
  setError('');
  setCargando(true);
  
  try {
    console.log("🔍 FRONTEND - Enviando respuesta:", respuestaSecreta);
    const response = await fetch(`${API_URL}/recuperacion/verificar-respuesta`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, respuesta: respuestaSecreta }),
    });
    
    const data = await response.json();
    console.log("🔍 FRONTEND - Respuesta API verificarRespuesta:", data);
    
    if (!response.ok) {
      throw new Error(data.message || 'Error al verificar respuesta');
    }
    
    // Si todo va bien, pasar al siguiente paso
    setPaso(3);
    setExito('Respuesta secreta validada correctamente');
    setTimeout(() => setExito(''), 3000);
  } catch (error) {
    console.error("❌ FRONTEND - Error al verificar respuesta secreta:", error);
    setError(error.message || 'Error al verificar la respuesta');
  } finally {
    setCargando(false);
  }
};

// 3. Función para generar y enviar token
const generarEnviarToken = async (e) => {
  e.preventDefault();
  console.log("🔍 FRONTEND - Iniciando generación de token para:", email);
  setError('');
  setCargando(true);
  
  try {
    console.log("🔍 FRONTEND - Solicitando generación de token");
    const response = await fetch(`${API_URL}/recuperacion/generar-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    const data = await response.json();
    console.log("🔍 FRONTEND - Respuesta API generarToken:", data);
    
    if (!response.ok) {
      throw new Error(data.message || 'Error al generar token');
    }
    
    // Nota: El token real se envía por correo, así que no lo recibiremos en la respuesta
    // pero podemos establecer tokenGenerado a true para indicar que se ha enviado
    setTokenGenerado(true);
    setExito(`Token generado y enviado a ${email}`);
    setTimeout(() => setExito(''), 3000);
  } catch (error) {
    console.error("❌ FRONTEND - Error al generar token:", error);
    setError(error.message || 'Error al generar o enviar el token');
  } finally {
    setCargando(false);
  }
};

// 4. Función para verificar token
const verificarToken = async (e) => {
  e.preventDefault();
  console.log("🔍 FRONTEND - Iniciando verificación de token:", token, "para:", email);
  setError('');
  setCargando(true);
  
  try {
    console.log("🔍 FRONTEND - Enviando token para verificación");
    const response = await fetch(`${API_URL}/recuperacion/verificar-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, token }),
    });
    
    const data = await response.json();
    console.log("🔍 FRONTEND - Respuesta API verificarToken:", data);
    
    if (!response.ok) {
      throw new Error(data.message || 'Error al verificar token');
    }
    
    // Si todo va bien, pasar al siguiente paso
    setPaso(4);
    setExito('Token validado correctamente');
    setTimeout(() => setExito(''), 3000);
  } catch (error) {
    console.error("❌ FRONTEND - Error al verificar token:", error);
    setError(error.message || 'El token ingresado no es válido o ha expirado');
  } finally {
    setCargando(false);
  }
};

// 5. Función para cambiar contraseña
const cambiarPassword = async (e) => {
  e.preventDefault();
  console.log("🔍 FRONTEND - Iniciando cambio de contraseña para:", email);
  setError('');
  setCargando(true);
  
  try {
    // Verificar que las contraseñas coincidan en el cliente
    if (nuevaPassword !== confirmarPassword) {
      throw new Error('Las contraseñas no coinciden');
    }
    
    // Validar que la contraseña cumpla con requisitos mínimos
    if (nuevaPassword.length < 8) {
      throw new Error('La contraseña debe tener al menos 8 caracteres');
    }
    
    console.log("🔍 FRONTEND - Enviando nueva contraseña");
    const response = await fetch(`${API_URL}/recuperacion/actualizar-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email, 
        token, 
        nuevaPassword 
      }),
    });
    
    const data = await response.json();
    console.log("🔍 FRONTEND - Respuesta API actualizarPassword:", data);
    
    if (!response.ok) {
      throw new Error(data.message || 'Error al actualizar contraseña');
    }
    
    setExito('¡Contraseña actualizada correctamente! Redirigiendo al inicio de sesión...');
    
    // Redirigir al login después de 3 segundos
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  } catch (error) {
    console.error("❌ FRONTEND - Error al cambiar contraseña:", error);
    setError(error.message || 'Error al actualizar la contraseña');
  } finally {
    setCargando(false);
  }
};

  // Renderizado de los indicadores de paso
  const renderPasos = () => {
    return (
      <div style={styles.pasos}>
        <div style={{...styles.paso, ...(paso >= 1 ? styles.pasoActivo : {})}}> 1 </div>
        <div style={{...styles.lineaPaso, ...(paso >= 2 ? styles.lineaPasoActiva : {})}}></div>
        <div style={{...styles.paso, ...(paso >= 2 ? styles.pasoActivo : {})}}> 2 </div>
        <div style={{...styles.lineaPaso, ...(paso >= 3 ? styles.lineaPasoActiva : {})}}></div>
        <div style={{...styles.paso, ...(paso >= 3 ? styles.pasoActivo : {})}}> 3 </div>
        <div style={{...styles.lineaPaso, ...(paso >= 4 ? styles.lineaPasoActiva : {})}}></div>
        <div style={{...styles.paso, ...(paso >= 4 ? styles.pasoActivo : {})}}> 4 </div>
      </div>
    );
  };

  return (
    <Container style={styles.container}>
      <Card style={styles.card}>
        <Card.Header style={styles.cardHeader}>
          <h2 style={{ margin: 0, fontFamily: typography.fontPrimary }}>
            Recuperación de Contraseña
          </h2>
        </Card.Header>
        <Card.Body style={styles.cardBody}>
          {renderPasos()}
          
          <h3 style={styles.subtitulo}>
            {paso === 1 && 'Paso 1: Verifica tu correo electrónico'}
            {paso === 2 && 'Paso 2: Responde tu pregunta de seguridad'}
            {paso === 3 && 'Paso 3: Verifica el token enviado'}
            {paso === 4 && 'Paso 4: Establece tu nueva contraseña'}
          </h3>
          
          {error && (
            <Alert variant="danger" onClose={() => setError('')} dismissible>
              {error}
            </Alert>
          )}
          
          {exito && (
            <Alert variant="success" onClose={() => setExito('')} dismissible>
              {exito}
            </Alert>
          )}
          
          {/* Paso 1: Verificación de correo */}
          {paso === 1 && (
            <Form onSubmit={verificarEmail}>
              <Form.Group className="mb-3">
                <Form.Label style={styles.label}>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                  required
                />
              </Form.Group>
              
              <Button
                type="submit"
                style={styles.botonPrimario}
                disabled={cargando}
              >
                {cargando ? (
                  <>
                    <Spinner animation="border" size="sm" /> Verificando...
                  </>
                ) : (
                  'Verificar Correo'
                )}
              </Button>
            </Form>
          )}
          
          {/* Paso 2: Pregunta secreta */}
          {paso === 2 && (
            <Form onSubmit={verificarRespuestaSecreta}>
              <Form.Group className="mb-3">
                <Form.Label style={styles.label}>Pregunta de Seguridad</Form.Label>
                <Form.Control
                  type="text"
                  value={preguntaSecreta}
                  style={styles.input}
                  disabled
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label style={styles.label}>Tu Respuesta</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu respuesta"
                  value={respuestaSecreta}
                  onChange={(e) => setRespuestaSecreta(e.target.value)}
                  style={styles.input}
                  required
                />
              </Form.Group>
              
              <Button
                type="submit"
                style={styles.botonPrimario}
                disabled={cargando}
              >
                {cargando ? (
                  <>
                    <Spinner animation="border" size="sm" /> Verificando...
                  </>
                ) : (
                  'Verificar Respuesta'
                )}
              </Button>
              
              <Button
                type="button"
                style={styles.botonSecundario}
                onClick={() => {
                  setPaso(1);
                  setError('');
                }}
              >
                Volver
              </Button>
            </Form>
          )}
          
          {/* Paso 3: Generación y verificación de token */}
          {paso === 3 && (
            <Form onSubmit={verificarToken}>
              {!tokenGenerado ? (
                <>
                  <p style={textStyles.paragraph}>
                    A continuación, generaremos un token de seguridad de 6 caracteres
                    que será enviado a tu correo electrónico. Este token es necesario
                    para continuar con el proceso de recuperación.
                  </p>
                  
                  <Button
                    type="button"
                    style={styles.botonPrimario}
                    onClick={generarEnviarToken}
                    disabled={cargando}
                  >
                    {cargando ? (
                      <>
                        <Spinner animation="border" size="sm" /> Enviando token...
                      </>
                    ) : (
                      'Enviar Token'
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <p style={textStyles.paragraph}>
                    Hemos enviado un token de verificación a tu correo <strong>{email}</strong>.
                    Por favor, revisa tu bandeja de entrada (incluyendo carpetas de spam)
                    e ingresa el código a continuación.
                  </p>
                  
                  <Form.Group className="mb-3">
                    <Form.Label style={styles.label}>Código de Verificación</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingresa el código de 6 caracteres"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      style={styles.input}
                      required
                      maxLength={6}
                    />
                  </Form.Group>
                  
                  <Button
                    type="submit"
                    style={styles.botonPrimario}
                    disabled={cargando}
                  >
                    {cargando ? (
                      <>
                        <Spinner animation="border" size="sm" /> Verificando...
                      </>
                    ) : (
                      'Verificar Token'
                    )}
                  </Button>
                </>
              )}
              
              <Button
                type="button"
                style={styles.botonSecundario}
                onClick={() => {
                  setPaso(2);
                  setError('');
                }}
              >
                Volver
              </Button>
            </Form>
          )}
          
          {/* Paso 4: Cambio de contraseña */}
          {paso === 4 && (
            <Form onSubmit={cambiarPassword}>
              <Form.Group className="mb-3">
                <Form.Label style={styles.label}>Nueva Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  value={nuevaPassword}
                  onChange={(e) => setNuevaPassword(e.target.value)}
                  style={styles.input}
                  required
                  minLength={8}
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label style={styles.label}>Confirmar Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Repite tu nueva contraseña"
                  value={confirmarPassword}
                  onChange={(e) => setConfirmarPassword(e.target.value)}
                  style={styles.input}
                  required
                  minLength={8}
                />
              </Form.Group>
              
              <Button
                type="submit"
                style={styles.botonPrimario}
                disabled={cargando}
              >
                {cargando ? (
                  <>
                    <Spinner animation="border" size="sm" /> Actualizando...
                  </>
                ) : (
                  'Cambiar Contraseña'
                )}
              </Button>
              
              <Button
                type="button"
                style={styles.botonSecundario}
                onClick={() => {
                  setPaso(3);
                  setError('');
                }}
              >
                Volver
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RecuperacionPassword;