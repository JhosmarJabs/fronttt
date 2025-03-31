import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { colors, typography, textStyles, buttons, layout } from '../../styles/styles';

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

  // Simulación de la verificación del correo electrónico
  const verificarEmail = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);
    
    try {
      // Aquí iría la llamada a la API para verificar si el correo existe
      // Simulación de respuesta de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulamos que el correo existe y obtenemos la pregunta secreta
      setPreguntaSecreta('¿Cuál es el nombre de tu primera mascota?');
      setPaso(2);
      setExito('Correo verificado correctamente');
      setTimeout(() => setExito(''), 3000);
    } catch (error) {
      setError('El correo electrónico no existe en nuestra base de datos.');
    } finally {
      setCargando(false);
    }
  };

  // Simulación de verificación de la respuesta secreta
  const verificarRespuestaSecreta = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);
    
    try {
      // Simulación de respuesta de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulamos la verificación (en la vida real esto sería una llamada a la API)
      // Por simplicidad, cualquier respuesta es válida para esta demo
      setPaso(3);
      setExito('Respuesta secreta validada correctamente');
      setTimeout(() => setExito(''), 3000);
    } catch (error) {
      setError('La respuesta no es correcta. Inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  // Simulación de generación y envío de token
  const generarEnviarToken = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);
    
    try {
      // Simulación de generación de token (6 caracteres alfanuméricos)
      const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let tokenTemp = '';
      for (let i = 0; i < 6; i++) {
        tokenTemp += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
      }
      setTokenGenerado(tokenTemp);
      
      // Simulación de envío de correo
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // En una implementación real, aquí se enviaría un correo con el token
      console.log(`Token generado: ${tokenTemp} para el correo: ${email}`);
      
      setExito(`Token generado y enviado a ${email}`);
      setTimeout(() => setExito(''), 3000);
    } catch (error) {
      setError('Error al generar o enviar el token. Inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  // Simulación de verificación del token
  const verificarToken = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);
    
    try {
      // Verificamos que el token ingresado coincida con el generado
      if (token !== tokenGenerado) {
        throw new Error('Token inválido');
      }
      
      // Simulación de respuesta de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPaso(4);
      setExito('Token validado correctamente');
      setTimeout(() => setExito(''), 3000);
    } catch (error) {
      setError('El token ingresado no es válido o ha expirado.');
    } finally {
      setCargando(false);
    }
  };

  // Simulación de cambio de contraseña
  const cambiarPassword = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);
    
    try {
      // Verificar que las contraseñas coincidan
      if (nuevaPassword !== confirmarPassword) {
        throw new Error('Las contraseñas no coinciden');
      }
      
      // Validar que la contraseña cumpla con requisitos mínimos
      if (nuevaPassword.length < 8) {
        throw new Error('La contraseña debe tener al menos 8 caracteres');
      }
      
      // Simulación de respuesta de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setExito('¡Contraseña actualizada correctamente! Redirigiendo al inicio de sesión...');
      
      // Redirigir al login después de 3 segundos
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setError(error.message);
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