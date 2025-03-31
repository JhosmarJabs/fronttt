import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  Alert,
  InputGroup,
  Tabs,
  Tab,
  Breadcrumb
} from "react-bootstrap";
import {
  FaPlus,
  FaSave,
  FaDollarSign,
  FaBox,
  FaHome,
  FaCubes
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { colors, textStyles } from "../../../styles/styles";
import axios from "axios";
import { API_URL } from "../../../config";

const ProductosAlta = () => {
  // Estado para modal
  const [showModal, setShowModal] = useState(false);
  
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
  
  // Estado para seguimiento de categorías y marcas
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  
  // Estado para indicar si está cargando
  const [isLoading, setIsLoading] = useState(false);
  
  // Obtener categorías y marcas al montar el componente
  useEffect(() => {
    const obtenerCategoriasMarcas = async () => {
      try {
        const response = await axios.get(`${API_URL}/productos/metadata`);
        if (response.data) {
          setCategorias(response.data.categorias || []);
          setMarcas(response.data.marcas || []);
        }
      } catch (error) {
        console.error("Error al obtener metadatos:", error);
      }
    };
    
    obtenerCategoriasMarcas();
  }, []);

  // Manejadores para modal
  const handleOpenModal = () => {
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
    setAlerta({
      show: false,
      variant: "",
      mensaje: "",
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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

    setIsLoading(true);

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

      // Resetear formulario pero mantener el modal abierto para ver el mensaje de éxito
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
      
      // Opcionalmente, cerrar el modal después de un tiempo
      setTimeout(() => {
        handleCloseModal();
      }, 3000);
      
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
    } finally {
      setIsLoading(false);
    }
  };

  // Estilos
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
    imagePreview: {
      maxWidth: "100%",
      maxHeight: "200px",
      objectFit: "contain",
      marginTop: "10px",
      borderRadius: "4px",
    },
    addButton: {
      backgroundColor: colors.primaryDark,
      borderColor: colors.primaryDark,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: "10px 20px",
      fontSize: "16px",
      fontWeight: "500",
      width: "100%",
    }
  };

  return (
    <Container fluid style={{ padding: "30px 20px" }}>
      {/* Breadcrumb */}
      <Row className="mb-4">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin" }}>
              <FaHome className="me-1" /> Inicio
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin/productos" }}>
              <FaCubes className="me-1" /> Productos
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Alta de Productos</Breadcrumb.Item>
          </Breadcrumb>
          
          <h2 style={pageStyles.title}>Alta de Productos</h2>
          <p style={textStyles.paragraph}>
            En esta sección puede agregar nuevos productos al catálogo de la tienda.
          </p>
        </Col>
      </Row>
      
      <Card style={pageStyles.card}>
        <Card.Body>
          <Card.Title style={{...textStyles.subtitle, marginBottom: "15px"}}>
            <FaBox className="me-2" /> Agregar Nuevo Producto
          </Card.Title>
          <Card.Text style={textStyles.paragraph}>
            Complete el formulario para agregar un nuevo producto al catálogo. Todos los campos marcados con (*) son obligatorios.
          </Card.Text>
          <Button
            variant="primary"
            style={pageStyles.addButton}
            onClick={handleOpenModal}
          >
            <FaPlus /> Crear Nuevo Producto
          </Button>
        </Card.Body>
      </Card>

      {/* Modal de Alta de Producto */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header
          closeButton
          style={{ backgroundColor: colors.primaryMedium, color: colors.white }}
        >
          <Modal.Title>Nuevo Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alerta.show && (
            <Alert
              variant={alerta.variant}
              onClose={() => setAlerta({ ...alerta, show: false })}
              dismissible
            >
              {alerta.mensaje}
            </Alert>
          )}

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
                onClick={handleCloseModal}
                className="me-2"
                disabled={isLoading}
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
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Creando...
                  </>
                ) : (
                  <>
                    <FaPlus className="me-1" /> Crear Producto
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProductosAlta;