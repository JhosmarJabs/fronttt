import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Form,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";
import { colors, textStyles } from "../../../styles/styles";
import { API_URL } from "../../../config";

const UsuariosGeneral = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("");
  const [rolFiltro, setRolFiltro] = useState("");

  // Cargar usuarios desde la API
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setLoading(true);

        // Obtener token de autenticación del localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No se ha iniciado sesión o la sesión ha expirado");
        }

        // URL corregida - usando la ruta correcta según la estructura de la API
        const response = await fetch(`${API_URL}/usuarios/u`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Error al obtener usuarios: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("Datos recibidos:", data);
        setUsuarios(data);
        setError(null);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        setError("No se pudieron cargar los usuarios. " + error.message);
        setUsuarios([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  // Función para cambiar el estado (activar/desactivar) de un usuario
  const cambiarEstadoUsuario = async (id, nuevoEstado) => {
    try {
      // Obtener token de autenticación del localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se ha iniciado sesión o la sesión ha expirado");
      }

      // URL corregida para la actualización
      const response = await fetch(`${API_URL}/usuario/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: nuevoEstado ? "active" : "inactive" }),
      });

      if (!response.ok) {
        throw new Error(
          `Error al actualizar usuario: ${response.status} ${response.statusText}`
        );
      }

      // Actualizar la lista de usuarios en el estado
      setUsuarios(
        usuarios.map((user) =>
          user._id === id
            ? { ...user, status: nuevoEstado ? "active" : "inactive" }
            : user
        )
      );
    } catch (error) {
      console.error("Error al cambiar estado del usuario:", error);
      alert("Error al cambiar el estado del usuario: " + error.message);
    }
  };

  // Filtrar usuarios
  const usuariosFiltrados = usuarios.filter((usuario) => {
    // Verificar si el usuario tiene las propiedades necesarias
    if (!usuario || !usuario.name) return false;

    const nombreCompleto = `${usuario.name} ${
      usuario.surname || ""
    }`.toLowerCase();
    const coincideTexto =
      nombreCompleto.includes(filtro.toLowerCase()) ||
      (usuario.email &&
        usuario.email.toLowerCase().includes(filtro.toLowerCase()));
    const coincideRol = rolFiltro === "" || usuario.role === rolFiltro;
    return coincideTexto && coincideRol;
  });

  // Obtener roles únicos para el filtro
  const roles = [...new Set(usuarios.map((u) => u.role).filter(Boolean))];

  // Estadísticas de usuarios
  const estadisticas = {
    total: usuarios.length,
    activos: usuarios.filter((u) => u.status === "active").length,
    inactivos: usuarios.filter((u) => u.status !== "active").length,
    administradores: usuarios.filter((u) => u.role === "admin").length,
    clientes: usuarios.filter((u) => u.role === "user").length,
    vendedores: usuarios.filter((u) => u.role === "staff").length,
  };

  // Estilos
  const pageStyles = {
    card: {
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      marginBottom: "20px",
    },
    statCard: {
      borderLeft: `4px solid ${colors.primaryMedium}`,
      borderRadius: "8px",
      padding: "15px",
      marginBottom: "20px",
    },
    statTitle: {
      fontSize: "14px",
      color: colors.primaryMedium,
      marginBottom: "5px",
    },
    statValue: {
      fontSize: "24px",
      fontWeight: "bold",
      color: colors.primaryDark,
    },
    loadingContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "300px",
      width: "100%",
      textAlign: "center",
    },
    errorContainer: {
      padding: "20px",
      marginBottom: "20px",
      borderRadius: "8px",
    },
  };

  // Renderizar carga
  if (loading) {
    return (
      <Container fluid style={{ padding: "30px 20px" }}>
        <div style={pageStyles.loadingContainer}>
          <Spinner
            animation="border"
            role="status"
            variant="primary"
            style={{ marginBottom: "20px" }}
          >
            <span className="visually-hidden">Cargando usuarios...</span>
          </Spinner>
          <p style={{ fontSize: "18px", color: colors.primaryMedium }}>
            Cargando información de usuarios...
          </p>
        </div>
      </Container>
    );
  }

  // Renderizar error
  if (error) {
    return (
      <Container fluid style={{ padding: "30px 20px" }}>
        <Alert variant="danger" style={pageStyles.errorContainer}>
          <Alert.Heading>Error al cargar usuarios</Alert.Heading>
          <p>{error}</p>
          <hr />
          <div className="d-flex justify-content-between">
            <Button
              variant="outline-danger"
              onClick={() => window.location.reload()}
            >
              Intentar nuevamente
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => window.history.back()}
            >
              Volver atrás
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid style={{ padding: "30px 20px" }}>
      <Row className="mb-4">
        <Col>
          <h2 style={textStyles.title}>Vista General de Usuarios</h2>
          <p style={textStyles.paragraph}>
            Gestión y visualización de todos los usuarios del sistema.
          </p>
        </Col>
      </Row>

      {/* Estadísticas */}
      <Row className="mb-4">
        <Col md={4} lg={2}>
          <Card style={{ ...pageStyles.card, ...pageStyles.statCard }}>
            <div style={pageStyles.statTitle}>Total Usuarios</div>
            <div style={pageStyles.statValue}>{estadisticas.total}</div>
          </Card>
        </Col>
        <Col md={4} lg={2}>
          <Card
            style={{
              ...pageStyles.card,
              ...pageStyles.statCard,
              borderLeftColor: "#28a745",
            }}
          >
            <div style={pageStyles.statTitle}>Usuarios Activos</div>
            <div style={pageStyles.statValue}>{estadisticas.activos}</div>
          </Card>
        </Col>
        <Col md={4} lg={2}>
          <Card
            style={{
              ...pageStyles.card,
              ...pageStyles.statCard,
              borderLeftColor: "#dc3545",
            }}
          >
            <div style={pageStyles.statTitle}>Usuarios Inactivos</div>
            <div style={pageStyles.statValue}>{estadisticas.inactivos}</div>
          </Card>
        </Col>
        <Col md={4} lg={2}>
          <Card
            style={{
              ...pageStyles.card,
              ...pageStyles.statCard,
              borderLeftColor: "#007bff",
            }}
          >
            <div style={pageStyles.statTitle}>Administradores</div>
            <div style={pageStyles.statValue}>
              {estadisticas.administradores}
            </div>
          </Card>
        </Col>
        <Col md={4} lg={2}>
          <Card
            style={{
              ...pageStyles.card,
              ...pageStyles.statCard,
              borderLeftColor: "#6f42c1",
            }}
          >
            <div style={pageStyles.statTitle}>Clientes</div>
            <div style={pageStyles.statValue}>{estadisticas.clientes}</div>
          </Card>
        </Col>
        <Col md={4} lg={2}>
          <Card
            style={{
              ...pageStyles.card,
              ...pageStyles.statCard,
              borderLeftColor: "#fd7e14",
            }}
          >
            <div style={pageStyles.statTitle}>Vendedores</div>
            <div style={pageStyles.statValue}>{estadisticas.vendedores}</div>
          </Card>
        </Col>
      </Row>

      {/* Filtros */}
      <Row className="mb-4">
        <Col md={9}>
          <Form.Control
            type="text"
            placeholder="Buscar por nombre o email..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Select
            value={rolFiltro}
            onChange={(e) => setRolFiltro(e.target.value)}
          >
            <option value="">Todos los roles</option>
            {roles.map((rol, idx) => (
              <option key={idx} value={rol}>
                {rol === "admin"
                  ? "Administrador"
                  : rol === "user"
                  ? "Cliente"
                  : rol === "staff"
                  ? "Vendedor"
                  : rol.charAt(0).toUpperCase() + rol.slice(1)}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* Tabla de Usuarios */}
      <Card style={pageStyles.card}>
        <Card.Body>
          <Card.Title className="mb-4">Listado de Usuarios</Card.Title>
          {usuariosFiltrados.length === 0 ? (
            <Alert variant="info">
              No se encontraron usuarios con los criterios de búsqueda
              especificados.
            </Alert>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Fecha Registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map((usuario) => (
                  <tr key={usuario._id}>
                    <td>{usuario._id.substring(0, 8)}...</td>
                    <td>{`${usuario.name} ${usuario.surname || ""}`}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.phone || "N/A"}</td>
                    <td>
                      <Badge
                        bg={
                          usuario.role === "admin"
                            ? "danger"
                            : usuario.role === "staff"
                            ? "warning"
                            : "info"
                        }
                      >
                        {usuario.role === "admin"
                          ? "Administrador"
                          : usuario.role === "user"
                          ? "Cliente"
                          : usuario.role === "staff"
                          ? "Vendedor"
                          : usuario.role}
                      </Badge>
                    </td>
                    <td>
                      <Badge
                        bg={
                          usuario.status === "active" ? "success" : "secondary"
                        }
                      >
                        {usuario.status === "active"
                          ? "Activo"
                          : usuario.status === "inactive"
                          ? "Inactivo"
                          : usuario.status === "suspended"
                          ? "Suspendido"
                          : usuario.status}
                      </Badge>
                    </td>
                    <td>
                      {usuario.date
                        ? new Date(usuario.date).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() =>
                          (window.location.href = `/admin/usuarios/${usuario._id}`)
                        }
                      >
                        Ver
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="me-2"
                        onClick={() =>
                          (window.location.href = `/admin/usuarios/editar/${usuario._id}`)
                        }
                      >
                        Editar
                      </Button>
                      <Button
                        variant={
                          usuario.status === "active"
                            ? "outline-warning"
                            : "outline-success"
                        }
                        size="sm"
                        onClick={() =>
                          cambiarEstadoUsuario(
                            usuario._id,
                            usuario.status !== "active"
                          )
                        }
                      >
                        {usuario.status === "active" ? "Desactivar" : "Activar"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UsuariosGeneral;
