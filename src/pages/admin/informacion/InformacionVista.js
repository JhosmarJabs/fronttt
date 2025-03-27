import React from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, ListGroup } from 'react-bootstrap';
import { FaEdit, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaGlobe, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { colors, textStyles } from '../../../styles/styles';
import { Link } from 'react-router-dom';

const InformacionVista = () => {
  // Datos detallados de la empresa
  const informacionEmpresa = {
    nombreEmpresa: 'JADA Tech Solutions',
    slogan: 'Transformando espacios con tecnología inteligente',
    descripcion: 'JADA Tech Solutions es una empresa líder en el desarrollo e implementación de soluciones IoT integrales para hogares inteligentes y empresas que buscan optimizar sus procesos mediante la automatización. Con más de 8 años de experiencia en el mercado, nos especializamos en el diseño personalizado de sistemas que mejoran la eficiencia energética, seguridad y confort.',
    mision: 'Proporcionar soluciones tecnológicas innovadoras y accesibles que mejoren la calidad de vida y la eficiencia de nuestros clientes, mientras contribuimos al desarrollo sostenible mediante la optimización del consumo de recursos.',
    vision: 'Ser referentes globales en el mercado de soluciones IoT para 2030, reconocidos por nuestra excelencia en la integración de tecnologías, innovación continua y compromiso con la satisfacción del cliente y la sostenibilidad ambiental.',
    valores: [
      'Innovación constante en todas nuestras soluciones',
      'Compromiso con la excelencia y la calidad',
      'Responsabilidad social y ambiental',
      'Integridad y transparencia en nuestras operaciones',
      'Orientación al cliente y sus necesidades específicas'
    ],
    historia: 'Fundada en 2015 por un grupo de ingenieros especializados en tecnologías emergentes, JADA Tech Solutions comenzó como una startup enfocada en soluciones domóticas básicas. En 2018, expandimos nuestras operaciones al sector empresarial, y en 2020 desarrollamos nuestra propia plataforma de gestión IoT que nos permitió crecer exponencialmente. Actualmente contamos con presencia en 3 países y más de 500 clientes satisfechos.',
    
    // Información de contacto
    telefono: '+52 (555) 123-4567',
    telefonoSoporte: '+52 (555) 765-4321',
    email: 'contacto@jadatechsolutions.com',
    emailSoporte: 'soporte@jadatechsolutions.com',
    direccion: 'Av. Tecnología 123, Parque Industrial Innovation Hub, Ciudad de México, CP 03940',
    sedePrincipal: 'Ciudad de México',
    sedes: [
      {
        ciudad: 'Ciudad de México',
        direccion: 'Av. Tecnología 123, Parque Industrial Innovation Hub, CP 03940',
        telefono: '+52 (555) 123-4567'
      },
      {
        ciudad: 'Guadalajara',
        direccion: 'Calle Innovación 456, Zona Industrial, CP 44940',
        telefono: '+52 (333) 987-6543'
      },
      {
        ciudad: 'Monterrey',
        direccion: 'Blvd. Tecnológico 789, Parque Empresarial, CP 64700',
        telefono: '+52 (818) 765-4321'
      }
    ],
    horario: 'Lunes a Viernes de 9:00 a 18:00, Sábados de 9:00 a 13:00',
    horarioSoporte: '24/7 para clientes con plan Premium, Lunes a Sábado de 8:00 a 20:00 para clientes estándar',
    
    // Redes sociales
    sitioWeb: 'www.jadatechsolutions.com',
    redesSociales: {
      facebook: 'JADATechSolutions',
      twitter: '@JADATechMX',
      instagram: '@jadatechsolutions',
      linkedin: 'jada-tech-solutions'
    },
    
    // Información legal
    razonSocial: 'JADA Tecnologías Inteligentes S.A. de C.V.',
    rfc: 'JTI150623AB9',
    regimenFiscal: 'Régimen General de Ley Personas Morales',
    fechaConstitucion: '23 de junio de 2015',
    representanteLegal: 'Jorge Andrés Domínguez Alarcón',
    
    // Certificaciones y reconocimientos
    certificaciones: [
      'ISO 9001:2015 - Sistemas de Gestión de Calidad',
      'ISO/IEC 27001:2013 - Seguridad de la Información',
      'SmartHome Certified Developer 2022',
      'Partner Oficial de Google Home y Amazon Alexa'
    ],
    
    // Información de actualización
    fechaActualizacion: '28/02/2023',
    actualizadoPor: 'Departamento de Marketing y Comunicación'
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
    infoIcon: {
      marginRight: '10px',
      color: colors.primaryMedium
    },
    contactInfo: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '15px',
      fontSize: '16px'
    },
    footer: {
      fontSize: '14px',
      color: '#6c757d',
      fontStyle: 'italic',
      marginTop: '20px'
    },
    socialIcon: {
      fontSize: '24px',
      marginRight: '15px',
      color: colors.primaryMedium
    },
    badge: {
      marginRight: '5px',
      marginBottom: '5px'
    }
  };
  
  return (
    <Container fluid style={{ padding: '30px 20px' }}>
      <Row className="mb-4">
        <Col>
          <h2 style={pageStyles.title}>Vista General de Información</h2>
          <p style={textStyles.paragraph}>
            Visualización completa de la información corporativa tal como se muestra en el sitio web y documentos oficiales.
          </p>
        </Col>
        <Col xs="auto">
          <Link to="/admin/informacion/modificacion">
            <Button 
              style={{ 
                backgroundColor: colors.primaryDark,
                borderColor: colors.primaryDark
              }}
            >
              <FaEdit style={{ marginRight: '5px' }} /> Modificar Información
            </Button>
          </Link>
        </Col>
      </Row>
      
      {/* Información Principal */}
      <Row>
        <Col lg={12}>
          <Card style={pageStyles.card}>
            <Card.Body>
              <Card.Title style={pageStyles.subtitle}>Información Corporativa Principal</Card.Title>
              
              <Table bordered>
                <tbody>
                  <tr>
                    <th style={{ width: '20%' }}>Nombre Comercial</th>
                    <td>{informacionEmpresa.nombreEmpresa}</td>
                  </tr>
                  <tr>
                    <th>Slogan</th>
                    <td><em>{informacionEmpresa.slogan}</em></td>
                  </tr>
                  <tr>
                    <th>Razón Social</th>
                    <td>{informacionEmpresa.razonSocial}</td>
                  </tr>
                  <tr>
                    <th>RFC</th>
                    <td>{informacionEmpresa.rfc}</td>
                  </tr>
                  <tr>
                    <th>Descripción</th>
                    <td>{informacionEmpresa.descripcion}</td>
                  </tr>
                  <tr>
                    <th>Fundación</th>
                    <td>{informacionEmpresa.fechaConstitucion}</td>
                  </tr>
                  <tr>
                    <th>Sede Principal</th>
                    <td>{informacionEmpresa.sedePrincipal}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        {/* Información de Contacto */}
        <Col lg={6}>
          <Card style={pageStyles.card}>
            <Card.Body>
              <Card.Title style={pageStyles.subtitle}>Información de Contacto</Card.Title>
              
              <div style={pageStyles.contactInfo}>
                <FaPhone style={pageStyles.infoIcon} />
                <div>
                  <div><strong>Teléfono Principal:</strong> {informacionEmpresa.telefono}</div>
                  <div><strong>Soporte Técnico:</strong> {informacionEmpresa.telefonoSoporte}</div>
                </div>
              </div>
              
              <div style={pageStyles.contactInfo}>
                <FaEnvelope style={pageStyles.infoIcon} />
                <div>
                  <div><strong>Email General:</strong> {informacionEmpresa.email}</div>
                  <div><strong>Soporte Técnico:</strong> {informacionEmpresa.emailSoporte}</div>
                </div>
              </div>
              
              <div style={pageStyles.contactInfo}>
                <FaMapMarkerAlt style={pageStyles.infoIcon} />
                <div>
                  <div><strong>Dirección Corporativa:</strong></div>
                  <div>{informacionEmpresa.direccion}</div>
                </div>
              </div>
              
              <div style={pageStyles.contactInfo}>
                <FaClock style={pageStyles.infoIcon} />
                <div>
                  <div><strong>Horario de Atención:</strong></div>
                  <div>{informacionEmpresa.horario}</div>
                  <div><strong>Soporte Técnico:</strong></div>
                  <div>{informacionEmpresa.horarioSoporte}</div>
                </div>
              </div>
              
              <div style={{ marginTop: '20px' }}>
                <h6>Sedes Adicionales:</h6>
                {informacionEmpresa.sedes.slice(1).map((sede, index) => (
                  <div key={index} style={{ marginBottom: '15px' }}>
                    <Badge bg="secondary" style={{ fontSize: '14px', marginBottom: '5px' }}>{sede.ciudad}</Badge>
                    <div style={{ fontSize: '14px' }}>{sede.direccion}</div>
                    <div style={{ fontSize: '14px' }}>{sede.telefono}</div>
                  </div>
                ))}
              </div>
              
              <div style={{ marginTop: '20px' }}>
                <h6>Redes Sociales:</h6>
                <div style={{ marginTop: '10px' }}>
                  <a href={`https://facebook.com/${informacionEmpresa.redesSociales.facebook}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <FaFacebook style={pageStyles.socialIcon} />
                  </a>
                  <a href={`https://twitter.com/${informacionEmpresa.redesSociales.twitter}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <FaTwitter style={pageStyles.socialIcon} />
                  </a>
                  <a href={`https://instagram.com/${informacionEmpresa.redesSociales.instagram}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <FaInstagram style={pageStyles.socialIcon} />
                  </a>
                  <a href={`https://linkedin.com/company/${informacionEmpresa.redesSociales.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <FaLinkedin style={pageStyles.socialIcon} />
                  </a>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <FaGlobe style={{ marginRight: '10px', color: colors.primaryMedium }} />
                  <a href={`https://${informacionEmpresa.sitioWeb}`} target="_blank" rel="noopener noreferrer">
                    {informacionEmpresa.sitioWeb}
                  </a>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        {/* Misión, Visión y Valores */}
        <Col lg={6}>
          <Card style={pageStyles.card}>
            <Card.Body>
              <Card.Title style={pageStyles.subtitle}>Nuestra Misión y Visión</Card.Title>
              
              <Table bordered>
                <tbody>
                  <tr>
                    <th style={{ width: '15%' }}>Misión</th>
                    <td>{informacionEmpresa.mision}</td>
                  </tr>
                  <tr>
                    <th>Visión</th>
                    <td>{informacionEmpresa.vision}</td>
                  </tr>
                </tbody>
              </Table>
              
              <h6 style={{ marginTop: '20px', marginBottom: '10px' }}>Nuestros Valores:</h6>
              <ListGroup>
                {informacionEmpresa.valores.map((valor, index) => (
                  <ListGroup.Item key={index} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white' }}>
                    {valor}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              
              <h6 style={{ marginTop: '20px', marginBottom: '10px' }}>Nuestra Historia:</h6>
              <p style={{ textAlign: 'justify' }}>{informacionEmpresa.historia}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <Card style={pageStyles.card}>
            <Card.Body>
              <Card.Title style={pageStyles.subtitle}>Certificaciones y Reconocimientos</Card.Title>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {informacionEmpresa.certificaciones.map((certificacion, index) => (
                  <Badge 
                    key={index} 
                    bg="success" 
                    style={{ 
                      fontSize: '14px', 
                      padding: '8px 12px',
                      marginRight: '10px',
                      marginBottom: '10px'
                    }}
                  >
                    {certificacion}
                  </Badge>
                ))}
              </div>
              
              <div style={pageStyles.footer}>
                <p>Última actualización: {informacionEmpresa.fechaActualizacion}</p>
                <p>Actualizado por: {informacionEmpresa.actualizadoPor}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default InformacionVista;