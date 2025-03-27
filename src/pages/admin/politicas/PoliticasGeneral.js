import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, InputGroup, Badge, Alert, Tabs, Tab } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaPlus, FaSearch, FaHistory, FaSave, FaUndo, FaGlobe, FaFileAlt } from 'react-icons/fa';
import { colors, textStyles } from '../../../styles/styles';
import { Link } from 'react-router-dom';

const PoliticasGeneral = () => {
  // Estado para las políticas
  const [politicas, setPoliticas] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [verHistorial, setVerHistorial] = useState(false);
  
  // Estado para historial de cambios
  const [historialCambios, setHistorialCambios] = useState([]);
  
  // Estado para alertas
  const [alerta, setAlerta] = useState({ show: false, variant: '', mensaje: '' });

  // Cargar políticas simuladas al iniciar
  useEffect(() => {
    // Datos de ejemplo (en un caso real, se obtendrían de la API)
    const datosPoliticas = [
      {
        id: 'POL-001',
        titulo: 'Política de Privacidad',
        categoria: 'privacidad',
        descripcion: 'Lineamientos sobre el manejo de datos personales',
        ultimaActualizacion: '2023-03-15',
        estado: 'publicada',
        versionActual: 'v2.1',
        autor: 'Departamento Legal',
        idiomas: ['español', 'inglés'],
        publicadaWeb: true
      },
      {
        id: 'POL-002',
        titulo: 'Política de Cookies',
        categoria: 'privacidad',
        descripcion: 'Información sobre el uso de cookies en el sitio web',
        ultimaActualizacion: '2023-02-20',
        estado: 'publicada',
        versionActual: 'v1.3',
        autor: 'Departamento Legal',
        idiomas: ['español', 'inglés', 'francés'],
        publicadaWeb: true
      },
      {
        id: 'POL-003',
        titulo: 'Términos y Condiciones de Servicio',
        categoria: 'cliente',
        descripcion: 'Condiciones generales para el uso de nuestros servicios',
        ultimaActualizacion: '2023-01-10',
        estado: 'publicada',
        versionActual: 'v3.0',
        autor: 'Departamento Legal',
        idiomas: ['español', 'inglés'],
        publicadaWeb: true
      },
      {
        id: 'POL-004',
        titulo: 'Política de Reembolsos',
        categoria: 'cliente',
        descripcion: 'Lineamientos para solicitar y procesar reembolsos',
        ultimaActualizacion: '2022-12-05',
        estado: 'publicada',
        versionActual: 'v1.5',
        autor: 'Depto. Atención al Cliente',
        idiomas: ['español'],
        publicadaWeb: true
      },
      {
        id: 'POL-005',
        titulo: 'Código de Conducta Corporativo',
        categoria: 'empresa',
        descripcion: 'Normas éticas y de conducta para empleados',
        ultimaActualizacion: '2023-04-01',
        estado: 'borrador',
        versionActual: 'v2.0-draft',
        autor: 'Recursos Humanos',
        idiomas: ['español'],
        publicadaWeb: false
      },
      {
        id: 'POL-006',
        titulo: 'Política de Seguridad de la Información',
        categoria: 'empresa',
        descripcion: 'Lineamientos para el manejo de información confidencial',
        ultimaActualizacion: '2022-11-15',
        estado: 'publicada',
        versionActual: 'v2.2',
        autor: 'Departamento IT',
        idiomas: ['español', 'inglés'],
        publicadaWeb: false
      }
    ];
    
    setPoliticas(datosPoliticas);
    
    // Historial de cambios simulado
    const historialSimulado = [
      {
        id: 'HIST-001',
        politicaId: 'POL-001',
        politicaTitulo: 'Política de Privacidad',
        descripcionCambio: 'Actualización para cumplir con nuevas regulaciones',
        fechaCambio: '2023-03-15',
        versionAnterior: 'v2.0',
        versionNueva: 'v2.1',
        autor: 'Juan Pérez',
        aprobadoPor: 'María Rodríguez'
      },
      {
        id: 'HIST-002',
        politicaId: 'POL-002',
        politicaTitulo: 'Política de Cookies',
        descripcionCambio: 'Inclusión de información sobre cookies de terceros',
        fechaCambio: '2023-02-20',
        versionAnterior: 'v1.2',
        versionNueva: 'v1.3',
        autor: 'Ana López',
        aprobadoPor: 'Carlos González'
      },
      {
        id: 'HIST-003',
        politicaId: 'POL-003',
        politicaTitulo: 'Términos y Condiciones de Servicio',
        descripcionCambio: 'Revisión completa y actualización',
        fechaCambio: '2023-01-10',
        versionAnterior: 'v2.8',
        versionNueva: 'v3.0',
        autor: 'Roberto Sánchez',
        aprobadoPor: 'María Rodríguez'
      }
    ];
    
    setHistorialCambios(historialSimulado);
  }, []);
  
  // Filtrar políticas
  const politicasFiltradas = politicas.filter(politica => {
    const coincideTexto = politica.titulo.toLowerCase().includes(filtro.toLowerCase()) || 
                         politica.descripcion.toLowerCase().includes(filtro.toLowerCase());
    const coincideCategoria = categoriaFiltro === '' || politica.categoria === categoriaFiltro;
    return coincideTexto && coincideCategoria;
  });
  
  // Obtener categorías únicas para el filtro
  const categorias = [...new Set(politicas.map(p => p.categoria))];
  
  // Función para obtener badge de categoría
  const getCategoriaBadge = (categoria) => {
    const categoriasMap = {
      'privacidad': { bg: '#6610f2', text: 'Privacidad' },
      'cliente': { bg: '#0d6efd', text: 'Cliente' },
      'empresa': { bg: '#198754', text: 'Empresa' }
    };
    
    return (
      <Badge style={{ backgroundColor: categoriasMap[categoria]?.bg || colors.primaryLight }}>
        {categoriasMap[categoria]?.text || categoria}
      </Badge>
    );
  };
  
  // Función para obtener badge de estado
  const getEstadoBadge = (estado) => {
    const estadosMap = {
      'publicada': { bg: '#198754', text: 'Publicada' },
      'borrador': { bg: '#ffc107', text: 'Borrador' },
      'revision': { bg: '#0dcaf0', text: 'En Revisión' },
      'archivada': { bg: '#6c757d', text: 'Archivada' }
    };
    
    return (
      <Badge style={{ backgroundColor: estadosMap[estado]?.bg || colors.primaryLight }}>
        {estadosMap[estado]?.text || estado}
      </Badge>
    );
  };
  
  // Función para formatear fecha
  const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };
  
  // Función para formatear idiomas
  const formatearIdiomas = (idiomas) => {
    return idiomas.map(idioma => (
      <Badge key={idioma} className="me-1" bg="secondary">
        {idioma.charAt(0).toUpperCase() + idioma.slice(1)}
      </Badge>
    ));
  };
  
  const pageStyles = {
    card: {
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      marginBottom: '20px'
    },
    title: {
      ...textStyles.title,
      marginBottom: '10px'
    },
    subtitle: {
      ...textStyles.subtitle,
      marginBottom: '20px'
    },
    infoSection: {
      backgroundColor: colors.primaryLight + '20',
      borderLeft: `4px solid ${colors.primaryMedium}`,
      padding: '15px',
      marginBottom: '20px',
      borderRadius: '4px'
    },
    actionButtons: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px'
    },
    badge: {
      marginRight: '5px'
    },
    toggleHistoryButton: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  };
  
  return (
    <Container fluid style={{ padding: '30px 20px' }}>
      <Row className="mb-4">
        <Col>
          <h2 style={pageStyles.title}>Gestión de Políticas</h2>
          <p style={textStyles.paragraph}>
            Administre todas las políticas de la empresa desde un único lugar. Visualice, edite, publique y archive políticas.
          </p>
        </Col>
      </Row>
      
      {alerta.show && (
        <Alert 
          variant={alerta.variant} 
          onClose={() => setAlerta({...alerta, show: false})} 
          dismissible
        >
          {alerta.mensaje}
        </Alert>
      )}
      
      <div style={pageStyles.infoSection}>
        <h5 style={{ color: colors.primaryDark, display: 'flex', alignItems: 'center' }}>
          <FaFileAlt style={{ marginRight: '10px' }} /> Información
        </h5>
        <p style={{ color: colors.primaryDark, margin: 0 }}>
          Las políticas definen las reglas y directrices que rigen el funcionamiento de la empresa y su relación con clientes y empleados.
          Asegúrese de que todas las políticas estén actualizadas y sean accesibles para los grupos correspondientes.
        </p>
      </div>
      
      <div style={pageStyles.actionButtons}>
        <div>
          <Link to="/admin/politicas/empresa">
            <Button 
              variant="outline-success" 
              className="me-2"
            >
              <FaFileAlt className="me-2" /> Políticas de Empresa
            </Button>
          </Link>
          <Link to="/admin/politicas/cliente">
            <Button 
              variant="outline-primary" 
              className="me-2"
            >
              <FaFileAlt className="me-2" /> Políticas de Cliente
            </Button>
          </Link>
          <Link to="/admin/politicas/privacidad">
            <Button 
              variant="outline-secondary" 
              className="me-2"
            >
              <FaFileAlt className="me-2" /> Políticas de Privacidad
            </Button>
          </Link>
        </div>
        
        <Button
          variant="outline-info"
          style={pageStyles.toggleHistoryButton}
          onClick={() => setVerHistorial(!verHistorial)}
        >
          <FaHistory /> {verHistorial ? 'Ocultar historial' : 'Ver historial de cambios'}
        </Button>
      </div>
      
      {/* Filtros */}
      <Row className="mb-4">
        <Col md={8}>
          <InputGroup>
            <InputGroup.Text><FaSearch /></InputGroup.Text>
            <Form.Control
              placeholder="Buscar por título o descripción..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Select 
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categorias.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      
      {/* Tabla de Políticas */}
      <Card style={pageStyles.card}>
        <Card.Body>
          <Card.Title style={pageStyles.subtitle}>Listado de Políticas</Card.Title>
          
          {politicasFiltradas.length === 0 ? (
            <Alert variant="info">
              No se encontraron políticas que coincidan con los criterios de búsqueda.
            </Alert>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Categoría</th>
                  <th>Última Actualización</th>
                  <th>Estado</th>
                  <th>Versión</th>
                  <th>Idiomas</th>
                  <th>Web</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {politicasFiltradas.map((politica) => (
                  <tr key={politica.id}>
                    <td>{politica.id}</td>
                    <td>{politica.titulo}</td>
                    <td>{getCategoriaBadge(politica.categoria)}</td>
                    <td>{formatearFecha(politica.ultimaActualizacion)}</td>
                    <td>{getEstadoBadge(politica.estado)}</td>
                    <td>{politica.versionActual}</td>
                    <td>{formatearIdiomas(politica.idiomas)}</td>
                    <td>
                      <Badge bg={politica.publicadaWeb ? 'success' : 'secondary'}>
                        {politica.publicadaWeb ? 'Sí' : 'No'}
                      </Badge>
                    </td>
                    <td>
                      <Button 
                        variant="outline-info" 
                        size="sm"
                        className="me-2"
                        title="Ver política"
                      >
                        <FaEye size={14} />
                      </Button>
                      <Link to={`/admin/politicas/${politica.categoria}`}>
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          className="me-2"
                          title="Editar política"
                        >
                          <FaEdit size={14} />
                        </Button>
                      </Link>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        title="Eliminar política"
                      >
                        <FaTrash size={14} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
      
      {/* Historial de Cambios */}
      {verHistorial && (
        <Card style={pageStyles.card}>
          <Card.Body>
            <Card.Title style={{ ...pageStyles.subtitle, display: 'flex', alignItems: 'center' }}>
              <FaHistory style={{ marginRight: '10px' }} /> Historial de Cambios
            </Card.Title>
            
            {historialCambios.length === 0 ? (
              <Alert variant="info">
                No hay registros de cambios en políticas.
              </Alert>
            ) : (
              <Table responsive hover striped>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Política</th>
                    <th>Descripción del Cambio</th>
                    <th>Fecha</th>
                    <th>Versión Anterior</th>
                    <th>Versión Nueva</th>
                    <th>Autor</th>
                    <th>Aprobado Por</th>
                  </tr>
                </thead>
                <tbody>
                  {historialCambios.map((cambio) => (
                    <tr key={cambio.id}>
                      <td>{cambio.id}</td>
                      <td>{cambio.politicaTitulo}</td>
                      <td>{cambio.descripcionCambio}</td>
                      <td>{formatearFecha(cambio.fechaCambio)}</td>
                      <td>{cambio.versionAnterior}</td>
                      <td>{cambio.versionNueva}</td>
                      <td>{cambio.autor}</td>
                      <td>{cambio.aprobadoPor}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      )}
      
      {/* Métricas de Políticas */}
      <Card style={pageStyles.card}>
        <Card.Body>
          <Card.Title style={pageStyles.subtitle}>Resumen de Políticas</Card.Title>
          <Row>
            <Col md={3} className="mb-3">
              <Card className="text-center h-100">
                <Card.Body>
                  <h3 className="mb-0">{politicas.length}</h3>
                  <p className="text-muted">Total de Políticas</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-3">
              <Card className="text-center h-100">
                <Card.Body>
                  <h3 className="mb-0">{politicas.filter(p => p.estado === 'publicada').length}</h3>
                  <p className="text-muted">Políticas Publicadas</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-3">
              <Card className="text-center h-100">
                <Card.Body>
                  <h3 className="mb-0">{politicas.filter(p => p.publicadaWeb).length}</h3>
                  <p className="text-muted">Visibles en Web</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-3">
              <Card className="text-center h-100">
                <Card.Body>
                  <h3 className="mb-0">{politicas.filter(p => new Date(p.ultimaActualizacion) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)).length}</h3>
                  <p className="text-muted">Actualizadas (90 días)</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PoliticasGeneral;