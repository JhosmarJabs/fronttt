import React, { useState } from "react";
import { Table, Form, Button, Badge, InputGroup } from "react-bootstrap";
import { colors, typography, buttons } from "../styles/styles";

const DispositivosList = ({ devices, onSelectDevice, onAddDevice }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");

  // Función para filtrar dispositivos
  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "" || device.type === filterType;

    return matchesSearch && matchesType;
  });

  // Función para obtener estilo de estado
  const getStatusStyle = (status) => {
    switch (status) {
      case "active":
        return { bg: "#5cb85c", text: "Activo" };
      case "inactive":
        return { bg: "#d9534f", text: "Inactivo" };
      case "maintenance":
        return { bg: "#f0ad4e", text: "Mantenimiento" };
      default:
        return { bg: colors.accent, text: "Desconocido" };
    }
  };

  // Obtener tipos únicos para el filtro
  const deviceTypes = ["", ...new Set(devices.map((device) => device.type))];

  return (
    <div>
      <div className="mb-4">
        <div className="d-flex flex-column flex-md-row gap-3 justify-content-between align-items-center mb-3">
          <h4
            style={{
              color: colors.primaryDark,
              fontFamily: typography.fontPrimary,
              margin: 0,
            }}
          >
            Lista de Dispositivos ({filteredDevices.length})
          </h4>
          <div className="d-flex gap-2">
            <Button
              variant="primary"
              onClick={onAddDevice}
              style={{
                backgroundColor: colors.primaryDark,
                borderColor: colors.primaryDark,
              }}
            >
              Agregar Dispositivo
            </Button>
          </div>
        </div>

        <div className="d-flex flex-column flex-md-row gap-3">
          <InputGroup className="mb-3" style={{ maxWidth: "400px" }}>
            <InputGroup.Text
              style={{
                backgroundColor: colors.primaryDark,
                color: colors.white,
                border: "none",
              }}
            >
              <i className="fas fa-search"></i>
            </InputGroup.Text>
            <Form.Control
              placeholder="Buscar por nombre, ID o ubicación"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderColor: colors.primaryLight }}
            />
          </InputGroup>

          <Form.Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              maxWidth: "200px",
              borderColor: colors.primaryLight,
            }}
          >
            <option value="">Todos los tipos</option>
            {deviceTypes
              .filter((type) => type !== "")
              .map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
          </Form.Select>
        </div>
      </div>

      <div className="table-responsive">
        <Table hover style={{ fontSize: "14px" }}>
          <thead
            style={{
              backgroundColor: colors.primaryLight,
              color: colors.white,
            }}
          >
            <tr>
              <th style={{ padding: "12px 16px" }}>ID</th>
              <th style={{ padding: "12px 16px" }}>Nombre</th>
              <th style={{ padding: "12px 16px" }}>Tipo</th>
              <th style={{ padding: "12px 16px" }}>Ubicación</th>
              <th style={{ padding: "12px 16px" }}>Estado</th>
              <th style={{ padding: "12px 16px" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevices.length > 0 ? (
              filteredDevices.map((device) => (
                <tr key={device.id} style={{ verticalAlign: "middle" }}>
                  <td style={{ padding: "12px 16px" }}>{device.id}</td>
                  <td style={{ padding: "12px 16px" }}>{device.name}</td>
                  <td style={{ padding: "12px 16px" }}>{device.type}</td>
                  <td style={{ padding: "12px 16px" }}>{device.location}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <Badge
                      bg="none"
                      style={{
                        backgroundColor: getStatusStyle(device.status).bg,
                        padding: "6px 10px",
                        borderRadius: "20px",
                      }}
                    >
                      {getStatusStyle(device.status).text}
                    </Badge>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => onSelectDevice(device.id)}
                        style={{
                          borderColor: colors.primaryMedium,
                          color: colors.primaryMedium,
                          padding: "4px 8px",
                          fontSize: "12px",
                        }}
                      >
                        Ver Detalles
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No se encontraron dispositivos con los filtros aplicados
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default DispositivosList;
