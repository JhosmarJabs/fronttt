import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './admin/SidebarAdmin';
import AdminNavbar from './admin/NavbarAdmin';
import { colors } from '../styles/styles';

const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Esta función se pasará al sidebar para mantener sincronizado el estado
  const handleSidebarToggle = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };
  
  const styles = {
    mainContainer: {
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
    },
    content: {
      flex: 1,
      marginLeft: sidebarCollapsed ? '70px' : '280px',
      transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out',
      width: sidebarCollapsed ? 'calc(100% - 70px)' : 'calc(100% - 280px)',
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden'
    },
    pageContent: {
      flex: 1,
      backgroundColor: '#f8f9fa',
      overflow: 'auto',
      padding: '20px',
      transition: 'padding 0.3s ease-in-out'
    },
    breadcrumb: {
      padding: '10px 0',
      marginBottom: '20px',
      borderBottom: '1px solid #eee',
      fontSize: '14px',
      color: colors.primaryMedium
    }
  };

  return (
    <div style={styles.mainContainer}>
      {/* Sidebar */}
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={handleSidebarToggle} 
      />
      
      <div style={styles.content}>
        {/* Navbar administrativo */}
        <AdminNavbar user="Admin" />
        
        {/* Contenido de la página */}
        <div style={styles.pageContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;