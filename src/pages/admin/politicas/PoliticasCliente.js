import React from 'react';
import { Container, Row, Col, Card, Breadcrumb, Accordion } from 'react-bootstrap';
import { colors, typography, textStyles } from '../../../styles/styles';

const PoliticasCliente = () => {
  return (
    <Container style={{ padding: '30px 0' }}>
      {/* Breadcrumb */}
      <Row className="mb-4">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
            <Breadcrumb.Item active>Políticas para Clientes</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      
      {/* Título de la página */}
      <Row className="mb-5">
        <Col className="text-center">
          <h1 style={textStyles.title}>Políticas para Clientes</h1>
          <p style={textStyles.paragraph}>
            Información importante sobre los términos y condiciones para nuestros clientes
          </p>
        </Col>
      </Row>
      
      {/* Contenido principal */}
      <Row>
        <Col lg={8}>
          <Card className="shadow-sm mb-4">
            <Card.Body style={{ padding: '30px' }}>
              <h2 style={{ ...textStyles.subtitle, marginBottom: '20px' }}>Términos y Condiciones para Clientes</h2>
              
              <p style={textStyles.paragraph}>
                Bienvenido a JADA Company. Antes de utilizar nuestros productos y servicios, le recomendamos leer detenidamente los siguientes términos y condiciones que rigen nuestra relación con los clientes.
              </p>
              
              <Accordion className="mb-4">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>1. Registro de Cuenta</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Para realizar compras o utilizar ciertos servicios, es posible que necesite registrarse y crear una cuenta en nuestra plataforma. Usted es responsable de:</p>
                    <ul>
                      <li>Proporcionar información precisa y completa durante el proceso de registro.</li>
                      <li>Mantener la confidencialidad de su información de inicio de sesión.</li>
                      <li>Todas las actividades que ocurran bajo su cuenta.</li>
                      <li>Notificarnos inmediatamente sobre cualquier uso no autorizado de su cuenta.</li>
                    </ul>
                    <p>Nos reservamos el derecho de suspender o terminar cuentas que violen nuestras políticas o términos.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="1">
                  <Accordion.Header>2. Compras y Pagos</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p><strong>2.1 Precios y Disponibilidad</strong></p>
                    <p>Todos los precios se muestran en la moneda local e incluyen impuestos aplicables. La disponibilidad de productos está sujeta a cambios sin previo aviso.</p>
                    
                    <p><strong>2.2 Métodos de Pago</strong></p>
                    <p>Aceptamos diversos métodos de pago como tarjetas de crédito, débito, transferencias bancarias y otros medios electrónicos según se indique en nuestra plataforma.</p>
                    
                    <p><strong>2.3 Procesamiento de Pagos</strong></p>
                    <p>Su pago se procesará una vez confirmada la disponibilidad del producto. En caso de que el producto no esté disponible, se le notificará y se reembolsará el monto pagado según corresponda.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="2">
                  <Accordion.Header>3. Envíos y Entregas</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p><strong>3.1 Tiempos de Entrega</strong></p>
                    <p>Los tiempos de entrega varían según la ubicación y el tipo de producto. Los tiempos estimados se indicarán durante el proceso de compra.</p>
                    
                    <p><strong>3.2 Costos de Envío</strong></p>
                    <p>Los costos de envío se calcularán en función del destino, dimensiones y peso del producto. Estos costos se mostrarán antes de finalizar la compra.</p>
                    
                    <p><strong>3.3 Seguimiento de Pedidos</strong></p>
                    <p>Una vez procesado su pedido, recibirá un código de seguimiento para monitorear el estado de su entrega.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="3">
                  <Accordion.Header>4. Devoluciones y Reembolsos</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p><strong>4.1 Política de Devoluciones</strong></p>
                    <p>Aceptamos devoluciones dentro de los 30 días posteriores a la recepción del producto, siempre que el producto esté en su estado original, sin usar y con todos sus empaques y accesorios.</p>
                    
                    <p><strong>4.2 Proceso de Devolución</strong></p>
                    <p>Para iniciar una devolución, contacte a nuestro servicio al cliente y proporcione el número de pedido. Recibirá instrucciones sobre cómo proceder con la devolución.</p>
                    
                    <p><strong>4.3 Reembolsos</strong></p>
                    <p>Una vez recibido y verificado el producto devuelto, procesaremos su reembolso a través del mismo método de pago utilizado para la compra original. Los reembolsos pueden tardar entre 7-14 días hábiles en reflejarse en su cuenta.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="4">
                  <Accordion.Header>5. Garantías</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Todos nuestros productos cuentan con garantía contra defectos de fabricación. La duración de la garantía varía según el producto y se indica en la descripción del mismo. La garantía no cubre daños causados por mal uso, abuso, accidentes o modificaciones no autorizadas del producto.</p>
                    
                    <p>Para hacer válida la garantía, es necesario presentar el comprobante de compra y seguir el procedimiento establecido por nuestro departamento de servicio al cliente.</p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              
              <p style={{ ...textStyles.paragraph, fontWeight: 'bold' }}>
                Estos términos y condiciones están sujetos a cambios sin previo aviso. Le recomendamos revisar periódicamente esta página para estar al tanto de cualquier actualización.
              </p>
              
              <p style={textStyles.paragraph}>
                Última actualización: Marzo 2025
              </p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="shadow-sm mb-4" style={{ backgroundColor: colors.primaryLight, color: colors.white }}>
            <Card.Body style={{ padding: '25px' }}>
              <h3 style={{ fontFamily: typography.fontPrimary, fontSize: '22px', marginBottom: '15px' }}>
                ¿Necesitas Ayuda?
              </h3>
              <p style={{ fontFamily: typography.fontSecondary }}>
                Si tienes alguna pregunta sobre nuestras políticas para clientes o necesitas aclaración sobre algún tema, nuestro equipo de atención al cliente está disponible para ayudarte.
              </p>
              <ul style={{ fontFamily: typography.fontSecondary, paddingLeft: '20px' }}>
                <li>Correo electrónico: soporte@jadacompany.com</li>
                <li>Teléfono: +1 (800) 123-4567</li>
                <li>Horario: Lunes a Viernes, 9:00 AM - 6:00 PM</li>
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
                <li><a href="/politicas-privacidad" style={{ color: colors.primaryMedium }}>Política de Privacidad</a></li>
                <li><a href="/politicas-empresa" style={{ color: colors.primaryMedium }}>Políticas para Empresas</a></li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PoliticasCliente;