import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge, ListGroup, Tabs, Tab, Alert, Spinner,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { colors, textStyles, buttons } from "../../styles/styles";
import { API_URL } from "../../config";

const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [productosRelacionados, setProductosRelacionados] = useState([]);
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener un producto desde la API por su ID
  const obtenerProducto = async (productId) => {
    try {
      setCargando(true);
      setError(null);

      // Realizar la petición a la API
      const response = await axios.get(`${API_URL}/productos/${productId}`);

      // Si la petición es exitosa, guardamos el producto en el estado
      setProducto(response.data);

      // Después de obtener el producto, buscamos productos relacionados
      obtenerProductosRelacionados(response.data.category);
    } catch (err) {
      console.error("Error al obtener el producto:", err);
      setError("No se pudo cargar el producto. Por favor, intenta más tarde.");
    } finally {
      setCargando(false);
    }
  };

  // Función para obtener productos relacionados por categoría
  const obtenerProductosRelacionados = async (categoria) => {
    try {
      // Realizar la petición a la API para productos de la misma categoría
      const response = await axios.get(`${API_URL}/productos`, {
        params: { categoria: categoria, limite: 4, excluir: id },
      });

      // Guardar productos relacionados
      setProductosRelacionados(response.data);
    } catch (err) {
      console.error("Error al obtener productos relacionados:", err);
      // Simplemente establecemos un array vacío en caso de error
      setProductosRelacionados([]);
    }
  };

  // Cargar el producto cuando se monta el componente o cambia el ID
  useEffect(() => {
    obtenerProducto(id);
  }, [id]);

  const calcularPrecioConDescuento = () => {
    if (!producto) return 0;
    return producto.discount > 0
      ? producto.price - (producto.price * producto.discount) / 100
      : producto.price;
  };

  const handleVolverProductos = () => {
    navigate("/productos");
  };

  const handleCantidadChange = (e) => {
    const valor = parseInt(e.target.value);
    if (valor > 0 && valor <= (producto?.stock || 1)) {
      setCantidad(valor);
    }
  };

  // Añadir al carrito (simulado)
  const handleAddToCart = () => {
    // Aquí implementaríamos la lógica para añadir al carrito
    // Podría ser una petición a la API o almacenar en localStorage
    alert(
      `Producto ${producto.title} añadido al carrito (${cantidad} unidades)`
    );
  };

  // Compra inmediata (simulado)
  const handleBuyNow = () => {
    // Aquí implementaríamos la lógica para compra directa
    // Podría redirigir a un checkout o similar

    navigate("/checkout", {
      state: {
        productos: [{ ...producto, cantidad }],
        total: calcularPrecioConDescuento() * cantidad,
      },
    });
  };

  if (cargando) {
    return (
      <Container className="py-5 text-center">
        <Spinner
          animation="border"
          role="status"
          style={{
            color: colors.primaryDark,
            width: "4rem",
            height: "4rem",
            margin: "2rem auto",
          }}
        >
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
        <h2 style={{ color: colors.primaryDark }}>Cargando producto...</h2>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Error al cargar el producto</Alert.Heading>
          <p>{error}</p>
          <hr />
          <div className="d-flex justify-content-between">
            <Button
              variant="outline-danger"
              onClick={() => obtenerProducto(id)}
            >
              Reintentar
            </Button>
            <Button variant="outline-primary" onClick={handleVolverProductos}>
              Volver a Productos
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  if (!producto) {
    return (
      <Container className="py-5 text-center">
        <h2 style={{ color: colors.primaryDark }}>Producto no encontrado</h2>
        <p style={{ color: colors.primaryMedium }}>
          Lo sentimos, el producto que buscas no existe o ha sido eliminado.
        </p>
        <Button
          style={{ ...buttons.primary }}
          onClick={handleVolverProductos}
          className="mt-3"
        >
          Volver a Productos
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {/* Botón para volver */}
      <Button
        variant="outline-secondary"
        className="mb-4"
        onClick={handleVolverProductos}
        style={{
          borderColor: colors.primaryLight,
          color: colors.primaryMedium,
        }}
      >
        &laquo; Volver a Productos
      </Button>

      <Row>
        {/* Imagen del producto */}
        <Col lg={6} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Img
              src={`${API_URL}${producto.image}`}
              alt={producto.title}
              style={{
                height: "400px",
                objectFit: "cover",
              }}
            />
          </Card>
        </Col>

        {/* Información del producto */}
        <Col lg={6}>
          <div className="mb-3 d-flex justify-content-between align-items-start">
            <h1 style={textStyles.title}>{producto.title}</h1>
            {producto.discount > 0 && (
              <Badge bg="danger" className="p-2">
                -{producto.discount}%
              </Badge>
            )}
          </div>

          <div className="mb-3">
            <div className="d-flex align-items-center">
              <div className="text-warning me-2">
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <span key={i}>
                      {i < Math.floor(producto.rating) ? "★" : "☆"}
                    </span>
                  ))}
              </div>
              <span style={{ color: colors.primaryLight }}>
                {producto.rating} ({producto.reviews} reseñas)
              </span>
            </div>
          </div>

          <p style={textStyles.paragraph} className="mb-4">
            {producto.description}
          </p>

          <div className="mb-4">
            <h3 style={textStyles.subtitle}>Precio:</h3>
            <div className="d-flex align-items-center">
              {producto.discount > 0 ? (
                <>
                  <h2
                    style={{ ...textStyles.title, color: colors.primaryLight }}
                  >
                    ${calcularPrecioConDescuento().toFixed(2)}
                  </h2>
                  <span className="ms-3 text-decoration-line-through text-muted">
                    ${producto.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <h2 style={{ ...textStyles.title, color: colors.primaryLight }}>
                  ${producto.price.toFixed(2)}
                </h2>
              )}
            </div>
          </div>

          <div className="mb-4">
            <Row className="align-items-center">
              <Col xs="auto">
                <h5 style={textStyles.subtitle}>Cantidad:</h5>
              </Col>
              <Col xs={3}>
                <div className="d-flex align-items-center">
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    disabled={cantidad <= 1}
                    onClick={() => cantidad > 1 && setCantidad(cantidad - 1)}
                  >
                    -
                  </Button>
                  <input
                    type="number"
                    className="form-control mx-2 text-center"
                    value={cantidad}
                    onChange={handleCantidadChange}
                    min="1"
                    max={producto.stock}
                  />
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    disabled={cantidad >= producto.stock}
                    onClick={() =>
                      cantidad < producto.stock && setCantidad(cantidad + 1)
                    }
                  >
                    +
                  </Button>
                </div>
              </Col>
              <Col>
                <span style={{ color: colors.primaryLight }}>
                  {producto.stock} unidades disponibles
                </span>
              </Col>
            </Row>
          </div>

          <div className="mb-4">
            <Row>
              <Col>
                <Button
                  style={buttons.primary}
                  className="w-100"
                  onClick={handleAddToCart}
                >
                  Agregar al Carrito
                </Button>
              </Col>
              <Col>
                <Button
                  style={{
                    ...buttons.secondary,
                    backgroundColor: colors.accent,
                  }}
                  className="w-100"
                  onClick={handleBuyNow}
                >
                  Comprar Ahora
                </Button>
              </Col>
            </Row>
          </div>

          <div className="mt-4">
            <ListGroup variant="flush" className="border rounded">
              <ListGroup.Item className="d-flex">
                <strong className="me-2">Marca:</strong> {producto.brand}
              </ListGroup.Item>
              <ListGroup.Item className="d-flex">
                <strong className="me-2">Categoría:</strong> {producto.category}
              </ListGroup.Item>
              <ListGroup.Item className="d-flex">
                <strong className="me-2">Garantía:</strong> {producto.warranty}
              </ListGroup.Item>
              <ListGroup.Item className="d-flex">
                <strong className="me-2">Disponibilidad:</strong>
                <span className="text-success">{producto.availability}</span>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Col>
      </Row>

      {/* Secciones adicionales en pestañas */}
      <Row className="mt-5">
        <Col>
          <Tabs
            defaultActiveKey="caracteristicas"
            className="mb-3"
            style={{ color: colors.primaryDark }}
          >
            <Tab
              eventKey="caracteristicas"
              title="Características"
              style={textStyles.paragraph}
            >
              <Card.Body>
                <h3 style={textStyles.subtitle} className="mb-4">
                  Características Principales
                </h3>
                <ul className="list-unstyled">
                  {producto.features.map((feature, index) => (
                    <li key={index} className="mb-2 d-flex align-items-start">
                      <span className="me-2 text-success">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Tab>
            <Tab eventKey="especificaciones" title="Especificaciones Técnicas">
              <Card.Body>
                <h3 style={textStyles.subtitle} className="mb-4">
                  Especificaciones Técnicas
                </h3>
                <p style={textStyles.paragraph}>
                  Información técnica detallada sobre {producto.title}.
                </p>
                <ListGroup variant="flush" className="border rounded">
                  <ListGroup.Item className="d-flex">
                    <strong className="me-2 w-25">Modelo:</strong>{" "}
                    {producto.brand} {producto.title.split(" ")[0]}
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex">
                    <strong className="me-2 w-25">Dimensiones:</strong> 15 x 8 x
                    4 cm
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex">
                    <strong className="me-2 w-25">Peso:</strong> 350g
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex">
                    <strong className="me-2 w-25">Conectividad:</strong> WiFi,
                    Bluetooth 5.0
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex">
                    <strong className="me-2 w-25">Consumo Energético:</strong>{" "}
                    5W
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Tab>
            <Tab eventKey="opiniones" title="Opiniones">
              <Card.Body>
                <h3 style={textStyles.subtitle} className="mb-4">
                  Opiniones de Clientes
                </h3>
                <p style={textStyles.paragraph}>
                  Este producto tiene {producto.reviews} reseñas con un promedio
                  de {producto.rating} estrellas.
                </p>
                {/* Ejemplo de una reseña */}
                <Card className="mb-3 border-0 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between">
                      <h5>Cliente satisfecho</h5>
                      <div className="text-warning">★★★★★</div>
                    </div>
                    <p>
                      Excelente producto, cumple con todas mis expectativas. La
                      instalación fue sencilla y la aplicación funciona
                      perfectamente. Recomendado al 100%.
                    </p>
                    <small className="text-muted">
                      Publicado el 15 de febrero de 2025
                    </small>
                  </Card.Body>
                </Card>
                <Card className="mb-3 border-0 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between">
                      <h5>Muy buena compra</h5>
                      <div className="text-warning">★★★★☆</div>
                    </div>
                    <p>
                      Muy buen producto, la calidad es excelente. Le quito una
                      estrella porque la aplicación a veces tarda en conectarse,
                      pero en general estoy satisfecho.
                    </p>
                    <small className="text-muted">
                      Publicado el 3 de enero de 2025
                    </small>
                  </Card.Body>
                </Card>
              </Card.Body>
            </Tab>
          </Tabs>
        </Col>
      </Row>

      {/* Productos relacionados */}
      <Row className="mt-5">
        <Col>
          <h3 style={textStyles.subtitle} className="mb-4">
            Productos Relacionados
          </h3>
          {productosRelacionados.length > 0 ? (
            <Row>
              {productosRelacionados.map((item) => (
                <Col md={3} sm={6} key={item._id} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Img
                      variant="top"
                      src={item.image}
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title style={{ fontSize: "16px" }}>
                        {item.title}
                      </Card.Title>
                      <Card.Text className="text-muted small">
                        {item.description.substring(0, 60)}...
                      </Card.Text>
                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-bold">
                            ${item.price.toFixed(2)}
                          </span>
                          {item.discount > 0 && (
                            <Badge bg="danger">-{item.discount}%</Badge>
                          )}
                        </div>
                        <Button
                          className="w-100 mt-2"
                          style={{
                            backgroundColor: colors.primaryLight,
                            borderColor: colors.primaryLight,
                          }}
                          onClick={() => navigate(`/producto/${item._id}`)}
                        >
                          Ver Producto
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p style={{ color: colors.primaryMedium }}>
              No hay productos relacionados disponibles.
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductoDetalle;
