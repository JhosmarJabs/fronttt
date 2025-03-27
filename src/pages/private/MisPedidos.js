import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge, Button, Form, Pagination, Modal, ListGroup } from "react-bootstrap";
import { colors, typography, buttons, textStyles } from "../../styles/styles";

const MisPedidos = () => {
  // Estado para los pedidos y filtros
  const [pedidos, setPedidos] = useState([]);
  const [filteredPedidos, setFilteredPedidos] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);

  // Datos de ejemplo para pedidos de dispositivos IoT
  const pedidosData = [
    {
      id: "PED-001-2023",
      fecha: "15/03/2023",
      estado: "Entregado",
      productos: [
        { nombre: "Control de Iluminación", cantidad: 2, precio: 129.99 },
        { nombre: "Sensor de Movimiento Inteligente", cantidad: 1, precio: 89.99 }
      ],
      total: 349.97,
      direccion: "Calle Ejemplo 123, Ciudad",
      metodoPago: "Tarjeta terminada en 4582",
      fechaEntrega: "20/03/2023"
    },
    {
      id: "PED-002-2023",
      fecha: "22/04/2023",
      estado: "Enviado",
      productos: [
        { nombre: "Termostato Inteligente", cantidad: 1, precio: 279.99 },
        { nombre: "Asistente de Voz", cantidad: 1, precio: 299.99 }
      ],
      total: 579.98,
      direccion: "Avenida Principal 456, Ciudad",
      metodoPago: "PayPal",
      numeroSeguimiento: "TRK78932465"
    },
    {
      id: "PED-003-2023",
      fecha: "05/05/2023",
      estado: "Pendiente",
      productos: [
        { nombre: "Cámara de Seguridad 360°", cantidad: 1, precio: 349.99 },
        { nombre: "Cerradura Digital", cantidad: 2, precio: 199.99 }
      ],
      total: 749.97,
      direccion: "Calle Secundaria 789, Ciudad",
      metodoPago: "Transferencia bancaria"
    },
    {
      id: "PED-004-2023",
      fecha: "10/06/2023",
      estado: "Cancelado",
      productos: [
        { nombre: "Automatización Inteligente", cantidad: 1, precio: 199.99 }
      ],
      total: 199.99,
      direccion: "Plaza Central 321, Ciudad",
      metodoPago: "Tarjeta terminada en 7895",
      motivoCancelacion: "Cliente solicitó cancelación"
    },
    {
      id: "PED-005-2023",
      fecha: "18/07/2023",
      estado: "Entregado",
      productos: [
        { nombre: "Monitoreo Remoto", cantidad: 1, precio: 249.99 },
        { nombre: "Eficiencia Energética", cantidad: 1, precio: 179.99 }
      ],
      total: 429.98,
      direccion: "Avenida Norte 654, Ciudad",
      metodoPago: "Efectivo contra entrega",
      fechaEntrega: "25/07/2023"
    },
    {
      id: "PED-006-2023",
      fecha: "03/08/2023",
      estado: "Pendiente",
      productos: [
        { nombre: "Regulador de Consumo Energético", cantidad: 2, precio: 159.99 }
      ],
      total: 319.98,
      direccion: "Calle Este 987, Ciudad",
      metodoPago: "Tarjeta terminada en 1234"
    },
    {
      id: "PED-007-2023",
      fecha: "12/09/2023",
      estado: "Enviado",
      productos: [
        { nombre: "Sensor de Movimiento Inteligente", cantidad: 3, precio: 89.99 },
        { nombre: "Control de Iluminación", cantidad: 1, precio: 129.99 }
      ],
      total: 399.96,
      direccion: "Boulevard Sur 159, Ciudad",
      metodoPago: "PayPal",
      numeroSeguimiento: "TRK45678923"
    },
    {
      id: "PED-008-2023",
      fecha: "20/10/2023",
      estado: "Entregado",
      productos: [
        { nombre: "Termostato Inteligente", cantidad: 1, precio: 279.99 }
      ],
      total: 279.99,
      direccion: "Avenida Oeste 753, Ciudad",
      metodoPago: "Tarjeta terminada en 6543",
      fechaEntrega: "28/10/2023"
    },
    {
      id: "PED-009-2023",
      fecha: "08/11/2023",
      estado: "Cancelado",
      productos: [
        { nombre: "Asistente de Voz", cantidad: 1, precio: 299.99 },
        { nombre: "Cerradura Digital", cantidad: 1, precio: 199.99 }
      ],
      total: 499.98,
      direccion: "Calle Central 456, Ciudad",
      metodoPago: "Transferencia bancaria",
      motivoCancelacion: "Producto no disponible"
    },
    {
      id: "PED-010-2023",
      fecha: "15/12/2023",
      estado: "Enviado",
      productos: [
        { nombre: "Cámara de Seguridad 360°", cantidad: 2, precio: 349.99 },
        { nombre: "Automatización Inteligente", cantidad: 1, precio: 199.99 },
        { nombre: "Control de Iluminación", cantidad: 1, precio: 129.99 }
      ],
      total: 1029.96,
      direccion: "Avenida Principal 789, Ciudad",
      metodoPago: "Tarjeta terminada en 9876",
      numeroSeguimiento: "TRK12345678"
    }
  ];

  // Cargar datos cuando se monta el componente
  useEffect(() => {
    setPedidos(pedidosData);
    setFilteredPedidos(pedidosData);
  }, []);

  // Filtrar pedidos por estado
  useEffect(() => {
    if (filtroEstado === "Todos") {
      setFilteredPedidos(pedidos);
    } else {
      setFilteredPedidos(pedidos.filter(pedido => pedido.estado === filtroEstado));
    }
    setCurrentPage(1);
  }, [filtroEstado, pedidos]);

  // Obtener los pedidos de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPedidos.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Mostrar detalle del pedido
  const handleShowDetail = (pedido) => {
    setSelectedPedido(pedido);
    setShowModal(true);
  };

  // Colores según el estado del pedido
  const getStatusColor = (estado) => {
    switch (estado) {
      case "Entregado":
        return "#28a745"; // Verde
      case "Enviado":
        return "#007bff"; // Azul
      case "Pendiente":
        return "#ffc107"; // Amarillo
      case "Cancelado":
        return "#dc3545"; // Rojo
      default:
        return colors.primaryMedium;
    }
  };

  // Obtener componente de badge según el estado
  const getStatusBadge = (estado) => {
    return (
      <Badge 
        pill 
        style={{ 
          backgroundColor: getStatusColor(estado),
          color: 'white',
          padding: '8px 12px',
          fontSize: '14px'
        }}
      >
        {estado}
      </Badge>
    );
  };

  return (
    <Container style={{ 
      maxWidth: "1000px", 
      margin: "40px auto",
      fontFamily: typography.fontSecondary
    }}>
      <Row className="mb-4">
        <Col>
          <h2 style={{
            ...textStyles.title,
            textAlign: "left",
            borderBottom: `2px solid ${colors.primaryLight}`,
            paddingBottom: "10px",
            marginBottom: "20px"
          }}>
            Mis Pedidos
          </h2>
          <p style={textStyles.paragraph}>Gestiona y revisa el historial de tus pedidos de dispositivos IoT.</p>
        </Col>
      </Row>

      {/* Filtros */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label style={{ 
              color: colors.primaryDark,
              fontFamily: typography.fontSecondary,
              fontWeight: "600"
            }}>
              Filtrar por estado:
            </Form.Label>
            <Form.Select 
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              style={{
                borderColor: colors.primaryLight,
                color: colors.primaryDark,
                fontFamily: typography.fontSecondary
              }}
            >
              <option value="Todos">Todos los pedidos</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Enviado">Enviado</option>
              <option value="Entregado">Entregado</option>
              <option value="Cancelado">Cancelado</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6} className="text-end">
          <p style={{ 
            color: colors.primaryMedium,
            marginTop: "30px" 
          }}>
            Mostrando {filteredPedidos.length} {filteredPedidos.length === 1 ? 'pedido' : 'pedidos'}
          </p>
        </Col>
      </Row>

      {/* Lista de pedidos */}
      {currentItems.length > 0 ? (
        currentItems.map((pedido) => (
          <Card 
            key={pedido.id} 
            className="mb-3 shadow-sm"
            style={{ borderRadius: "8px", borderColor: colors.accent }}
          >
            <Card.Body>
              <Row>
                <Col md={3} className="d-flex flex-column justify-content-center">
                  <div className="mb-2">
                    <span style={{ 
                      color: colors.primaryMedium,
                      fontFamily: typography.fontSecondary
                    }}>
                      Número de pedido:
                    </span>
                    <p style={{ 
                      color: colors.primaryDark,
                      fontWeight: "bold",
                      marginBottom: "5px"
                    }}>
                      {pedido.id}
                    </p>
                  </div>
                  <div>
                    <span style={{ 
                      color: colors.primaryMedium,
                      fontFamily: typography.fontSecondary
                    }}>
                      Fecha:
                    </span>
                    <p style={{ 
                      color: colors.primaryDark,
                      marginBottom: "0"
                    }}>
                      {pedido.fecha}
                    </p>
                  </div>
                </Col>
                <Col md={3} className="d-flex flex-column justify-content-center">
                  <div className="mb-2">
                    <span style={{ 
                      color: colors.primaryMedium,
                      fontFamily: typography.fontSecondary
                    }}>
                      Estado:
                    </span>
                    <p className="mt-1">
                      {getStatusBadge(pedido.estado)}
                    </p>
                  </div>
                  <div>
                    <span style={{ 
                      color: colors.primaryMedium,
                      fontFamily: typography.fontSecondary
                    }}>
                      Productos:
                    </span>
                    <p style={{ 
                      color: colors.primaryDark,
                      marginBottom: "0"
                    }}>
                      {pedido.productos.length} {pedido.productos.length === 1 ? 'producto' : 'productos'}
                    </p>
                  </div>
                </Col>
                <Col md={3} className="d-flex flex-column justify-content-center">
                  <div>
                    <span style={{ 
                      color: colors.primaryMedium,
                      fontFamily: typography.fontSecondary
                    }}>
                      Total:
                    </span>
                    <p style={{ 
                      color: colors.primaryDark,
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      marginBottom: "0"
                    }}>
                      ${pedido.total.toFixed(2)}
                    </p>
                  </div>
                </Col>
                <Col md={3} className="d-flex align-items-center justify-content-end">
                  <Button
                    onClick={() => handleShowDetail(pedido)}
                    style={{
                      ...buttons.primary,
                      width: "100%"
                    }}
                  >
                    Ver Detalles
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      ) : (
        <Card className="text-center p-5">
          <Card.Body>
            <p style={{ color: colors.primaryMedium }}>No se encontraron pedidos con los filtros seleccionados.</p>
          </Card.Body>
        </Card>
      )}

      {/* Paginación */}
      {filteredPedidos.length > itemsPerPage && (
        <Row className="mt-4">
          <Col className="d-flex justify-content-center">
            <Pagination>
              <Pagination.Prev 
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              />
              
              {Array.from({ length: Math.ceil(filteredPedidos.length / itemsPerPage) }).map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                  style={{
                    backgroundColor: index + 1 === currentPage ? colors.primaryDark : 'white',
                    borderColor: colors.primaryLight
                  }}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              
              <Pagination.Next 
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(filteredPedidos.length / itemsPerPage)}
              />
            </Pagination>
          </Col>
        </Row>
      )}

      {/* Modal de detalles del pedido */}
      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)}
        size="lg"
      >
        <Modal.Header closeButton style={{ backgroundColor: colors.primaryDark, color: colors.white }}>
          <Modal.Title style={{ fontFamily: typography.fontPrimary }}>
            Detalles del Pedido {selectedPedido?.id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontFamily: typography.fontSecondary }}>
          {selectedPedido && (
            <>
              <Row className="mb-3">
                <Col sm={6}>
                  <h5 style={{ color: colors.primaryDark, fontWeight: "bold" }}>Información del Pedido</h5>
                  <p><strong>Número:</strong> {selectedPedido.id}</p>
                  <p><strong>Fecha:</strong> {selectedPedido.fecha}</p>
                  <p><strong>Estado:</strong> {getStatusBadge(selectedPedido.estado)}</p>
                  <p><strong>Método de Pago:</strong> {selectedPedido.metodoPago}</p>
                  {selectedPedido.numeroSeguimiento && (
                    <p><strong>Número de Seguimiento:</strong> {selectedPedido.numeroSeguimiento}</p>
                  )}
                  {selectedPedido.fechaEntrega && (
                    <p><strong>Fecha de Entrega:</strong> {selectedPedido.fechaEntrega}</p>
                  )}
                  {selectedPedido.motivoCancelacion && (
                    <p><strong>Motivo de Cancelación:</strong> {selectedPedido.motivoCancelacion}</p>
                  )}
                </Col>
                <Col sm={6}>
                  <h5 style={{ color: colors.primaryDark, fontWeight: "bold" }}>Dirección de Envío</h5>
                  <p>{selectedPedido.direccion}</p>
                </Col>
              </Row>
              
              <h5 style={{ 
                color: colors.primaryDark, 
                fontWeight: "bold", 
                borderBottom: `1px solid ${colors.primaryLight}`,
                paddingBottom: "10px",
                marginBottom: "15px"
              }}>
                Productos
              </h5>
              
              <ListGroup variant="flush">
                {selectedPedido.productos.map((producto, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center" style={{ 
                    borderBottom: `1px solid ${colors.accent}`,
                    padding: "10px 0"
                  }}>
                    <div>
                      <h6 style={{ color: colors.primaryDark, marginBottom: "5px" }}>{producto.nombre}</h6>
                      <small style={{ color: colors.primaryMedium }}>Cantidad: {producto.cantidad}</small>
                    </div>
                    <div style={{ color: colors.primaryDark, fontWeight: "bold" }}>
                      ${(producto.precio * producto.cantidad).toFixed(2)}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              
              <Row className="mt-4">
                <Col className="text-end">
                  <h5 style={{ color: colors.primaryDark }}>
                    Total: <span style={{ fontWeight: "bold" }}>${selectedPedido.total.toFixed(2)}</span>
                  </h5>
                </Col>
              </Row>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setShowModal(false)}
            style={{
              backgroundColor: colors.accent,
              borderColor: colors.accent
            }}
          >
            Cerrar
          </Button>
          {selectedPedido && selectedPedido.estado === "Enviado" && (
            <Button 
              style={{
                ...buttons.primary
              }}
            >
              Seguir Envío
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MisPedidos;