import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, ProgressBar } from 'react-bootstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';
import { colors, typography, textStyles } from '../../styles/styles';
import { FaUsers, FaShoppingCart, FaMoneyBillWave, FaBoxOpen, FaTachometerAlt, FaCalendarAlt, FaBell } from 'react-icons/fa';
import productos from '../../services/base';

// Registrar componentes de ChartJS
ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Estados para datos de dashboard
  const [stats, setStats] = useState({
    totalProductos: 0,
    totalVentas: 0,
    totalIngresos: 0,
    clientesActivos: 0
  });
  
  const [ultimasVentas, setUltimasVentas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simular carga de datos
  useEffect(() => {
    // Mostrar estado de carga
    setIsLoading(true);
    
    // Simular una carga asíncrona de datos
    const loadData = setTimeout(() => {
      // Obtener total de productos desde la base local
      const totalProductos = productos.length;
      
      // Simular otros datos
      const totalVentas = Math.floor(Math.random() * 1000) + 500;
      const totalIngresos = (Math.random() * 50000 + 10000).toFixed(2);
      const clientesActivos = Math.floor(Math.random() * 500) + 200;
      
      setStats({
        totalProductos,
        totalVentas,
        totalIngresos,
        clientesActivos
      });
      
      // Generar ventas simuladas
      const ventas = [];
      for (let i = 0; i < 5; i++) {
        const productoAleatorio = productos[Math.floor(Math.random() * productos.length)];
        ventas.push({
          id: `ORD-${Math.floor(Math.random() * 10000)}`,
          producto: productoAleatorio.title,
          cliente: `Cliente ${Math.floor(Math.random() * 100) + 1}`,
          fecha: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toLocaleDateString(),
          monto: (productoAleatorio.price * (Math.random() * 3 + 1)).toFixed(2),
          estado: ['Completado', 'Pendiente', 'En proceso'][Math.floor(Math.random() * 3)]
        });
      }
      setUltimasVentas(ventas);
      setIsLoading(false);
    }, 800); // Simular tiempo de carga
    
    return () => clearTimeout(loadData);
  }, []);

  // Datos para el gráfico de pastel - Categorías de productos
  const categoriasPieData = {
    labels: ['Domótica', 'Seguridad', 'Energía', 'Climatización'],
    datasets: [
      {
        data: [
          productos.filter(p => p.category === 'Domótica').length,
          productos.filter(p => p.category === 'Seguridad').length,
          productos.filter(p => p.category === 'Energía').length,
          productos.filter(p => p.category === 'Climatización').length
        ],
        backgroundColor: [
          colors.primaryDark,
          colors.primaryMedium,
          colors.primaryLight,
          colors.accent,
        ],
        borderWidth: 1,
      },
    ],
  };

  // Datos para el gráfico de línea - Ventas mensuales simuladas
  const ventasLineData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Ventas Mensuales',
        data: [
          Math.floor(Math.random() * 50) + 20,
          Math.floor(Math.random() * 50) + 20,
          Math.floor(Math.random() * 50) + 20,
          Math.floor(Math.random() * 50) + 20,
          Math.floor(Math.random() * 50) + 20,
          Math.floor(Math.random() * 50) + 20
        ],
        fill: false,
        backgroundColor: colors.primaryMedium,
        borderColor: colors.primaryLight,
        tension: 0.3
      }
    ]
  };

  // Styled components
  const DashboardCard = ({ title, value, icon, color, loading }) => (
    <Card className="mb-4 shadow-sm h-100 dashboard-card" style={{ 
      borderRadius: '10px',
      border: 'none',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer'
    }}>
      <Card.Body style={{ 
        padding: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {loading ? (
          <div className="text-center p-3">
            <div className="skeleton-loader" style={{ height: '70px' }}></div>
          </div>
        ) : (
          <Row className="align-items-center">
            <Col xs={8}>
              <h6 style={{ 
                color: '#6c757d', 
                fontSize: '14px',
                marginBottom: '8px',
                fontWeight: '500'
              }}>{title}</h6>
              <h3 style={{ 
                color, 
                fontFamily: typography.fontPrimary, 
                fontWeight: 'bold',
                marginBottom: '0'
              }}>{value}</h3>
            </Col>
            <Col xs={4} className="text-end">
              <div style={{ 
                backgroundColor: `${color}15`, 
                borderRadius: '50%', 
                width: '50px', 
                height: '50px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginLeft: 'auto',
                transition: 'transform 0.3s ease',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
              }}>
                {icon}
              </div>
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  );

  // Estilos personalizados
  const dashboardStyles = {
    header: {
      ...textStyles.title,
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      color: colors.primaryDark
    },
    headerIcon: {
      marginRight: '10px',
      backgroundColor: `${colors.primaryDark}15`,
      padding: '10px',
      borderRadius: '8px'
    },
    subheader: {
      fontSize: '16px',
      color: '#6c757d',
      marginBottom: '30px',
      fontFamily: typography.fontSecondary
    },
    sectionTitle: {
      ...textStyles.subtitle,
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      fontSize: '18px'
    },
    sectionIcon: {
      marginRight: '10px',
      color: colors.primaryMedium
    },
    card: {
      borderRadius: '10px',
      border: 'none',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
      }
    },
    table: {
      fontSize: '14px'
    },
    statusBadge: (status) => {
      let bgColor = colors.primaryLight;
      
      if (status === 'Completado') bgColor = '#28a745';
      if (status === 'Pendiente') bgColor = '#ffc107';
      if (status === 'En proceso') bgColor = colors.accent;
      
      return {
        backgroundColor: bgColor
      };
    },
    skeletonLoader: {
      backgroundColor: '#f0f0f0',
      height: '15px',
      borderRadius: '4px',
      marginBottom: '10px',
      animation: 'pulse 1.5s infinite ease-in-out'
    }
  };

  // Datos para productos más vendidos (simulado)
  const productosTop = productos
    .slice(0, 4)
    .map((producto, index) => ({
      ...producto,
      ventas: Math.floor(Math.random() * 200) + 50
    }))
    .sort((a, b) => b.ventas - a.ventas);

  // Determinar si es un día festivo (simulado)
  const esFestivo = new Date().getDay() === 0 || new Date().getDay() === 6;

  return (
    <Container fluid className="animate__animated animate__fadeIn">
      {/* Cabecera del Dashboard */}
      <Row className="mb-3">
        <Col>
          <h2 style={dashboardStyles.header}>
            <span style={dashboardStyles.headerIcon}>
              <FaTachometerAlt color={colors.primaryDark} size={24} />
            </span>
            Dashboard Administrativo
          </h2>
          <p style={dashboardStyles.subheader}>
            <FaCalendarAlt 
              size={14} 
              style={{ marginRight: '5px', marginBottom: '3px' }} 
            /> 
            Hoy es {new Date().toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
            {esFestivo && (
              <Badge 
                bg="warning" 
                style={{ 
                  marginLeft: '10px', 
                  fontSize: '11px',
                  padding: '5px 8px'
                }}
              >
                <FaBell size={10} style={{ marginRight: '5px' }} /> Día festivo
              </Badge>
            )}
          </p>
        </Col>
      </Row>
      
      {/* Tarjetas de estadísticas principales */}
      <Row className="mb-4">
        <Col lg={3} md={6}>
          <DashboardCard 
            title="Total Productos" 
            value={isLoading ? '-' : stats.totalProductos} 
            icon={<FaBoxOpen size={24} color={colors.primaryDark} />}
            color={colors.primaryDark}
            loading={isLoading}
          />
        </Col>
        <Col lg={3} md={6}>
          <DashboardCard 
            title="Ventas Realizadas" 
            value={isLoading ? '-' : stats.totalVentas} 
            icon={<FaShoppingCart size={24} color={colors.primaryMedium} />}
            color={colors.primaryMedium}
            loading={isLoading}
          />
        </Col>
        <Col lg={3} md={6}>
          <DashboardCard 
            title="Ingresos Totales" 
            value={isLoading ? '-' : `$${stats.totalIngresos}`} 
            icon={<FaMoneyBillWave size={24} color={colors.primaryLight} />}
            color={colors.primaryLight}
            loading={isLoading}
          />
        </Col>
        <Col lg={3} md={6}>
          <DashboardCard 
            title="Clientes Activos" 
            value={isLoading ? '-' : stats.clientesActivos} 
            icon={<FaUsers size={24} color={colors.accent} />}
            color={colors.accent}
            loading={isLoading}
          />
        </Col>
      </Row>
      
      {/* Gráficos y tablas */}
      <Row className="mb-4">
        {/* Gráfico de Categorías */}
        <Col lg={4}>
          <Card style={{...dashboardStyles.card, height: '100%'}} className="h-100">
            <Card.Body>
              <h5 style={dashboardStyles.sectionTitle}>
                <span style={dashboardStyles.sectionIcon}>
                  <FaBoxOpen size={16} />
                </span>
                Productos por Categoría
              </h5>
              <div style={{ height: '250px', position: 'relative' }}>
                {isLoading ? (
                  <div className="d-flex justify-content-center align-items-center h-100">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                  </div>
                ) : (
                  <Pie data={categoriasPieData} options={{ 
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          font: {
                            size: 12,
                            family: typography.fontSecondary
                          }
                        }
                      }
                    },
                    animation: {
                      duration: 2000
                    }
                  }} />
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        {/* Gráfico de Ventas */}
        <Col lg={8}>
          <Card style={{...dashboardStyles.card, height: '100%'}} className="h-100">
            <Card.Body>
              <h5 style={dashboardStyles.sectionTitle}>
                <span style={dashboardStyles.sectionIcon}>
                  <FaMoneyBillWave size={16} />
                </span>
                Tendencia de Ventas
              </h5>
              <div style={{ height: '250px', position: 'relative' }}>
                {isLoading ? (
                  <div className="d-flex justify-content-center align-items-center h-100">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                  </div>
                ) : (
                  <Line 
                    data={ventasLineData} 
                    options={{ 
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          grid: {
                            color: 'rgba(0,0,0,0.05)'
                          }
                        },
                        x: {
                          grid: {
                            display: false
                          }
                        }
                      },
                      plugins: {
                        legend: {
                          position: 'top',
                          align: 'end',
                          labels: {
                            font: {
                              size: 12,
                              family: typography.fontSecondary
                            }
                          }
                        }
                      },
                      animation: {
                        duration: 2000
                      }
                    }} 
                  />
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        {/* Últimas Ventas */}
        <Col lg={8} className="mb-4">
          <Card style={dashboardStyles.card} className="h-100">
            <Card.Body>
              <h5 style={dashboardStyles.sectionTitle}>
                <span style={dashboardStyles.sectionIcon}>
                  <FaShoppingCart size={16} />
                </span>
                Últimas Ventas
              </h5>
              {isLoading ? (
                <div>
                  {[...Array(5)].map((_, index) => (
                    <div key={index} style={{ marginBottom: '15px' }}>
                      <div style={{ 
                        ...dashboardStyles.skeletonLoader, 
                        width: '100%',
                        height: '20px' 
                      }}></div>
                    </div>
                  ))}
                </div>
              ) : (
                <Table hover responsive style={dashboardStyles.table}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Producto</th>
                      <th>Cliente</th>
                      <th>Fecha</th>
                      <th>Monto</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ultimasVentas.map((venta, index) => (
                      <tr key={index}>
                        <td>{venta.id}</td>
                        <td>{venta.producto}</td>
                        <td>{venta.cliente}</td>
                        <td>{venta.fecha}</td>
                        <td>${venta.monto}</td>
                        <td>
                          <Badge pill style={dashboardStyles.statusBadge(venta.estado)}>
                            {venta.estado}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
              <div className="text-center mt-3">
                <Button variant="outline-primary" style={{ 
                  borderColor: colors.primaryMedium, 
                  color: colors.primaryMedium,
                  transition: 'all 0.3s ease'
                }}>
                  Ver todas las ventas
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        {/* Productos Populares */}
        <Col lg={4} className="mb-4">
          <Card style={dashboardStyles.card} className="h-100">
            <Card.Body>
              <h5 style={dashboardStyles.sectionTitle}>
                <span style={dashboardStyles.sectionIcon}>
                  <FaBoxOpen size={16} />
                </span>
                Productos Populares
              </h5>
              {isLoading ? (
                <div>
                  {[...Array(4)].map((_, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                      <div style={{ 
                        ...dashboardStyles.skeletonLoader, 
                        width: '80%',
                        marginBottom: '5px'
                      }}></div>
                      <div style={{ 
                        ...dashboardStyles.skeletonLoader, 
                        width: '100%',
                        height: '8px'
                      }}></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {productosTop.map((producto, index) => (
                    <div key={index} className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span style={{ fontSize: '14px', fontWeight: '500' }}>{producto.title}</span>
                        <span style={{ fontSize: '14px', color: colors.primaryMedium }}>{producto.ventas} ventas</span>
                      </div>
                      <ProgressBar 
                        now={100 * (producto.ventas / (productosTop[0].ventas))} 
                        style={{ height: '8px' }}
                        variant={index === 0 ? 'success' : index === 1 ? 'info' : index === 2 ? 'primary' : 'secondary'}
                      />
                    </div>
                  ))}
                </div>
              )}
              <div className="text-center mt-4">
                <Button variant="outline-primary" style={{ 
                  borderColor: colors.primaryMedium, 
                  color: colors.primaryMedium,
                  transition: 'all 0.3s ease'
                }}>
                  Ver todos los productos
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* CSS personalizado para animaciones */}
      <style jsx="true">{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        
        .dashboard-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }
        
        .dashboard-card:hover .card-icon {
          transform: scale(1.1);
        }
        
        button.btn-outline-primary:hover {
          background-color: ${colors.primaryMedium};
          color: white;
        }
      `}</style>
    </Container>
  );
};

export default Dashboard;