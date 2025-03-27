import React from 'react';
import { Container, Row, Col, Card, Breadcrumb, Accordion, Button } from 'react-bootstrap';
import { colors, typography, textStyles } from '../../../styles/styles';

const PreguntasBajas = () => {
  return (
    <Container style={{ padding: '30px 0' }}>
      {/* Breadcrumb */}
      <Row className="mb-4">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
            <Breadcrumb.Item href="/preguntas">Preguntas Frecuentes</Breadcrumb.Item>
            <Breadcrumb.Item active>Productos Económicos</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      
      {/* Título de la página */}
      <Row className="mb-5">
        <Col className="text-center">
          <h1 style={textStyles.title}>Preguntas sobre Productos Económicos</h1>
          <p style={textStyles.paragraph}>
            Información sobre nuestras soluciones accesibles sin comprometer la calidad
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
              backgroundColor: 'transparent',
              borderColor: colors.primaryMedium,
              color: colors.primaryMedium
            }}
          >
            Productos Premium
          </Button>
          <Button 
            variant="outline-primary" 
            className="m-1"
            href="/preguntas-bajas"
            style={{ 
              backgroundColor: colors.primaryDark,
              borderColor: colors.primaryDark,
              color: colors.white
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
                  <Accordion.Header>¿Qué son los productos económicos de JADA Company?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Nuestros productos económicos son una línea de soluciones inteligentes diseñadas para ofrecer la mejor relación calidad-precio, permitiendo que más personas puedan comenzar a implementar tecnologías de domótica y seguridad en sus hogares o negocios sin grandes inversiones iniciales.</p>
                    
                    <p>A pesar de ser más asequibles, estos productos mantienen los estándares de calidad de JADA Company y ofrecen las funcionalidades esenciales que nuestros clientes buscan. Son ideales para:</p>
                    <ul>
                      <li>Personas que se inician en el mundo de la domótica</li>
                      <li>Espacios pequeños como apartamentos</li>
                      <li>Implementaciones por fases según presupuesto</li>
                      <li>Propiedades en alquiler donde no se desea realizar grandes inversiones</li>
                      <li>Soluciones específicas para áreas puntuales del hogar</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="1">
                  <Accordion.Header>¿Cuáles son las diferencias entre los productos económicos y premium?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Las principales diferencias entre nuestras líneas económica y premium son:</p>
                    
                    <p><strong>Funcionalidades:</strong></p>
                    <ul>
                      <li>Los productos económicos ofrecen funciones esenciales.</li>
                      <li>La línea premium incluye características avanzadas adicionales.</li>
                    </ul>
                    
                    <p><strong>Materiales y acabados:</strong></p>
                    <ul>
                      <li>La línea económica utiliza materiales estándar duraderos.</li>
                      <li>Los productos premium emplean materiales de gama alta y acabados superiores.</li>
                    </ul>
                    
                    <p><strong>Capacidad y potencia:</strong></p>
                    <ul>
                      <li>Los dispositivos económicos suelen tener capacidades más limitadas (por ejemplo, menor rango de detección, menos zonas de control).</li>
                      <li>La línea premium ofrece mayor potencia, alcance y capacidades.</li>
                    </ul>
                    
                    <p><strong>Garantía y soporte:</strong></p>
                    <ul>
                      <li>Productos económicos: garantía de 1 año y soporte estándar.</li>
                      <li>Productos premium: garantía extendida (2-3 años) y soporte prioritario.</li>
                    </ul>
                    
                    <p><strong>Integración y compatibilidad:</strong></p>
                    <ul>
                      <li>La línea económica es compatible con los asistentes y ecosistemas principales.</li>
                      <li>Los productos premium ofrecen mayor compatibilidad con sistemas de terceros y opciones de personalización avanzadas.</li>
                    </ul>
                    
                    <p>Es importante destacar que ambas líneas cumplen con nuestros estándares de calidad y seguridad; la diferencia radica en el nivel de características y prestaciones.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="2">
                  <Accordion.Header>¿Qué productos económicos son más populares?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Nuestros productos económicos más vendidos son:</p>
                    <ul>
                      <li><strong>Mini Hub de Control Básico:</strong> Centro de control compacto compatible con hasta 30 dispositivos. Ideal para apartamentos o implementaciones iniciales.</li>
                      <li><strong>Cámara de Seguridad Básica:</strong> Resolución HD, visión nocturna y detección de movimiento a un precio accesible.</li>
                      <li><strong>Kit de Iniciación Smart Home:</strong> Conjunto de dispositivos básicos que incluye 2 bombillas inteligentes, 1 enchufe inteligente y 1 sensor de movimiento con el hub básico.</li>
                      <li><strong>Sensor de Movimiento Económico:</strong> Detector simple pero eficaz para sistemas de seguridad o automatización de iluminación.</li>
                      <li><strong>Termostato Básico:</strong> Control de temperatura programable con funciones esenciales de ahorro energético.</li>
                      <li><strong>Enchufes Inteligentes (pack de 3):</strong> Controla dispositivos convencionales de forma remota y monitorea su consumo.</li>
                    </ul>
                    <p>Estos productos son perfectos para comenzar a experimentar con la domótica o para complementar sistemas existentes con soluciones puntuales a un costo accesible.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="3">
                  <Accordion.Header>¿Los productos económicos son compatibles con los premium?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Sí, todos nuestros productos, independientemente de su gama, están diseñados para ser completamente compatibles entre sí. Esto garantiza que puedas:</p>
                    <ul>
                      <li>Comenzar con productos económicos e ir actualizando a premium gradualmente.</li>
                      <li>Crear un sistema mixto donde uses dispositivos premium para áreas críticas y económicos para zonas secundarias.</li>
                      <li>Controlar todos tus dispositivos desde la misma aplicación JADA Smart Home.</li>
                      <li>Crear automatizaciones que involucren productos de ambas gamas trabajando juntos.</li>
                      <li>Utilizar el mismo hub central para gestionar todos los dispositivos (aunque para sistemas grandes se recomienda el hub premium por su mayor capacidad).</li>
                    </ul>
                    <p>Esta compatibilidad es parte de nuestra filosofía de ofrecer sistemas escalables que puedan crecer y evolucionar según las necesidades y posibilidades de cada cliente.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="4">
                  <Accordion.Header>¿Los productos económicos tienen acceso a la misma aplicación?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Sí, todos nuestros productos, tanto económicos como premium, utilizan la misma aplicación JADA Smart Home. No existe una versión "lite" o reducida para los productos económicos.</p>
                    
                    <p>Sin embargo, hay algunas diferencias en la experiencia:</p>
                    <ul>
                      <li>Los productos económicos tienen acceso a todas las funciones básicas de la aplicación.</li>
                      <li>Algunas funcionalidades avanzadas específicas están disponibles solo para hardware premium, ya que dependen de capacidades técnicas especiales de esos dispositivos (por ejemplo, la detección de personas requiere hardware de visión más potente en las cámaras premium).</li>
                      <li>El almacenamiento en la nube incluido es menor para dispositivos económicos, pero puedes ampliar este espacio con una suscripción.</li>
                      <li>Todas las actualizaciones generales de la aplicación benefician a ambas líneas de productos.</li>
                    </ul>
                    
                    <p>La aplicación detecta automáticamente qué tipo de dispositivos tienes y ajusta la interfaz para mostrar las opciones disponibles para cada uno, manteniendo una experiencia de usuario coherente.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="5">
                  <Accordion.Header>¿Es fácil instalar los productos económicos por mi cuenta?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Sí, nuestra línea económica está específicamente diseñada para facilitar la auto-instalación. Cada producto incluye:</p>
                    <ul>
                      <li>Manual de instrucciones detallado con ilustraciones paso a paso.</li>
                      <li>Código QR que enlaza a vídeos tutoriales específicos para ese modelo.</li>
                      <li>Todos los elementos necesarios para la instalación básica (tornillos, tacos, cinta adhesiva de montaje, etc.).</li>
                      <li>Asistente de configuración en la aplicación que te guía durante todo el proceso.</li>
                    </ul>
                    
                    <p>La mayoría de nuestros productos económicos se pueden instalar en menos de 15 minutos sin herramientas especiales. Para la serie económica no se requieren conocimientos técnicos:</p>
                    <ul>
                      <li>Las cámaras y sensores pueden montarse con cinta adhesiva de doble cara incluida.</li>
                      <li>Los enchufes inteligentes solo necesitan conectarse a una toma de corriente existente.</li>
                      <li>Las bombillas inteligentes se instalan como cualquier bombilla tradicional.</li>
                    </ul>
                    
                    <p>Para instalaciones que requieren conexión a la red eléctrica (como algunos termostatos), siempre recomendamos consultar a un electricista cualificado, aunque proporcionamos instrucciones detalladas.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="6">
                  <Accordion.Header>¿Qué garantía tienen los productos económicos?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Todos nuestros productos económicos incluyen una garantía estándar de 1 año que cubre:</p>
                    <ul>
                      <li>Defectos de fabricación</li>
                      <li>Mal funcionamiento no causado por uso indebido</li>
                      <li>Problemas de software que afecten la funcionalidad esencial</li>
                    </ul>
                    
                    <p>El proceso de garantía es sencillo:</p>
                    <ol>
                      <li>Contacta con nuestro servicio de atención al cliente a través de la aplicación, teléfono o correo electrónico.</li>
                      <li>Nuestro equipo realizará un diagnóstico inicial para determinar el problema.</li>
                      <li>Si el problema no puede resolverse remotamente, te proporcionaremos instrucciones para el envío del producto.</li>
                      <li>Según el caso, repararemos o reemplazaremos el dispositivo.</li>
                    </ol>
                    
                    <p>También ofrecemos la posibilidad de extender la garantía de los productos económicos:</p>
                    <ul>
                      <li>Extensión a 2 años: 15% del valor del producto.</li>
                      <li>Extensión a 3 años: 25% del valor del producto.</li>
                    </ul>
                    
                    <p>La extensión de garantía debe adquirirse durante los primeros 30 días después de la compra del producto.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="7">
                  <Accordion.Header>¿Existen planes de financiamiento para productos económicos?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Sí, para hacer nuestros productos aún más accesibles, ofrecemos varias opciones de financiamiento para la línea económica:</p>
                    <ul>
                      <li><strong>Pago en 3 cuotas sin intereses:</strong> Disponible para cualquier compra superior a $50, sin verificación de crédito.</li>
                      <li><strong>Plan 6 meses:</strong> Para compras superiores a $100, pagos mensuales con interés reducido.</li>
                      <li><strong>"Comienza Smart":</strong> Programa especial para estudiantes y jóvenes profesionales con descuentos adicionales y planes de pago flexibles.</li>
                    </ul>
                    
                    <p>Adicionalmente, ofrecemos descuentos por volumen que se aplican automáticamente:</p>
                    <ul>
                      <li>10% de descuento al comprar 3 o más productos en una misma orden.</li>
                      <li>15% de descuento en kits preconfigurados.</li>
                      <li>Envío gratuito para pedidos superiores a $75.</li>
                    </ul>
                    
                    <p>Nuestro objetivo es que el presupuesto no sea un impedimento para comenzar a disfrutar de las ventajas de un hogar inteligente. Por eso, regularmente lanzamos promociones especiales que puedes seguir a través de nuestra newsletter.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="8">
                  <Accordion.Header>¿Los productos económicos consumen mucha energía?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Nuestros productos económicos están diseñados para ser energéticamente eficientes, con un consumo mínimo que no impactará significativamente en tu factura eléctrica:</p>
                    <ul>
                      <li><strong>Sensores de movimiento y apertura:</strong> Funcionan con baterías de larga duración (1-2 años de uso normal) y solo transmiten datos cuando detectan cambios.</li>
                      <li><strong>Cámaras de seguridad básicas:</strong> Consumen aproximadamente 4-5W en funcionamiento continuo (similar a una bombilla LED de baja potencia).</li>
                      <li><strong>Hub central básico:</strong> Consumo de 2-3W en standby, similar a un cargador de teléfono.</li>
                      <li><strong>Bombillas inteligentes:</strong> Mayor eficiencia que bombillas tradicionales, con consumos típicos de 7-9W para una luminosidad equivalente a una incandescente de 60W.</li>
                      <li><strong>Enchufes inteligentes:</strong> Menos de 1W en modo de espera.</li>
                    </ul>
                    
                    <p>Además, nuestros productos económicos incluyen funciones de ahorro energético:</p>
                    <ul>
                      <li>Modo de bajo consumo automático cuando no están en uso activo.</li>
                      <li>Programación horaria para apagar dispositivos cuando no se necesitan.</li>
                      <li>Monitoreo de consumo en enchufes inteligentes para identificar dispositivos que gastan demasiada energía.</li>
                    </ul>
                    
                    <p>En muchos casos, la implementación de estos productos puede incluso reducir tu consumo eléctrico total gracias a la automatización inteligente (apagado automático de luces, optimización de calefacción/refrigeración, etc.).</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="9">
                  <Accordion.Header>¿Se pueden actualizar los productos económicos a versiones premium?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Si bien los productos físicos no pueden "actualizarse" directamente a versiones premium, ofrecemos varias opciones para facilitar la transición a equipos de gama superior:</p>
                    <ul>
                      <li><strong>Programa de renovación:</strong> Al devolver un producto económico en buen estado, obtienes un descuento del 20% en la compra del equivalente premium.</li>
                      <li><strong>Plan escalado:</strong> Te ayudamos a diseñar una estrategia de migración progresiva, comenzando por los dispositivos donde más valor aporta la versión premium.</li>
                      <li><strong>Reutilización estratégica:</strong> Asesoramiento sobre cómo reutilizar tus dispositivos económicos en áreas secundarias cuando adquieras productos premium para zonas principales.</li>
                    </ul>
                    
                    <p>Ventajas de este enfoque:</p>
                    <ul>
                      <li>No pierdes la inversión inicial en productos económicos.</li>
                      <li>Puedes actualizar gradualmente según tu presupuesto.</li>
                      <li>Los dispositivos devueltos en el programa de renovación se reacondicionan o reciclan responsablemente.</li>
                    </ul>
                    
                    <p>Importante: Los dispositivos económicos reciben actualizaciones de software regulares durante al menos 3 años, por lo que siguen siendo funcionales y seguros incluso cuando decides migrar parcialmente a versiones premium.</p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              
              <div className="text-center mt-4">
                <p style={textStyles.paragraph}>
                  ¿Listo para comenzar con soluciones inteligentes a precios accesibles?
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
                  Ver Productos Económicos
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="shadow-sm mb-4" style={{ backgroundColor: colors.primaryLight, color: colors.white }}>
            <Card.Body style={{ padding: '25px' }}>
              <h3 style={{ fontFamily: typography.fontPrimary, fontSize: '22px', marginBottom: '15px' }}>
                Kits de Iniciación
              </h3>
              <p style={{ fontFamily: typography.fontSecondary }}>
                La forma más económica de comenzar con un hogar inteligente es con nuestros kits preconfigurados:
              </p>
              <ul style={{ fontFamily: typography.fontSecondary, paddingLeft: '20px' }}>
                <li>Kit Básico: Hub + 2 bombillas + 1 enchufe</li>
                <li>Kit Seguridad: Cámara + 2 sensores + sirena</li>
                <li>Kit Ahorro: Termostato + 3 sensores de temperatura</li>
              </ul>
              <div className="d-grid gap-2 mt-3">
                <Button 
                  variant="outline-light"
                  style={{ 
                    borderColor: colors.white,
                    color: colors.white,
                    fontFamily: typography.fontPrimary
                  }}
                  href="/kits-inicio"
                >
                  Ver Kits Disponibles
                </Button>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h4 style={{ fontFamily: typography.fontPrimary, color: colors.primaryDark, marginBottom: '15px' }}>
                Ofertas Especiales
              </h4>
              <p style={{ fontFamily: typography.fontSecondary, color: colors.primaryMedium }}>
                Aprovecha nuestras promociones actuales:
              </p>
              <ul style={{ fontFamily: typography.fontSecondary, color: colors.primaryMedium, paddingLeft: '20px' }}>
                <li>10% adicional en tu primera compra</li>
                <li>3x2 en sensores de movimiento básicos</li>
                <li>Envío gratuito en pedidos +$75</li>
                <li>Bombilla inteligente gratis al comprar hub básico</li>
              </ul>
              <div className="d-grid gap-2 mt-3">
                <Button 
                  variant="outline-primary"
                  style={{ 
                    borderColor: colors.primaryMedium,
                    color: colors.primaryMedium,
                    fontFamily: typography.fontPrimary
                  }}
                  href="/ofertas"
                >
                  Ver Todas las Ofertas
                </Button>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm">
            <Card.Body>
              <h4 style={{ fontFamily: typography.fontPrimary, color: colors.primaryDark, marginBottom: '15px' }}>
                Guía de Iniciación
              </h4>
              <p style={{ fontFamily: typography.fontSecondary, color: colors.primaryMedium }}>
                Descarga nuestra guía gratuita "Primeros Pasos en el Hogar Inteligente" con consejos para comenzar con presupuesto limitado.
              </p>
              <div className="d-grid gap-2">
                <Button 
                  variant="primary"
                  style={{ 
                    backgroundColor: colors.primaryDark, 
                    borderColor: colors.primaryDark,
                    fontFamily: typography.fontPrimary
                  }}
                  href="/guia-inicial"
                >
                  Descargar Guía Gratuita
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PreguntasBajas;