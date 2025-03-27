import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Card, Image, Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cards from "../../components/CardsV"; // Componente de tarjetas
import { colors, typography } from "../../styles/styles"; // Importamos los estilos de la guía
import { API_URL } from "../../config"; // Asegúrate de importar la URL de la API

const Inicio = () => {
  const navigate = useNavigate();
  const [destacados, setDestacados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productoEstrella, setProductoEstrella] = useState(null);
  // Estado para testimonios dinámicos
  const [testimonios, setTestimonios] = useState([]);
  const [testimoniosLoading, setTestimoniosLoading] = useState(true);
  const [testimoniosError, setTestimoniosError] = useState(false);

  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    categories: false,
    products: false,
    testimonials: false,
    starProduct: false,
    cta: false,
  });

  // Obtener los productos desde la API
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`${API_URL}/productos`);
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
  
        const data = await response.json();
        const productosArray = Array.isArray(data)
          ? data
          : data.data
          ? data.data
          : [];
  
        // Agregar URL base a cada imagen
        const productosConUrl = productosArray.map((p) => ({
          ...p,
          image: `${API_URL}${p.image}`,
        }));
  
        setProductos(productosConUrl);
  
        // Productos destacados (con la URL ya corregida)
        const productosDestacados = productosConUrl
          .filter((p) => p.rating >= 4.7 || p.discount >= 10)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);
  
        setDestacados(productosDestacados);
  
        // Categorías con imagen corregida
        const categoriasUnicas = [
          ...new Set(productosConUrl.map((p) => p.category)),
        ];
        const categoriasData = categoriasUnicas.map((categoria) => {
          const productosCategoria = productosConUrl.filter(
            (p) => p.category === categoria
          );
          return {
            nombre: categoria,
            cantidad: productosCategoria.length,
            imagen: productosCategoria[0]?.image,
          };
        });
        setCategorias(categoriasData);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };
  
    fetchProductos();
  }, []);
  

  // Cargar testimonios destacados desde la API
  useEffect(() => {
    const fetchTestimonios = async () => {
      try {
        setTestimoniosLoading(true);
        setTestimoniosError(false);

        const response = await fetch(
          `${API_URL}/testimonios/destacados?limit=3`
        );
        if (!response.ok) {
          throw new Error("Error al obtener testimonios");
        }

        const data = await response.json();
        setTestimonios(data);
      } catch (error) {
        console.error("Error al obtener testimonios:", error);
        setTestimoniosError(true);

        // // Si hay error en la carga, usar datos estáticos de respaldo
        // setTestimonios([
        //   {
        //     _id: "1",
        //     usuario_id: { name: "Ana", surname: "García" },
        //     puesto: "Propietaria de una casa inteligente",
        //     comentario: "Instalé los productos de JADA en toda mi casa y la transformación ha sido increíble. El sistema es intuitivo y el ahorro energético es notable desde el primer mes.",
        //     estrellas: 5,
        //     foto: "https://randomuser.me/api/portraits/women/12.jpg"
        //   },
        //   {
        //     _id: "2",
        //     usuario_id: { name: "Carlos", surname: "Rodríguez" },
        //     puesto: "Emprendedor",
        //     comentario: "La calidad de las persianas inteligentes es excepcional. El motor es silencioso y la integración con el resto de mi sistema domótico fue perfecta.",
        //     estrellas: 5,
        //     foto: "https://randomuser.me/api/portraits/men/32.jpg"
        //   },
        //   {
        //     _id: "3",
        //     usuario_id: { name: "Mariana", surname: "Torres" },
        //     puesto: "Arquitecta de interiores",
        //     comentario: "Recomiendo JADA a todos mis clientes. Sus productos no solo son funcionales sino que tienen un diseño elegante que complementa cualquier decoración.",
        //     estrellas: 4,
        //     foto: "https://randomuser.me/api/portraits/women/45.jpg"
        //   }
        // ]);
      } finally {
        setTestimoniosLoading(false);
      }
    };

    fetchTestimonios();
  }, []);

  // Crear producto estrella (persianas inteligentes)
  useEffect(() => {
    const persianaInteligente = {
      _id: "650a1f1b3e0d3a001c1a4b21",
      image:
        "https://st2.depositphotos.com/2001755/8564/i/450/depositphotos_85647140-stock-photo-beautiful-landscape-with-birds.jpg",
      title: "Persianas Inteligentes Premium",
      description:
        "Control automático de luz natural con programación horaria y sensores de luz.",
      price: 349.99,
      category: "Domótica",
      stock: 12,
      brand: "SmartShade",
      rating: 4.9,
      reviews: 380,
      discount: 15,
      features: [
        "Control por voz y app móvil",
        "Sensores de luz ambiental",
        "Programación por horarios",
        "Modo privacidad automático",
        "Ahorro energético certificado",
        "Integración con sistemas de climatización",
      ],
      warranty: "5 años",
      availability: "En stock",
      specs: {
        material: "Aluminio y fibra de carbono",
        conectividad: "WiFi, Bluetooth, Z-Wave",
        batería: "Recargable, duración 6 meses",
        motorización: "Silenciosa (<20dB)",
        resistencia: "Protección UV y antimanchas",
      },
    };
    setProductoEstrella(persianaInteligente);

    // Activar animaciones secuencialmente
    setTimeout(() => setIsVisible((prev) => ({ ...prev, hero: true })), 100);
    setTimeout(
      () => setIsVisible((prev) => ({ ...prev, features: true })),
      500
    );
    setTimeout(
      () => setIsVisible((prev) => ({ ...prev, categories: true })),
      900
    );
    setTimeout(
      () => setIsVisible((prev) => ({ ...prev, products: true })),
      1300
    );
    setTimeout(
      () => setIsVisible((prev) => ({ ...prev, starProduct: true })),
      1500
    );
    setTimeout(
      () => setIsVisible((prev) => ({ ...prev, testimonials: true })),
      1700
    );
    setTimeout(() => setIsVisible((prev) => ({ ...prev, cta: true })), 2100);
  }, []);

  // Features detalladas
  const features = [
    {
      icono: "🏠",
      titulo: "Control Total del Hogar",
      descripcion:
        "Gestiona todos tus dispositivos desde una sola aplicación, incluso cuando no estés en casa.",
    },
    {
      icono: "🔐",
      titulo: "Seguridad Avanzada",
      descripcion:
        "Protección con cifrado de nivel bancario y autenticación de múltiples factores.",
    },
    {
      icono: "💡",
      titulo: "Automatizaciones Inteligentes",
      descripcion:
        "Crea rutinas personalizadas basadas en horarios, ubicación o sensores.",
    },
    {
      icono: "📊",
      titulo: "Análisis de Consumo",
      descripcion:
        "Monitorea y optimiza el uso de energía en tiempo real con informes detallados.",
    },
    {
      icono: "🔄",
      titulo: "Actualizaciones Automáticas",
      descripcion:
        "Siempre con las últimas funciones y parches de seguridad sin intervención manual.",
    },
    {
      icono: "🌐",
      titulo: "Compatibilidad Universal",
      descripcion:
        "Funciona con todos los asistentes de voz populares y estándares IoT.",
    },
  ];

  const handleVerProductoEstrella = () => {
    if (productoEstrella) {
      navigate(`/producto/${productoEstrella._id}`);
    }
  };

  const handleCategoriaClick = (categoria) => {
    navigate(`/productos?categoria=${categoria}`);
  };

  // Estilos para animaciones y mejoras
  const animationStyles = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }
    
    @keyframes float {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
      100% {
        transform: translateY(0px);
      }
    }
    
    @keyframes shine {
      from {
        background-position: -100px;
      }
      to {
        background-position: 200px;
      }
    }
    
    .feature-card {
      transition: all 0.3s ease;
      overflow: hidden;
      border: none;
    }
    
    .feature-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 30px rgba(0,0,0,0.1);
    }
    
    .feature-card:hover .feature-icon {
      animation: pulse 1s infinite;
    }
    
    .category-card {
      transition: all 0.3s ease;
      cursor: pointer;
      overflow: hidden;
    }
    
    .category-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100px;
      width: 50px;
      height: 100%;
      background: rgba(255,255,255,0.3);
      transform: skewX(-20deg);
      transition: 0.5s;
      filter: blur(5px);
    }
    
    .category-card:hover {
      transform: scale(1.05);
      box-shadow: 0 15px 30px rgba(0,0,0,0.2);
    }
    
    .category-card:hover::before {
      animation: shine 1s forwards;
    }
    
    .category-card:hover .category-title {
      transform: translateY(-5px);
      color: #ffe607;
    }
    
    .testimonial-card {
      transition: all 0.3s ease;
    }
    
    .testimonial-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 30px rgba(0,0,0,0.1);
    }
    
    .star-product-img {
      transition: all 0.5s ease;
    }
    
    .star-product-img:hover {
      transform: scale(1.03);
    }
    
    .star-badge {
      animation: float 3s ease-in-out infinite;
    }
    
    .cta-button {
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    
    .cta-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.15);
    }
    
    .cta-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100px;
      width: 50px;
      height: 100%;
      background: rgba(255,255,255,0.5);
      transform: skewX(-20deg);
      transition: 0.5s;
      filter: blur(5px);
    }
    
    .cta-button:hover::before {
      animation: shine 1s forwards;
    }
    
    .animate-in {
      animation: fadeInUp 0.8s forwards;
    }
    
    .feature-icon {
      transition: all 0.3s ease;
    }
    
    .category-title {
      transition: all 0.3s ease;
    }
  `;

  // Estilos específicos que no se pueden lograr fácilmente con Bootstrap
  const customStyles = {
    heroSection: {
      backgroundImage:
        "linear-gradient(135deg, rgba(13, 27, 42, 0.85) 0%, rgba(27, 38, 59, 0.9) 100%), url('https://images.unsplash.com/photo-1558002038-1055e2debb44?q=80&w=2940')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity: isVisible.hero ? 1 : 0,
      transform: isVisible.hero ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.8s ease-out",
      position: "relative",
      overflow: "hidden",
    },
    heroOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage:
        "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NiIgaGVpZ2h0PSIxMDAiPgo8cmVjdCB3aWR0aD0iNTYiIGhlaWdodD0iMTAwIiBmaWxsPSIjMGQxYjJhIj48L3JlY3Q+CjxwYXRoIGQ9Ik0yOCA2NkwwIDUwTDAgMTZMMjggMEw1NiAxNkw1NiA1MEwyOCA2NkwyOCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFiMjYzYiIgc3Ryb2tlLXdpZHRoPSIyIj48L3BhdGg+CjxwYXRoIGQ9Ik0yOCAwTDI4IDM0TDAgNTBMMCA4NEwyOCAxMDBMNTYgODRMNTYgNTBMMjggMzQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFiMjYzYiIgc3Ryb2tlLXdpZHRoPSIyIj48L3BhdGg+Cjwvc3ZnPg==')",
      opacity: 0.1,
      zIndex: 1,
    },
    featuresSection: {
      opacity: isVisible.features ? 1 : 0,
      transform: isVisible.features ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s ease-out",
      background: "linear-gradient(to bottom, #f8f9fa, #ffffff)",
      position: "relative",
      overflow: "hidden",
    },
    categoriesSection: {
      backgroundImage:
        "linear-gradient(135deg, rgba(65, 90, 119, 0.95) 0%, rgba(27, 38, 59, 0.9) 100%), url('https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2587')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      opacity: isVisible.categories ? 1 : 0,
      transform: isVisible.categories ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s ease-out",
      position: "relative",
    },
    categoriesOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage:
        "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCI+CjxyZWN0IHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIzIiBjeT0iNCIgcj0iMSIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC4xIj48L2NpcmNsZT4KPC9zdmc+')",
      opacity: 0.6,
      zIndex: 1,
    },
    productsSection: {
      opacity: isVisible.products ? 1 : 0,
      transform: isVisible.products ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s ease-out",
      background: "linear-gradient(to bottom, #ffffff, #f8f9fa)",
    },
    starProductSection: {
      backgroundImage:
        "linear-gradient(135deg, rgba(65, 90, 119, 0.05) 0%, rgba(27, 38, 59, 0.02) 100%)",
      opacity: isVisible.starProduct ? 1 : 0,
      transform: isVisible.starProduct ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s ease-out",
      position: "relative",
      overflow: "hidden",
    },
    starProductPattern: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage:
        "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMzAgMzAgTDU0IDQ0IEw0NCA1NCBMMzAgMzAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzQxNWE3NyIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjEiPjwvcGF0aD4KPHBhdGggZD0iTTMwIDMwIEw2IDQ0IEwxNiA1NCBMMzAgMzAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzQxNWE3NyIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjEiPjwvcGF0aD4KPHBhdGggZD0iTTMwIDMwIEw1NCAxNiBMNDQgNiBMMzAgMzAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzQxNWE3NyIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjEiPjwvcGF0aD4KPHBhdGggZD0iTTMwIDMwIEw2IDE2IEwxNiA2IEwzMCAzMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDE1YTc3IiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMSI+PC9wYXRoPgo8L3N2Zz4=')",
      opacity: 0.7,
      zIndex: 0,
    },
    testimonialsSection: {
      opacity: isVisible.testimonials ? 1 : 0,
      transform: isVisible.testimonials ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s ease-out",
      backgroundImage: "linear-gradient(to bottom, #f8f9fa, #edf2f7)",
      position: "relative",
    },
    testimonialsPattern: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage:
        "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSIjMGQxYjJhIiBvcGFjaXR5PSIwLjA1Ij48L2NpcmNsZT4KPC9zdmc+')",
      opacity: 0.8,
      zIndex: 0,
    },
    ctaSection: {
      backgroundImage:
        "linear-gradient(135deg, rgba(13, 27, 42, 0.95) 0%, rgba(27, 38, 59, 0.9) 100%), url('https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=2940')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      opacity: isVisible.cta ? 1 : 0,
      transform: isVisible.cta ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s ease-out",
      position: "relative",
    },
    ctaOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage:
        "radial-gradient(circle at 30% 40%, rgba(255,230,7,0.05) 0%, rgba(255,230,7,0) 50%)",
      zIndex: 1,
    },
    yellowButton: {
      backgroundColor: "#ffe607",
      borderColor: "#ffe607",
      color: colors.primaryDark,
    },
    ctaYellowButton: {
      backgroundColor: "#ffe607",
      borderColor: "#ffe607",
      color: colors.primaryDark,
      borderRadius: "30px",
      padding: "12px 30px",
      fontWeight: "bold",
      fontSize: "1.1rem",
    },
    categoryOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background:
        "linear-gradient(to top, rgba(13, 27, 42, 0.8) 0%, rgba(13, 27, 42, 0.4) 50%, rgba(13, 27, 42, 0.1) 100%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "20px",
      transition: "all 0.3s ease",
    },
    featureIcon: {
      fontSize: "2.5rem",
      background:
        "linear-gradient(135deg, rgba(65, 90, 119, 0.08) 0%, rgba(65, 90, 119, 0.03) 100%)",
      width: "80px",
      height: "80px",
      lineHeight: "80px",
      borderRadius: "50%",
      display: "inline-block",
      boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
    },
    statNumber: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "#ffe607",
      textShadow: "0 2px 10px rgba(0,0,0,0.2)",
    },
    titleUnderline: {
      display: "block",
      width: "80px",
      height: "4px",
      backgroundColor: "#ffe607",
      borderRadius: "2px",
      margin: "15px auto",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    },
    whiteUnderline: {
      backgroundColor: "white",
      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    },
    testimonialQuote: {
      fontSize: "70px",
      position: "absolute",
      top: "10px",
      right: "20px",
      color: "rgba(65, 90, 119, 0.1)",
      fontFamily: "serif",
    },
    testimonialCard: {
      borderRadius: "10px",
      overflow: "hidden",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      cursor: "pointer",
      height: "100%",
      border: "none",
    },
    starRating: {
      color: "#FFD700",
      fontSize: "20px",
      filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.1))",
    },
    starProductBadge: {
      backgroundColor: "#ffe607",
      color: colors.primaryDark,
      fontWeight: "bold",
      fontSize: "1rem",
      padding: "8px 15px",
      borderRadius: "30px",
      display: "inline-block",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
      position: "relative",
      zIndex: 2,
    },
    featureCheck: {
      color: "#28a745",
      marginRight: "8px",
      fontWeight: "bold",
    },
    loadingContainer: {
      textAlign: "center",
      marginBottom: "30px",
      padding: "20px",
    },
  };

  return (
    <>
      {/* Estilos para animaciones */}
      <style>{animationStyles}</style>

      {/* Hero Section */}
      <section className="py-5" style={customStyles.heroSection}>
        <div style={customStyles.heroOverlay}></div>
        <Container
          className="py-5 text-center text-white"
          style={{ position: "relative", zIndex: 2 }}
        >
          <h1
            className="display-3 fw-bold mb-4"
            style={{ fontFamily: typography.fontPrimary }}
          >
            Transforma tu Hogar con Tecnología Inteligente
          </h1>
          <p
            className="fs-4 fw-light mb-5 mx-auto"
            style={{ maxWidth: "700px" }}
          >
            Soluciones IoT avanzadas que hacen tu vida más cómoda, eficiente y
            segura.
          </p>

          {/* Estadísticas destacadas */}
          <div className="d-flex justify-content-center flex-wrap gap-5 mt-5">
            <div
              className="text-center animate-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div style={customStyles.statNumber}>5,000+</div>
              <div className="opacity-75">Hogares conectados</div>
            </div>
            <div
              className="text-center animate-in"
              style={{ animationDelay: "0.6s" }}
            >
              <div style={customStyles.statNumber}>98%</div>
              <div className="opacity-75">Clientes satisfechos</div>
            </div>
            <div
              className="text-center animate-in"
              style={{ animationDelay: "0.9s" }}
            >
              <div style={customStyles.statNumber}>24/7</div>
              <div className="opacity-75">Soporte técnico</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Sección de Características */}
      <section className="py-5" style={customStyles.featuresSection}>
        <Container className="py-5" style={{ position: "relative", zIndex: 2 }}>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-dark">
              Características Principales
              <span style={customStyles.titleUnderline}></span>
            </h2>
            <p
              className="lead text-muted mx-auto mb-5"
              style={{ maxWidth: "700px" }}
            >
              Nuestra tecnología está diseñada para adaptarse a Nuestra
              tecnología está diseñada para adaptarse a tus necesidades,
              ofreciéndote control, seguridad y eficiencia.
            </p>
          </div>

          <Row className="g-4">
            {features.map((feature, idx) => (
              <Col
                md={6}
                lg={4}
                key={idx}
                className="mb-4 animate-in"
                style={{ animationDelay: `${0.2 * idx}s` }}
              >
                <Card className="h-100 shadow feature-card">
                  <Card.Body className="p-4 text-center">
                    <div className="mb-3 text-center">
                      <span
                        className="feature-icon"
                        style={customStyles.featureIcon}
                      >
                        {feature.icono}
                      </span>
                    </div>
                    <h3
                      className="fs-4 fw-bold mb-3"
                      style={{ color: colors.primaryDark }}
                    >
                      {feature.titulo}
                    </h3>
                    <p
                      className="text-muted"
                      style={{ color: colors.primaryLight }}
                    >
                      {feature.descripcion}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Sección de Categorías */}
      <section
        className="py-5 text-white"
        style={customStyles.categoriesSection}
      >
        <div style={customStyles.categoriesOverlay}></div>
        <Container className="py-5" style={{ position: "relative", zIndex: 2 }}>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">
              Nuestras Categorías
              <span
                style={{
                  ...customStyles.titleUnderline,
                  ...customStyles.whiteUnderline,
                }}
              ></span>
            </h2>
            <p
              className="lead opacity-75 mx-auto mb-5"
              style={{ maxWidth: "700px" }}
            >
              Descubre nuestras soluciones en distintas áreas para hacer tu
              espacio más inteligente.
            </p>
          </div>

          <Row className="g-4">
            {categorias.map((categoria, idx) => (
              <Col
                md={6}
                lg={3}
                key={idx}
                className="animate-in"
                style={{ animationDelay: `${0.2 * idx}s` }}
              >
                <div
                  className="position-relative rounded-4 overflow-hidden shadow h-100 category-card"
                  style={{ height: "200px" }}
                  onClick={() => handleCategoriaClick(categoria.nombre)}
                >
                  <img
                    src={categoria.imagen}
                    alt={categoria.nombre}
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                  <div style={customStyles.categoryOverlay}>
                    <h3 className="fs-4 fw-bold mb-1 category-title">
                      {categoria.nombre}
                    </h3>
                    <p className="small opacity-75">
                      {categoria.cantidad} productos
                    </p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Sección de Producto Estrella */}
      {productoEstrella && (
        <section className="py-5" style={customStyles.starProductSection}>
          <div style={customStyles.starProductPattern}></div>
          <Container
            className="py-5"
            style={{ position: "relative", zIndex: 2 }}
          >
            <div className="text-center mb-5">
              <div className="mb-3">
                <span
                  className="star-badge"
                  style={customStyles.starProductBadge}
                >
                  PRODUCTO ESTRELLA
                </span>
              </div>
              <h2 className="display-5 fw-bold text-dark">
                {productoEstrella.title}
                <span style={customStyles.titleUnderline}></span>
              </h2>
              <p
                className="lead text-muted mx-auto mb-5"
                style={{ maxWidth: "700px" }}
              >
                La solución perfecta para controlar la luz natural y aumentar la
                eficiencia energética de tu hogar.
              </p>
            </div>

            <Row className="align-items-center g-5">
              <Col
                lg={6}
                className="animate-in"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="position-relative">
                  <img
                    src={productoEstrella.image}
                    alt={productoEstrella.title}
                    className="rounded-4 shadow-lg img-fluid star-product-img"
                    style={{ objectFit: "cover" }}
                  />
                  {productoEstrella.discount > 0 && (
                    <div
                      className="position-absolute top-0 start-0 m-3 py-2 px-3 rounded-pill animate-in"
                      style={{
                        backgroundColor: "#ff3a3a",
                        color: "white",
                        fontWeight: "bold",
                        animationDelay: "0.5s",
                        boxShadow: "0 5px 15px rgba(255,58,58,0.3)",
                      }}
                    >
                      -{productoEstrella.discount}%
                    </div>
                  )}
                  <div
                    className="position-absolute bottom-0 end-0 m-3 py-2 px-3 rounded-pill animate-in"
                    style={{
                      backgroundColor: "rgba(13, 27, 42, 0.8)",
                      color: "white",
                      animationDelay: "0.7s",
                      boxShadow: "0 5px 15px rgba(13,27,42,0.3)",
                    }}
                  >
                    <span className="me-1">★</span>
                    {productoEstrella.rating} ({productoEstrella.reviews}{" "}
                    reseñas)
                  </div>
                </div>
              </Col>
              <Col
                lg={6}
                className="animate-in"
                style={{ animationDelay: "0.5s" }}
              >
                <div>
                  <h3
                    className="fs-2 fw-bold mb-4"
                    style={{ color: colors.primaryDark }}
                  >
                    {productoEstrella.title}
                  </h3>
                  <p
                    className="fs-5 mb-4"
                    style={{ color: colors.primaryLight }}
                  >
                    {productoEstrella.description}
                  </p>

                  <div className="mb-4">
                    <div className="d-flex mb-2">
                      <div
                        className="fs-3 fw-bold me-3"
                        style={{ color: colors.primaryDark }}
                      >
                        $
                        {(
                          productoEstrella.price -
                          (productoEstrella.price * productoEstrella.discount) /
                            100
                        ).toFixed(2)}
                      </div>
                      {productoEstrella.discount > 0 && (
                        <div className="fs-5 text-decoration-line-through text-muted d-flex align-items-center">
                          ${productoEstrella.price.toFixed(2)}
                        </div>
                      )}
                    </div>
                    <div className="text-success">
                      <i className="bi bi-check-circle-fill me-2"></i>
                      {productoEstrella.availability}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4
                      className="fs-5 fw-bold mb-3"
                      style={{ color: colors.primaryMedium }}
                    >
                      Características principales:
                    </h4>
                    <Row className="g-3">
                      {productoEstrella.features.map((feature, idx) => (
                        <Col
                          md={6}
                          key={idx}
                          className="animate-in"
                          style={{ animationDelay: `${0.6 + idx * 0.1}s` }}
                        >
                          <div className="d-flex align-items-center">
                            <span style={customStyles.featureCheck}>✓</span>{" "}
                            {feature}
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>

                  <Button
                    size="lg"
                    className="mt-3 rounded-pill px-5 cta-button"
                    style={{
                      backgroundColor: colors.primaryDark,
                      borderColor: colors.primaryDark,
                    }}
                    onClick={handleVerProductoEstrella}
                  >
                    Ver Detalles
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* Sección de Productos Destacados */}
      <section className="py-5" style={customStyles.productsSection}>
        <Container className="py-5">
          <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap">
            <h2 className="display-5 fw-bold text-dark mb-3 mb-md-0">
              Productos Destacados
              <span style={customStyles.titleUnderline}></span>
            </h2>
            <a
              href="/productos"
              className="text-decoration-none fw-bold text-primary d-flex align-items-center"
            >
              Ver todos los productos <i className="bi bi-arrow-right ms-2"></i>
            </a>
          </div>

          <div className="animate-in" style={{ animationDelay: "0.3s" }}>
            <Cards
              items={
                destacados.length > 0
                  ? destacados
                  : Array.isArray(productos)
                  ? productos.slice(0, 3)
                  : []
              }
            />
          </div>
        </Container>
      </section>

      {/* Sección de Testimonios Dinámicos */}
      {/* <section className="py-5" style={customStyles.testimonialsSection}>
        <div style={customStyles.testimonialsPattern}></div>
        <Container className="py-5" style={{ position: "relative", zIndex: 2 }}>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-dark">
              Lo que dicen nuestros clientes
              <span style={customStyles.titleUnderline}></span>
            </h2>
            <p
              className="lead text-muted mx-auto mb-5"
              style={{ maxWidth: "700px" }}
            >
              Miles de hogares y empresas han mejorado con nuestras soluciones
              inteligentes.
            </p>
          </div>

          {testimoniosLoading ? (
            <div style={customStyles.loadingContainer}>
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Cargando testimonios...</span>
              </Spinner>
              <p className="mt-3">Cargando opiniones de clientes...</p>
            </div>
          ) : (
            <Row className="g-4">
              {testimonios.map((testimonio, idx) => (
                <Col
                  lg={4}
                  md={6}
                  key={testimonio._id || idx}
                  className="animate-in"
                  style={{ animationDelay: `${0.3 * idx}s` }}
                >
                  <Card className="testimonial-card shadow">
                    <Card.Body className="p-4 position-relative">
                      <div style={customStyles.testimonialQuote}>"</div>
                      <p
                        className="fs-5 mb-4"
                        style={{ color: colors.primaryLight }}
                      >
                        {testimonio.comentario}
                      </p>
                      <div className="d-flex align-items-center">
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
                          <p className="mb-2 text-muted">{testimonio.puesto}</p>
                          <div style={customStyles.starRating}>
                            {Array(5)
                              .fill()
                              .map((_, i) => (
                                <span key={i}>
                                  {i < testimonio.estrellas ? "★" : "☆"}
                                </span>
                              ))}
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}

          <div
            className="text-center mt-5 animate-in"
            style={{ animationDelay: "0.9s" }}
          >
            <Button
              variant="outline-primary"
              className="rounded-pill px-4 py-2"
              onClick={() => navigate("/testimonios")}
            >
              Ver más opiniones
            </Button>
          </div>
        </Container>
      </section> */}

      {/* Sección CTA (Call to Action) */}
      <section className="py-5 text-white" style={customStyles.ctaSection}>
        <div style={customStyles.ctaOverlay}></div>
        <Container
          className="py-5 text-center"
          style={{ position: "relative", zIndex: 2 }}
        >
          <h2
            className="display-4 fw-bold mb-3 animate-in"
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              animationDelay: "0.3s",
            }}
          >
            Comienza tu transformación digital hoy
          </h2>
          <p
            className="lead opacity-75 mb-5 mx-auto animate-in"
            style={{ maxWidth: "700px", animationDelay: "0.5s" }}
          >
            Únete a nuestra comunidad y recibe acceso a ofertas exclusivas,
            consejos para optimizar tu hogar inteligente y mucho más.
          </p>

          <div
            className="mx-auto animate-in"
            style={{ maxWidth: "500px", animationDelay: "0.7s" }}
          >
            <Button
              style={customStyles.ctaYellowButton}
              className="px-5 py-3 cta-button"
              onClick={() => navigate("/login")}
            >
              Regístrate
            </Button>
          </div>

          <p
            className="mt-4 opacity-75 small animate-in"
            style={{ animationDelay: "0.9s" }}
          >
            <i className="bi bi-shield-check me-2"></i>
            Tu información está segura con nosotros. No compartimos tus datos.
          </p>
        </Container>
      </section>
    </>
  );
};

export default Inicio;
