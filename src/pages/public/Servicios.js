import React, { useState, useEffect, useCallback } from "react";
import { colors, textStyles, layout, buttons } from "../../styles/styles";
import { Container, Row, Col, Card, Image, Spinner, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MEDIA_URL, API_URL } from "../../config";

// Iconos para los servicios (reemplazar por componentes reales de iconos si están disponibles)
const ServiceIcons = {
  persianas: "🏠",
  diseno: "✏️",
  mantenimiento: "🔧",
  comercial: "🏢",
  instalacion: "📍",
  calidad: "⭐",
  atencion: "👥",
  ambiente: "🌱",
  precios: "💰",
};

const Servicios = () => {
  // Hook de navegación para redirecciones
  const navigate = useNavigate();

  // Estados para animaciones y efectos interactivos
  const [animate, setAnimate] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Estados para manejo de datos
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [beneficios, setBeneficios] = useState([]);
  const [loadingBeneficios, setLoadingBeneficios] = useState(true);
  const [errorBeneficios, setErrorBeneficios] = useState(null);

  // Obtener los servicios desde la API
  useEffect(() => {
    const fetchServicios = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/servicios`);

        if (!response.ok) {
          throw new Error(
            `Error al obtener los servicios: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        setServicios(data);
        setError(null);
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
        setError(
          "No se pudieron cargar los servicios. Por favor, intenta más tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    const fetchBeneficios = async () => {
      try {
        setLoadingBeneficios(true);
        const response = await fetch(`${API_URL}/servicios/beneficios`);

        if (!response.ok) {
          throw new Error(
            `Error al obtener los beneficios: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        setBeneficios(data);
        setErrorBeneficios(null);
      } catch (error) {
        console.error("Error al obtener los beneficios:", error);
        setErrorBeneficios(
          "No se pudieron cargar los beneficios. Por favor, intenta más tarde."
        );

        // Cargar beneficios de respaldo
        setBeneficios([
          {
            id: "calidad",
            title: "Calidad Garantizada",
            desc: "Utilizamos materiales de primera calidad y tecnología avanzada en todos nuestros productos y servicios.",
            icon: "⭐",
          },
          {
            id: "atencion",
            title: "Atención Personalizada",
            desc: "Nos adaptamos a tus necesidades y preferencias, ofreciendo soluciones diseñadas específicamente para ti.",
            icon: "👥",
          },
          {
            id: "ambiente",
            title: "Compromiso con el Medio Ambiente",
            desc: "Ofrecemos opciones ecológicas y sostenibles que minimizan el impacto ambiental sin sacrificar calidad.",
            icon: "🌱",
          },
          {
            id: "precios",
            title: "Precios Competitivos",
            desc: "Soluciones de alta calidad a precios accesibles para adaptarnos a diferentes presupuestos.",
            icon: "💰",
          },
        ]);
      } finally {
        setLoadingBeneficios(false);
      }
    };

    fetchServicios();
    fetchBeneficios();
  }, []);

  // Activar animaciones al cargar el componente
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Función para navegar a la sección de mensaje en contacto
  const handleNavigateToContactForm = () => {
    navigate("/contacto#formulario-mensaje");
  };

  // Estilos optimizados
  const styles = {
    // Secciones y contenedores
    section: {
      marginBottom: "70px",
      position: "relative",
    },
    hero: {
      background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primaryMedium} 100%)`,
      padding: "80px 0",
      color: colors.white,
      marginBottom: "50px",
      position: "relative",
      overflow: "hidden",
    },
    heroPattern: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: `radial-gradient(${colors.white} 1px, transparent 1px)`,
      backgroundSize: "20px 20px",
      opacity: 0.1,
    },

    // Estados de carga y error
    loadingContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "200px",
      width: "100%",
    },
    errorContainer: {
      padding: "20px",
      borderRadius: "10px",
      backgroundColor: "rgba(220, 53, 69, 0.1)",
      border: "1px solid rgba(220, 53, 69, 0.2)",
      marginBottom: "30px",
    },

    // Tarjetas y elementos con sombra
    card: {
      borderRadius: "10px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease",
      height: "100%",
      border: "none",
    },
    benefitCard: {
      borderRadius: "10px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease",
      height: "100%",
      border: "none",
      backgroundColor: colors.primaryLight,
      color: colors.white,
      overflow: "hidden",
      position: "relative",
    },
    image: {
      borderRadius: "10px",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
      transition: "transform 0.5s ease",
    },
    imageContainer: {
      position: "relative",
      overflow: "hidden",
      borderRadius: "10px",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
    },

    // Tipografía y textos
    title: {
      ...textStyles.title,
      color: colors.white,
      fontSize: "48px",
      marginBottom: "25px",
      fontWeight: 800,
      opacity: animate ? 1 : 0,
      transform: animate ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.8s ease, transform 0.8s ease",
    },
    subtitle: {
      ...textStyles.subtitle,
      position: "relative",
      paddingBottom: "15px",
      marginBottom: "25px",
      transition: "color 0.3s ease",
    },
    paragraph: {
      ...textStyles.paragraph,
      fontSize: "17px",
      lineHeight: "1.7",
    },

    // Elementos decorativos
    badge: {
      backgroundColor: colors.primaryLight,
      color: colors.white,
      padding: "5px 10px",
      borderRadius: "20px",
      fontSize: "14px",
      fontWeight: "bold",
      display: "inline-block",
      marginBottom: "15px",
    },
    heroSubtitle: {
      ...textStyles.paragraph,
      color: colors.white,
      fontSize: "20px",
      maxWidth: "700px",
      margin: "0 auto",
      opacity: animate ? 0.9 : 0,
      transform: animate ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 1s ease 0.2s, transform 1s ease 0.2s",
    },

    // Animaciones
    fadeIn: (delay = 0) => ({
      opacity: animate ? 1 : 0,
      transition: `opacity 0.8s ease ${delay}s`,
    }),
    slideUp: (delay = 0) => ({
      opacity: animate ? 1 : 0,
      transform: animate ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
    }),
    slideRight: (delay = 0) => ({
      opacity: animate ? 1 : 0,
      transform: animate ? "translateX(0)" : "translateX(-20px)",
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
    }),
    slideLeft: (delay = 0) => ({
      opacity: animate ? 1 : 0,
      transform: animate ? "translateX(0)" : "translateX(20px)",
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
    }),

    // Estilos para listas
    listItem: {
      marginBottom: "15px",
      paddingLeft: "5px",
    },
  };

  // Función para renderizar cards de beneficios con animación optimizada
  const renderBenefitCards = useCallback(() => {
    if (loadingBeneficios) {
      return (
        <div style={styles.loadingContainer}>
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Cargando beneficios...</span>
          </Spinner>
        </div>
      );
    }

    if (errorBeneficios && beneficios.length === 0) {
      return (
        <div style={styles.errorContainer}>
          <Alert variant="danger">
            <Alert.Heading>Error al cargar los beneficios</Alert.Heading>
            <p>{errorBeneficios}</p>
          </Alert>
        </div>
      );
    }

    return beneficios.map((item, index) => (
      <Col md={3} key={item._id || index} className="mb-4 mb-md-0">
        <div
          style={{
            ...styles.slideUp(0.5 + index * 0.1),
            height: "100%",
          }}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <Card
            style={{
              ...styles.benefitCard,
              transform:
                hoveredCard === index ? "translateY(-10px)" : "translateY(0)",
              boxShadow:
                hoveredCard === index
                  ? "0 10px 25px rgba(0, 0, 0, 0.2)"
                  : "0 4px 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Card.Body className="d-flex flex-column">
              <div
                style={{
                  fontSize: "32px",
                  marginBottom: "15px",
                  transition: "transform 0.3s ease",
                  transform: hoveredCard === index ? "scale(1.1)" : "scale(1)",
                }}
              >
                {item.icon || ServiceIcons[item.id]}
              </div>
              <Card.Title
                style={{
                  fontFamily: textStyles.title.fontFamily,
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "15px",
                  borderBottom: `2px solid ${colors.white}`,
                  paddingBottom: "10px",
                }}
              >
                {item.title}
              </Card.Title>
              <Card.Text
                style={{ fontSize: "16px", lineHeight: "1.6", flex: 1 }}
              >
                {item.desc || item.content}
              </Card.Text>
              {hoveredCard === index && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "5px",
                    background: `linear-gradient(to right, ${colors.primaryDark}, ${colors.primaryMedium})`,
                  }}
                />
              )}
            </Card.Body>
          </Card>
        </div>
      </Col>
    ));
  }, [ hoveredCard, animate, styles, beneficios, loadingBeneficios, errorBeneficios,]);

  // Función para renderizar servicios con animación optimizada
  const renderServicios = useCallback(() => {
    if (loading) {
      return (
        <div style={styles.loadingContainer}>
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Cargando servicios...</span>
          </Spinner>
        </div>
      );
    }

    if (error) {
      return (
        <div style={styles.errorContainer}>
          <Alert variant="danger">
            <Alert.Heading>Error al cargar los servicios</Alert.Heading>
            <p>{error}</p>
          </Alert>
        </div>
      );
    }

    if (servicios.length === 0) {
      return (
        <Alert variant="info">
          No hay servicios disponibles en este momento. Por favor, revisa más
          tarde.
        </Alert>
      );
    }

    return servicios.map((servicio, index) => {
      // Alterna el orden de la imagen y el texto basado en el índice par/impar
      const isEven = index % 2 === 0;

      return (
        <Row
          className="align-items-center"
          style={{
            ...styles.section,
            paddingTop: index > 0 ? "20px" : "0",
          }}
          key={servicio._id}
        >
          {/* Imagen del servicio */}
          <Col
            md={6}
            className={`mb-4 mb-md-0 ${isEven ? "order-md-1" : "order-md-2"}`}
          >
            <div
              style={{
                ...styles.imageContainer,
                ...styles[isEven ? "slideLeft" : "slideRight"](
                  0.2 + index * 0.05
                ),
              }}
              onMouseEnter={() => setHoveredService(servicio._id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <Image
                src={`${MEDIA_URL}${servicio.imagen}`}
                alt={servicio.titulo}
                fluid
                style={{
                  ...styles.image,
                  transform:
                    hoveredService === servicio._id
                      ? "scale(1.05)"
                      : "scale(1)",
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/800x500?text=Imagen+no+disponible";
                }}
              />
              {hoveredService === servicio._id && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                    padding: "30px 20px 15px",
                    transform: "translateY(0)",
                    transition: "transform 0.5s ease",
                  }}
                >
                  <h4 style={{ color: colors.white, marginBottom: "5px" }}>
                    <span style={{ marginRight: "10px" }}>
                      {ServiceIcons[servicio.id]}
                    </span>
                    {servicio.titulo}
                  </h4>
                  <p
                    style={{
                      color: colors.white,
                      marginBottom: 0,
                      fontSize: "14px",
                    }}
                  >
                    Conoce más sobre este servicio
                  </p>
                </div>
              )}
            </div>
          </Col>

          {/* Descripción del servicio */}
          <Col md={6} className={isEven ? "order-md-2" : "order-md-1"}>
            <div
              style={styles[isEven ? "slideRight" : "slideLeft"](
                0.3 + index * 0.05
              )}
            >
              <h2
                style={{
                  ...styles.subtitle,
                  color:
                    hoveredService === servicio._id
                      ? colors.primaryMedium
                      : styles.subtitle.color,
                }}
              >
                {servicio.titulo}
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "60px",
                    height: "4px",
                    backgroundColor: colors.primaryLight,
                    transition: "width 0.3s ease",
                    width: hoveredService === servicio._id ? "100px" : "60px",
                  }}
                ></span>
              </h2>
              <p style={styles.paragraph}>{servicio.descripcion}</p>
              {servicio.listItems && servicio.listItems.length > 0 && (
                <ul style={{ paddingLeft: "20px" }}>
                  {servicio.listItems.map((item, idx) => (
                    <li key={idx} style={styles.listItem}>
                      <div
                        style={{
                          transition: "transform 0.3s ease",
                          transform:
                            hoveredService === servicio._id
                              ? "translateX(5px)"
                              : "translateX(0)",
                        }}
                      >
                        <strong>{item.titulo}:</strong> {item.descripcion}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <Button
                style={{
                  ...buttons.primary,
                  marginTop: "20px",
                  padding: "10px 20px",
                  fontSize: "15px",
                  backgroundColor: colors.primaryMedium,
                  transition: "all 0.3s ease",
                  opacity: animate ? 1 : 0,
                  transform: animate ? "translateY(0)" : "translateY(20px)",
                  position: "relative",
                  overflow: "hidden",
                }}
                onClick={handleNavigateToContactForm}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primaryDark;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primaryMedium;
                }}
              >
                <span style={{ position: "relative", zIndex: 2 }}>
                  Solicitar información
                </span>
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)`,
                    transition: "left 0.5s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.left = "100%";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.left = "-100%";
                  }}
                ></span>
              </Button>
            </div>
          </Col>
        </Row>
      );
    });
  }, [
    hoveredService,
    animate,
    styles,
    servicios,
    loading,
    error,
    handleNavigateToContactForm,
  ]);

  return (
    <div style={{ backgroundColor: colors.white, color: colors.primaryDark }}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroPattern}></div>
        <Container>
          <Row className="text-center">
            <Col>
              <h1 style={styles.title}>Nuestros Servicios</h1>
              <p style={styles.heroSubtitle}>
                En JADA Company, nos especializamos en ofrecer soluciones
                integrales para el control de luz, privacidad y diseño en
                hogares, oficinas y espacios comerciales.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container style={layout.sectionPadding}>
        {/* Secciones de servicios */}
        {renderServicios()}

        {/* ¿Por Qué Elegirnos? */}
        <div style={{ ...styles.section, marginTop: "50px" }}>
          <Row className="text-center mb-5">
            <Col>
              <h2
                style={{
                  ...styles.subtitle,
                  display: "inline-block",
                  ...styles.fadeIn(0.5),
                }}
              >
                ¿Por Qué Elegirnos?
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "80px",
                    height: "4px",
                    backgroundColor: colors.primaryLight,
                  }}
                ></span>
              </h2>
            </Col>
          </Row>
          <Row className="g-4">{renderBenefitCards()}</Row>
        </div>

        {/* Llamado a la acción */}
        <div
          style={{
            ...styles.fadeIn(0.8),
            marginTop: "50px",
            padding: "40px",
            borderRadius: "10px",
            background: `linear-gradient(135deg, ${colors.primaryMedium} 0%, ${colors.primaryDark} 100%)`,
            color: colors.white,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 40%)`,
            }}
          ></div>

          <h3
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              marginBottom: "20px",
              position: "relative",
            }}
          >
            ¿Necesitas alguno de nuestros servicios?
          </h3>

          <p
            style={{
              fontSize: "18px",
              maxWidth: "800px",
              margin: "0 auto 25px",
              position: "relative",
            }}
          >
            En JADA Company estamos listos para ayudarte a encontrar la solución
            perfecta para tu hogar o negocio. Contáctanos hoy mismo para recibir
            asesoramiento profesional.
          </p>

          <Button
            style={{
              backgroundColor: "transparent",
              border: `2px solid ${colors.white}`,
              color: colors.white,
              padding: "12px 30px",
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontFamily: textStyles.fontPrimary,
              position: "relative",
            }}
            onClick={handleNavigateToContactForm}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.white;
              e.currentTarget.style.color = colors.primaryDark;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = colors.white;
            }}
          >
            Solicitar presupuesto gratuito
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Servicios;
