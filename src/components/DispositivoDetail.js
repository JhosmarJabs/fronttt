import React, { useState } from 'react';
import { Card, Row, Col, Form, Button, Badge } from 'react-bootstrap';
import { colors, typography, textStyles, buttons } from '../styles/styles';

const DispositivoDetail = ({ device, onBack, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    ...device
  });
  
  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Guardar cambios
  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };
  
  // Cancelar edición
  const handleCancel = () => {
    setFormData({...device});
    setIsEditing(false);
  };
  
  // Formatear fecha para visualización
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Función para obtener estilo de estado
  const getStatusStyle = (status) => {
    switch(status) {
      case 'active':
        return { bg: '#5cb85c', text: 'Activo' };
      case 'inactive':
        return { bg: '#d9534f', text: 'Inactivo' };
      case 'maintenance':
        return { bg: '#f0ad4e', text: 'Mantenimiento' };
      default:
        return { bg: colors.accent, text: 'Desconocido' };
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-2">
          <Button 
            variant="link" 
            onClick={onBack}
            style={{
              color: colors.primaryDark,
              padding: '0',
              textDecoration: 'none',
              fontFamily: typography.fontPrimary
            }}
          >
            <i className="fas fa-arrow-left me-2"></i> Volver
          </Button>
          <h4 style={{
            color: colors.primaryDark,
            fontFamily: typography.fontPrimary,
            margin: 0
          }}>
            Detalles del Dispositivo
          </h4>
        </div>
        
        <div>
          {isEditing ? (
            <div className="d-flex gap-2">
              <Button 
                style={{
                  ...buttons.primary,
                  backgroundColor: '#5cb85c',
                  borderColor: '#5cb85c'
                }} 
                onClick={handleSave}
              >
                Guardar
              </Button>
              <Button 
                style={{
                  ...buttons.secondary,
                  backgroundColor: '#d9534f',
                  borderColor: '#d9534f'
                }} 
                onClick={handleCancel}
              >
                Cancelar
              </Button>
            </div>
          ) : (
            <Button 
              style={buttons.primary} 
              onClick={() => setIsEditing(true)}
            >
              <i className="fas fa-edit me-2"></i> Editar
            </Button>
          )}
        </div>
      </div>
      
      <Row>
        <Col md={7}>
          <Card style={{
            borderRadius: '10px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            border: 'none',
            height: '100%'
          }}>
            <Card.Body>
              <h5 style={{
                color: colors.primaryDark,
                fontFamily: typography.fontPrimary,
                borderBottom: `1px solid ${colors.accent}`,
                paddingBottom: '10px',
                marginBottom: '20px'
              }}>
                Información General
              </h5>
              
              {isEditing ? (
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Nombre del Dispositivo</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Tipo</Form.Label>
                        <Form.Select
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                        >
                          <option value="Seguridad">Seguridad</option>
                          <option value="Domótica">Domótica</option>
                          <option value="Climatización">Climatización</option>
                          <option value="Energía">Energía</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Ubicación</Form.Label>
                        <Form.Control
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Estado</Form.Label>
                        <Form.Select
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                        >
                          <option value="active">Activo</option>
                          <option value="inactive">Inactivo</option>
                          <option value="maintenance">Mantenimiento</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Marca</Form.Label>
                        <Form.Control
                          type="text"
                          name="brand"
                          value={formData.brand}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Modelo</Form.Label>
                        <Form.Control
                          type="text"
                          name="model"
                          value={formData.model}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Dirección IP</Form.Label>
                        <Form.Control
                          type="text"
                          name="ip"
                          value={formData.ip}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Firmware</Form.Label>
                        <Form.Control
                          type="text"
                          name="firmware"
                          value={formData.firmware}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              ) : (
                <Row>
                  <Col md={6} className="mb-3">
                    <p style={{ margin: 0, fontSize: '14px', color: colors.accent }}>ID del Dispositivo</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color: colors.primaryDark }}>{device.id}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <p style={{ margin: 0, fontSize: '14px', color: colors.accent }}>Nombre</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color: colors.primaryDark }}>{device.name}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <p style={{ margin: 0, fontSize: '14px', color: colors.accent }}>Tipo</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color: colors.primaryDark }}>{device.type}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <p style={{ margin: 0, fontSize: '14px', color: colors.accent }}>Ubicación</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color: colors.primaryDark }}>{device.location}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <p style={{ margin: 0, fontSize: '14px', color: colors.accent }}>Estado</p>
                    <Badge 
                      bg="none" 
                      style={{ 
                        backgroundColor: getStatusStyle(device.status).bg,
                        padding: '6px 10px',
                        borderRadius: '20px'
                      }}
                    >
                      {getStatusStyle(device.status).text}
                    </Badge>
                  </Col>
                  <Col md={6} className="mb-3">
                    <p style={{ margin: 0, fontSize: '14px', color: colors.accent }}>Última Conexión</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color: colors.primaryDark }}>{formatDate(device.lastConnection)}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <p style={{ margin: 0, fontSize: '14px', color: colors.accent }}>Marca</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color: colors.primaryDark }}>{device.brand}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <p style={{ margin: 0, fontSize: '14px', color: colors.accent }}>Modelo</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color: colors.primaryDark }}>{device.model}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <p style={{ margin: 0, fontSize: '14px', color: colors.accent }}>Dirección IP</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color: colors.primaryDark }}>{device.ip}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <p style={{ margin: 0, fontSize: '14px', color: colors.accent }}>Versión de Firmware</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color: colors.primaryDark }}>{device.firmware}</p>
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={5}>
          <Card style={{
            borderRadius: '10px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            border: 'none',
            marginBottom: '20px'
          }}>
            <Card.Body>
              <h5 style={{
                color: colors.primaryDark,
                fontFamily: typography.fontPrimary,
                borderBottom: `1px solid ${colors.accent}`,
                paddingBottom: '10px',
                marginBottom: '20px'
              }}>
                Estado del Dispositivo
              </h5>
              
              <div className="d-flex flex-column gap-3">
                {device.batteryLevel !== undefined && (
                  <div>
                    <p style={{ margin: 0, fontSize: '14px', color: colors.accent }}>Nivel de Batería</p>
                    <div className="progress" style={{ height: '20px' }}>
                      <div 
                        className="progress-bar" 
                        role="progressbar" 
                        style={{ 
                          width: `${device.batteryLevel}%`, 
                          backgroundColor: device.batteryLevel < 20 ? '#d9534f' : '#5cb85c',
                          height: '20px'
                        }} 
                        aria-valuenow={device.batteryLevel} 
                        aria-valuemin="0" 
                        aria-valuemax="100"
                      >
                        {device.batteryLevel}%
                      </div>
                    </div>
                  </div>
                )}
                
                {device.temperature !== undefined && (
                  <div>
                    <p style={{ margin: 0, fontSize: '14px', color: colors.accent }}>Temperatura Actual</p>
                    <h3 style={{ color: colors.primaryDark, fontFamily: typography.fontPrimary }}>{device.temperature}°C</h3>
                  </div>
                )}
                
                {device.brightness !== undefined && (
                  <div>
                    <p style={{ margin: 0, fontSize: '14px', color: colors.accent }}>Nivel de Brillo</p>
                    <div className="progress" style={{ height: '20px' }}>
                      <div 
                        className="progress-bar" 
                        role="progressbar" 
                        style={{ 
                          width: `${device.brightness}%`, 
                          backgroundColor: colors.primaryLight,
                          height: '20px'
                        }} 
                        aria-valuenow={device.brightness} 
                        aria-valuemin="0" 
                        aria-valuemax="100"
                      >
                        {device.brightness}%
                      </div>
                    </div>
                  </div>
                )}
                
                {device.volume !== undefined && (
                  <div>
                    <p style={{ margin: 0, fontSize: '14px', color: colors.accent }}>Volumen</p>
                    <div className="progress" style={{ height: '20px' }}>
                      <div 
                        className="progress-bar" 
                        role="progressbar" 
                        style={{ 
                          width: `${device.volume}%`, 
                          backgroundColor: colors.primaryLight,
                          height: '20px'
                        }} 
                        aria-valuenow={device.volume} 
                        aria-valuemin="0" 
                        aria-valuemax="100"
                      >
                        {device.volume}%
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
          
          <Card style={{
            borderRadius: '10px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            border: 'none'
          }}>
            <Card.Body>
              <h5 style={{
                color: colors.primaryDark,
                fontFamily: typography.fontPrimary,
                borderBottom: `1px solid ${colors.accent}`,
                paddingBottom: '10px',
                marginBottom: '20px'
              }}>
                Información Adicional
              </h5>
              
              <Row>
                <Col xs={12} className="mb-3">
                  <p style={{ margin: 0, fontSize: '14px', color: colors.accent }}>Fecha de Adquisición</p>
                  <p style={{ margin: 0, fontWeight: 'bold', color: colors.primaryDark }}>
                    {new Date(device.purchaseDate).toLocaleDateString('es-ES')}
                  </p>
                </Col>
                
                <Col xs={12}>
                  <div className="d-grid gap-2 mt-3">
                    <Button 
                      style={{
                        ...buttons.primary,
                        backgroundColor: '#f0ad4e',
                        borderColor: '#f0ad4e'
                      }}
                    >
                      Reiniciar Dispositivo
                    </Button>
                    <Button 
                      style={{
                        ...buttons.secondary,
                        backgroundColor: '#d9534f',
                        borderColor: '#d9534f'
                      }}
                    >
                      Eliminar Dispositivo
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DispositivoDetail;