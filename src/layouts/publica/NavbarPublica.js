import React, { useState } from "react";
import { Navbar, Container, Nav, Button, Form, FormControl, NavDropdown, Dropdown } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { colors } from "../../styles/styles"; // Importamos estilos

const NavbarPublica = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Verificar si estamos en cualquier área privada (dashboard, perfil, configuración)
  const isPrivateArea = location.pathname.includes("/Dashboard") || 
                         location.pathname.includes("/perfil") || 
                         location.pathname.includes("/configuracion");

  // Categorías de productos para el menú desplegable
  const productCategories = [
    { name: "Domótica", slug: "domotica" },
    { name: "Seguridad", slug: "seguridad" },
    { name: "Energía", slug: "energia" },
    { name: "Climatización", slug: "climatizacion" }
  ];

  // Función para manejar la selección de categorías
  const handleCategorySelect = (categorySlug) => {
    navigate(`/productos?categoria=${categorySlug}`);
    setExpanded(false);
  };

  // Función para manejar cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
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
          to={isPrivateArea ? "/Dashboard" : "/"} 
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
          {isPrivateArea ? (
            // Menú para áreas privadas (Dashboard, Perfil, Configuración)
            <>
              <Nav className="mx-auto">
                <Nav.Link 
                  as={Link} 
                  to="/Dashboard" 
                  onClick={() => setExpanded(false)}
                  className="mx-2"
                  style={{ color: colors.primaryMedium }}
                >
                  Inicio
                </Nav.Link>
                {/* Si necesitas más enlaces en el área privada, puedes añadirlos aquí */}
              </Nav>
              
              {/* Botón de cuenta en área privada - alineado a la derecha */}
              <div className="d-flex align-items-center mt-3 mt-lg-0">
                <Dropdown align="end">
                  <Dropdown.Toggle 
                    variant="outline-secondary" 
                    id="dropdown-user"
                    style={{ 
                      backgroundColor: colors.primaryDark, 
                      borderColor: colors.primaryDark,
                      color: colors.white,
                      borderRadius: "20px"
                    }}
                    className="px-3"
                  >
                    Mi Cuenta
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/perfil" onClick={() => setExpanded(false)}>Perfil</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/configuracion" onClick={() => setExpanded(false)}>Configuración</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item as="button" onClick={handleLogout}>Cerrar Sesión</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </>
          ) : (
            // Menú para áreas públicas
            <>
              {/* Enlaces principales - centrados */}
              <Nav className="mx-auto">
                <Nav.Link 
                  as={Link} 
                  to="/" 
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
                    to="/productos" 
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
                
                {/* Menú desplegable de Nosotros */}
                <NavDropdown 
                  title="Nosotros" 
                  id="about-dropdown"
                  className="mx-2"
                  style={{ color: colors.primaryMedium }}
                >
                  <NavDropdown.Item 
                    as={Link} 
                    to="/nosotros" 
                    onClick={() => setExpanded(false)}
                  >
                    Nosotros
                  </NavDropdown.Item>
                  
                  <NavDropdown.Item 
                    as={Link} 
                    to="/politicas" 
                    onClick={() => setExpanded(false)}
                  >
                    Políticas
                  </NavDropdown.Item>
                  
                  <NavDropdown.Item 
                    as={Link} 
                    to="/contacto" 
                    onClick={() => setExpanded(false)}
                  >
                    Contacto
                  </NavDropdown.Item>
                  
                  <NavDropdown.Item 
                    as={Link} 
                    to="/preguntas-frecuentes" 
                    onClick={() => setExpanded(false)}
                  >
                    Preguntas Frecuentes
                  </NavDropdown.Item>
                </NavDropdown>
                
                <Nav.Link 
                  as={Link} 
                  to="/servicios" 
                  onClick={() => setExpanded(false)}
                  className="mx-2"
                  style={{ color: colors.primaryMedium }}
                >
                  Servicios
                </Nav.Link>
              </Nav>

              {/* Barra de búsqueda y botón de inicio de sesión - alineados a la derecha */}
              <div className="d-flex align-items-center mt-3 mt-lg-0">
                {/* Botón de inicio de sesión */}
                <Button 
                  as={Link} 
                  to="/login" 
                  style={{ 
                    backgroundColor: colors.primaryDark, 
                    borderColor: colors.primaryDark,
                    whiteSpace: "nowrap",
                    borderRadius: "20px"
                  }} 
                  className="ms-2 px-3"
                  onClick={() => setExpanded(false)}
                >
                  Iniciar Sesión
                </Button>
              </div>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPublica;