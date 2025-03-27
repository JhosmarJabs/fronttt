import React, { useState, useEffect } from 'react';
import { Container, Navbar, Button, Dropdown, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { colors, typography } from '../../styles/styles';
import { jwtDecode } from 'jwt-decode'; // Asegúrate de instalar jwt-decode
import { 
  FaUser,
  FaBell, 
  FaBars, 
  FaSignOutAlt,
  FaCog, 
  FaQuestionCircle
} from 'react-icons/fa';

const NavbarPrivada = ({ toggleSidebar, collapsed }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Usuario',
    surname: '',
    role: 'Cliente'
  });
  
  // Datos de ejemplo para notificaciones
  const notifications = [
    { id: 1, text: "Nueva actualización disponible para tu dispositivo", time: "Hace 5 min", read: false },
    { id: 2, text: "Alerta de temperatura alta en Dispositivo #102", time: "Hace 20 min", read: false },
    { id: 3, text: "Recordatorio: Mantenimiento programado", time: "Hace 1 hora", read: true },
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (token) {
      try {
        const decoded = jwtDecode(token);
        
        // Mostrar el token completo para depuración
        console.log('Token completo decodificado:', decoded);
        
        // IMPORTANTE: Usamos directamente los datos del token decodificado
        setUserData({
          id: decoded.id, // 👈 aquí se guarda
          name: decoded.name || 'Usuario',
          surname: decoded.surname || '',
          role: decoded.role || 'Cliente'
        });
        
        // Log para verificar que estamos configurando los datos correctamente
        console.log('Datos que se establecen en el estado:', {
          id: decoded.id || 'id x',
          name: decoded.name || 'Usuario',
          surname: decoded.surname || '',
          role: decoded.role || 'Cliente'
        });
        
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        console.log("Token inválido o mal formateado");
        handleLogout(); // Cierra sesión si el token es inválido
      }
    } else {
      console.log("No se encontró token de autenticación");
    }
  }, []);
  
  // Para verificar después de la renderización que los datos se muestran correctamente
  useEffect(() => {
    console.log('Datos de usuario mostrados en la interfaz:', userData);
  }, [userData]);

  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Manejo del cierre de sesión
  const handleLogout = () => {
    // Limpiar token y redirigir
    localStorage.removeItem("token");
    console.log("Sesión cerrada");
    navigate('/');
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm" style={{ zIndex: 999 }}>
      <Container fluid>
        {/* Botón para toggle sidebar en móviles */}
        {collapsed && (
          <Button 
            variant="light" 
            className="me-2 border-0"
            onClick={toggleSidebar}
            aria-label="Abrir menú"
          >
            <FaBars />
          </Button>
        )}
        
        {/* Información del usuario visible en la barra de navegación */}
        <div className="d-none d-md-flex align-items-center ms-2">
          <span style={{ 
            fontWeight: 'bold', 
            color: colors.primaryDark,
            fontSize: '14px'
          }}>
            Bienvenido, {userData.name} {userData.surname}
          </span>
          <span style={{ 
            marginLeft: '8px',
            padding: '3px 8px',
            backgroundColor: colors.primaryLight,
            color: colors.white,
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            {userData.role}
          </span>
        </div>
        
        {/* Espacio flexible para empujar elementos a la derecha */}
        <div className="ms-auto d-flex align-items-center">
          {/* Botón de ayuda */}
          <Button 
            variant="light" 
            className="me-2 border-0 d-none d-md-flex"
            style={{ borderRadius: '50%', padding: '8px' }}
            title="Ayuda"
          >
            <FaQuestionCircle color={colors.primaryMedium} />
          </Button>
          
          {/* Notificaciones */}
          <div className="position-relative me-2">
            <Button 
              variant="light" 
              className="border-0"
              style={{ borderRadius: '50%', padding: '8px' }}
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notificaciones"
            >
              <FaBell color={colors.primaryMedium} />
              {unreadCount > 0 && (
                <Badge 
                  bg="danger" 
                  pill
                  style={{ 
                    position: 'absolute', 
                    top: '0', 
                    right: '0',
                    fontSize: '10px',
                    transform: 'translate(25%, -25%)'
                  }}
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
            
            {/* Panel de notificaciones */}
            {showNotifications && (
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: '0',
                  width: '320px',
                  backgroundColor: colors.white,
                  borderRadius: '8px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.15)',
                  zIndex: 1000,
                  marginTop: '8px',
                  overflow: 'hidden'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-3 border-bottom">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="m-0">Notificaciones</h6>
                    <Badge bg="danger" pill>{unreadCount}</Badge>
                  </div>
                </div>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className="p-3 border-bottom" 
                      style={{ 
                        backgroundColor: notification.read ? '#fff' : 'rgba(13, 110, 253, 0.05)',
                        cursor: 'pointer' 
                      }}
                    >
                      <div className="small mb-1">{notification.text}</div>
                      <div className="d-flex justify-content-between">
                        <small className="text-muted">{notification.time}</small>
                        {!notification.read && (
                          <small className="text-primary">Nueva</small>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 text-center">
                  <Button variant="link" size="sm">Ver todas</Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Menú de usuario */}
          <Dropdown align="end">
            <Dropdown.Toggle 
              variant="light" 
              id="dropdown-user" 
              style={{ 
                border: 'none', 
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                padding: '0 8px',
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: colors.primaryLight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.white,
                border: `2px solid ${colors.white}`,
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}>
                {userData.name.charAt(0) + (userData.surname ? userData.surname.charAt(0) : '')}
              </div>
              <div className="d-none d-md-block ms-2 me-1">
                <div style={{ 
                  textAlign: 'left', 
                  lineHeight: '1.2',
                  color: colors.primaryDark
                }}>
                  <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                    {`${userData.name} ${userData.surname}`.trim()}
                  </div>
                  <div style={{ fontSize: '12px', color: colors.accent }}>
                    {userData.role}
                  </div>
                </div>
              </div>
            </Dropdown.Toggle>
            
            <Dropdown.Menu style={{ minWidth: '200px', marginTop: '8px' }}>
              <div className="px-3 py-2 text-center d-md-none border-bottom">
                <div style={{ fontWeight: 'bold', color: colors.primaryDark }}>
                  {`${userData.name} ${userData.surname}`.trim()}
                </div>
                <div style={{ fontSize: '12px', color: colors.accent }}>
                  {userData.role}
                </div>
              </div>
              
              <Dropdown.Item as={Link} to="/privado/perfil">
                <FaUser className="me-2" size={14} /> Mi Perfil
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/privado/configuracion">
                <FaCog className="me-2" size={14} /> Configuración
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>
                <FaSignOutAlt className="me-2" size={14} /> Cerrar Sesión
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavbarPrivada;