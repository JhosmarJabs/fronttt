import React from 'react';
import { Container, Row, Col, Card, Breadcrumb, Accordion, Button } from 'react-bootstrap';
import { colors, typography, textStyles } from '../../../styles/styles';

const PreguntasAltas = () => {
  return (
    <Container style={{ padding: '30px 0' }}>
      {/* Breadcrumb */}
      <Row className="mb-4">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
            <Breadcrumb.Item href="/preguntas">Preguntas Frecuentes</Breadcrumb.Item>
            <Breadcrumb.Item active>Productos Premium</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      
      {/* Título de la página */}
      <Row className="mb-5">
        <Col className="text-center">
          <h1 style={textStyles.title}>Preguntas sobre Productos Premium</h1>
          <p style={textStyles.paragraph}>
            Información detallada sobre nuestra línea de productos de alta gama
          </p>
        </Col>
      </Row>
      
      {/* Navegación entre categorías de preguntas */}
      <Row className="mb-4">
        <Col className="d-flex justify-content-center flex-wrap">
          <Button 
            variant="outline-primary" 
            className="m-1"
            href="/preguntas-general"
            style={{ 
              backgroundColor: 'transparent',
              borderColor: colors.primaryMedium,
              color: colors.primaryMedium
            }}
          >
            Generales
          </Button>
          <Button 
            variant="outline-primary" 
            className="m-1"
            href="/preguntas-altas"
            style={{ 
              backgroundColor: colors.primaryDark,
              borderColor: colors.primaryDark,
              color: colors.white
            }}
          >
            Productos Premium
          </Button>
          <Button 
            variant="outline-primary" 
            className="m-1"
            href="/preguntas-bajas"
            style={{ 
              backgroundColor: 'transparent',
              borderColor: colors.primaryMedium,
              color: colors.primaryMedium
            }}
          >
            Productos Económicos
          </Button>
          <Button 
            variant="outline-primary" 
            className="m-1"
            href="/preguntas-cambios"
            style={{ 
              backgroundColor: 'transparent',
              borderColor: colors.primaryMedium,
              color: colors.primaryMedium
            }}
          >
            Cambios y Devoluciones
          </Button>
        </Col>
      </Row>
      
      {/* Contenido principal - Preguntas y Respuestas */}
      <Row>
        <Col lg={8}>
          <Card className="shadow-sm mb-4">
            <Card.Body style={{ padding: '30px' }}>
              <Accordion defaultActiveKey="0" className="mb-4">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>¿Qué diferencia a los productos premium de los estándar?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Nuestros productos premium se distinguen por varias características superiores:</p>
                    <ul>
                      <li><strong>Materiales de alta calidad:</strong> Utilizamos componentes premium que garantizan mayor durabilidad y rendimiento.</li>
                      <li><strong>Funcionalidades avanzadas:</strong> Incluyen características adicionales no disponibles en los modelos estándar.</li>
                      <li><strong>Diseño exclusivo:</strong> Acabados superiores y estética más refinada, con mayor atención a los detalles.</li>
                      <li><strong>Mayor garantía:</strong> Los productos premium tienen garantías extendidas de 2-3 años en lugar del año estándar.</li>
                      <li><strong>Soporte prioritario:</strong> Acceso a líneas de atención preferentes y tiempos de respuesta más rápidos.</li>
                      <li><strong>Personalización:</strong> Mayores opciones de configuración según necesidades específicas.</li>
                    </ul>
                    <p>Cada producto premium está diseñado para quienes buscan el máximo rendimiento, confiabilidad y exclusividad en sus soluciones de domótica y seguridad.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="1">
                  <Accordion.Header>¿Cuáles son los productos premium más populares?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Nuestros productos premium más solicitados son:</p>
                    <ul>
                      <li><strong>Sistema de Control Central Elite:</strong> Hub central con capacidad para gestionar hasta 200 dispositivos simultáneamente con algoritmos de inteligencia artificial para automatización avanzada.</li>
                      <li><strong>Cámara de Seguridad 4K Pro:</strong> Resolución ultra HD, visión nocturna de largo alcance, reconocimiento facial y detección de comportamientos anómalos.</li>
                      <li><strong>Termostato Inteligente Premium:</strong> Con sensores de presencia, aprendizaje de hábitos, y capacidad de ajuste zonal para diferentes áreas de la casa.</li>
                      <li><strong>Sistema de Iluminación Adaptativa:</strong> Iluminación que ajusta automáticamente intensidad y temperatura de color según la hora del día y actividades detectadas.</li>
                      <li><strong>Cerradura Biométrica Avanzada:</strong> Con múltiples métodos de autenticación, registro de accesos y alertas en tiempo real.</li>
                    </ul>
                    <p>Estos productos representan lo mejor de nuestra tecnología y son ideales para quienes buscan las soluciones más avanzadas del mercado.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="2">
                  <Accordion.Header>¿Ofrecen instalación profesional para productos premium?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Sí, todos nuestros productos premium incluyen la opción de instalación profesional por parte de técnicos certificados. El servicio de instalación premium incluye:</p>
                    <ul>
                      <li><strong>Evaluación previa:</strong> Un técnico visita tu hogar o negocio para evaluar la instalación óptima.</li>
                      <li><strong>Planificación personalizada:</strong> Diseño de un plan de instalación adaptado a tus necesidades específicas.</li>
                      <li><strong>Instalación experta:</strong> Realizada por técnicos certificados con años de experiencia.</li>
                      <li><strong>Configuración completa:</strong> Configuración de todos los dispositivos y creación de automatizaciones iniciales.</li>
                      <li><strong>Capacitación:</strong> Sesión de formación personalizada para que aprendas a aprovechar al máximo tu sistema.</li>
                      <li><strong>Seguimiento post-instalación:</strong> Contacto a los 7 y 30 días para verificar el funcionamiento y resolver dudas.</li>
                    </ul>
                    <p>Para productos premium complejos o sistemas integrados, la instalación profesional es altamente recomendada para garantizar el rendimiento óptimo y la correcta integración con otros dispositivos.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="3">
                  <Accordion.Header>¿Existe algún programa de financiamiento para productos premium?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Efectivamente, contamos con varias opciones de financiamiento específicas para nuestra línea premium:</p>
                    <ul>
                      <li><strong>Plan de pagos mensuales:</strong> Divide el costo total en 6, 12, 18 o 24 meses sin intereses (dependiendo del monto de compra).</li>
                      <li><strong>Financiamiento con tarjeta de crédito:</strong> Planes especiales con bancos asociados que ofrecen meses sin intereses.</li>
                      <li><strong>Leasing para empresas:</strong> Opciones de arrendamiento con opción a compra para clientes corporativos.</li>
                      <li><strong>Programa de renovación:</strong> Al adquirir productos premium, puedes acceder a descuentos especiales en futuras actualizaciones.</li>
                    </ul>
                    <p>Además, ofrecemos un descuento del 5% en el precio total al adquirir sistemas completos premium (3 o más dispositivos de la línea alta). Nuestros asesores pueden ayudarte a encontrar la mejor opción de financiamiento según tus necesidades.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="4">
                  <Accordion.Header>¿Los productos premium tienen funciones exclusivas en la aplicación?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Sí, nuestra aplicación JADA Smart Home ofrece funcionalidades exclusivas para usuarios de productos premium:</p>
                    <ul>
                      <li><strong>Panel de control avanzado:</strong> Interfaz personalizable con más opciones de configuración.</li>
                      <li><strong>Automatizaciones complejas:</strong> Posibilidad de crear reglas condicionales múltiples y secuencias de acciones.</li>
                      <li><strong>Analítica detallada:</strong> Gráficos y reportes avanzados sobre el uso y rendimiento de los dispositivos.</li>
                      <li><strong>Acceso multiusuario:</strong> Gestión avanzada de permisos para diferentes miembros del hogar o empleados.</li>
                      <li><strong>Integración con más servicios:</strong> Compatibilidad exclusiva con plataformas adicionales de terceros.</li>
                      <li><strong>Almacenamiento en la nube ampliado:</strong> Mayor capacidad para grabaciones de cámaras y registros históricos.</li>
                      <li><strong>Asistente virtual premium:</strong> Versión mejorada de nuestro asistente IA con capacidades predictivas.</li>
                    </ul>
                    <p>Al registrar un producto premium en tu cuenta, estas funciones se desbloquean automáticamente en la aplicación sin costo adicional durante toda la vida útil del producto.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="5">
                  <Accordion.Header>¿Cuál es la política de mantenimiento para productos premium?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Los productos de nuestra línea premium incluyen beneficios exclusivos de mantenimiento:</p>
                    <ul>
                      <li><strong>Revisiones preventivas:</strong> Una revisión anual gratuita durante el período de garantía para asegurar el funcionamiento óptimo.</li>
                      <li><strong>Actualizaciones prioritarias:</strong> Primeros en recibir actualizaciones de firmware y nuevas funcionalidades.</li>
                      <li><strong>Servicio de mantenimiento a domicilio:</strong> En caso de problemas, enviamos técnicos a tu ubicación sin costo adicional durante el período de garantía.</li>
                      <li><strong>Sustitución exprés:</strong> Si un dispositivo necesita reparación, te enviamos uno de reemplazo mientras se repara el tuyo.</li>
                      <li><strong>Plan de mantenimiento extendido:</strong> Opción de contratar un servicio de mantenimiento integral después del período de garantía con descuentos especiales.</li>
                    </ul>
                    <p>Recomendamos seguir las pautas de mantenimiento específicas para cada producto que se encuentran en el manual de usuario y en nuestra plataforma online de soporte.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="6">
                  <Accordion.Header>¿Los productos premium tienen mayor seguridad y privacidad?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Efectivamente, nuestros productos premium incorporan características de seguridad y privacidad avanzadas:</p>
                    <ul>
                      <li><strong>Encriptación de grado militar:</strong> Comunicaciones cifradas de extremo a extremo con estándares AES-256.</li>
                      <li><strong>Autenticación multifactor:</strong> Capas adicionales de seguridad para acceder al control de los dispositivos.</li>
                      <li><strong>Procesamiento local:</strong> Muchas funciones operan localmente sin necesidad de enviar datos a la nube.</li>
                      <li><strong>Detección de intrusiones:</strong> Sistema que alerta sobre intentos de acceso no autorizado al sistema.</li>
                      <li><strong>Auditorías de seguridad:</strong> Nuestros dispositivos premium pasan por rigurosos tests de penetración por terceros.</li>
                      <li><strong>Actualizaciones de seguridad garantizadas:</strong> Compromiso de proveer actualizaciones de seguridad por un mínimo de 5 años.</li>
                    </ul>
                    <p>Además, ofrecemos controles granulares de privacidad que permiten decidir exactamente qué datos se comparten y cuáles se mantienen completamente privados, con la opción de desactivar completamente la conectividad a internet manteniendo la funcionalidad básica en red local.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="7">
                  <Accordion.Header>¿Qué opciones de personalización ofrecen los productos premium?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Nuestra línea premium ofrece amplias opciones de personalización:</p>
                    <ul>
                      <li><strong>Acabados exclusivos:</strong> Disponibles en varios colores y materiales premium (acero inoxidable, aluminio anodizado, vidrio templado, etc.).</li>
                      <li><strong>Grabado personalizado:</strong> Posibilidad de añadir nombres, logotipos o mensajes en ciertos dispositivos.</li>
                      <li><strong>Configuración a medida:</strong> Adaptación de parámetros específicos según las necesidades del cliente.</li>
                      <li><strong>Integración personalizada:</strong> Desarrollo de soluciones específicas para necesidades únicas.</li>
                      <li><strong>Interfaces personalizables:</strong> Paneles de control adaptables a preferencias individuales.</li>
                    </ul>
                    <p>Para proyectos especiales, ofrecemos un servicio de diseño exclusivo donde nuestros ingenieros trabajan directamente con el cliente para desarrollar soluciones totalmente a medida. Este servicio está disponible para instalaciones de gran escala o con requisitos muy específicos.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="8">
                  <Accordion.Header>¿Los productos premium funcionan mejor con cortes de energía?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Sí, nuestros dispositivos premium están diseñados con sistemas avanzados para mantener la funcionalidad durante cortes de energía:</p>
                    <ul>
                      <li><strong>Baterías de respaldo integradas:</strong> La mayoría de dispositivos premium incluyen baterías de alta capacidad que mantienen el funcionamiento durante 12-24 horas sin alimentación externa.</li>
                      <li><strong>Sistema de alimentación ininterrumpida (UPS) incluido:</strong> Para dispositivos centrales como el hub de control.</li>
                      <li><strong>Modo de bajo consumo automático:</strong> Activa funciones esenciales mientras conserva energía en caso de cortes prolongados.</li>
                      <li><strong>Recuperación inteligente:</strong> Restauración automática de configuraciones y estados previos cuando regresa la energía.</li>
                      <li><strong>Compatibilidad con generadores:</strong> Protección contra fluctuaciones de voltaje comunes en fuentes alternativas.</li>
                    </ul>
                    <p>Adicionalmente, ofrecemos sistemas de respaldo energético premium que pueden integrarse con todo el ecosistema para garantizar funcionamiento continuo incluso en condiciones adversas.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="9">
                  <Accordion.Header>¿Existe un programa de beneficios exclusivo para clientes premium?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Efectivamente, contamos con el "JADA Premium Club", un programa exclusivo de beneficios para clientes que han adquirido productos de nuestra línea alta:</p>
                    <ul>
                      <li><strong>Acceso anticipado:</strong> Conoce y prueba nuevos productos antes de su lanzamiento oficial.</li>
                      <li><strong>Descuentos exclusivos:</strong> 15% de descuento permanente en accesorios y 10% en nuevos dispositivos premium.</li>
                      <li><strong>Eventos VIP:</strong> Invitaciones a presentaciones, talleres y eventos de networking exclusivos.</li>
                      <li><strong>Soporte dedicado:</strong> Línea telefónica exclusiva y asesor personal asignado.</li>
                      <li><strong>Regalos y sorpresas:</strong> Obsequios periódicos y acceso a ediciones limitadas.</li>
                      <li><strong>Programa de actualización:</strong> Descuentos especiales al renovar dispositivos con nuevos modelos.</li>
                    </ul>
                    <p>La membresía al JADA Premium Club se otorga automáticamente al adquirir cualquier producto de la línea premium y se mantiene activa mientras tengas al menos un dispositivo premium registrado. Los beneficios se amplían según la cantidad de productos premium que poseas.</p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              
              <div className="text-center mt-4">
                <p style={textStyles.paragraph}>
                  ¿Interesado en conocer más sobre nuestros productos premium?
                </p>
                <Button 
                  variant="primary" 
                  href="/productos"
                  style={{ 
                    backgroundColor: colors.primaryDark, 
                    borderColor: colors.primaryDark,
                    padding: '10px 25px'
                  }}
                >
                  Ver Catálogo Premium
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="shadow-sm mb-4" style={{ backgroundColor: colors.primaryDark, color: colors.white }}>
            <Card.Body style={{ padding: '25px' }}>
              <h3 style={{ fontFamily: typography.fontPrimary, fontSize: '22px', marginBottom: '15px' }}>
                Beneficios Premium
              </h3>
              <ul style={{ fontFamily: typography.fontSecondary, paddingLeft: '20px' }}>
                <li>Garantía extendida de hasta 3 años</li>
                <li>Soporte técnico prioritario 24/7</li>
                <li>Instalación profesional incluida</li>
                <li>Actualizaciones de software privilegiadas</li>
                <li>Acceso al club de clientes VIP</li>
                <li>Servicio de reemplazo exprés</li>
              </ul>
              <div className="d-grid gap-2 mt-3">
                <Button 
                  variant="outline-light"
                  style={{ 
                    borderColor: colors.white,
                    color: colors.white,
                    fontFamily: typography.fontPrimary
                  }}
                  href="/premium-beneficios"
                >
                  Más Información
                </Button>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h4 style={{ fontFamily: typography.fontPrimary, color: colors.primaryDark, marginBottom: '15px' }}>
                Productos Destacados
              </h4>
              <ul style={{ fontFamily: typography.fontSecondary, color: colors.primaryMedium, paddingLeft: '20px' }}>
                <li>Sistema de Control Central Elite</li>
                <li>Cámara de Seguridad 4K Pro</li>
                <li>Termostato Inteligente Premium</li>
                <li>Sistema de Iluminación Adaptativa</li>
                <li>Cerradura Biométrica Avanzada</li>
              </ul>
              <div className="d-grid gap-2 mt-3">
                <Button 
                  variant="outline-primary"
                  style={{ 
                    borderColor: colors.primaryMedium,
                    color: colors.primaryMedium,
                    fontFamily: typography.fontPrimary
                  }}
                  href="/productos"
                >
                  Ver Catálogo Completo
                </Button>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm">
            <Card.Body>
              <h4 style={{ fontFamily: typography.fontPrimary, color: colors.primaryDark, marginBottom: '15px' }}>
                Demostración Personalizada
              </h4>
              <p style={{ fontFamily: typography.fontSecondary, color: colors.primaryMedium }}>
                Agenda una demostración personalizada de nuestros productos premium con un especialista.
              </p>
              <div className="d-grid gap-2">
                <Button 
                  variant="primary"
                  style={{ 
                    backgroundColor: colors.primaryDark, 
                    borderColor: colors.primaryDark,
                    fontFamily: typography.fontPrimary
                  }}
                  href="/demo-premium"
                >
                  Solicitar Demostración
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PreguntasAltas;