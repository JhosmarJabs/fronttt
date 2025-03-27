import React, { useState, useEffect } from "react";
import {Container,Row,Col,Card,Table,Button,Form,Modal,Badge,Alert,Spinner,InputGroup,Tabs,Tab} from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaInfoCircle, FaBox, FaDollarSign, FaSave} from "react-icons/fa";
import { colors, textStyles } from "../../../styles/styles";
import axios from "axios";
import { API_URL } from "../../../config";

const ProductosGeneral = () => {
  // Estado para productos
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [marcaFiltro, setMarcaFiltro] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [ordenamiento, setOrdenamiento] = useState("price:asc");
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [limite, setLimite] = useState(10);

  // Estado para modales
  const [showModalAlta, setShowModalAlta] = useState(false);
  const [showModalEdicion, setShowModalEdicion] = useState(false);
  const [showModalEliminar, setShowModalEliminar] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Estado para formulario de producto
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    category: "",
    stock: 0,
    brand: "",
    rating: 0,
    reviews: 0,
    discount: 0,
    features: [],
    warranty: "",
    availability: "En stock",
    image: null,
  });

  // Estado para imagen seleccionada
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [previewImagen, setPreviewImagen] = useState("");

  // Estado para validación de formulario
  const [validated, setValidated] = useState(false);

  // Estado para alerta
  const [alerta, setAlerta] = useState({
    show: false,
    variant: "",
    mensaje: "",
  });

  // Cargar productos desde la API
  const cargarProductos = async () => {
    try {
      setLoading(true);
      setError(null);

      // Construir query params para filtrado y paginación
      const queryParams = new URLSearchParams();
      queryParams.append("page", paginaActual);
      queryParams.append("limit", limite);

      if (categoriaFiltro) queryParams.append("categoria", categoriaFiltro);
      if (marcaFiltro) queryParams.append("marca", marcaFiltro);
      if (precioMin) queryParams.append("precioMin", precioMin);
      if (precioMax) queryParams.append("precioMax", precioMax);
      if (ordenamiento) queryParams.append("sort", ordenamiento);

      const response = await axios.get(
        `${API_URL}/productos?${queryParams.toString()}`
      );

      setProductos(response.data.data);
      setTotalPaginas(response.data.pagination.pages);
    } catch (err) {
      console.error("Error al cargar productos:", err);
      setError(
        "No se pudieron cargar los productos. Por favor, intente más tarde."
      );
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  // Cargar productos cuando cambian los filtros o la paginación
  useEffect(() => {
    cargarProductos();
  }, [
    paginaActual,
    limite,
    categoriaFiltro,
    marcaFiltro,
    precioMin,
    precioMax,
    ordenamiento,
  ]);

  // Obtener categorías y marcas únicas para los filtros
  const categorias = [...new Set(productos.map((p) => p.category))];
  const marcas = [...new Set(productos.map((p) => p.brand))];

  // Manejadores para modales
  const handleOpenModalAlta = () => {
    setFormData({
      title: "",
      description: "",
      price: 0,
      category: "",
      stock: 0,
      brand: "",
      rating: 0,
      reviews: 0,
      discount: 0,
      features: [],
      warranty: "",
      availability: "En stock",
      image: null,
    });
    setImagenSeleccionada(null);
    setPreviewImagen("");
    setValidated(false);
    setShowModalAlta(true);
  };

  const handleCloseModalAlta = () => {
    setShowModalAlta(false);
  };

  const handleOpenModalEdicion = (producto) => {
    setProductoSeleccionado(producto);

    // Preparar features como array si es necesario
    let features = producto.features;
    if (typeof features === "string") {
      features = features.split(",").map((item) => item.trim());
    }

    setFormData({
      title: producto.title || "",
      description: producto.description || "",
      price: producto.price || 0,
      category: producto.category || "",
      stock: producto.stock || 0,
      brand: producto.brand || "",
      rating: producto.rating || 0,
      reviews: producto.reviews || 0,
      discount: producto.discount || 0,
      features: features || [],
      warranty: producto.warranty || "",
      availability: producto.availability || "En stock",
      image: null,
    });

    setPreviewImagen(producto.image || "");
    setValidated(false);
    setShowModalEdicion(true);
  };

  const handleCloseModalEdicion = () => {
    setShowModalEdicion(false);
    setProductoSeleccionado(null);
  };

  const handleOpenModalEliminar = (producto) => {
    setProductoSeleccionado(producto);
    setShowModalEliminar(true);
  };

  const handleCloseModalEliminar = () => {
    setShowModalEliminar(false);
    setProductoSeleccionado(null);
  };

  // Manejadores de formulario
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "number") {
      setFormData({
        ...formData,
        [name]: value === "" ? "" : Number(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagenSeleccionada(file);

      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImagen(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFeaturesChange = (e) => {
    const value = e.target.value;
    const features = value.split(",").map((item) => item.trim());
    setFormData({
      ...formData,
      features,
    });
  };

  // Función para crear un nuevo producto
  const handleCrearProducto = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      // Crear FormData para enviar archivos
      const formDataToSend = new FormData();

      // Agregar todos los campos del formulario
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "features" && Array.isArray(value)) {
          formDataToSend.append(key, value.join(","));
        } else if (key !== "image") {
          formDataToSend.append(key, value);
        }
      });

      // Agregar imagen si existe
      if (imagenSeleccionada) {
        formDataToSend.append("image", imagenSeleccionada);
      }

      // Obtener token del localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se ha iniciado sesión o la sesión ha expirado");
      }

      // Enviar petición a la API
      const response = await axios.post(
        `${API_URL}/productos`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Mostrar mensaje de éxito
      setAlerta({
        show: true,
        variant: "success",
        mensaje: `El producto "${response.data.producto.title}" ha sido creado correctamente.`,
      });

      // Cerrar modal y recargar productos
      handleCloseModalAlta();
      cargarProductos();
    } catch (error) {
      console.error("Error al crear producto:", error);

      // Mostrar mensaje de error más detallado
      let mensajeError = "Error al crear producto";

      if (error.response) {
        if (error.response.data && error.response.data.mensaje) {
          mensajeError += `: ${error.response.data.mensaje}`;
        } else {
          mensajeError += ` (código ${error.response.status})`;
        }

        // Lógica adicional para mostrar errores específicos
        if (error.response.status === 500) {
          mensajeError +=
            ". Posible problema con la carga de la imagen o el servidor.";
        }
      } else if (error.message) {
        mensajeError += `: ${error.message}`;
      }

      setAlerta({
        show: true,
        variant: "danger",
        mensaje: mensajeError,
      });
    }
  };

  // Función para actualizar un producto
  const handleActualizarProducto = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      if (!productoSeleccionado) return;

      // Crear FormData para enviar archivos
      const formDataToSend = new FormData();

      // Agregar todos los campos del formulario
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "features" && Array.isArray(value)) {
          formDataToSend.append(key, value.join(","));
        } else if (key !== "image") {
          formDataToSend.append(key, value);
        }
      });

      // Agregar imagen si existe y es nueva
      if (imagenSeleccionada) {
        formDataToSend.append("image", imagenSeleccionada);
      } else if (
        productoSeleccionado.image &&
        !previewImagen.includes("blob:")
      ) {
        // Si no hay nueva imagen, pero hay una imagen existente, mantener la URL actual
        formDataToSend.append("imageUrl", productoSeleccionado.image);
      }

      // Obtener token del localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se ha iniciado sesión o la sesión ha expirado");
      }

      // Enviar petición a la API
      const response = await axios.put(
        `${API_URL}/productos/${productoSeleccionado._id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Mostrar mensaje de éxito
      setAlerta({
        show: true,
        variant: "success",
        mensaje: `El producto "${response.data.producto.title}" ha sido actualizado correctamente.`,
      });

      // Cerrar modal y recargar productos
      handleCloseModalEdicion();
      cargarProductos();
    } catch (error) {
      console.error("Error al actualizar producto:", error);

      // Mostrar mensaje de error más detallado
      let mensajeError = "Error al actualizar producto";

      if (error.response) {
        if (error.response.data && error.response.data.mensaje) {
          mensajeError += `: ${error.response.data.mensaje}`;
        } else {
          mensajeError += ` (código ${error.response.status})`;
        }

        // Lógica adicional para mostrar errores específicos
        if (error.response.status === 500) {
          mensajeError +=
            ". Posible problema con la carga de la imagen o el servidor.";
        }
      } else if (error.message) {
        mensajeError += `: ${error.message}`;
      }

      setAlerta({
        show: true,
        variant: "danger",
        mensaje: mensajeError,
      });
    }
  };

  // Función para eliminar un producto
  const handleEliminarProducto = async () => {
    try {
      if (!productoSeleccionado) return;

      // Obtener token del localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se ha iniciado sesión o la sesión ha expirado");
      }

      // Enviar petición a la API
      await axios.delete(`${API_URL}/productos/${productoSeleccionado._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Mostrar mensaje de éxito
      setAlerta({
        show: true,
        variant: "success",
        mensaje: `El producto "${productoSeleccionado.title}" ha sido eliminado correctamente.`,
      });

      // Cerrar modal y recargar productos
      handleCloseModalEliminar();
      cargarProductos();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      setAlerta({
        show: true,
        variant: "danger",
        mensaje: `Error al eliminar producto: ${
          error.response?.data?.mensaje || error.message
        }`,
      });
    }
  };

  // Función para aplicar filtros
  const aplicarFiltros = () => {
    setPaginaActual(1); // Resetear a la primera página al filtrar
    cargarProductos();
  };

  // Función para resetear filtros
  const resetearFiltros = () => {
    setFiltro("");
    setCategoriaFiltro("");
    setMarcaFiltro("");
    setPrecioMin("");
    setPrecioMax("");
    setOrdenamiento("price:asc");
    setPaginaActual(1);
    cargarProductos();
  };

  // Calcular estadísticas
  const estadisticas = {
    total: productos.length,
    valorInventario: productos
      .reduce((total, producto) => total + producto.price * producto.stock, 0)
      .toFixed(2),
    sinStock: productos.filter((p) => p.stock === 0).length,
    conDescuento: productos.filter((p) => p.discount > 0).length,
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
    title: {
      ...textStyles.title,
      marginBottom: "10px",
    },
    subtitle: {
      ...textStyles.subtitle,
      marginBottom: "20px",
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
    imagePreview: {
      maxWidth: "100%",
      maxHeight: "200px",
      objectFit: "contain",
      marginTop: "10px",
      borderRadius: "4px",
    },
    badge: (disponibilidad) => {
      let bg = colors.primaryLight;

      if (disponibilidad === "En stock") bg = "#28a745";
      if (disponibilidad === "Agotado") bg = "#dc3545";
      if (disponibilidad === "Bajo pedido") bg = "#fd7e14";

      return { backgroundColor: bg };
    },
    descuentoBadge: {
      backgroundColor: "#dc3545",
      color: colors.white,
      padding: "3px 8px",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: "bold",
    },
    pagination: {
      display: "flex",
      justifyContent: "center",
      marginTop: "20px",
    },
  };

  // Renderizar botones de paginación
  const renderPaginacion = () => {
    const botones = [];

    // Botón anterior
    botones.push(
      <Button
        key="anterior"
        variant="outline-secondary"
        size="sm"
        onClick={() => setPaginaActual(Math.max(1, paginaActual - 1))}
        disabled={paginaActual <= 1}
      >
        &laquo; Anterior
      </Button>
    );

    // Números de página
    for (let i = 1; i <= totalPaginas; i++) {
      if (
        i === 1 ||
        i === totalPaginas ||
        (i >= paginaActual - 1 && i <= paginaActual + 1)
      ) {
        botones.push(
          <Button
            key={i}
            variant={paginaActual === i ? "primary" : "outline-secondary"}
            size="sm"
            onClick={() => setPaginaActual(i)}
            className="mx-1"
          >
            {i}
          </Button>
        );
      } else if (i === paginaActual - 2 || i === paginaActual + 2) {
        botones.push(
          <span key={i} className="mx-1">
            ...
          </span>
        );
      }
    }

    // Botón siguiente
    botones.push(
      <Button
        key="siguiente"
        variant="outline-secondary"
        size="sm"
        onClick={() =>
          setPaginaActual(Math.min(totalPaginas, paginaActual + 1))
        }
        disabled={paginaActual >= totalPaginas}
      >
        Siguiente &raquo;
      </Button>
    );

    return botones;
  };

  return (
    <Container fluid style={{ padding: "30px 20px" }}>
      <Row className="mb-4">
        <Col>
          <h2 style={pageStyles.title}>Gestión de Productos</h2>
          <p style={textStyles.paragraph}>
            Administre el catálogo de productos de su tienda.
          </p>

          <Button
            variant="primary"
            style={{
              backgroundColor: colors.primaryDark,
              borderColor: colors.primaryDark,
              position: "absolute",
              right: "30px",
              top: "30px",
            }}
            onClick={handleOpenModalAlta}
          >
            <FaPlus className="me-2" /> Nuevo Producto
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
        <Col md={3}>
          <Card style={{ ...pageStyles.card, ...pageStyles.statCard }}>
            <div style={pageStyles.statTitle}>Total Productos</div>
            <div style={pageStyles.statValue}>{estadisticas.total}</div>
          </Card>
        </Col>
        <Col md={3}>
          <Card
            style={{
              ...pageStyles.card,
              ...pageStyles.statCard,
              borderLeftColor: "#28a745",
            }}
          >
            <div style={pageStyles.statTitle}>Valor del Inventario</div>
            <div style={pageStyles.statValue}>
              ${estadisticas.valorInventario}
            </div>
          </Card>
        </Col>
        <Col md={3}>
          <Card
            style={{
              ...pageStyles.card,
              ...pageStyles.statCard,
              borderLeftColor: "#dc3545",
            }}
          >
            <div style={pageStyles.statTitle}>Productos Sin Stock</div>
            <div style={pageStyles.statValue}>{estadisticas.sinStock}</div>
          </Card>
        </Col>
        <Col md={3}>
          <Card
            style={{
              ...pageStyles.card,
              ...pageStyles.statCard,
              borderLeftColor: "#fd7e14",
            }}
          >
            <div style={pageStyles.statTitle}>Productos en Oferta</div>
            <div style={pageStyles.statValue}>{estadisticas.conDescuento}</div>
          </Card>
        </Col>
      </Row>

      {/* Filtros */}
      <Card style={pageStyles.card} className="mb-4">
        <Card.Body>
          <Card.Title className="mb-3">
            <FaFilter className="me-2" /> Filtros
          </Card.Title>
          <Row>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Buscar</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Select
                  value={categoriaFiltro}
                  onChange={(e) => setCategoriaFiltro(e.target.value)}
                >
                  <option value="">Todas</option>
                  {categorias.map((categoria, idx) => (
                    <option key={idx} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3">
                <Form.Label>Marca</Form.Label>
                <Form.Select
                  value={marcaFiltro}
                  onChange={(e) => setMarcaFiltro(e.target.value)}
                >
                  <option value="">Todas</option>
                  {marcas.map((marca, idx) => (
                    <option key={idx} value={marca}>
                      {marca}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3">
                <Form.Label>Precio Mínimo</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaDollarSign />
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    min="0"
                    placeholder="Min"
                    value={precioMin}
                    onChange={(e) => setPrecioMin(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3">
                <Form.Label>Precio Máximo</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaDollarSign />
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    min="0"
                    placeholder="Max"
                    value={precioMax}
                    onChange={(e) => setPrecioMax(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={1}>
              <Form.Group className="mb-3">
                <Form.Label>Ordenar</Form.Label>
                <Form.Select
                  value={ordenamiento}
                  onChange={(e) => setOrdenamiento(e.target.value)}
                >
                  <option value="price:asc">Precio ↑</option>
                  <option value="price:desc">Precio ↓</option>
                  <option value="title:asc">Nombre A-Z</option>
                  <option value="title:desc">Nombre Z-A</option>
                  <option value="rating:desc">Mejor valorados</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="outline-secondary" onClick={resetearFiltros}>
              Limpiar Filtros
            </Button>
            <Button
              variant="primary"
              onClick={aplicarFiltros}
              style={{
                backgroundColor: colors.primaryMedium,
                borderColor: colors.primaryMedium,
              }}
            >
              <FaSearch className="me-1" /> Aplicar Filtros
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Tabla de Productos */}
      <Card style={pageStyles.card}>
        <Card.Body>
          <Card.Title className="mb-4">Listado de Productos</Card.Title>

          {loading ? (
            <div style={pageStyles.loadingContainer}>
              <Spinner
                animation="border"
                role="status"
                variant="primary"
                style={{ marginBottom: "20px" }}
              >
                <span className="visually-hidden">Cargando productos...</span>
              </Spinner>
              <p style={{ fontSize: "18px", color: colors.primaryMedium }}>
                Cargando productos...
              </p>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Marca</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Valoración</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => (
                    <tr key={producto._id}>
                      <td>
                        {producto.image ? (
                          <img
                            src={
                              producto.image.startsWith("http")
                                ? producto.image
                                : API_URL + producto.image
                            }
                            alt={producto.title}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                              borderRadius: "4px",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "50px",
                              height: "50px",
                              backgroundColor: "#f1f1f1",
                              borderRadius: "4px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FaBox size={20} color="#ccc" />
                          </div>
                        )}
                      </td>
                      <td>
                        {producto.title}
                        {producto.discount > 0 && (
                          <span
                            style={pageStyles.descuentoBadge}
                            className="ms-2"
                          >
                            -{producto.discount}%
                          </span>
                        )}
                      </td>
                      <td>{producto.category}</td>
                      <td>{producto.brand}</td>
                      <td>
                        <strong>${producto.price.toFixed(2)}</strong>
                        {producto.discount > 0 && (
                          <div>
                            <small className="text-muted text-decoration-line-through">
                              $
                              {(
                                producto.price /
                                (1 - producto.discount / 100)
                              ).toFixed(2)}
                            </small>
                          </div>
                        )}
                      </td>
                      <td>
                        <span
                          className={
                            producto.stock === 0
                              ? "text-danger"
                              : producto.stock < 10
                              ? "text-warning"
                              : "text-success"
                          }
                        >
                          {producto.stock}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="text-warning me-1">★</span>
                          <span>{producto.rating.toFixed(1)}</span>
                          <span className="text-muted ms-1">
                            ({producto.reviews})
                          </span>
                        </div>
                      </td>
                      <td>
                        <Badge style={pageStyles.badge(producto.availability)}>
                          {producto.availability}
                        </Badge>
                      </td>
                      <td>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="me-1"
                          onClick={() => handleOpenModalEdicion(producto)}
                        >
                          <FaEdit /> Editar
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleOpenModalEliminar(producto)}
                        >
                          <FaTrash /> Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Paginación */}
              <div style={pageStyles.pagination}>{renderPaginacion()}</div>
            </>
          )}
        </Card.Body>
      </Card>

      {/* Modal de Alta de Producto */}
      <Modal show={showModalAlta} onHide={handleCloseModalAlta} size="lg">
        <Modal.Header
          closeButton
          style={{ backgroundColor: colors.primaryMedium, color: colors.white }}
        >
          <Modal.Title>Nuevo Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleCrearProducto}>
            <Tabs defaultActiveKey="informacion" className="mb-3">
              <Tab eventKey="informacion" title="Información General">
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre del Producto *</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        El nombre del producto es obligatorio.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Categoría *</Form.Label>
                      <Form.Control
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        list="categorias-list"
                      />
                      <datalist id="categorias-list">
                        {categorias.map((cat, idx) => (
                          <option key={idx} value={cat} />
                        ))}
                      </datalist>
                      <Form.Control.Feedback type="invalid">
                        La categoría es obligatoria.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Marca *</Form.Label>
                      <Form.Control
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        required
                        list="marcas-list"
                      />
                      <datalist id="marcas-list">
                        {marcas.map((marca, idx) => (
                          <option key={idx} value={marca} />
                        ))}
                      </datalist>
                      <Form.Control.Feedback type="invalid">
                        La marca es obligatoria.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Disponibilidad</Form.Label>
                      <Form.Select
                        name="availability"
                        value={formData.availability}
                        onChange={handleChange}
                      >
                        <option value="En stock">En stock</option>
                        <option value="Agotado">Agotado</option>
                        <option value="Bajo pedido">Bajo pedido</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Descripción *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    La descripción es obligatoria.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Características (separadas por comas)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={formData.features.join(", ")}
                    onChange={handleFeaturesChange}
                    placeholder="Ej: Resistente al agua, Material premium, Garantía de 2 años"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Garantía</Form.Label>
                  <Form.Control
                    type="text"
                    name="warranty"
                    value={formData.warranty}
                    onChange={handleChange}
                    placeholder="Ej: 1 año"
                  />
                </Form.Group>
              </Tab>

              <Tab eventKey="precios" title="Precios e Inventario">
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Precio *</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaDollarSign />
                        </InputGroup.Text>
                        <Form.Control
                          type="number"
                          min="0"
                          step="0.01"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          El precio es obligatorio y debe ser mayor a 0.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Descuento (%)</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="number"
                          min="0"
                          max="100"
                          name="discount"
                          value={formData.discount}
                          onChange={handleChange}
                        />
                        <InputGroup.Text>%</InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Stock *</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        El stock es obligatorio.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Valoración (0-5)</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Número de Reseñas</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        name="reviews"
                        value={formData.reviews}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {formData.discount > 0 && (
                  <Alert variant="info">
                    <strong>Precio con descuento:</strong> $
                    {(formData.price * (1 - formData.discount / 100)).toFixed(
                      2
                    )}
                    <div className="mt-1">
                      <small>
                        Ahorro: $
                        {((formData.price * formData.discount) / 100).toFixed(
                          2
                        )}
                      </small>
                    </div>
                  </Alert>
                )}
              </Tab>

              <Tab eventKey="imagen" title="Imagen">
                <Form.Group className="mb-3">
                  <Form.Label>Imagen del Producto</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <Form.Text className="text-muted">
                    Formatos admitidos: JPEG, JPG, PNG, WEBP. Tamaño máximo:
                    5MB.
                  </Form.Text>
                </Form.Group>

                {previewImagen && (
                  <div className="text-center mt-3">
                    <p>
                      <strong>Vista previa:</strong>
                    </p>
                    <img
                      src={previewImagen}
                      alt="Vista previa"
                      style={pageStyles.imagePreview}
                    />
                  </div>
                )}
              </Tab>
            </Tabs>

            <div className="d-flex justify-content-end mt-4">
              <Button
                variant="secondary"
                onClick={handleCloseModalAlta}
                className="me-2"
              >
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
                <FaPlus className="me-1" /> Crear Producto
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal de Edición de Producto */}
      <Modal show={showModalEdicion} onHide={handleCloseModalEdicion} size="lg">
        <Modal.Header
          closeButton
          style={{ backgroundColor: colors.primaryMedium, color: colors.white }}
        >
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productoSeleccionado && (
            <Form
              noValidate
              validated={validated}
              onSubmit={handleActualizarProducto}
            >
              <Tabs defaultActiveKey="informacion" className="mb-3">
                <Tab eventKey="informacion" title="Información General">
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Nombre del Producto *</Form.Label>
                        <Form.Control
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          El nombre del producto es obligatorio.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Categoría *</Form.Label>
                        <Form.Control
                          type="text"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          required
                          list="categorias-list-edit"
                        />
                        <datalist id="categorias-list-edit">
                          {categorias.map((cat, idx) => (
                            <option key={idx} value={cat} />
                          ))}
                        </datalist>
                        <Form.Control.Feedback type="invalid">
                          La categoría es obligatoria.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Marca *</Form.Label>
                        <Form.Control
                          type="text"
                          name="brand"
                          value={formData.brand}
                          onChange={handleChange}
                          required
                          list="marcas-list-edit"
                        />
                        <datalist id="marcas-list-edit">
                          {marcas.map((marca, idx) => (
                            <option key={idx} value={marca} />
                          ))}
                        </datalist>
                        <Form.Control.Feedback type="invalid">
                          La marca es obligatoria.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Disponibilidad</Form.Label>
                        <Form.Select
                          name="availability"
                          value={formData.availability}
                          onChange={handleChange}
                        >
                          <option value="En stock">En stock</option>
                          <option value="Agotado">Agotado</option>
                          <option value="Bajo pedido">Bajo pedido</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Descripción *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      La descripción es obligatoria.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      Características (separadas por comas)
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={formData.features.join(", ")}
                      onChange={handleFeaturesChange}
                      placeholder="Ej: Resistente al agua, Material premium, Garantía de 2 años"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Garantía</Form.Label>
                    <Form.Control
                      type="text"
                      name="warranty"
                      value={formData.warranty}
                      onChange={handleChange}
                      placeholder="Ej: 1 año"
                    />
                  </Form.Group>
                </Tab>

                <Tab eventKey="precios" title="Precios e Inventario">
                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Precio *</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FaDollarSign />
                          </InputGroup.Text>
                          <Form.Control
                            type="number"
                            min="0"
                            step="0.01"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            El precio es obligatorio y debe ser mayor a 0.
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Descuento (%)</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type="number"
                            min="0"
                            max="100"
                            name="discount"
                            value={formData.discount}
                            onChange={handleChange}
                          />
                          <InputGroup.Text>%</InputGroup.Text>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Stock *</Form.Label>
                        <Form.Control
                          type="number"
                          min="0"
                          name="stock"
                          value={formData.stock}
                          onChange={handleChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          El stock es obligatorio.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Valoración (0-5)</Form.Label>
                        <Form.Control
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          name="rating"
                          value={formData.rating}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Número de Reseñas</Form.Label>
                        <Form.Control
                          type="number"
                          min="0"
                          name="reviews"
                          value={formData.reviews}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {formData.discount > 0 && (
                    <Alert variant="info">
                      <strong>Precio con descuento:</strong> $
                      {(formData.price * (1 - formData.discount / 100)).toFixed(
                        2
                      )}
                      <div className="mt-1">
                        <small>
                          Ahorro: $
                          {((formData.price * formData.discount) / 100).toFixed(
                            2
                          )}
                        </small>
                      </div>
                    </Alert>
                  )}
                </Tab>

                <Tab eventKey="imagen" title="Imagen">
                  <Form.Group className="mb-3">
                    <Form.Label>Imagen del Producto</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <Form.Text className="text-muted">
                      Formatos admitidos: JPEG, JPG, PNG, WEBP. Tamaño máximo:
                      5MB.
                    </Form.Text>
                  </Form.Group>

                  {previewImagen && (
                    <div className="text-center mt-3">
                      <p>
                        <strong>Imagen actual:</strong>
                      </p>
                      <img
                        src={previewImagen}
                        alt="Imagen del producto"
                        style={pageStyles.imagePreview}
                      />
                    </div>
                  )}
                </Tab>
              </Tabs>

              <div className="d-flex justify-content-end mt-4">
                <Button
                  variant="secondary"
                  onClick={handleCloseModalEdicion}
                  className="me-2"
                >
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
                  <FaSave className="me-1" /> Guardar Cambios
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      {/* Modal de Eliminación de Producto */}
      <Modal show={showModalEliminar} onHide={handleCloseModalEliminar}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#f8d7da", color: "#721c24" }}
        >
          <Modal.Title>Eliminar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productoSeleccionado && (
            <>
              <Alert variant="danger">
                <FaInfoCircle className="me-2" /> Esta acción no se puede
                deshacer.
              </Alert>
              <p>¿Está seguro de que desea eliminar el siguiente producto?</p>
              <Card className="mb-3">
                <Card.Body className="d-flex align-items-center">
                  {productoSeleccionado.image ? (
                    <img
                      src={
                        productoSeleccionado.image.startsWith("http")
                          ? productoSeleccionado.image
                          : API_URL + productoSeleccionado.image
                      }
                      alt={productoSeleccionado.title}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "4px",
                        marginRight: "15px",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundColor: "#f1f1f1",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "15px",
                      }}
                    >
                      <FaBox size={24} color="#ccc" />
                    </div>
                  )}
                  <div>
                    <h5 className="mb-1">{productoSeleccionado.title}</h5>
                    <p className="mb-0 text-muted">
                      {productoSeleccionado.category} | $
                      {productoSeleccionado.price.toFixed(2)}
                    </p>
                  </div>
                </Card.Body>
              </Card>
              <p className="text-danger">
                <strong>Nota:</strong> Se eliminará toda la información asociada
                a este producto, incluyendo imágenes y datos de ventas.
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalEliminar}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleEliminarProducto}>
            <FaTrash className="me-1" /> Eliminar Definitivamente
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductosGeneral;
