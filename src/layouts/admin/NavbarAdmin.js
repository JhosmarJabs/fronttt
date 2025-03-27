import React from 'react';
import { Navbar, Container, Dropdown, Button } from 'react-bootstrap';
import { FaBell, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { colors, typography } from '../../styles/styles';

const NavbarAdmin = ({ user = 'Admin' }) => {
  const styles = {
    topBar: {
      backgroundColor: colors.white,
      borderBottom: `1px solid #eee`,
      padding: '10px 0',
      zIndex: 10,
    },
    userMenu: {
      display: 'flex',
      alignItems: 'center',
    },
    userAvatar: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      backgroundColor: colors.primaryLight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: colors.white,
      marginRight: '10px',
    },
    notificationBadge: {
      position: 'absolute',
      top: '-5px',
      right: '-5px',
      backgroundColor: '#dc3545',
      color: 'white',
      borderRadius: '50%',
      width: '18px',
      height: '18px',
      fontSize: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    notificationButton: {
      position: 'relative',
      marginRight: '15px',
    }
  };

  return (
    <Navbar style={styles.topBar} sticky="top">
      <Container fluid>
        {/* Área izquierda del navbar (puede añadirse contenido si es necesario) */}
        
        {/* Área derecha del navbar */}
        <div className="ms-auto d-flex align-items-center">
          {/* Notificaciones */}
          <div style={styles.notificationButton}>
            <Button variant="light" style={{ border: 'none' }}>
              <FaBell color={colors.primaryMedium} />
              <span style={styles.notificationBadge}>3</span>
            </Button>
          </div>
          
          {/* Menú de usuario */}
          <Dropdown align="end">
            <Dropdown.Toggle as="div" style={{ cursor: 'pointer' }}>
              <div style={styles.userMenu}>
                <div style={styles.userAvatar}>
                  <FaUser />
                </div>
                <span style={{ color: colors.primaryDark, fontFamily: typography.fontSecondary }}>
                  {user}
                </span>
              </div>
            </Dropdown.Toggle>
            
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/privado/perfil">Mi Perfil</Dropdown.Item>
              <Dropdown.Item as={Link} to="/privado/configuracion">Configuración</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as={Link} to="/">Cerrar Sesión</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavbarAdmin;