import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Tabs, Tab, Modal, Form, Alert, Table, Badge } from "react-bootstrap";
import { colors, typography, textStyles, buttons } from "../../styles/styles";

const Dispositivos = () => {
  const [activeTab, setActiveTab] = useState("lista");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModalAlta, setShowModalAlta] = useState(false);
  const [formData, setFormData] = useState({
    mac: "",
    nombre: "",
    tipo: "Sensor",
    ubicacion: "",
    status: true,
  });
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/dispositivos");
        if (!response.ok) {
          throw new Error("Error al obtener los dispositivos");
        }
        const data = await response.json();
        setDevices(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const handleDeviceSelect = (deviceId) => {
    const device = devices.find((d) => d.id === deviceId);
    setSelectedDevice(device);
    setActiveTab("detalle");
  };

  const handleBackToList = () => {
    setActiveTab("lista");
    setSelectedDevice(null);
  };

  const handleUpdateDevice = (updatedDevice) => {
    console.log("Actualizando dispositivo:", updatedDevice);

    const updatedDevices = devices.map((device) =>
      device.id === updatedDevice.id ? updatedDevice : device
    );

    setDevices(updatedDevices);
    setSelectedDevice(updatedDevice);

    alert("Dispositivo actualizado correctamente");
  };

  const handleOpenModalAlta = () => {
    setFormData({
      mac: "",
      nombre: "",
      tipo: "Sensor",
      ubicacion: "",
      status: true,
    });
    setValidated(false);
    setShowModalAlta(true);
  };

  const handleCloseModalAlta = () => {
    setShowModalAlta(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const newDevice = {
        id: `${devices.length + 1001}`,
        mac: formData.mac,
        nombre: formData.nombre,
        tipo: formData.tipo,
        ubicacion: formData.ubicacion,
        status: formData.status,
      };

      setDevices([...devices, newDevice]);
      handleCloseModalAlta();
      alert("Dispositivo agregado correctamente");
    } catch (error) {
      console.error("Error al agregar dispositivo:", error);
      alert("Error al agregar dispositivo");
    }
  };

  return (
    <div>
      <h2 style={textStyles.title}>Dispositivos (IoT)</h2>
      <p style={textStyles.paragraph}>
        Gestiona todos tus dispositivos conectados en un solo lugar.
      </p>

      <div className="mb-4">
        <Row>
          <Col>
            <Card
              style={{
                backgroundColor: colors.primaryLight,
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              <Row className="align-items-center">
                <Col md={9}>
                  <h4
                    style={{
                      color: colors.white,
                      fontFamily: typography.fontPrimary,
                      marginBottom: "5px",
                    }}
                  >
                    Estado de la Red
                  </h4>
                  <p
                    style={{
                      color: colors.white,
                      marginBottom: "0",
                      fontSize: "14px",
                    }}
                  >
                    {devices.filter((d) => d.status).length} dispositivos
                    activos de {devices.length} totales
                  </p>
                </Col>
                <Col md={3} className="text-end">
                  <Button
                    style={{
                      ...buttons.primary,
                      backgroundColor: colors.white,
                      color: colors.primaryDark,
                    }}
                  >
                    Escanear Red
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <p style={textStyles.paragraph}>Cargando dispositivos...</p>
        </div>
      ) : (
        <Card
          style={{
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            border: "none",
          }}
        >
          <Card.Body>
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="mb-4"
            >
              <Tab eventKey="lista" title="Lista de Dispositivos">
                {activeTab === "lista" && (
                  <div>
                    <div className="d-flex justify-content-end mb-3">
                      <Button
                        variant="primary"
                        onClick={handleOpenModalAlta}
                        style={{
                          backgroundColor: colors.primaryDark,
                          borderColor: colors.primaryDark,
                        }}
                      >
                        Agregar Dispositivo
                      </Button>
                    </div>
                    <Table responsive hover>
                      <thead>
                        <tr>
                          <th>MAC</th>
                          <th>Nombre</th>
                          <th>Tipo</th>
                          <th>Ubicación</th>
                          <th>Estado</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {devices.map((device) => (
                          <tr key={device.id}>
                            <td>{device.mac}</td>
                            <td>{device.nombre}</td>
                            <td>{device.tipo}</td>
                            <td>{device.ubicacion}</td>
                            <td>
                              <Badge bg={device.status ? "success" : "danger"}>
                                {device.status ? "Activo" : "Inactivo"}
                              </Badge>
                            </td>
                            <td>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="me-2"
                                onClick={() => handleDeviceSelect(device.id)}
                              >
                                Ver Detalles
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
              </Tab>
              <Tab
                eventKey="detalle"
                title="Vista Detalle"
                disabled={!selectedDevice}
              >
                {activeTab === "detalle" && selectedDevice && (
                  <div>
                    <h4>Detalles del Dispositivo</h4>
                    <p>MAC: {selectedDevice.mac}</p>
                    <p>Nombre: {selectedDevice.nombre}</p>
                    <p>Tipo: {selectedDevice.tipo}</p>
                    <p>Ubicación: {selectedDevice.ubicacion}</p>
                    <p>
                      Estado: {selectedDevice.status ? "Activo" : "Inactivo"}
                    </p>
                    <Button
                      variant="secondary"
                      onClick={handleBackToList}
                      style={{
                        backgroundColor: colors.primaryDark,
                        borderColor: colors.primaryDark,
                      }}
                    >
                      Volver a la Lista
                    </Button>
                  </div>
                )}
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      )}

      <Modal show={showModalAlta} onHide={handleCloseModalAlta}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: colors.primaryMedium, color: colors.white }}
        >
          <Modal.Title>Nuevo Dispositivo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>MAC Address *</Form.Label>
              <Form.Control
                type="text"
                name="mac"
                value={formData.mac}
                onChange={handleChange}
                required
                pattern="^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$"
                placeholder="00:1A:2B:3C:4D:5E"
              />
              <Form.Control.Feedback type="invalid">
                Ingrese una dirección MAC válida (formato: XX:XX:XX:XX:XX:XX)
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombre del Dispositivo *</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Ej: Sensor de Temperatura Sala"
              />
              <Form.Control.Feedback type="invalid">
                El nombre es requerido
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tipo de Dispositivo *</Form.Label>
              <Form.Select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                required
              >
                <option value="Sensor">Sensor</option>
                <option value="Controlador">Controlador</option>
                <option value="Actuador">Actuador</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ubicación *</Form.Label>
              <Form.Control
                type="text"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleChange}
                required
                placeholder="Ej: Sala de estar"
              />
              <Form.Control.Feedback type="invalid">
                La ubicación es requerida
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="status"
                label="Dispositivo activo"
                checked={formData.status}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleCloseModalAlta}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                type="submit"
                style={{
                  backgroundColor: colors.primaryDark,
                  borderColor: colors.primaryDark,
                }}
              >
                Agregar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Dispositivos;
