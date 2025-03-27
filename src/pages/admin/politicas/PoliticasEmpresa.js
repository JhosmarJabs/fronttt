import React from 'react';
import { Container, Row, Col, Card, Breadcrumb, Accordion, Table } from 'react-bootstrap';
import { colors, typography, textStyles } from '../../../styles/styles';

const PoliticasEmpresa = () => {
  return (
    <Container style={{ padding: '30px 0' }}>
      {/* Breadcrumb */}
      <Row className="mb-4">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
            <Breadcrumb.Item active>Políticas para Empresas</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      
      {/* Título de la página */}
      <Row className="mb-5">
        <Col className="text-center">
          <h1 style={textStyles.title}>Políticas para Empresas</h1>
          <p style={textStyles.paragraph}>
            Términos y condiciones específicos para nuestros clientes corporativos
          </p>
        </Col>
      </Row>
      
      {/* Contenido principal */}
      <Row>
        <Col lg={8}>
          <Card className="shadow-sm mb-4">
            <Card.Body style={{ padding: '30px' }}>
              <h2 style={{ ...textStyles.subtitle, marginBottom: '20px' }}>Políticas para Clientes Corporativos</h2>
              
              <p style={textStyles.paragraph}>
                En JADA Company entendemos las necesidades específicas de las empresas. Por ello, hemos desarrollado políticas especiales para nuestros clientes corporativos que adquieren nuestros productos y servicios a mayor escala o con requerimientos especializados.
              </p>
              
              <Accordion className="mb-4">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>1. Cuentas Corporativas</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p><strong>1.1 Registro de Cuenta Corporativa</strong></p>
                    <p>Para establecer una cuenta corporativa con JADA Company, es necesario proporcionar la siguiente documentación:</p>
                    <ul>
                      <li>Documentación legal de la empresa (registro comercial, identificación fiscal, etc.)</li>
                      <li>Datos de contacto del representante autorizado</li>
                      <li>Información de facturación</li>
                    </ul>
                    
                    <p><strong>1.2 Usuarios y Permisos</strong></p>
                    <p>Las cuentas corporativas pueden tener múltiples usuarios con diferentes niveles de acceso y permisos. El administrador principal de la cuenta puede gestionar los permisos de cada usuario según las necesidades de la empresa.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="1">
                  <Accordion.Header>2. Precios y Descuentos Corporativos</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p><strong>2.1 Estructura de Precios Corporativos</strong></p>
                    <p>Ofrecemos precios especiales para clientes corporativos basados en el volumen de compra y la regularidad de adquisición de nuestros productos y servicios.</p>
                    
                    <p><strong>2.2 Programas de Descuento</strong></p>
                    <p>Nuestros programas de descuento corporativo se dividen en las siguientes categorías:</p>
                    
                    <Table striped bordered hover size="sm" className="mt-2 mb-2">
                      <thead style={{ backgroundColor: colors.primaryLight, color: colors.white }}>
                        <tr>
                          <th>Nivel</th>
                          <th>Volumen de Compra Anual</th>
                          <th>Descuento</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Bronce</td>
                          <td>$5,000 - $15,000</td>
                          <td>5%</td>
                        </tr>
                        <tr>
                          <td>Plata</td>
                          <td>$15,001 - $50,000</td>
                          <td>10%</td>
                        </tr>
                        <tr>
                          <td>Oro</td>
                          <td>$50,001 - $100,000</td>
                          <td>15%</td>
                        </tr>
                        <tr>
                          <td>Platino</td>
                          <td>Más de $100,000</td>
                          <td>20%</td>
                        </tr>
                      </tbody>
                    </Table>
                    
                    <p><strong>2.3 Contratos a Largo Plazo</strong></p>
                    <p>Para empresas que deseen establecer relaciones comerciales a largo plazo, ofrecemos contratos con condiciones preferenciales y garantía de precios durante el período del contrato.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="2">
                  <Accordion.Header>3. Facturación y Pagos</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p><strong>3.1 Ciclos de Facturación</strong></p>
                    <p>Para clientes corporativos, ofrecemos los siguientes ciclos de facturación:</p>
                    <ul>
                      <li>Mensual</li>
                      <li>Trimestral</li>
                      <li>Semestral (con 2% de descuento adicional)</li>
                      <li>Anual (con 5% de descuento adicional)</li>
                    </ul>
                    
                    <p><strong>3.2 Términos de Pago</strong></p>
                    <p>Los términos estándar de pago para clientes corporativos son neto a 30 días desde la fecha de facturación. Para clientes con historial de pago puntual, podemos extender este plazo hasta 45 o 60 días, según evaluación.</p>
                    
                    <p><strong>3.3 Métodos de Pago Corporativo</strong></p>
                    <p>Aceptamos los siguientes métodos de pago para cuentas corporativas:</p>
                    <ul>
                      <li>Transferencia bancaria</li>
                      <li>Cheque corporativo</li>
                      <li>Tarjeta de crédito corporativa</li>
                      <li>Órdenes de compra (para clientes calificados)</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="3">
                  <Accordion.Header>4. Servicio y Soporte para Empresas</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p><strong>4.1 Soporte Prioritario</strong></p>
                    <p>Los clientes corporativos tienen acceso a líneas de soporte prioritario con tiempos de respuesta garantizados según el nivel de servicio contratado.</p>
                    
                    <p><strong>4.2 Gerente de Cuenta Dedicado</strong></p>
                    <p>A partir del nivel Plata, asignamos un gerente de cuenta dedicado que será el punto principal de contacto para todas las necesidades de la empresa.</p>
                    
                    <p><strong>4.3 Capacitación y Onboarding</strong></p>
                    <p>Ofrecemos sesiones de capacitación y onboarding personalizadas para que su equipo aproveche al máximo nuestros productos y servicios.</p>
                    
                    <p><strong>4.4 Actualizaciones y Mantenimiento</strong></p>
                    <p>Los clientes corporativos reciben notificaciones anticipadas sobre actualizaciones de productos y pueden programar ventanas de mantenimiento que se adapten a sus horarios operativos.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="4">
                  <Accordion.Header>5. Personalización y Desarrollo a Medida</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p><strong>5.1 Soluciones Personalizadas</strong></p>
                    <p>Para clientes corporativos con requisitos específicos, ofrecemos servicios de personalización de nuestros productos estándar para adaptarlos a sus necesidades particulares.</p>
                    
                    <p><strong>5.2 Desarrollo a Medida</strong></p>
                    <p>Para proyectos de mayor envergadura, nuestro equipo de desarrollo puede crear soluciones completamente a medida según las especificaciones del cliente.</p>
                    
                    <p><strong>5.3 Integración con Sistemas Existentes</strong></p>
                    <p>Ofrecemos servicios de integración para conectar nuestros productos con los sistemas existentes de su empresa, como ERP, CRM u otras plataformas de gestión.</p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              
              <p style={{ ...textStyles.paragraph, fontWeight: 'bold' }}>
                Estas políticas para empresas están sujetas a revisión y pueden ser modificadas. Los términos específicos serán formalizados en los contratos individuales con cada cliente corporativo.
              </p>
              
              <p style={textStyles.paragraph}>
                Última actualización: Marzo 2025
              </p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="shadow-sm mb-4" style={{ backgroundColor: colors.primaryDark, color: colors.white }}>
            <Card.Body style={{ padding: '25px' }}>
              <h3 style={{ fontFamily: typography.fontPrimary, fontSize: '22px', marginBottom: '15px' }}>
                Contacto Comercial
              </h3>
              <p style={{ fontFamily: typography.fontSecondary }}>
                Para establecer una relación comercial con JADA Company o solicitar más información sobre nuestras políticas para empresas, contacte a nuestro departamento de ventas corporativas.
              </p>
              <ul style={{ fontFamily: typography.fontSecondary, paddingLeft: '20px' }}>
                <li>Correo electrónico: empresas@jadacompany.com</li>
                <li>Teléfono: +1 (800) 987-6543</li>
                <li>Horario: Lunes a Viernes, 9:00 AM - 6:00 PM</li>
              </ul>
              <p style={{ fontFamily: typography.fontSecondary, marginTop: '15px' }}>
                Un representante comercial se pondrá en contacto con usted en un plazo de 24 horas hábiles.
              </p>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h4 style={{ fontFamily: typography.fontPrimary, color: colors.primaryDark, marginBottom: '15px' }}>
                Beneficios para Empresas
              </h4>
              <ul style={{ fontFamily: typography.fontSecondary, color: colors.primaryMedium, paddingLeft: '20px' }}>
                <li>Precios especiales basados en volumen</li>
                <li>Soporte técnico prioritario</li>
                <li>Gerente de cuenta dedicado</li>
                <li>Capacitación personalizada</li>
                <li>Soluciones a medida</li>
                <li>Términos de pago flexibles</li>
              </ul>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm">
            <Card.Body>
              <h4 style={{ fontFamily: typography.fontPrimary, color: colors.primaryDark, marginBottom: '15px' }}>
                Documentos Relacionados
              </h4>
              <ul style={{ fontFamily: typography.fontSecondary, color: colors.primaryMedium, paddingLeft: '20px' }}>
                <li><a href="/politicas-general" style={{ color: colors.primaryMedium }}>Políticas Generales</a></li>
                <li><a href="/politicas-cliente" style={{ color: colors.primaryMedium }}>Políticas para Clientes</a></li>
                <li><a href="/politicas-privacidad" style={{ color: colors.primaryMedium }}>Política de Privacidad</a></li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PoliticasEmpresa;