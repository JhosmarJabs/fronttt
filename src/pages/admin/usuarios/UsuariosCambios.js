import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Button, Form, Modal, Badge, Alert, Tabs, Tab, InputGroup, Spinner,
} from "react-bootstrap";
import { FaUserEdit, FaIdCard, FaEnvelope, FaPhone, FaKey, FaEye, FaEyeSlash, FaUserTag,  FaHistory, FaSave, FaTrash, FaUserPlus, FaUser,
} from "react-icons/fa";
import { colors, textStyles } from "../../../styles/styles";
import { API_URL } from "../../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UsuariosCambios = () => {
  const navigate = useNavigate();

  // Estado para los usuarios
  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [rolFiltro, setRolFiltro] = useState("");

  // Estado para edición
  const [showModal, setShowModal] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [datosEditados, setDatosEditados] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [tabActiva, setTabActiva] = useState("informacion");

  // Estado para histórico de cambios
  const [historialCambios, setHistorialCambios] = useState([]);

  // Estado para confirmación de eliminación
  const [showEliminarModal, setShowEliminarModal] = useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
  const [motivoEliminacion, setMotivoEliminacion] = useState("");
  const [confirmacionEmail, setConfirmacionEmail] = useState("");

  // Estado para el modal de alta de usuarios
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    surname: "",
    phone: "",
    role: "user",
    status: "active",
  });
  const [validated, setValidated] = useState(false);

  // Estado para alertas
  const [alerta, setAlerta] = useState({
    show: false,
    variant: "",
    mensaje: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar usuarios desde la API al iniciar
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/usuarios/u`);
        setUsuarios(response.data);
        setError(null);
      } catch (err) {
        console.error("Error al cargar usuarios:", err);
        setError(
          "No se pudieron cargar los usuarios. Por favor, intente más tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  // Filtrar usuarios
  const usuariosFiltrados = usuarios.filter((usuario) => {
    const nombreCompleto = `${usuario.name} ${usuario.surname}`.toLowerCase();
    const coincideTexto =
      nombreCompleto.includes(filtro.toLowerCase()) ||
      usuario.email.toLowerCase().includes(filtro.toLowerCase()) ||
      (usuario._id && usuario._id.toLowerCase().includes(filtro.toLowerCase()));
    const coincideRol = rolFiltro === "" || usuario.role === rolFiltro;
    return coincideTexto && coincideRol;
  });

  // Obtener roles únicos para el filtro
  const roles = [...new Set(usuarios.map((u) => u.role))];

  // Función para obtener nombre del rol
  const getNombreRol = (rol) => {
    const roles = {
      admin: "Administrador",
      user: "Usuario",
    };
    return roles[rol] || rol;
  };

  // Opciones de departamentos - esto podría venir de la API también
  const departamentos = [
    "Tecnología",
    "Ventas",
    "Administración",
    "Soporte",
    "Marketing",
    "Operaciones",
    "Recursos Humanos",
  ];

  // Estadísticas de usuarios
  const estadisticas = {
    total: usuarios.length,
    activos: usuarios.filter((u) => u.status === "active").length,
    inactivos: usuarios.filter((u) => u.status !== "active").length,
    administradores: usuarios.filter((u) => u.role === "admin").length,
    clientes: usuarios.filter((u) => u.role === "user").length,
    vendedores: usuarios.filter((u) => u.role === "staff").length,
  };

  // Estados del usuario
  const estadosUsuario = [
    { value: "active", label: "Activo" },
    { value: "inactive", label: "Inactivo" },
    { value: "suspended", label: "Suspendido" },
  ];

  // Manejadores
  const handleOpenModal = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setDatosEditados({
      ...usuario,
      password: "",
      confirmPassword: "",
    });
    setShowModal(true);
    setTabActiva("informacion");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUsuarioSeleccionado(null);
    setDatosEditados({});
    setShowPassword(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDatosEditados({
      ...datosEditados,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleGuardarCambios = async () => {
    // Validaciones básicas
    if (
      !datosEditados.name ||
      !datosEditados.surname ||
      !datosEditados.email ||
      !datosEditados.phone
    ) {
      setAlerta({
        show: true,
        variant: "danger",
        mensaje: "Por favor complete todos los campos obligatorios.",
      });
      return;
    }

    // Validar email único si se ha cambiado
    if (datosEditados.email !== usuarioSeleccionado.email) {
      const emailExistente = usuarios.some(
        (u) => u.email === datosEditados.email && u._id !== datosEditados._id
      );

      if (emailExistente) {
        setAlerta({
          show: true,
          variant: "danger",
          mensaje: "El email ya está siendo utilizado por otro usuario.",
        });
        return;
      }
    }

    // Validar contraseñas si se están cambiando
    if (datosEditados.password) {
      if (datosEditados.password.length < 8) {
        setAlerta({
          show: true,
          variant: "danger",
          mensaje: "La contraseña debe tener al menos 8 caracteres.",
        });
        return;
      }

      if (datosEditados.password !== datosEditados.confirmPassword) {
        setAlerta({
          show: true,
          variant: "danger",
          mensaje: "Las contraseñas no coinciden.",
        });
        return;
      }
    }

    try {
      const { _id, confirmPassword, ...datosAEnviar } = datosEditados;

      // Si no se está cambiando la contraseña, eliminarla del objeto
      if (!datosAEnviar.password) {
        delete datosAEnviar.password;
      }

      const response = await axios.put(
        `${API_URL}/usuarios/${_id}`,
        datosAEnviar
      );

      // Actualizar el usuario en el estado local
      const usuariosActualizados = usuarios.map((u) => {
        if (u._id === _id) {
          return response.data;
        }
        return u;
      });

      setUsuarios(usuariosActualizados);

      // Registrar en el historial
      const nuevoCambio = {
        id: `CAM-${Date.now()}`,
        usuario: _id,
        nombreUsuario: `${datosAEnviar.name} ${datosAEnviar.surname}`,
        campoCambiado: "múltiples campos",
        valorAnterior: "-",
        valorNuevo: "-",
        fechaCambio: new Date().toISOString().split("T")[0],
        realizadoPor: "Usuario Actual", // En un caso real, sería el usuario logueado
      };

      setHistorialCambios([nuevoCambio, ...historialCambios]);

      // Mostrar mensaje de éxito
      setAlerta({
        show: true,
        variant: "success",
        mensaje: `Los datos del usuario ${datosAEnviar.name} ${datosAEnviar.surname} han sido actualizados correctamente.`,
      });

      // Cerrar modal
      handleCloseModal();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      setAlerta({
        show: true,
        variant: "danger",
        mensaje: `Error al actualizar usuario: ${
          error.response?.data?.message || error.message
        }`,
      });
    }
  };

  // Modal de eliminación
  const handleOpenEliminarModal = (usuario) => {
    setUsuarioAEliminar(usuario);
    setMotivoEliminacion("");
    setConfirmacionEmail("");
    setShowEliminarModal(true);
  };

  const handleCloseEliminarModal = () => {
    setShowEliminarModal(false);
    setUsuarioAEliminar(null);
    setMotivoEliminacion("");
    setConfirmacionEmail("");
  };

  // Función para eliminar usuario
  const handleEliminarUsuario = async () => {
    // Validación de campos
    if (!motivoEliminacion.trim()) {
      setAlerta({
        show: true,
        variant: "danger",
        mensaje: "Por favor ingrese un motivo para la eliminación.",
      });
      return;
    }

    if (confirmacionEmail !== usuarioAEliminar.email) {
      setAlerta({
        show: true,
        variant: "danger",
        mensaje: "El email de confirmación no coincide.",
      });
      return;
    }

    try {
      await axios.delete(`${API_URL}/usuarios/${usuarioAEliminar._id}`);

      // Actualizar el estado eliminando el usuario
      setUsuarios(usuarios.filter((u) => u._id !== usuarioAEliminar._id));

      // Registrar en el historial
      const nuevoCambio = {
        id: `CAM-${Date.now()}`,
        usuario: usuarioAEliminar._id,
        nombreUsuario: `${usuarioAEliminar.name} ${usuarioAEliminar.surname}`,
        campoCambiado: "eliminación",
        valorAnterior: "usuario existente",
        valorNuevo: "usuario eliminado",
        fechaCambio: new Date().toISOString().split("T")[0],
        realizadoPor: "Usuario Actual",
      };

      setHistorialCambios([nuevoCambio, ...historialCambios]);

      setAlerta({
        show: true,
        variant: "success",
        mensaje: `El usuario ${usuarioAEliminar.name} ${usuarioAEliminar.surname} ha sido eliminado correctamente.`,
      });

      handleCloseEliminarModal();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      setAlerta({
        show: true,
        variant: "danger",
        mensaje: `Error al eliminar usuario: ${
          error.response?.data?.message || error.message
        }`,
      });
    }
  };

  // Navegación a página de altas (reemplazado por modal integrado)
  const abrirModalRegistro = () => {
    setNuevoUsuario({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      surname: "",
      phone: "",
      role: "user",
      status: "active",
    });
    setValidated(false);
    setShowRegistroModal(true);
  };

  // Manejador para el cambio de campos en el formulario de registro
  const handleNuevoUsuarioChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNuevoUsuario({
      ...nuevoUsuario,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Manejador para cerrar el modal de registro
  const handleCloseRegistroModal = () => {
    setShowRegistroModal(false);
    setNuevoUsuario({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      surname: "",
      phone: "",
      role: "user",
      status: "active",
    });
    setValidated(false);
  };

  // Manejador para registrar un nuevo usuario
  const handleRegistrarUsuario = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    // Validar que las contraseñas coincidan
    if (nuevoUsuario.password !== nuevoUsuario.confirmPassword) {
      setAlerta({
        show: true,
        variant: "danger",
        mensaje: "Las contraseñas no coinciden.",
      });
      return;
    }

    try {
      // Eliminar confirmPassword del objeto a enviar
      const { confirmPassword, ...datosUsuario } = nuevoUsuario;

      const response = await axios.post(
        `${API_URL}/usuarios/register`,
        datosUsuario
      );

      // Agregar el nuevo usuario a la lista
      setUsuarios([...usuarios, response.data]);

      // Registrar en el historial
      const nuevoCambio = {
        id: `CAM-${Date.now()}`,
        usuario: response.data._id,
        nombreUsuario: `${datosUsuario.name} ${datosUsuario.surname}`,
        campoCambiado: "registro",
        valorAnterior: "N/A",
        valorNuevo: "Nuevo usuario",
        fechaCambio: new Date().toISOString().split("T")[0],
        realizadoPor: "Usuario Actual",
      };

      setHistorialCambios([nuevoCambio, ...historialCambios]);

      // Mostrar mensaje de éxito
      setAlerta({
        show: true,
        variant: "success",
        mensaje: `El usuario ${datosUsuario.name} ${datosUsuario.surname} ha sido registrado correctamente.`,
      });

      // Cerrar modal
      handleCloseRegistroModal();
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setAlerta({
        show: true,
        variant: "danger",
        mensaje: `Error al registrar usuario: ${
          error.response?.data?.message || error.message
        }`,
      });
    }
  };

  const pageStyles = {
    card: {
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      marginBottom: "20px",
    },
    title: {
      ...textStyles.title,
      marginBottom: "10px",
    },
    subtitle: {
      ...textStyles.subtitle,
      marginBottom: "20px",
    },
    badge: (status) => {
      const colors = {
        active: "#28a745",
        inactive: "#dc3545",
        suspended: "#fd7e14",
      };
      return { backgroundColor: colors[status] || "#6c757d" };
    },
    rolBadge: (rol) => {
      const colores = {
        admin: "#dc3545",
        user: "#6c757d",
      };
      return { backgroundColor: colores[rol] || colors.primaryLight };
    },
    formGroup: {
      marginBottom: "20px",
    },
    cambiosTable: {
      fontSize: "14px",
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
    altasButton: {
      position: "relative",
      float: "right",
      marginBottom: "15px",
      backgroundColor: colors.primaryDark,
      borderColor: colors.primaryDark,
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

  return (
    <Container fluid style={{ padding: "30px 20px" }}>
      <Row className="mb-4">
        <Col>
          <h2 style={pageStyles.title}>Gestión de Usuarios</h2>
          <p style={textStyles.paragraph}>
            Gestione los cambios en los datos y permisos de los usuarios
            registrados en el sistema.
          </p>

          {/* Botón para ir a altas de usuarios */}
          <Button
            variant="primary"
            style={pageStyles.altasButton}
            onClick={abrirModalRegistro}
          >
            <FaUserPlus style={{ marginRight: "5px" }} /> Nuevo Usuario
          </Button>
        </Col>
      </Row>

      {alerta.show && (
        <Alert
          variant={alerta.variant}
          onClose={() => setAlerta({ ...alerta, show: false })}
          dismissible
        >
          {alerta.mensaje}
        </Alert>
      )}

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
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Buscar por nombre, email o ID..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={rolFiltro}
            onChange={(e) => setRolFiltro(e.target.value)}
          >
            <option value="">Todos los roles</option>
            {roles.map((rol, idx) => (
              <option key={idx} value={rol}>
                {getNombreRol(rol)}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* Tabla de Usuarios */}
      <Card style={pageStyles.card}>
        <Card.Body>
          <Card.Title style={pageStyles.subtitle}>
            Listado de Usuarios
          </Card.Title>

          {error ? (
            <Alert variant="danger">{error}</Alert>
          ) : usuariosFiltrados.length === 0 ? (
            <Alert variant="info">
              No se encontraron usuarios que coincidan con los criterios de
              búsqueda.
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
                    <td>{usuario._id}</td>
                    <td>{`${usuario.name} ${usuario.surname}`}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.phone}</td>
                    <td>
                      <Badge style={pageStyles.rolBadge(usuario.role)}>
                        {getNombreRol(usuario.role)}
                      </Badge>
                    </td>
                    <td>
                      <Badge style={pageStyles.badge(usuario.status)}>
                        {usuario.status}
                      </Badge>
                    </td>
                    <td>{new Date(usuario.date).toLocaleDateString()}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleOpenModal(usuario)}
                        title="Editar usuario"
                        className="me-2"
                      >
                        <FaUserEdit size={14} /> Editar
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleOpenEliminarModal(usuario)}
                        title="Eliminar usuario"
                      >
                        <FaTrash size={14} /> Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Historial de Cambios */}
      <Card style={pageStyles.card}>
        <Card.Body>
          <Card.Title
            style={{
              ...pageStyles.subtitle,
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaHistory style={{ marginRight: "10px" }} /> Historial de Cambios
            Recientes
          </Card.Title>

          {historialCambios.length === 0 ? (
            <Alert variant="info">
              No hay registros recientes de cambios en usuarios.
            </Alert>
          ) : (
            <Table responsive hover style={pageStyles.cambiosTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Usuario</th>
                  <th>Campo Modificado</th>
                  <th>Valor Anterior</th>
                  <th>Valor Nuevo</th>
                  <th>Fecha</th>
                  <th>Realizado Por</th>
                </tr>
              </thead>
              <tbody>
                {historialCambios.map((cambio) => (
                  <tr key={cambio.id}>
                    <td>{cambio.id}</td>
                    <td>{cambio.nombreUsuario}</td>
                    <td>{cambio.campoCambiado}</td>
                    <td>{cambio.valorAnterior}</td>
                    <td>{cambio.valorNuevo}</td>
                    <td>{cambio.fechaCambio}</td>
                    <td>{cambio.realizadoPor}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Modal de Edición */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header
          closeButton
          style={{ backgroundColor: colors.primaryLight, color: colors.white }}
        >
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {usuarioSeleccionado && (
            <Tabs
              activeKey={tabActiva}
              onSelect={(k) => setTabActiva(k)}
              className="mb-4"
            >
              <Tab
                eventKey="informacion"
                title={
                  <span>
                    <FaIdCard className="me-2" />
                    Información Personal
                  </span>
                }
              >
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={datosEditados.name || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formApellido">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                          type="text"
                          name="surname"
                          value={datosEditados.surname || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={datosEditados.email || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formTelefono">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={datosEditados.phone || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formEstado">
                        <Form.Label>Estado</Form.Label>
                        <Form.Select
                          name="status"
                          value={datosEditados.status || "active"}
                          onChange={handleInputChange}
                        >
                          {estadosUsuario.map((estado, index) => (
                            <option key={index} value={estado.value}>
                              {estado.label}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Tab>

              <Tab
                eventKey="seguridad"
                title={
                  <span>
                    <FaKey className="me-2" />
                    Seguridad y Acceso
                  </span>
                }
              >
                <Form>
                  <Alert variant="info">
                    Complete los campos solo si desea cambiar la contraseña del
                    usuario. Deje en blanco para mantener la actual.
                  </Alert>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Nueva Contraseña</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Ingrese la nueva contraseña"
                            name="password"
                            value={datosEditados.password || ""}
                            onChange={handleInputChange}
                            minLength={8}
                          />
                          <Button
                            variant="outline-secondary"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </Button>
                        </InputGroup>
                        <Form.Text className="text-muted">
                          La contraseña debe tener al menos 8 caracteres.
                        </Form.Text>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group
                        className="mb-3"
                        controlId="formConfirmPassword"
                      >
                        <Form.Label>Confirmar Nueva Contraseña</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirme la nueva contraseña"
                            name="confirmPassword"
                            value={datosEditados.confirmPassword || ""}
                            onChange={handleInputChange}
                            minLength={8}
                          />
                          <Button
                            variant="outline-secondary"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </Button>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Tab>

              <Tab
                eventKey="roles"
                title={
                  <span>
                    <FaUserTag className="me-2" />
                    Rol
                  </span>
                }
              >
                <Form>
                  <Form.Group className="mb-4" controlId="formRol">
                    <Form.Label>Rol del Usuario</Form.Label>
                    <Form.Select
                      name="role"
                      value={datosEditados.role || "user"}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="admin">Administrador</option>
                      <option value="user">Usuario</option>
                    </Form.Select>
                    <Form.Text className="text-muted">
                      El rol determina el nivel de acceso predeterminado del
                      usuario.
                    </Form.Text>
                  </Form.Group>
                </Form>
              </Tab>
            </Tabs>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleGuardarCambios}
            style={{
              backgroundColor: colors.primaryDark,
              borderColor: colors.primaryDark,
            }}
          >
            <FaSave style={{ marginRight: "5px" }} /> Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Eliminación */}
      <Modal show={showEliminarModal} onHide={handleCloseEliminarModal}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#f8d7da", color: "#721c24" }}
        >
          <Modal.Title>Eliminar Usuario Permanentemente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {usuarioAEliminar && (
            <>
              <Alert variant="danger">
                <p>
                  <strong>¡Atención! Esta acción no se puede deshacer.</strong>
                </p>
                <p>
                  Usuario:{" "}
                  <strong>{`${usuarioAEliminar.name} ${usuarioAEliminar.surname}`}</strong>
                </p>
                <p>
                  Email: <strong>{usuarioAEliminar.email}</strong>
                </p>
                <p>
                  Rol: <strong>{getNombreRol(usuarioAEliminar.role)}</strong>
                </p>
                <p>
                  ID: <strong>{usuarioAEliminar._id}</strong>
                </p>
              </Alert>

              <Form.Group className="mb-3">
                <Form.Label>Motivo de la eliminación *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={motivoEliminacion}
                  onChange={(e) => setMotivoEliminacion(e.target.value)}
                  placeholder="Indique el motivo por el cual se elimina este usuario"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Para confirmar la eliminación permanente, escriba el email del
                  usuario: <strong>{usuarioAEliminar.email}</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={confirmacionEmail}
                  onChange={(e) => setConfirmacionEmail(e.target.value)}
                  placeholder="Escriba el email completo"
                  required
                />
                <Form.Text className="text-danger">
                  Esta acción eliminará permanentemente al usuario y todos sus
                  datos asociados. No se puede deshacer.
                </Form.Text>
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEliminarModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleEliminarUsuario}>
            <FaTrash style={{ marginRight: "5px" }} /> Eliminar Permanentemente
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Registro de Usuario */}
      <Modal
        show={showRegistroModal}
        onHide={handleCloseRegistroModal}
        size="lg"
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: colors.primaryLight, color: colors.white }}
        >
          <Modal.Title>Registrar Nuevo Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleRegistrarUsuario}
          >
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formNuevoNombre">
                  <Form.Label>Nombre *</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text>
                      <FaUser />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre"
                      name="name"
                      value={nuevoUsuario.name}
                      onChange={handleNuevoUsuarioChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Por favor ingrese el nombre.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formNuevoApellido">
                  <Form.Label>Apellido *</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text>
                      <FaUser />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el apellido"
                      name="surname"
                      value={nuevoUsuario.surname}
                      onChange={handleNuevoUsuarioChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Por favor ingrese el apellido.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formNuevoEmail">
                  <Form.Label>Email *</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text>
                      <FaEnvelope />
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      placeholder="ejemplo@correo.com"
                      name="email"
                      value={nuevoUsuario.email}
                      onChange={handleNuevoUsuarioChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Por favor ingrese un email válido.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formNuevoTelefono">
                  <Form.Label>Teléfono *</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text>
                      <FaPhone />
                    </InputGroup.Text>
                    <Form.Control
                      type="tel"
                      placeholder="(555) 123-4567"
                      name="phone"
                      value={nuevoUsuario.phone}
                      onChange={handleNuevoUsuarioChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Por favor ingrese un número de teléfono.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formNuevoPassword">
                  <Form.Label>Contraseña *</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Ingrese la contraseña"
                      name="password"
                      value={nuevoUsuario.password}
                      onChange={handleNuevoUsuarioChange}
                      required
                      minLength={8}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                    <Form.Control.Feedback type="invalid">
                      La contraseña debe tener al menos 8 caracteres.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId="formNuevoConfirmPassword"
                >
                  <Form.Label>Confirmar Contraseña *</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirme la contraseña"
                      name="confirmPassword"
                      value={nuevoUsuario.confirmPassword}
                      onChange={handleNuevoUsuarioChange}
                      required
                      minLength={8}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                    <Form.Control.Feedback type="invalid">
                      Por favor confirme la contraseña.
                    </Form.Control.Feedback>
                  </InputGroup>
                  <Form.Text className="text-muted">
                    Las contraseñas deben coincidir.
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formNuevoRol">
                  <Form.Label>Rol del Usuario *</Form.Label>
                  <Form.Select
                    name="role"
                    value={nuevoUsuario.role}
                    onChange={handleNuevoUsuarioChange}
                    required
                  >
                    <option value="user">Cliente</option>
                    <option value="admin">Administrador</option>
                  </Form.Select>
                  <Form.Text className="text-muted">
                    El rol determina el nivel de acceso del usuario al sistema.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formNuevoEstado">
                  <Form.Label>Estado *</Form.Label>
                  <Form.Select
                    name="status"
                    value={nuevoUsuario.status}
                    onChange={handleNuevoUsuarioChange}
                    required
                  >
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                    <option value="suspended">Suspendido</option>
                  </Form.Select>
                  <Form.Text className="text-muted">
                    Los usuarios inactivos o suspendidos no pueden acceder al
                    sistema.
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button variant="secondary" onClick={handleCloseRegistroModal}>
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
                <FaUserPlus style={{ marginRight: "5px" }} /> Registrar Usuario
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default UsuariosCambios;