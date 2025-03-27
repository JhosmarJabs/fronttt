import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Spinner, Badge, Alert, Image} from "react-bootstrap";
import { colors } from "../../styles/styles";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

const Testimonios = () => {
  const navigate = useNavigate();
  const [testimonios, setTestimonios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("todos"); // todos, 5estrellas, productos
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formData, setFormData] = useState({
    puesto: "",
    comentario: "",
    estrellas: 5,
    producto_id: "",
  });
  const [productos, setProductos] = useState([]);
  const [productosFiltro, setProductosFiltro] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Verificar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [setUserData] = useState(null);

  // Verificar autenticación al cargar el componente
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user) {
        setIsAuthenticated(true);
        try {
          setUserData(JSON.parse(user));
        } catch (e) {
          setUserData(null);
        }
      } else {
        setIsAuthenticated(false);
        setUserData(null);
      }
    };

    checkAuth();
  }, []);

  // Cargar testimonios
  useEffect(() => {
    const fetchTestimonios = async () => {
      try {
        setLoading(true);
        setError(null);

        // Construir URL con filtros
        let url = `${API_URL}/testimonios?verificado=true`;

        if (filtro === "5estrellas") {
          url = `${API_URL}/testimonios?verificado=true&estrellas=5`;
        } else if (filtro === "productos" && productosFiltro) {
          url = `${API_URL}/testimonios/producto/${productosFiltro}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `Error al cargar testimonios: ${response.statusText}`
          );
        }

        const data = await response.json();
        setTestimonios(data);
      } catch (err) {
        console.error("Error:", err);
        setError("No se pudieron cargar los testimonios. Inténtalo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonios();
  }, [filtro, productosFiltro]);

  // Cargar productos para el formulario y filtro
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`${API_URL}/productos`);
        if (!response.ok) {
          throw new Error("Error al cargar productos");
        }

        const data = await response.json();
        const productosArray = Array.isArray(data)
          ? data
          : data.data
          ? data.data
          : [];
        setProductos(productosArray);
      } catch (err) {
        console.error("Error al cargar productos:", err);
      }
    };

    fetchProductos();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "estrellas" ? parseInt(value) : value,
    });
  };

  const handleFilterChange = (e) => {
    setFiltro(e.target.value);
  };

  const handleProductFilterChange = (e) => {
    setProductosFiltro(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("Debes iniciar sesión para dejar un testimonio");
      navigate("/login");
      return;
    }

    if (!formData.comentario || !formData.puesto) {
      alert("Por favor completa todos los campos requeridos");
      return;
    }

    try {
      setSubmitLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/testimonios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al enviar testimonio");
      }

      // Mostrar mensaje de éxito
      setSubmitSuccess(true);
      setShowForm(false);

      // Limpiar formulario
      setFormData({
        puesto: "",
        comentario: "",
        estrellas: 5,
        producto_id: "",
      });

      // Ocultar mensaje después de 5 segundos
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (err) {
      console.error("Error al enviar testimonio:", err);
      alert("Error al enviar tu testimonio. Inténtalo más tarde.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const customStyles = {
    heroSection: {
      background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primaryMedium} 100%)`,
      padding: "80px 0 60px",
      color: colors.white,
      marginBottom: "50px",
      position: "relative",
    },
    heroOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'url("/path/to/pattern.svg") repeat',
      opacity: 0.1,
    },
    title: {
      color: colors.white,
      fontSize: "48px",
      marginBottom: "20px",
      fontWeight: 700,
      textShadow: "0 2px 10px rgba(0,0,0,0.2)",
    },
    subtitle: {
      color: colors.white,
      opacity: 0.9,
      fontWeight: 300,
      fontSize: "20px",
    },
    sectionTitle: {
      fontSize: "32px",
      position: "relative",
      paddingBottom: "15px",
      marginBottom: "30px",
    },
    underline: {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "80px",
      height: "4px",
      backgroundColor: colors.primaryLight,
      borderRadius: "2px",
    },
    testimonialCard: {
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 6px 20px rgba(13, 27, 42, 0.1)",
      height: "100%",
      border: "none",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 12px 30px rgba(13, 27, 42, 0.15)",
      },
    },
    testimonialQuote: {
      fontSize: "70px",
      position: "absolute",
      top: "10px",
      right: "20px",
      color: "rgba(65, 90, 119, 0.1)",
      fontFamily: "serif",
    },
    filterSection: {
      backgroundColor: "#f8f9fa",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "30px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    },
    formCard: {
      borderRadius: "12px",
      boxShadow: "0 6px 20px rgba(13, 27, 42, 0.1)",
      padding: "30px",
      marginBottom: "40px",
      border: "none",
    },
    starRating: {
      color: "#FFD700",
      fontSize: "20px",
      filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.1))",
    },
    productBadge: {
      backgroundColor: colors.primaryLight,
      color: "white",
      fontWeight: "normal",
      fontSize: "13px",
      padding: "6px 12px",
      borderRadius: "20px",
    },
    loadingContainer: {
      textAlign: "center",
      padding: "60px 0",
    },
  };

  return (
    <div>
      {/* Hero Section */}
      <div style={customStyles.heroSection}>
        <div style={customStyles.heroOverlay}></div>
        <Container className="text-center">
          <h1 style={customStyles.title}>Testimonios de Clientes</h1>
          <p style={customStyles.subtitle}>
            Descubre lo que nuestros clientes opinan sobre nuestros productos y
            servicios.
            <br />
            Experiencias reales de personas que han confiado en nosotros.
          </p>
        </Container>
      </div>

      <Container>
        {/* Filtros de Testimonios */}
        <div style={customStyles.filterSection}>
          <Row>
            <Col md={6} lg={4}>
              <Form.Group className="mb-3">
                <Form.Label>Filtrar por calificación</Form.Label>
                <Form.Select value={filtro} onChange={handleFilterChange}>
                  <option value="todos">Todos los testimonios</option>
                  <option value="5estrellas">5 estrellas</option>
                  <option value="productos">Por producto</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {filtro === "productos" && (
              <Col md={6} lg={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Selecciona un producto</Form.Label>
                  <Form.Select
                    value={productosFiltro}
                    onChange={handleProductFilterChange}
                  >
                    <option value="">Selecciona un producto</option>
                    {productos.map((producto) => (
                      <option key={producto._id} value={producto._id}>
                        {producto.title}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            )}

            <Col
              md={6}
              lg={4}
              className="d-flex align-items-end justify-content-md-end mb-3"
            >
              {isAuthenticated ? (
                <Button
                  variant="primary"
                  onClick={() => setShowForm(!showForm)}
                  style={{ borderRadius: "30px", padding: "8px 20px" }}
                >
                  {showForm ? "Cancelar" : "Deja tu testimonio"}
                </Button>
              ) : (
                <Button
                  variant="outline-primary"
                  onClick={() => navigate("/login")}
                  style={{ borderRadius: "30px", padding: "8px 20px" }}
                >
                  Inicia sesión para dejar un testimonio
                </Button>
              )}
            </Col>
          </Row>
        </div>

        {/* Formulario de nuevo testimonio (condicional) */}
        {showForm && (
          <Card style={customStyles.formCard}>
            <Card.Header as="h5" className="bg-white border-0 ps-0">
              Comparte tu experiencia
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Tu profesión o cargo *</Form.Label>
                      <Form.Control
                        type="text"
                        name="puesto"
                        value={formData.puesto}
                        onChange={handleInputChange}
                        placeholder="Ej: Arquitecto, Propietario de casa, etc."
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Producto (opcional)</Form.Label>
                      <Form.Select
                        name="producto_id"
                        value={formData.producto_id}
                        onChange={handleInputChange}
                      >
                        <option value="">
                          General (sin producto específico)
                        </option>
                        {productos.map((producto) => (
                          <option key={producto._id} value={producto._id}>
                            {producto.title}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Tu experiencia *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="comentario"
                    value={formData.comentario}
                    onChange={handleInputChange}
                    placeholder="Cuéntanos tu experiencia con nuestros productos o servicios..."
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Calificación *</Form.Label>
                  <div>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <Form.Check
                        key={num}
                        inline
                        type="radio"
                        name="estrellas"
                        id={`estrellas-${num}`}
                        value={num}
                        label={`${num} ${num === 1 ? "estrella" : "estrellas"}`}
                        checked={formData.estrellas === num}
                        onChange={handleInputChange}
                      />
                    ))}
                  </div>
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">* Campos requeridos</small>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={submitLoading}
                    style={{ borderRadius: "8px", padding: "10px 24px" }}
                  >
                    {submitLoading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <span className="ms-2">Enviando...</span>
                      </>
                    ) : (
                      "Enviar testimonio"
                    )}
                  </Button>
                </div>

                <div className="mt-3">
                  <small className="text-muted">
                    Tu testimonio será revisado antes de ser publicado. Gracias
                    por compartir tu experiencia.
                  </small>
                </div>
              </Form>
            </Card.Body>
          </Card>
        )}

        {/* Mensaje de éxito */}
        {submitSuccess && (
          <Alert variant="success" className="mt-3 mb-4">
            <Alert.Heading>¡Testimonio enviado con éxito!</Alert.Heading>
            <p>
              Gracias por compartir tu experiencia. Tu testimonio será revisado
              por nuestro equipo antes de ser publicado.
            </p>
          </Alert>
        )}

        {/* Sección de testimonios */}
        <div className="mb-5">
          <h2 style={customStyles.sectionTitle}>
            Experiencias de nuestros clientes
            <span style={customStyles.underline}></span>
          </h2>

          {/* Estado de carga */}
          {loading ? (
            <div style={customStyles.loadingContainer}>
              <Spinner animation="border" variant="primary" role="status">
                <span className="visually-hidden">Cargando testimonios...</span>
              </Spinner>
              <p className="mt-3 text-center">Cargando testimonios...</p>
            </div>
          ) : error ? (
            <Alert variant="warning">{error}</Alert>
          ) : testimonios.length === 0 ? (
            <Alert variant="info">
              No se encontraron testimonios para los filtros seleccionados.
              Intenta con otros filtros o regresa más tarde.
            </Alert>
          ) : (
            <Row className="g-4">
              {testimonios.map((testimonio) => (
                <Col lg={4} md={6} key={testimonio._id}>
                  <Card style={customStyles.testimonialCard}>
                    <Card.Body className="p-4 position-relative">
                      <div style={customStyles.testimonialQuote}>"</div>

                      {testimonio.producto_id && (
                        <Badge
                          style={customStyles.productBadge}
                          className="mb-3"
                        >
                          {typeof testimonio.producto_id === "object"
                            ? testimonio.producto_id.title
                            : productos.find(
                                (p) => p._id === testimonio.producto_id
                              )?.title || "Producto"}
                        </Badge>
                      )}

                      <div style={customStyles.starRating} className="mb-3">
                        {Array(5)
                          .fill()
                          .map((_, i) => (
                            <span key={i}>
                              {i < testimonio.estrellas ? "★" : "☆"}
                            </span>
                          ))}
                      </div>

                      <Card.Text
                        className="fs-5 mb-4"
                        style={{ color: colors.primaryLight }}
                      >
                        {testimonio.comentario}
                      </Card.Text>

                      <div className="d-flex align-items-center mt-4">
                        <Image
                          src={
                            testimonio.foto ||
                            `https://ui-avatars.com/api/?name=${testimonio.usuario_id.name}+${testimonio.usuario_id.surname}&background=0D8ABC&color=fff`
                          }
                          alt={`${testimonio.usuario_id.name} ${testimonio.usuario_id.surname}`}
                          width={60}
                          height={60}
                          roundedCircle
                          className="me-3"
                        />
                        <div>
                          <h5
                            className="mb-1"
                            style={{ color: colors.primaryDark }}
                          >
                            {testimonio.usuario_id.name}{" "}
                            {testimonio.usuario_id.surname}
                          </h5>
                          <p className="mb-0 text-muted">{testimonio.puesto}</p>
                          <small className="text-muted">
                            {new Date(testimonio.fecha).toLocaleDateString(
                              "es-ES",
                              {
                                year: "numeric",
                                month: "long",
                              }
                            )}
                          </small>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>

        {/* Sección CTA */}
        <div
          className="text-center py-5 px-4 mb-5 rounded-3"
          style={{
            background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primaryMedium} 100%)`,
            color: "white",
          }}
        >
          <h2 className="display-6 fw-bold mb-3">
            ¿Listo para transformar tu hogar?
          </h2>
          <p className="fs-5 mb-4">
            Únete a miles de clientes satisfechos que ya disfrutan de la
            tecnología inteligente en sus hogares.
          </p>
          <Button
            variant="light"
            size="lg"
            onClick={() => navigate("/productos")}
            style={{
              color: colors.primaryDark,
              fontWeight: 600,
              borderRadius: "30px",
              padding: "10px 30px",
            }}
          >
            Explorar productos
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Testimonios;
