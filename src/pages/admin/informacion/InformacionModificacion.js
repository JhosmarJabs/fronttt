import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { colors, textStyles } from '../../../styles/styles';


const InformacionModificacion = () => {
  const [informacion, setInformacion] = useState({
    nombreEmpresa: 'JADA Company',
    descripcion: 'Empresa líder en soluciones de IoT y automatización para hogares y negocios.',
    mision: 'Proporcionar soluciones tecnológicas innovadoras que mejoren la calidad de vida y la eficiencia de nuestros clientes.',
    vision: 'Ser referentes en el mercado de soluciones IoT, reconocidos por nuestra calidad e innovación continua.',
    telefono: '555-123-4567',
    email: 'contacto@jadacompany.com',
    direccion: 'Av. Tecnología 123, Ciudad Innovación',
    horario: 'Lunes a Viernes de 9:00 a 18:00'
  });
  
  const [guardado, setGuardado] = useState(false);
  const [error, setError] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInformacion(prev => ({
      ...prev,
      [name]: value
    }));
    setGuardado(false);
    setError(false);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar en la base de datos
    try {
      // Simulación de guardado exitoso
      setTimeout(() => {
        setGuardado(true);
        setError(false);
      }, 800);
    } catch (err) {
      setError(true);
      setGuardado(false);
      console.error("Error al guardar:", err);
    }
  };
  
  const pageStyles = {
    card: {
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      marginBottom: '20px'
    },
    title: {
      ...textStyles.title,
      marginBottom: '10px'
    },
    subtitle: {
      ...textStyles.subtitle,
      marginBottom: '20px'
    },
    formGroup: {
      marginBottom: '20px'
    },
    actionButtons: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px',
      marginTop: '20px'
    }
  };
  
  return (
    <Container fluid style={{ padding: '30px 20px' }}>
      <Row className="mb-4">
        <Col>
          <h2 style={pageStyles.title}>Modificación de Información</h2>
          <p style={textStyles.paragraph}>
            En esta sección puede modificar la información general de la empresa que se muestra en el sitio web.
          </p>
        </Col>
      </Row>
      
      <Card style={pageStyles.card}>
        <Card.Body>
          <Card.Title style={pageStyles.subtitle}>Información General</Card.Title>
          
          {guardado && (
            <Alert variant="success" dismissible onClose={() => setGuardado(false)}>
              La información ha sido actualizada correctamente.
            </Alert>
          )}
          
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError(false)}>
              Ocurrió un error al guardar la información. Por favor, intente de nuevo.
            </Alert>
          )}
          
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group style={pageStyles.formGroup}>
                  <Form.Label>Nombre de la Empresa</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="nombreEmpresa" 
                    value={informacion.nombreEmpresa} 
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group style={pageStyles.formGroup}>
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="telefono" 
                    value={informacion.telefono} 
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group style={pageStyles.formGroup}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email" 
                    value={informacion.email} 
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group style={pageStyles.formGroup}>
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="direccion" 
                    value={informacion.direccion} 
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group style={pageStyles.formGroup}>
              <Form.Label>Horario de Atención</Form.Label>
              <Form.Control 
                type="text" 
                name="horario" 
                value={informacion.horario} 
                onChange={handleChange}
              />
            </Form.Group>
            
            <Form.Group style={pageStyles.formGroup}>
              <Form.Label>Descripción</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                name="descripcion" 
                value={informacion.descripcion} 
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group style={pageStyles.formGroup}>
              <Form.Label>Misión</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                name="mision" 
                value={informacion.mision} 
                onChange={handleChange}
              />
            </Form.Group>
            
            <Form.Group style={pageStyles.formGroup}>
              <Form.Label>Visión</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                name="vision" 
                value={informacion.vision} 
                onChange={handleChange}
              />
            </Form.Group>
            
            <div style={pageStyles.actionButtons}>
              <Button variant="outline-secondary">Cancelar</Button>
              <Button 
                variant="primary" 
                type="submit"
                style={{ 
                  backgroundColor: colors.primaryDark,
                  borderColor: colors.primaryDark
                }}
              >
                Guardar Cambios
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default InformacionModificacion;