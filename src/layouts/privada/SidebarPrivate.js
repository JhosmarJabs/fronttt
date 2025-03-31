import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Nav, Badge } from "react-bootstrap";
import { colors, typography } from "../../styles/styles";
import {
  FaHome,
  FaMicrochip,
  FaBell,
  FaClipboardList,
  FaGlobe
} from "react-icons/fa";

const SidebarPrivate = ({ isOpen, onToggle }) => {
  const location = useLocation();

  // Función para verificar si un enlace está activo
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  // Boton para colapsar el sidebar
  const toggleSidebar = () => {
    if (onToggle) {
      onToggle(!isOpen);
    }
  };

  // Contador de dispositivos activos (ejemplo)
  const activeDevices = 4;

  // Estilos principales
  const styles = {
    sidebar: {
      width: isOpen ? "280px" : "70px",
      height: "100%",
      backgroundColor: colors.primaryDark,
      transition: "width 0.3s ease-in-out, box-shadow 0.3s ease",
      overflowX: "hidden",
      overflowY: "auto",
      boxShadow: isOpen ? "0 0 15px rgba(0, 0, 0, 0.15)" : "none",
      borderRight: `1px solid ${colors.primaryMedium}`,
      display: "flex",
      flexDirection: "column",
      scrollbarWidth: "thin",
      scrollbarColor: `${colors.primaryLight} ${colors.primaryDark}`
    },
    sidebarContent: {
      padding: "25px 15px 15px 15px",
      flex: 1
    },
    header: {
      marginBottom: "25px",
      paddingBottom: "15px",
      borderBottom: `1px solid ${colors.primaryMedium}`,
      display: "flex",
      alignItems: "center"
    },
    headerTitle: {
      color: colors.white,
      fontFamily: typography.fontPrimary,
      fontWeight: "bold",
      margin: 0,
      fontSize: "18px",
      paddingLeft: "10px"
    },
    navLink: (path) => ({
      padding: "14px 16px",
      marginBottom: "10px",
      color: colors.white,
      backgroundColor: isActive(path) ? colors.primaryMedium : "transparent",
      display: "flex",
      alignItems: "center",
      borderRadius: "10px",
      margin: "0 10px 10px 10px",
      textDecoration: "none",
      transition: "all 0.2s ease",
      fontSize: "14px",
      fontWeight: isActive(path) ? "600" : "500",
      boxShadow: isActive(path) ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
      position: "relative",
      overflow: "hidden",
      "&:hover": {
        backgroundColor: isActive(path) ? colors.primaryMedium : colors.primaryLight,
        transform: "translateY(-2px)",
        boxShadow: isActive(path) ? "0 6px 12px rgba(0,0,0,0.25)" : "0 2px 5px rgba(0,0,0,0.15)"
      }
    }),
    icon: {
      marginRight: "12px",
      fontSize: "16px",
      color: isOpen ? colors.white : "transparent"
    },
    badge: {
      position: "absolute",
      right: "15px",
      fontSize: "10px",
      padding: "0.25em 0.6em"
    }
  };

  // Datos de navegación simplificados
  const navigationLinks = [
    { 
      to: "/privado/dashboard",
      icon: <FaHome style={{...styles.icon, fontSize: "18px"}} />,
      text: "Inicio",
      badge: null
    },
    { 
      to: "/privado/dispositivos",
      icon: <FaMicrochip style={styles.icon} />,
      text: "Dispositivos IoT",
      badge: {
        count: activeDevices,
        color: colors.primaryLight,
        textColor: colors.white
      }
    },
    // { 
    //   to: "/privado/notificaciones",
    //   icon: <FaBell style={styles.icon} />,
    //   text: "Notificaciones",
    //   badge: {
    //     count: 2,
    //     color: "#dc3545",
    //     textColor: colors.white
    //   }
    // },
    // { 
    //   to: "/privado/pedidos",
    //   icon: <FaClipboardList style={styles.icon} />,
    //   text: "Mis Pedidos",
    //   badge: null
    // },
    { 
      to: "/privado/sitio",
      icon: <FaGlobe style={styles.icon} />,
      text: "Ir al Sitio Principal",
      badge: null,
      highlight: true
    }
  ];

  return (
    <div style={styles.sidebar}>
      <div style={styles.sidebarContent}>
        {/* Título del panel */}
        <div style={styles.header}>
          {isOpen ? (
            <h5 style={styles.headerTitle}>
              Panel de Control
            </h5>
          ) : (
            <h5 style={{...styles.headerTitle, fontSize: '14px'}}>
              PC
            </h5>
          )}
          
          {/* Botón para colapsar/expandir */}
          <button 
            style={{
              marginLeft: 'auto',
              background: 'transparent',
              border: 'none',
              color: colors.white,
              fontSize: '16px',
              cursor: 'pointer'
            }}
            onClick={toggleSidebar}
          >
            {isOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Enlaces de navegación */}
        <Nav className="flex-column">
          {navigationLinks.map((item, index) => {
            // Estilo personalizado para el enlace actual
            const linkStyle = {
              ...styles.navLink(item.to),
              // Si el elemento tiene resaltado, aplicar estilos adicionales
              ...(item.highlight && {
                backgroundColor: isActive(item.to) ? colors.accent : colors.accent,
                color: colors.white,
                fontWeight: "600"
              })
            };
            
            return (
              <Link
                key={`nav-item-${index}`}
                to={item.to}
                style={linkStyle}
              >
                {item.icon}
                {isOpen && <span>{item.text}</span>}
                
                {item.badge && isOpen && (
                  <Badge
                    pill
                    style={{
                      ...styles.badge,
                      backgroundColor: item.badge.color,
                      color: item.badge.textColor
                    }}
                  >
                    {item.badge.count}
                  </Badge>
                )}
              </Link>
            );
          })}
        </Nav>
      </div>
    </div>
  );
};

export default SidebarPrivate;