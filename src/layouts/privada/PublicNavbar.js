import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Button,
  Form,
  FormControl,
  NavDropdown,
  Dropdown,
} from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { colors } from "../../styles/styles"; // Importamos estilos

const PublicNavbar = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Categorías de productos para el menú desplegable
  const productCategories = [
    { name: "Domótica", slug: "domotica" },
    { name: "Seguridad", slug: "seguridad" },
    { name: "Energía", slug: "energia" },
    { name: "Climatización", slug: "climatizacion" },
  ];

  // Función para manejar la selección de categorías
  const handleCategorySelect = (categorySlug) => {
    navigate(`/privado/sitio/productos?categoria=${categorySlug}`);
    setExpanded(false);
  };

  // Función para volver al dashboard
  const handleGoToApp = () => {
    navigate("/privado");
    setExpanded(false);
  };

  // Nueva función para navegar al carrito
  const handleGoToCarrito = () => {
    navigate("/privado/sitio/carrito");
    setExpanded(false);
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      expanded={expanded}
      className="py-2 border-bottom shadow-sm"
      sticky="top"
    >
      <Container fluid className="px-4">
        {/* Logo de la empresa */}
        <Navbar.Brand
          as={Link}
          to="/privado/sitio"
          className="fw-bold text-dark fs-4"
          onClick={() => setExpanded(false)}
          style={{ color: colors.primaryDark }}
        >
          JADA Company
        </Navbar.Brand>

        {/* Botón de toggle para móviles */}
        <Navbar.Toggle
          aria-controls="navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />

        {/* Contenido del navbar colapsable */}
        <Navbar.Collapse id="navbar-nav">
          {/* Enlaces principales - centrados */}
          <Nav className="mx-auto">
            <Nav.Link
              as={Link}
              to="/privado/sitio"
              onClick={() => setExpanded(false)}
              className="mx-2"
              style={{ color: colors.primaryMedium }}
            >
              Inicio
            </Nav.Link>

            {/* Menú desplegable de productos */}
            <NavDropdown
              title="Productos"
              id="products-dropdown"
              className="mx-2"
              style={{ color: colors.primaryMedium }}
            >
              <NavDropdown.Item
                as={Link}
                to="/privado/sitio/productos"
                onClick={() => setExpanded(false)}
              >
                Todos los productos
              </NavDropdown.Item>

              <NavDropdown.Divider />

              {productCategories.map((category) => (
                <NavDropdown.Item
                  key={category.slug}
                  onClick={() => handleCategorySelect(category.slug)}
                >
                  {category.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <Nav.Link
              as={Link}
              to="/privado/sitio/servicios"
              onClick={() => setExpanded(false)}
              className="mx-2"
              style={{ color: colors.primaryMedium }}
            >
              Servicios
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/privado/sitio/nosotros"
              onClick={() => setExpanded(false)}
              className="mx-2"
              style={{ color: colors.primaryMedium }}
            >
              Nosotros
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/privado/sitio/contacto"
              onClick={() => setExpanded(false)}
              className="mx-2"
              style={{ color: colors.primaryMedium }}
            >
              Contacto
            </Nav.Link>
          </Nav>

          {/* Barra de búsqueda y botón de ir a app - alineados a la derecha */}
          <div className="d-flex align-items-center mt-3 mt-lg-0">
            {/* Botón de Carrito */}
            <Button
              onClick={handleGoToCarrito}
              style={{
                backgroundColor: colors.primaryDark,
                borderColor: colors.primaryDark,
                borderRadius: "20px",
              }}
              className="rounded-pill px-3 me-2"
            >
              Carrito
            </Button>

            {/* Botón "Ir a app" */}
            <Button
              onClick={handleGoToApp}
              style={{
                backgroundColor: colors.primaryDark,
                borderColor: colors.primaryDark,
                whiteSpace: "nowrap",
                borderRadius: "20px",
              }}
              className="px-3"
            >
              Ir a App
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PublicNavbar;