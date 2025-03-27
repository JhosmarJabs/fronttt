import { Container, Card, Form, Button, Row, Col, Nav, Tab } from "react-bootstrap";
import { FaWindowMaximize } from 'react-icons/fa';

const Configuracion = () => {
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
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default Configuracion;
