import React, { useState } from 'react';
import { Container, Row, Col, Card, Breadcrumb, Form, InputGroup, Button, Nav, Tab } from 'react-bootstrap';
import { colors, typography, textStyles } from '../../../styles/styles';
import { Link } from 'react-router-dom';

const PreguntasGeneral = () => {
  const [busqueda, setBusqueda] = useState('');
  
  const preguntasComunes = [
    "¿Cómo realizar un pedido?",
    "Métodos de pago aceptados",
    "Tiempos de entrega",
    "Política de devoluciones",
    "Configuración de dispositivos",
    "Problemas de conectividad"
  ];

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se implementaría la lógica de búsqueda
    console.log("Buscando:", busqueda);
  };

  return (
    <Container style={{ padding: '30px 0' }}>
      {/* Breadcrumb */}
      <Row className="mb-4">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
            <Breadcrumb.Item active>Preguntas Frecuentes</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      
      {/* Título de la página */}
      <Row className="mb-5">
        <Col className="text-center">
          <h1 style={textStyles.title}>Preguntas Frecuentes</h1>
          <p style={textStyles.paragraph}>
            Encuentra respuestas a las preguntas más comunes sobre nuestros productos y servicios
          </p>
        </Col>
      </Row>
      
      {/* Buscador */}
      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Body style={{ padding: '25px' }}>
              <h3 style={{ fontFamily: typography.fontPrimary, color: colors.primaryDark, marginBottom: '20px' }}>
                Buscar en Preguntas Frecuentes
              </h3>
              <Form onSubmit={handleSubmit}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="¿Qué estás buscando?"
                    value={busqueda}
                    onChange={handleBusqueda}
                    style={{ 
                      borderColor: colors.primaryLight,
                      fontFamily: typography.fontSecondary
                    }}
                  />
                  <Button 
                    type="submit" 
                    style={{ 
                      backgroundColor: colors.primaryDark, 
                      borderColor: colors.primaryDark 
                    }}
                  >
                    Buscar
                  </Button>
                </InputGroup>
              </Form>
              
              {/* Preguntas populares */}
              <div className="mt-4">
                <h5 style={{ fontFamily: typography.fontPrimary, color: colors.primaryMedium }}>
                  Preguntas populares:
                </h5>
                <div className="d-flex flex-wrap">
                  {preguntasComunes.map((pregunta, index) => (
                    <Button
                      key={index}
                      variant="outline-secondary"
                      size="sm"
                      className="me-2 mb-2"
                      onClick={() => setBusqueda(pregunta)}
                      style={{ 
                        borderColor: colors.accent,
                        color: colors.primaryMedium
                      }}
                    >
                      {pregunta}
                    </Button>
                  ))}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Categorías de preguntas */}
      <Row className="mb-4">
        <Col>
          <h2 style={{ ...textStyles.subtitle, marginBottom: '20px' }}>Categorías de Preguntas</h2>
        </Col>
      </Row>
      
      <Row className="g-4 mb-5">
        <Col md={4}>
          <Link to="/preguntas-altas" style={{ textDecoration: 'none' }}>
            <Card 
              className="shadow-sm h-100" 
              style={{ 
                borderColor: colors.primaryLight,
                transition: 'transform 0.3s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <Card.Body className="d-flex flex-column">
                <div className="text-center mb-3">
                  <span style={{ 
                    fontSize: '48px',
                    color: colors.primaryDark
                  }}>
                    🔍
                  </span>
                </div>
                <h3 style={{ 
                  fontFamily: typography.fontPrimary, 
                  color: colors.primaryDark,
                  textAlign: 'center'
                }}>
                  Preguntas Frecuentes Altas
                </h3>
                <p style={{ 
                  fontFamily: typography.fontSecondary,
                  color: colors.primaryMedium,
                  textAlign: 'center',
                  flex: '1'
                }}>
                  Información sobre instalación, configuración y puesta en marcha de dispositivos
                </p>
                <div className="text-center mt-3">
                  <Button 
                    variant="outline-primary"
                    style={{ 
                      borderColor: colors.primaryDark,
                      color: colors.primaryDark
                    }}
                  >
                    Ver Preguntas
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        
        <Col md={4}>
          <Link to="/preguntas-bajas" style={{ textDecoration: 'none' }}>
            <Card 
              className="shadow-sm h-100" 
              style={{ 
                borderColor: colors.primaryLight,
                transition: 'transform 0.3s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <Card.Body className="d-flex flex-column">
                <div className="text-center mb-3">
                  <span style={{ 
                    fontSize: '48px',
                    color: colors.primaryDark
                  }}>
                    📋
                  </span>
                </div>
                <h3 style={{ 
                  fontFamily: typography.fontPrimary, 
                  color: colors.primaryDark,
                  textAlign: 'center'
                }}>
                  Preguntas Frecuentes Bajas
                </h3>
                <p style={{ 
                  fontFamily: typography.fontSecondary,
                  color: colors.primaryMedium,
                  textAlign: 'center',
                  flex: '1'
                }}>
                  Consultas sobre garantías, devoluciones y proceso de desinstalación
                </p>
                <div className="text-center mt-3">
                  <Button 
                    variant="outline-primary"
                    style={{ 
                      borderColor: colors.primaryDark,
                      color: colors.primaryDark
                    }}
                  >
                    Ver Preguntas
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        
        <Col md={4}>
          <Link to="/preguntas-cambios" style={{ textDecoration: 'none' }}>
            <Card 
              className="shadow-sm h-100" 
              style={{ 
                borderColor: colors.primaryLight,
                transition: 'transform 0.3s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <Card.Body className="d-flex flex-column">
                <div className="text-center mb-3">
                  <span style={{ 
                    fontSize: '48px',
                    color: colors.primaryDark
                  }}>
                    🔄
                  </span>
                </div>
                <h3 style={{ 
                  fontFamily: typography.fontPrimary, 
                  color: colors.primaryDark,
                  textAlign: 'center'
                }}>
                  Preguntas sobre Cambios
                </h3>
                <p style={{ 
                  fontFamily: typography.fontSecondary,
                  color: colors.primaryMedium,
                  textAlign: 'center',
                  flex: '1'
                }}>
                  Información sobre actualizaciones, migraciones y cambios en el sistema
                </p>
                <div className="text-center mt-3">
                  <Button 
                    variant="outline-primary"
                    style={{ 
                      borderColor: colors.primaryDark,
                      color: colors.primaryDark
                    }}
                  >
                    Ver Preguntas
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
      
      {/* Pestañas con preguntas destacadas */}
      <Row className="mb-5">
        <Col>
          <Card className="shadow-sm">
            <Card.Body style={{ padding: '25px' }}>
              <h3 style={{ fontFamily: typography.fontPrimary, color: colors.primaryDark, marginBottom: '20px' }}>
                Preguntas Destacadas
              </h3>
              
              <Tab.Container defaultActiveKey="instalacion">
                <Nav variant="tabs" className="mb-4">
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="instalacion"
                      style={{ 
                        color: colors.primaryMedium,
                        fontFamily: typography.fontPrimary
                      }}
                    >
                      Instalación
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="funcionamiento"
                      style={{ 
                        color: colors.primaryMedium,
                        fontFamily: typography.fontPrimary
                      }}
                    >
                      Funcionamiento
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="problemas"
                      style={{ 
                        color: colors.primaryMedium,
                        fontFamily: typography.fontPrimary
                      }}
                    >
                      Solución de Problemas
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                
                <Tab.Content>
                  <Tab.Pane eventKey="instalacion">
                    <div className="accordion" id="accordionInstalacion">
                      {[
                        {
                          pregunta: "¿Cómo puedo instalar mi nuevo dispositivo de domótica?",
                          respuesta: "Para instalar su dispositivo, primero desempaque todos los componentes y verifique que estén completos según el manual. Conecte el dispositivo a la fuente de alimentación y siga las instrucciones de la aplicación móvil para completar la configuración inicial. Si encuentra dificultades, puede contactar a nuestro soporte técnico."
                        },
                        {
                          pregunta: "¿Necesito herramientas especiales para la instalación?",
                          respuesta: "La mayoría de nuestros productos están diseñados para una instalación sencilla que no requiere herramientas especiales. Sin embargo, para algunos dispositivos como cámaras de seguridad exteriores o cerraduras digitales, puede necesitar un destornillador o taladro. El manual de instalación especificará los requisitos para cada producto."
                        },
                        {
                          pregunta: "¿Puedo instalar varios dispositivos a la vez?",
                          respuesta: "Sí, puede instalar múltiples dispositivos. Recomendamos comenzar con el hub central (si su sistema lo requiere) y luego añadir los dispositivos uno por uno, siguiendo las instrucciones de la aplicación para cada uno. Esto garantiza que todos los dispositivos se conecten correctamente a su red."
                        }
                      ].map((item, index) => (
                        <div className="accordion-item" key={index}>
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapse-instalacion-${index}`}
                              style={{ 
                                fontFamily: typography.fontPrimary,
                                color: colors.primaryDark
                              }}
                            >
                              {item.pregunta}
                            </button>
                          </h2>
                          <div
                            id={`collapse-instalacion-${index}`}
                            className="accordion-collapse collapse"
                          >
                            <div 
                              className="accordion-body"
                              style={{ 
                                fontFamily: typography.fontSecondary,
                                color: colors.primaryMedium
                              }}
                            >
                              {item.respuesta}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Tab.Pane>
                  
                  <Tab.Pane eventKey="funcionamiento">
                    <div className="accordion" id="accordionFuncionamiento">
                      {[
                        {
                          pregunta: "¿Cómo puedo controlar mis dispositivos desde mi teléfono?",
                          respuesta: "Descargue nuestra aplicación oficial desde la App Store o Google Play Store. Después de crear una cuenta y vincular sus dispositivos, podrá controlarlos desde cualquier lugar con conexión a internet. La aplicación ofrece opciones de control remoto, programación de tareas y automatizaciones personalizadas."
                        },
                        {
                          pregunta: "¿Los dispositivos funcionan con asistentes de voz?",
                          respuesta: "Sí, nuestros dispositivos son compatibles con los principales asistentes de voz del mercado, incluyendo Amazon Alexa, Google Assistant y Apple HomeKit (verificar compatibilidad específica según el modelo). Para activar el control por voz, vincule su cuenta de JADA Company con el asistente de voz correspondiente siguiendo las instrucciones en nuestra aplicación."
                        },
                        {
                          pregunta: "¿Qué sucede si se va la luz o internet?",
                          respuesta: "La mayoría de nuestros dispositivos tienen funciones básicas que seguirán operando sin conexión a internet. Si se corta la energía, los dispositivos con baterías de respaldo continuarán funcionando por un período limitado. Cuando se restablezca la conexión, los dispositivos se reconectarán automáticamente y sincronizarán cualquier dato pendiente con la nube."
                        }
                      ].map((item, index) => (
                        <div className="accordion-item" key={index}>
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapse-funcionamiento-${index}`}
                              style={{ 
                                fontFamily: typography.fontPrimary,
                                color: colors.primaryDark
                              }}
                            >
                              {item.pregunta}
                            </button>
                          </h2>
                          <div
                            id={`collapse-funcionamiento-${index}`}
                            className="accordion-collapse collapse"
                          >
                            <div 
                              className="accordion-body"
                              style={{ 
                                fontFamily: typography.fontSecondary,
                                color: colors.primaryMedium
                              }}
                            >
                              {item.respuesta}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Tab.Pane>
                  
                  <Tab.Pane eventKey="problemas">
                    <div className="accordion" id="accordionProblemas">
                      {[
                        {
                          pregunta: "Mi dispositivo no se conecta a la red WiFi",
                          respuesta: "Verifique que su router esté funcionando correctamente y que el dispositivo esté dentro del alcance de la señal WiFi. Asegúrese de que está conectándose a una red de 2.4GHz (algunos dispositivos no son compatibles con redes 5GHz). Si el problema persiste, intente reiniciar tanto el dispositivo como su router, y siga las instrucciones de configuración nuevamente."
                        },
                        {
                          pregunta: "La aplicación no reconoce mi dispositivo",
                          respuesta: "Asegúrese de que el dispositivo esté encendido y en modo de emparejamiento (consulte el manual para las instrucciones específicas). Verifique que su teléfono tenga habilitados los permisos necesarios para la aplicación, como Bluetooth y ubicación. Si el problema continúa, intente cerrar y volver a abrir la aplicación, o desinstalar y reinstalar la aplicación."
                        },
                        {
                          pregunta: "¿Cómo puedo restablecer mi dispositivo a la configuración de fábrica?",
                          respuesta: "El procedimiento varía según el dispositivo, pero generalmente implica mantener presionado el botón de reinicio durante 5-10 segundos hasta que el indicador LED parpadee de una manera específica. Consulte el manual de usuario de su dispositivo para instrucciones precisas. Tenga en cuenta que el restablecimiento borrará toda la configuración personalizada y requerirá volver a configurar el dispositivo."
                        }
                      ].map((item, index) => (
                        <div className="accordion-item" key={index}>
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapse-problemas-${index}`}
                              style={{ 
                                fontFamily: typography.fontPrimary,
                                color: colors.primaryDark
                              }}
                            >
                              {item.pregunta}
                            </button>
                          </h2>
                          <div
                            id={`collapse-problemas-${index}`}
                            className="accordion-collapse collapse"
                          >
                            <div 
                              className="accordion-body"
                              style={{ 
                                fontFamily: typography.fontSecondary,
                                color: colors.primaryMedium
                              }}
                            >
                              {item.respuesta}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Soporte adicional */}
      <Row>
        <Col>
          <Card 
            className="shadow-sm text-center" 
            style={{ 
              backgroundColor: colors.primaryLight, 
              color: colors.white,
              padding: '30px'
            }}
          >
            <h3 style={{ fontFamily: typography.fontPrimary, marginBottom: '15px' }}>
              ¿No encuentras la respuesta que buscas?
            </h3>
            <p style={{ fontFamily: typography.fontSecondary }}>
              Nuestro equipo de soporte está listo para ayudarte. Contáctanos directamente y responderemos a tus preguntas.
            </p>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <Button 
                variant="outline-light"
                href="/contacto"
                style={{ 
                  fontFamily: typography.fontPrimary
                }}
              >
                Contactar Soporte
              </Button>
              <Button 
                style={{ 
                  backgroundColor: colors.white,
                  color: colors.primaryDark,
                  fontFamily: typography.fontPrimary,
                  borderColor: colors.white
                }}
              >
                Chat en Vivo
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PreguntasGeneral;