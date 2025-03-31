import { Container, Card, Form, Button, Row, Col, Nav, Tab, Alert, Spinner } from "react-bootstrap";
import { FaWindowMaximize, FaLock, FaShieldAlt } from 'react-icons/fa';
import { useState, useEffect } from "react";
import axios from "axios";

const Configuracion = () => {
  // Estados para la configuración de seguridad
  const [email, setEmail] = useState("");
  const [preguntaSecreta, setPreguntaSecreta] = useState("");
  const [respuestaSecreta, setRespuestaSecreta] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  // Obtener el email del usuario actual al cargar el componente
  useEffect(() => {
    // Obtén el email del localStorage o de tu sistema de autenticación
    const userEmail = localStorage.getItem("userEmail"); // Ajusta según tu implementación
    if (userEmail) {
      setEmail(userEmail);
    }
  }, []);

  // Manejar el envío del formulario de pregunta secreta
  const handleSubmitPreguntaSecreta = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");
    setCargando(true);

    try {
      // Validar campos
      if (!preguntaSecreta || !respuestaSecreta) {
        throw new Error("Todos los campos son obligatorios");
      }

      // Enviar solicitud al servidor
      const response = await axios.post("/api/recuperacion/configurar-pregunta", {
        email,
        preguntaSecreta,
        respuestaSecreta
      });

      setExito("Pregunta secreta configurada correctamente");
      // Limpiar el campo de respuesta por seguridad
      setRespuestaSecreta("");
    } catch (error) {
      setError(
        error.response?.data?.message || 
        error.message || 
        "Error al configurar la pregunta secreta"
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container className="py-4">
      <div className="header-container">
        <h3 className="mb-0">CONFIGURACIÓN</h3>
      </div>

      <Tab.Container id="configuracion-tabs" defaultActiveKey="visualizacion">
        <Row>
          <Col md={3}>
            <Nav variant="pills" className="flex-column mb-4">
              <Nav.Item>
                <Nav.Link eventKey="visualizacion">Visualización IOT</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="modificaciones">Modificaciones</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="agregar">Agregar Dispositivo</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="horario">Configuración Horario</Nav.Link>
              </Nav.Item>
              {/* Nueva pestaña para configuración de seguridad */}
              <Nav.Item>
                <Nav.Link eventKey="seguridad">
                  <FaShieldAlt className="me-2" />
                  Seguridad
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col md={9}>
            <Tab.Content>
              <Tab.Pane eventKey="visualizacion">
                <Card className="shadow-sm">
                  <Card.Header className="bg-light">
                    <h5 className="mb-0">Visualización IOT</h5>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      {/* Aquí se muestran los dispositivos */}
                      <Col md={3} sm={6} className="mb-4">
                        <Card className="h-100 device-card">
                          <Card.Body className="text-center">
                            <FaWindowMaximize size={40} className="mb-3" />
                            <Card.Title>Dispositivo 1</Card.Title>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="modificaciones">
                <Card className="shadow-sm">
                  <Card.Header className="bg-light">
                    <h5 className="mb-0">Modificaciones</h5>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" name="nombre" />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Lugar</Form.Label>
                        <Form.Control type="text" name="lugar" />
                      </Form.Group>

                      <div className="text-end mt-3">
                        <Button type="submit" variant="primary">Guardar Modificaciones</Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="agregar">
                <Card className="shadow-sm">
                  <Card.Header className="bg-light">
                    <h5 className="mb-0">Agregar Dispositivo</h5>
                  </Card.Header>
                  <Card.Body className="add-device-container">
                    <FaWindowMaximize size={50} className="mb-3" />
                    <h4 className="mt-3">Agregar Nuevo Dispositivo</h4>
                    <p className="text-muted">Haga clic en el botón para agregar un nuevo dispositivo IOT</p>
                    <Button variant="success" size="lg">
                      Agregar Dispositivo
                    </Button>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="horario">
                <Card className="shadow-sm">
                  <Card.Header className="bg-light">
                    <h5 className="mb-0">Configuración de Horario</h5>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Horario</Form.Label>
                        <Form.Control type="time" name="horario" />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Lugar</Form.Label>
                        <Form.Control type="text" name="lugar" />
                      </Form.Group>

                      <div className="d-flex justify-content-between mt-4">
                        <Button variant="secondary" type="button">
                          Cancelar
                        </Button>
                        <Button variant="success" type="submit">
                          Agregar
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Nueva pestaña para configuración de seguridad */}
              <Tab.Pane eventKey="seguridad">
                <Card className="shadow-sm">
                  <Card.Header className="bg-light">
                    <h5 className="mb-0">
                      <FaLock className="me-2" />
                      Configuración de Seguridad
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={12}>
                        {/* Sección de pregunta secreta */}
                        <Card className="mb-4 border-0 shadow-sm">
                          <Card.Body>
                            <h5>Configurar Pregunta de Seguridad</h5>
                            <p className="text-muted">
                              Configura una pregunta de seguridad que te permitirá recuperar tu 
                              contraseña en caso de que la olvides. Asegúrate de elegir una 
                              respuesta que puedas recordar fácilmente.
                            </p>

                            {error && (
                              <Alert variant="danger" onClose={() => setError("")} dismissible>
                                {error}
                              </Alert>
                            )}

                            {exito && (
                              <Alert variant="success" onClose={() => setExito("")} dismissible>
                                {exito}
                              </Alert>
                            )}

                            <Form onSubmit={handleSubmitPreguntaSecreta}>
                              <Form.Group className="mb-3">
                                <Form.Label>Pregunta de Seguridad</Form.Label>
                                <Form.Select
                                  value={preguntaSecreta}
                                  onChange={(e) => setPreguntaSecreta(e.target.value)}
                                  required
                                >
                                  <option value="">Selecciona una pregunta</option>
                                  <option value="¿Cuál es el nombre de tu primera mascota?">
                                    ¿Cuál es el nombre de tu primera mascota?
                                  </option>
                                  <option value="¿En qué ciudad naciste?">
                                    ¿En qué ciudad naciste?
                                  </option>
                                  <option value="¿Cuál es tu comida favorita?">
                                    ¿Cuál es tu comida favorita?
                                  </option>
                                  <option value="¿Cuál es el segundo nombre de tu madre?">
                                    ¿Cuál es el segundo nombre de tu madre?
                                  </option>
                                  <option value="¿Cuál fue el nombre de tu primera escuela?">
                                    ¿Cuál fue el nombre de tu primera escuela?
                                  </option>
                                </Form.Select>
                              </Form.Group>

                              <Form.Group className="mb-3">
                                <Form.Label>Tu Respuesta</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Escribe tu respuesta"
                                  value={respuestaSecreta}
                                  onChange={(e) => setRespuestaSecreta(e.target.value)}
                                  required
                                />
                                <Form.Text className="text-muted">
                                  Recuerda esta respuesta tal como la escribes, será necesaria para 
                                  recuperar tu cuenta si olvidas tu contraseña.
                                </Form.Text>
                              </Form.Group>

                              <div className="d-flex justify-content-end mt-3">
                                <Button 
                                  type="submit" 
                                  variant="primary"
                                  disabled={cargando}
                                >
                                  {cargando ? (
                                    <>
                                      <Spinner animation="border" size="sm" className="me-2" />
                                      Guardando...
                                    </>
                                  ) : (
                                    "Guardar Pregunta de Seguridad"
                                  )}
                                </Button>
                              </div>
                            </Form>
                          </Card.Body>
                        </Card>

                        {/* Puedes agregar más secciones de seguridad aquí */}
                        <Card className="border-0 shadow-sm">
                          <Card.Body>
                            <h5>Otras Opciones de Seguridad</h5>
                            <p className="text-muted">
                              Más opciones de seguridad estarán disponibles próximamente.
                            </p>
                            {/* Aquí podrías agregar más opciones de seguridad como:
                                - Cambio de contraseña
                                - Verificación en dos pasos
                                - Historia de inicios de sesión
                            */}
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default Configuracion;