import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Tabs, Tab} from "react-bootstrap";
import { colors, typography, textStyles, buttons} from "../../styles/styles";
import DispositivosList from "../../components/DispositivosList.js";
import DispositivoDetail from "../../components/DispositivoDetail.js";

const Dispositivos = () => {
  const [activeTab, setActiveTab] = useState("lista");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simular carga de dispositivos (se reemplazaría con llamada a API)
  useEffect(() => {
    setTimeout(() => {
      // Datos de ejemplo - esto vendría de la API
      const mockDevices = [
        {
          id: "1001",
          name: "Cámara de Seguridad",
          type: "Seguridad",
          location: "Entrada Principal",
          status: "active",
          lastConnection: "2025-03-18T14:30:00",
          purchaseDate: "2024-05-10",
          brand: "SecureVision",
          model: "SV-Pro200",
          ip: "192.168.1.101",
          firmware: "v2.1.3",
          batteryLevel: 85,
        },
        {
          id: "1002",
          name: "Termostato Inteligente",
          type: "Climatización",
          location: "Salón",
          status: "active",
          lastConnection: "2025-03-19T09:15:00",
          purchaseDate: "2024-07-22",
          brand: "SmartTemp",
          model: "ST-501",
          ip: "192.168.1.102",
          firmware: "v3.0.2",
          temperature: 22.5,
        },
        {
          id: "1003",
          name: "Sensor de Movimiento",
          type: "Seguridad",
          location: "Pasillo",
          status: "inactive",
          lastConnection: "2025-03-15T23:45:00",
          purchaseDate: "2024-04-18",
          brand: "MotionGuard",
          model: "MG-100",
          ip: "192.168.1.103",
          firmware: "v1.5.1",
          batteryLevel: 12,
        },
        {
          id: "1004",
          name: "Control de Iluminación",
          type: "Domótica",
          location: "Cocina",
          status: "active",
          lastConnection: "2025-03-19T08:20:00",
          purchaseDate: "2024-09-05",
          brand: "LightControl",
          model: "LC-2000",
          ip: "192.168.1.104",
          firmware: "v2.2.0",
          brightness: 75,
        },
        {
          id: "1005",
          name: "Asistente de Voz",
          type: "Domótica",
          location: "Dormitorio",
          status: "active",
          lastConnection: "2025-03-19T07:10:00",
          purchaseDate: "2024-08-14",
          brand: "Echo AI",
          model: "EA-500",
          ip: "192.168.1.105",
          firmware: "v5.3.1",
          volume: 50,
        },
      ];

      setDevices(mockDevices);
      setLoading(false);
    }, 1000);
  }, []);

  // Cambiar a la vista de detalle cuando se selecciona un dispositivo
  const handleDeviceSelect = (deviceId) => {
    const device = devices.find((d) => d.id === deviceId);
    setSelectedDevice(device);
    setActiveTab("detalle");
  };

  // Volver a la lista de dispositivos
  const handleBackToList = () => {
    setActiveTab("lista");
    setSelectedDevice(null);
  };

  // Función para aplicar cambios al dispositivo (simulando actualización a backend)
  const handleUpdateDevice = (updatedDevice) => {
    // En una aplicación real, aquí se enviarían los datos al backend
    console.log("Actualizando dispositivo:", updatedDevice);

    // Actualizamos el estado local
    const updatedDevices = devices.map((device) =>
      device.id === updatedDevice.id ? updatedDevice : device
    );

    setDevices(updatedDevices);
    setSelectedDevice(updatedDevice);

    // Mostramos mensaje de éxito
    alert("Dispositivo actualizado correctamente");
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
                    {devices.filter((d) => d.status === "active").length}{" "}
                    dispositivos activos de {devices.length} totales
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
              style={{
                borderBottom: `1px solid ${colors.accent}`,
              }}
            >
              <Tab
                eventKey="lista"
                title="Lista de Dispositivos"
                style={{
                  fontFamily: typography.fontPrimary,
                  color: colors.primaryDark,
                }}
              >
                {activeTab === "lista" && (
                  <DispositivosList
                    devices={devices}
                    onSelectDevice={handleDeviceSelect}
                  />
                )}
              </Tab>
              <Tab
                eventKey="detalle"
                title="Vista Detalle"
                disabled={!selectedDevice}
                style={{
                  fontFamily: typography.fontPrimary,
                  color: colors.primaryDark,
                }}
              >
                {activeTab === "detalle" && selectedDevice && (
                  <DispositivoDetail
                    device={selectedDevice}
                    onBack={handleBackToList}
                    onUpdate={handleUpdateDevice}
                  />
                )}
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Dispositivos;
