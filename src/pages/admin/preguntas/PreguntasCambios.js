import React from 'react';
import { Container, Row, Col, Card, Breadcrumb, Accordion, Button, Alert } from 'react-bootstrap';
import { colors, typography, textStyles } from '../../../styles/styles';

const PreguntasCambios = () => {
  return (
    <Container style={{ padding: '30px 0' }}>
      {/* Breadcrumb */}
      <Row className="mb-4">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
            <Breadcrumb.Item href="/preguntas">Preguntas Frecuentes</Breadcrumb.Item>
            <Breadcrumb.Item active>Cambios y Devoluciones</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      
      {/* Título de la página */}
      <Row className="mb-5">
        <Col className="text-center">
          <h1 style={textStyles.title}>Cambios y Devoluciones</h1>
          <p style={textStyles.paragraph}>
            Información sobre nuestra política de devoluciones, cambios y garantías
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
              backgroundColor: colors.primaryDark,
              borderColor: colors.primaryDark,
              color: colors.white
            }}
          >
            Cambios y Devoluciones
          </Button>
        </Col>
      </Row>
      
      {/* Alerta informativa */}
      <Row className="mb-4">
        <Col>
          <Alert variant="info" style={{ backgroundColor: colors.accent, borderColor: colors.primaryLight, color: colors.white }}>
            <Alert.Heading>Información Importante</Alert.Heading>
            <p>
              Debido a la situación actual, los plazos de devolución se han extendido a 45 días para todas las compras realizadas en nuestra tienda online. Para compras en tiendas físicas, se mantiene el plazo habitual de 30 días.
            </p>
          </Alert>
        </Col>
      </Row>
      
      {/* Contenido principal - Preguntas y Respuestas */}
      <Row>
        <Col lg={8}>
          <Card className="shadow-sm mb-4">
            <Card.Body style={{ padding: '30px' }}>
              <Accordion defaultActiveKey="0" className="mb-4">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>¿Cuál es la política general de devoluciones?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>En JADA Company nos comprometemos a garantizar tu satisfacción con todos nuestros productos. Nuestra política de devoluciones estándar incluye:</p>
                    
                    <ul>
                      <li><strong>Plazo de devolución:</strong> 30 días calendario desde la fecha de recepción del producto para compras en tiendas físicas y 45 días para compras online.</li>
                      <li><strong>Condición del producto:</strong> El producto debe estar en su estado original, sin usar, con todos sus empaques, accesorios, manuales y etiquetas intactos.</li>
                      <li><strong>Prueba de compra:</strong> Es necesario presentar el recibo, factura o comprobante de compra original.</li>
                      <li><strong>Métodos de reembolso:</strong> El reembolso se realizará utilizando el mismo método de pago empleado para la compra original.</li>
                      <li><strong>Tiempo de procesamiento:</strong> Los reembolsos se procesan en un plazo de 7-10 días hábiles una vez recibido y verificado el producto devuelto.</li>
                    </ul>
                    
                    <p>Para productos comprados durante promociones especiales o ventas estacionales, pueden aplicar condiciones específicas que se indican claramente en el momento de la compra.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="1">
                  <Accordion.Header>¿Cómo inicio un proceso de devolución?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>El proceso para iniciar una devolución es sencillo y puede realizarse por diferentes canales:</p>
                    
                    <p><strong>Para compras online:</strong></p>
                    <ol>
                      <li>Inicia sesión en tu cuenta en nuestra web.</li>
                      <li>Ve a "Mis pedidos" y selecciona la compra que deseas devolver.</li>
                      <li>Haz clic en "Iniciar devolución" y sigue las instrucciones.</li>
                      <li>Recibirás por email una etiqueta de devolución para imprimir y pegar en el paquete.</li>
                      <li>Entrega el paquete en cualquier punto de envío autorizado o solicita recogida a domicilio.</li>
                    </ol>
                    
                    <p><strong>Para compras en tienda física:</strong></p>
                    <ol>
                      <li>Acude a cualquiera de nuestras tiendas con el producto y el comprobante de compra.</li>
                      <li>Nuestro personal te asistirá con el proceso de devolución en el momento.</li>
                      <li>Si pagaste con tarjeta, deberás presentar la misma tarjeta para procesar el reembolso.</li>
                    </ol>
                    
                    <p><strong>A través del servicio al cliente:</strong></p>
                    <ol>
                      <li>Contacta a nuestro equipo de servicio al cliente vía teléfono, chat o email.</li>
                      <li>Proporciona tu número de pedido y los detalles del producto a devolver.</li>
                      <li>Un representante te guiará a través del proceso y te proporcionará las instrucciones específicas.</li>
                    </ol>
                    
                    <p>Una vez recibido el producto, evaluaremos su estado y procesaremos el reembolso o cambio según corresponda.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="2">
                  <Accordion.Header>¿Cuáles son los costos de devolución?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Los costos asociados a las devoluciones varían según la situación:</p>
                    
                    <p><strong>Devoluciones por defectos o error nuestro:</strong></p>
                    <ul>
                      <li>Sin costo alguno para el cliente.</li>
                      <li>Proporcionamos etiqueta de envío gratuita.</li>
                      <li>Ofrecemos opción de recogida a domicilio sin cargo.</li>
                      <li>Reembolsamos el 100% del valor, incluyendo los gastos de envío originales.</li>
                    </ul>
                    
                    <p><strong>Devoluciones por cambio de opinión (producto en perfecto estado):</strong></p>
                    <ul>
                      <li>Clientes estándar: Costo fijo de $5.99 para envíos nacionales (deducido del importe a reembolsar).</li>
                      <li>Miembros del programa de fidelidad: Primera devolución del año gratuita, $5.99 para las siguientes.</li>
                      <li>Clientes premium: Devoluciones gratuitas ilimitadas.</li>
                      <li>Devoluciones en tienda física: Siempre gratuitas, independientemente del motivo.</li>
                    </ul>
                    
                    <p><strong>Casos especiales:</strong></p>
                    <ul>
                      <li>Productos voluminosos o que requieren instalación: Pueden aplicar tarifas específicas que se comunican antes de confirmar la devolución.</li>
                      <li>Devoluciones internacionales: El cliente debe cubrir los gastos de envío y posibles impuestos o aranceles.</li>
                      <li>Productos personalizados o configurados a medida: Pueden aplicar cargos adicionales si la devolución no se debe a defectos.</li>
                    </ul>
                    
                    <p>Importante: Si utilizas nuestro servicio de "Prueba en casa" (disponible para ciertos productos), la primera devolución dentro del período de prueba de 15 días es siempre gratuita.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="3">
                  <Accordion.Header>¿Puedo cambiar un producto por otro diferente?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Sí, ofrecemos la posibilidad de cambiar productos por otros diferentes, no solo por el mismo modelo. Este servicio funciona de la siguiente manera:</p>
                    
                    <p><strong>Cambios por productos de igual valor:</strong></p>
                    <ul>
                      <li>Proceso sencillo y directo sin costos adicionales.</li>
                      <li>Disponible tanto en tiendas físicas como online.</li>
                      <li>Se debe cumplir con las mismas condiciones que para una devolución estándar (producto sin usar, con embalaje original, etc.).</li>
                    </ul>
                    
                    <p><strong>Cambios por productos de mayor valor:</strong></p>
                    <ul>
                      <li>Deberás abonar la diferencia de precio mediante cualquier método de pago aceptado.</li>
                      <li>Si el producto original estaba en promoción y el nuevo no, se aplicará el precio actual del nuevo producto.</li>
                      <li>Las promociones o descuentos actuales pueden aplicarse al nuevo producto si cumples los requisitos.</li>
                    </ul>
                    
                    <p><strong>Cambios por productos de menor valor:</strong></p>
                    <ul>
                      <li>Te reembolsaremos la diferencia utilizando el método de pago original.</li>
                      <li>Si el producto original se compró con un descuento, se calculará proporcionalmente la diferencia a reembolsar.</li>
                    </ul>
                    
                    <p><strong>Proceso de cambio:</strong></p>
                    <ol>
                      <li>Inicia el proceso igual que una devolución estándar.</li>
                      <li>Indica que deseas un cambio por otro producto y especifica cuál.</li>
                      <li>Para cambios online, puedes usar el crédito inmediatamente para tu nueva compra o esperar a que procesemos la devolución primero.</li>
                      <li>En tiendas físicas, el cambio se puede realizar en el momento.</li>
                    </ol>
                    
                    <p>Nota: Los plazos para solicitar cambios son los mismos que para devoluciones (30 días para compras en tienda, 45 días para compras online).</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="4">
                  <Accordion.Header>¿Cómo funciona la garantía de los productos?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Todos nuestros productos están respaldados por garantía, que varía según la línea de productos:</p>
                    
                    <p><strong>Duración de la garantía:</strong></p>
                    <ul>
                      <li>Productos línea económica: 1 año de garantía estándar.</li>
                      <li>Productos línea premium: 2-3 años de garantía según el modelo específico.</li>
                      <li>Accesorios y periféricos: 6 meses de garantía.</li>
                    </ul>
                    
                    <p><strong>Cobertura de la garantía:</strong></p>
                    <ul>
                      <li>Defectos de fabricación en materiales o mano de obra.</li>
                      <li>Mal funcionamiento durante el uso normal según las especificaciones.</li>
                      <li>Problemas de software que afecten la funcionalidad principal del dispositivo.</li>
                    </ul>
                    
                    <p><strong>Exclusiones de la garantía:</strong></p>
                    <ul>
                      <li>Daños causados por accidentes, mal uso o negligencia.</li>
                      <li>Desgaste normal por el uso (como deterioro de baterías con el tiempo).</li>
                      <li>Daños por instalación incorrecta cuando no ha sido realizada por personal autorizado.</li>
                      <li>Modificaciones o reparaciones realizadas por terceros no autorizados.</li>
                      <li>Daños causados por condiciones ambientales extremas fuera de las especificaciones.</li>
                    </ul>
                    
                    <p><strong>Proceso de reclamación de garantía:</strong></p>
                    <ol>
                      <li>Contacta con nuestro servicio técnico a través de la web, aplicación, teléfono o email.</li>
                      <li>Proporciona la información del producto y una descripción detallada del problema.</li>
                      <li>Nuestros técnicos intentarán primero solucionar el problema remotamente cuando sea posible.</li>
                      <li>Si es necesario enviar el producto, recibirás instrucciones específicas y una etiqueta de envío gratuita.</li>
                      <li>Tras la evaluación, procederemos a la reparación, reemplazo o reembolso según corresponda.</li>
                    </ol>
                    
                    <p>Importante: Recomendamos registrar tus productos en nuestra web tras la compra para agilizar futuros procesos de garantía. Para productos premium, ofrecemos garantías extendidas opcionales de hasta 5 años con cobertura adicional.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="5">
                  <Accordion.Header>¿Qué hacer si recibo un producto defectuoso?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Si recibes un producto que presenta defectos o no funciona correctamente al momento de recibirlo, sigue estos pasos:</p>
                    
                    <p><strong>Para productos recién recibidos (primeras 48 horas):</strong></p>
                    <ol>
                      <li>No intentes reparar o modificar el producto, ya que esto podría anular la garantía.</li>
                      <li>Documenta el problema con fotos o videos si es posible.</li>
                      <li>Contacta inmediatamente con nuestro servicio al cliente por teléfono, chat o email.</li>
                      <li>Proporciona tu número de pedido, detalles del producto y una descripción clara del defecto.</li>
                      <li>Nuestro equipo de soporte te ofrecerá una solución inmediata que puede incluir:
                        <ul>
                          <li>Reemplazo express sin necesidad de devolver primero el producto defectuoso.</li>
                          <li>Devolución con reembolso completo incluyendo gastos de envío.</li>
                          <li>Soporte técnico para resolución remota si es un problema menor o de configuración.</li>
                        </ul>
                      </li>
                    </ol>
                    
                    <p><strong>Para productos con defectos detectados después de varios días:</strong></p>
                    <ol>
                      <li>Revisa el manual de usuario para descartar problemas de configuración o uso incorrecto.</li>
                      <li>Consulta la sección de solución de problemas en nuestra web o app.</li>
                      <li>Si el problema persiste, contacta con nuestro servicio técnico proporcionando:
                        <ul>
                          <li>Información detallada del producto (modelo, número de serie).</li>
                          <li>Fecha de compra y número de pedido.</li>
                          <li>Descripción detallada del problema y cuándo comenzó.</li>
                          <li>Pasos que ya has intentado para solucionar el problema.</li>
                        </ul>
                      </li>
                    </ol>
                    
                    <p><strong>Opciones disponibles para productos defectuosos:</strong></p>
                    <ul>
                      <li>Reparación gratuita durante el período de garantía.</li>
                      <li>Reemplazo por un producto nuevo o reacondicionado del mismo modelo.</li>
                      <li>Reembolso completo si la reparación no es posible y no hay unidades disponibles para reemplazo.</li>
                      <li>Para clientes premium: servicio de préstamo de un dispositivo similar mientras el tuyo está en reparación.</li>
                    </ul>
                    
                    <p>Todos los envíos relacionados con productos defectuosos dentro del período de garantía son completamente gratuitos.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="6">
                  <Accordion.Header>¿Puedo devolver productos que han sido instalados?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>La devolución de productos ya instalados sigue políticas específicas según el tipo de instalación y la naturaleza del producto:</p>
                    
                    <p><strong>Productos con instalación simple (plug and play):</strong></p>
                    <ul>
                      <li>Enchufes inteligentes, bombillas, cámaras independientes, sensores inalámbricos y similares.</li>
                      <li>Se aceptan devoluciones dentro del período estándar (30-45 días) si:
                        <ul>
                          <li>El producto está en buenas condiciones sin daños visibles.</li>
                          <li>Incluye todos los accesorios, manuales y embalaje original.</li>
                          <li>No muestra signos de desgaste excesivo o uso prolongado.</li>
                        </ul>
                      </li>
                    </ul>
                    
                    <p><strong>Productos con instalación compleja:</strong></p>
                    <ul>
                      <li>Termostatos integrados, sistemas eléctricos empotrados, dispositivos cableados permanentemente.</li>
                      <li>Devoluciones aceptadas solo en estos casos:
                        <ul>
                          <li>Defectos de fabricación o mal funcionamiento (cubiertos por garantía).</li>
                          <li>Incompatibilidad técnica no especificada en la descripción del producto.</li>
                          <li>Dentro de los primeros 15 días tras la instalación, con un cargo de reposición (15-25% según el producto).</li>
                        </ul>
                      </li>
                    </ul>
                    
                    <p><strong>Productos instalados por nuestro servicio técnico oficial:</strong></p>
                    <ul>
                      <li>Mayor flexibilidad en las condiciones de devolución.</li>
                      <li>Posibilidad de desinstalación profesional con costo reducido.</li>
                      <li>Evaluación caso por caso según el tipo de instalación.</li>
                      <li>Devolución completa si el producto no cumple con las especificaciones prometidas.</li>
                    </ul>
                    
                    <p><strong>Productos personalizados o a medida:</strong></p>
                    <ul>
                      <li>No se aceptan devoluciones por cambio de opinión.</li>
                      <li>Solo se aceptan devoluciones por defectos de fabricación o discrepancias significativas con las especificaciones acordadas.</li>
                    </ul>
                    
                    <p>Recomendación: Antes de instalar productos complejos, especialmente aquellos que requieren modificaciones en tu hogar, asegúrate de que cumplan con tus necesidades y sean compatibles con tu sistema existente.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="7">
                  <Accordion.Header>¿Qué sucede con las suscripciones asociadas a productos devueltos?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Algunos de nuestros productos incluyen o están asociados a servicios por suscripción (como almacenamiento en la nube para cámaras o monitoreo avanzado). Si devuelves un producto con una suscripción activa, aplicamos las siguientes políticas:</p>
                    
                    <p><strong>Suscripciones incluidas con el producto:</strong></p>
                    <ul>
                      <li>Se cancelan automáticamente al procesar la devolución.</li>
                      <li>No se requiere ninguna acción adicional por tu parte.</li>
                      <li>No hay cargos pendientes asociados con estas suscripciones incluidas.</li>
                    </ul>
                    
                    <p><strong>Suscripciones pagadas adicionalmente (mensuales):</strong></p>
                    <ul>
                      <li>Se cancelan automáticamente a partir del siguiente ciclo de facturación.</li>
                      <li>No se emiten reembolsos parciales por el mes en curso.</li>
                      <li>Los datos asociados (como grabaciones o históricos) permanecen accesibles hasta el final del período pagado.</li>
                    </ul>
                    
                    <p><strong>Suscripciones prepagadas (anuales o plurianuales):</strong></p>
                    <ul>
                      <li>Se emite un reembolso prorrateado por el tiempo restante no utilizado.</li>
                      <li>El cálculo se realiza a partir de la fecha de recepción del producto devuelto.</li>
                      <li>Se aplica un pequeño cargo administrativo (5% o $10, lo que sea menor) en reembolsos de planes anuales o superiores.</li>
                    </ul>
                    
                    <p><strong>Suscripciones multi-dispositivo:</strong></p>
                    <ul>
                      <li>Si devuelves solo uno de varios dispositivos asociados a la misma suscripción, ésta continúa activa para los dispositivos restantes.</li>
                      <li>Puedes solicitar un ajuste de tu plan si la devolución reduce significativamente tus necesidades (por ejemplo, pasar de un plan familiar a uno individual).</li>
                    </ul>
                    
                    <p><strong>Datos almacenados:</strong></p>
                    <ul>
                      <li>Los datos asociados exclusivamente al dispositivo devuelto (grabaciones, configuraciones, históricos) se mantienen durante 30 días después de la devolución.</li>
                      <li>Recibirás un correo electrónico con instrucciones para descargar o transferir estos datos si lo deseas.</li>
                      <li>Transcurridos los 30 días, los datos se eliminan permanentemente por razones de privacidad.</li>
                    </ul>
                    
                    <p>Para situaciones especiales o consultas específicas sobre tus suscripciones, contacta directamente con nuestro departamento de facturación.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="8">
                  <Accordion.Header>¿Existe una política especial para compras corporativas?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Efectivamente, disponemos de políticas específicas para clientes corporativos que adquieren nuestros productos y servicios a mayor escala:</p>
                    
                    <p><strong>Plazos extendidos:</strong></p>
                    <ul>
                      <li>Período de evaluación de 60 días para pedidos iniciales que incluyan al menos 10 unidades del mismo producto.</li>
                      <li>Devoluciones parciales permitidas (hasta un 20% del pedido total) durante los primeros 90 días para pedidos superiores a 50 unidades.</li>
                    </ul>
                    
                    <p><strong>Procesos adaptados:</strong></p>
                    <ul>
                      <li>Gestor de cuenta dedicado para coordinar devoluciones y cambios.</li>
                      <li>Posibilidad de programar recogidas en tus instalaciones para volúmenes grandes.</li>
                      <li>Opciones de reemplazo anticipado antes de devolver los productos defectuosos para minimizar interrupciones.</li>
                    </ul>
                    
                    <p><strong>Flexibilidad financiera:</strong></p>
                    <ul>
                      <li>Reembolsos mediante notas de crédito para futuras compras (con bonificación adicional del 5%).</li>
                      <li>Posibilidad de sustituir productos por versiones actualizadas pagando solo la diferencia.</li>
                      <li>Descuentos especiales en servicios de instalación y configuración para reemplazos.</li>
                    </ul>
                    
                    <p><strong>Garantías corporativas:</strong></p>
                    <ul>
                      <li>Garantía extendida automática para compras de más de 25 unidades.</li>
                      <li>Servicio in situ para diagnóstico y reparación en tus instalaciones (sujeto a volumen mínimo).</li>
                      <li>Stock de reserva disponible para clientes con contratos de servicio premium.</li>
                    </ul>
                    
                    <p><strong>Personalizaciones y productos a medida:</strong></p>
                    <ul>
                      <li>Condiciones específicas detalladas en el contrato de venta.</li>
                      <li>Procesos de validación y aceptación antes de la producción final.</li>
                      <li>Términos de cambio y ajuste durante la fase de implementación.</li>
                    </ul>
                    
                    <p>Los clientes corporativos deben contactar directamente con su gestor de cuenta o con nuestro departamento de ventas corporativas para gestionar cualquier devolución o reclamación de garantía.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="9">
                  <Accordion.Header>¿Cómo se gestionan las devoluciones de productos en oferta o promoción?</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Las devoluciones de productos adquiridos durante ofertas, promociones o ventas especiales siguen estas políticas específicas:</p>
                    
                    <p><strong>Productos con descuento directo:</strong></p>
                    <ul>
                      <li>Se reembolsa el precio efectivamente pagado (con el descuento aplicado).</li>
                      <li>Aplican las mismas condiciones y plazos de devolución que para productos a precio regular.</li>
                      <li>Si eliges cambio por otro producto, el descuento no es transferible al nuevo artículo salvo que esté bajo la misma promoción.</li>
                    </ul>
                    
                    <p><strong>Ofertas tipo "2x1" o "3x2":</strong></p>
                    <ul>
                      <li>Si deseas devolver solo una parte de los productos de la promoción, se recalcula el valor según el precio individual regular.</li>
                      <li>Ejemplo: En una oferta 2x1, al devolver solo un producto, el otro se factura al precio completo y la diferencia se deduce del reembolso.</li>
                      <li>Para mantener los beneficios promocionales, debes conservar la cantidad mínima de artículos especificada en la oferta.</li>
                    </ul>
                    
                    <p><strong>Ventas flash y ofertas por tiempo limitado:</strong></p>
                    <ul>
                      <li>Aplican las mismas políticas de devolución estándar.</li>
                      <li>El reembolso se realiza por el precio promocional pagado.</li>
                      <li>Los cambios por el mismo producto no están garantizados si la promoción ha finalizado y hay diferencia de precio.</li>
                    </ul>
                    
                    <p><strong>Productos con regalo promocional:</strong></p>
                    <ul>
                      <li>Es necesario devolver también el regalo recibido en su estado original para procesar la devolución completa.</li>
                      <li>Alternativamente, se puede deducir el valor del regalo del importe a reembolsar si deseas conservarlo.</li>
                    </ul>
                    
                    <p><strong>Compras con códigos de descuento o cupones:</strong></p>
                    <ul>
                      <li>El reembolso se realiza por el importe efectivamente pagado después del descuento.</li>
                      <li>Los códigos de un solo uso no se restauran ni compensan en devoluciones parciales.</li>
                      <li>Para códigos de descuento porcentual en compras múltiples, el descuento se distribuye proporcionalmente entre los artículos al calcular reembolsos parciales.</li>
                    </ul>
                    
                    <p><strong>Black Friday y grandes eventos comerciales:</strong></p>
                    <ul>
                      <li>Pueden aplicar políticas específicas que se comunican claramente durante la campaña.</li>
                      <li>Generalmente extendemos el período de devolución para evitar aglomeraciones.</li>
                      <li>Para cambios de producto, se respeta el precio promocional si se solicita dentro del período de la campaña.</li>
                    </ul>
                    
                    <p>Todas estas condiciones específicas se detallan en los términos de cada promoción. Te recomendamos consultarlas antes de realizar compras durante períodos promocionales si prevés que podrías necesitar hacer cambios o devoluciones.</p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              
              <div className="text-center mt-4">
                <p style={textStyles.paragraph}>
                  ¿No has encontrado respuesta a tu pregunta sobre cambios o devoluciones?
                </p>
                <Button 
                  variant="primary" 
                  href="/contacto"
                  style={{ 
                    backgroundColor: colors.primaryDark, 
                    borderColor: colors.primaryDark,
                    padding: '10px 25px'
                  }}
                >
                  Contactar con Atención al Cliente
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="shadow-sm mb-4" style={{ backgroundColor: colors.primaryDark, color: colors.white }}>
            <Card.Body style={{ padding: '25px' }}>
              <h3 style={{ fontFamily: typography.fontPrimary, fontSize: '22px', marginBottom: '15px' }}>
                Proceso de Devolución
              </h3>
              <ol style={{ fontFamily: typography.fontSecondary, paddingLeft: '20px' }}>
                <li>Inicia el proceso en tu cuenta o contacta con atención al cliente</li>
                <li>Recibe la etiqueta de devolución por email</li>
                <li>Empaca el producto con todos sus accesorios</li>
                <li>Envía el paquete o solicita recogida a domicilio</li>
                <li>Espera la confirmación de recepción</li>
                <li>Recibe el reembolso en 7-10 días hábiles</li>
              </ol>
              <div className="d-grid gap-2 mt-3">
                <Button 
                  variant="outline-light"
                  style={{ 
                    borderColor: colors.white,
                    color: colors.white,
                    fontFamily: typography.fontPrimary
                  }}
                  href="/iniciar-devolucion"
                >
                  Iniciar Devolución
                </Button>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h4 style={{ fontFamily: typography.fontPrimary, color: colors.primaryDark, marginBottom: '15px' }}>
                Documentos Útiles
              </h4>
              <ul style={{ fontFamily: typography.fontSecondary, color: colors.primaryMedium, paddingLeft: '20px' }}>
                <li><a href="/docs/formulario-devolucion.pdf" style={{ color: colors.primaryMedium }}>Formulario de devolución</a></li>
                <li><a href="/docs/politica-garantia.pdf" style={{ color: colors.primaryMedium }}>Política de garantía completa</a></li>
                <li><a href="/docs/guia-embalaje.pdf" style={{ color: colors.primaryMedium }}>Guía de embalaje para devoluciones</a></li>
                <li><a href="/docs/puntos-recogida.pdf" style={{ color: colors.primaryMedium }}>Lista de puntos de recogida</a></li>
              </ul>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm">
            <Card.Body>
              <h4 style={{ fontFamily: typography.fontPrimary, color: colors.primaryDark, marginBottom: '15px' }}>
                Atención al Cliente
              </h4>
              <p style={{ fontFamily: typography.fontSecondary, color: colors.primaryMedium }}>
                Nuestro equipo especializado en devoluciones y garantías está disponible para ayudarte:
              </p>
              <ul style={{ fontFamily: typography.fontSecondary, color: colors.primaryMedium, paddingLeft: '20px' }}>
                <li>Teléfono: +1 (800) 123-4567</li>
                <li>Email: devoluciones@jadacompany.com</li>
                <li>Chat en vivo: Disponible en horario comercial</li>
                <li>Horario: Lunes a Viernes 9AM - 6PM</li>
              </ul>
              <div className="d-grid gap-2 mt-3">
                <Button 
                  variant="primary"
                  style={{ 
                    backgroundColor: colors.primaryDark, 
                    borderColor: colors.primaryDark,
                    fontFamily: typography.fontPrimary
                  }}
                  href="/contacto"
                >
                  Contactar Ahora
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PreguntasCambios;