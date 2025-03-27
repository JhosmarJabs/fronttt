import React from 'react';
import { Container, Row, Col, Card, Breadcrumb, Accordion, Alert, Button } from 'react-bootstrap';
import { colors, typography, textStyles } from '../../../styles/styles';

const PoliticasPrivacidad = () => {
  const fechaActualizacion = "15 de marzo de 2025";
  
  return (
    <Container style={{ padding: '30px 0' }}>
      {/* Breadcrumb */}
      <Row className="mb-4">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
            <Breadcrumb.Item active>Política de Privacidad</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      
      {/* Título de la página */}
      <Row className="mb-5">
        <Col className="text-center">
          <h1 style={textStyles.title}>Política de Privacidad</h1>
          <p style={textStyles.paragraph}>
            Cómo recopilamos, utilizamos y protegemos su información personal
          </p>
        </Col>
      </Row>
      
      {/* Alerta GDPR/CCPA */}
      <Row className="mb-4">
        <Col>
          <Alert variant="info" style={{ backgroundColor: colors.primaryMedium, borderColor: colors.primaryDark, color: colors.white }}>
            <Alert.Heading>Sus Datos, Sus Derechos</Alert.Heading>
            <p>
              En JADA Company nos tomamos muy en serio la privacidad de sus datos. Cumplimos con las regulaciones internacionales de protección de datos como el GDPR (Europa) y CCPA (California).
            </p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button variant="outline-light">Gestionar Preferencias de Cookies</Button>
            </div>
          </Alert>
        </Col>
      </Row>
      
      {/* Contenido principal */}
      <Row>
        <Col lg={8}>
          <Card className="shadow-sm mb-4">
            <Card.Body style={{ padding: '30px' }}>
              <h2 style={{ ...textStyles.subtitle, marginBottom: '20px' }}>Política de Privacidad Completa</h2>
              
              <p style={textStyles.paragraph}>
                En JADA Company valoramos y respetamos su privacidad. Esta Política de Privacidad describe cómo recopilamos, utilizamos, compartimos y protegemos la información personal que usted nos proporciona cuando utiliza nuestros productos, servicios o visita nuestro sitio web.
              </p>
              
              <p style={textStyles.paragraph}>
                Al utilizar nuestros servicios, usted acepta las prácticas descritas en esta política. Le recomendamos leer detenidamente este documento para comprender nuestros compromisos y sus derechos respecto a sus datos personales.
              </p>
              
              <Accordion className="mb-4">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>1. Información que Recopilamos</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Podemos recopilar los siguientes tipos de información personal:</p>
                    
                    <p><strong>1.1 Información que usted nos proporciona directamente:</strong></p>
                    <ul>
                      <li>Información de contacto (nombre, dirección de correo electrónico, número de teléfono, dirección postal).</li>
                      <li>Información de cuenta (nombre de usuario, contraseña).</li>
                      <li>Información de pago (número de tarjeta de crédito, datos bancarios).</li>
                      <li>Información de perfil (preferencias, intereses).</li>
                      <li>Comunicaciones que mantiene con nosotros (consultas, solicitudes de soporte).</li>
                    </ul>
                    
                    <p><strong>1.2 Información que recopilamos automáticamente:</strong></p>
                    <ul>
                      <li>Información sobre el dispositivo (tipo de dispositivo, sistema operativo, identificadores únicos).</li>
                      <li>Información de registro (direcciones IP, fechas y horas de acceso, actividades en el sitio).</li>
                      <li>Información de ubicación (si los servicios de ubicación están habilitados).</li>
                      <li>Información sobre el uso (páginas visitadas, funciones utilizadas, tiempo de sesión).</li>
                      <li>Información recopilada a través de cookies y tecnologías similares.</li>
                    </ul>
                    
                    <p><strong>1.3 Información de terceros:</strong></p>
                    <ul>
                      <li>Información de redes sociales (si utiliza la función de inicio de sesión con redes sociales).</li>
                      <li>Información de socios comerciales y proveedores de servicios.</li>
                      <li>Información disponible públicamente.</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="1">
                  <Accordion.Header>2. Cómo Utilizamos Su Información</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Utilizamos la información personal que recopilamos para los siguientes propósitos:</p>
                    
                    <p><strong>2.1 Proporcionar y mejorar nuestros servicios:</strong></p>
                    <ul>
                      <li>Procesar transacciones y gestionar su cuenta.</li>
                      <li>Proporcionar soporte al cliente y responder a sus consultas.</li>
                      <li>Personalizar su experiencia y ofrecer contenido relevante.</li>
                      <li>Desarrollar y mejorar nuestros productos y servicios.</li>
                      <li>Analizar tendencias de uso y optimizar la funcionalidad del sitio.</li>
                    </ul>
                    
                    <p><strong>2.2 Comunicaciones:</strong></p>
                    <ul>
                      <li>Enviar notificaciones administrativas (cambios en nuestros términos, confirmaciones).</li>
                      <li>Enviar comunicaciones promocionales sobre nuevos productos o servicios (si ha optado por recibirlas).</li>
                      <li>Realizar encuestas de satisfacción y estudios de mercado.</li>
                    </ul>
                    
                    <p><strong>2.3 Seguridad y cumplimiento:</strong></p>
                    <ul>
                      <li>Proteger nuestros servicios contra actividades fraudulentas o abusivas.</li>
                      <li>Cumplir con obligaciones legales y reglamentarias.</li>
                      <li>Hacer cumplir nuestros términos y condiciones.</li>
                      <li>Resolver disputas y problemas.</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="2">
                  <Accordion.Header>3. Cómo Compartimos Su Información</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Podemos compartir su información personal en las siguientes circunstancias:</p>
                    
                    <p><strong>3.1 Con proveedores de servicios:</strong></p>
                    <p>Compartimos información con terceros que nos ayudan a operar nuestro negocio y a proporcionar servicios, como:</p>
                    <ul>
                      <li>Procesadores de pago para completar transacciones.</li>
                      <li>Proveedores de servicio al cliente para responder a sus consultas.</li>
                      <li>Proveedores de análisis para comprender cómo utiliza nuestros servicios.</li>
                      <li>Proveedores de marketing para comunicaciones promocionales.</li>
                      <li>Proveedores de alojamiento y servicios en la nube.</li>
                    </ul>
                    <p>Estos proveedores están obligados contractualmente a proteger su información y utilizarla únicamente para los fines específicos que les indicamos.</p>
                    
                    <p><strong>3.2 Para cumplimiento legal:</strong></p>
                    <p>Podemos divulgar información personal cuando creemos de buena fe que es necesario:</p>
                    <ul>
                      <li>Cumplir con una obligación legal, regulatoria o proceso legal.</li>
                      <li>Proteger los derechos, la propiedad o la seguridad de JADA Company, nuestros usuarios u otros.</li>
                      <li>Detectar, investigar y prevenir actividades fraudulentas o problemas de seguridad.</li>
                      <li>Hacer cumplir nuestros acuerdos, incluidos nuestros términos de servicio.</li>
                    </ul>
                    
                    <p><strong>3.3 Con su consentimiento:</strong></p>
                    <p>Podemos compartir su información con terceros cuando usted nos ha dado su consentimiento explícito para hacerlo.</p>
                    
                    <p><strong>3.4 Transferencias comerciales:</strong></p>
                    <p>En caso de una fusión, adquisición, reorganización, venta de activos o quiebra, su información personal puede ser transferida como parte de esa transacción. Le notificaremos sobre cualquier cambio en la propiedad o el uso de su información personal.</p>
                    
                    <p><strong>3.5 Información agregada o anónima:</strong></p>
                    <p>Podemos compartir información agregada o anónima que no lo identifique personalmente con terceros para fines de investigación, análisis o estadísticas.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="3">
                  <Accordion.Header>4. Cookies y Tecnologías Similares</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Utilizamos cookies y tecnologías similares para recopilar información y personalizar su experiencia:</p>
                    
                    <p><strong>4.1 Tipos de cookies que utilizamos:</strong></p>
                    <ul>
                      <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento básico del sitio.</li>
                      <li><strong>Cookies de rendimiento:</strong> Nos ayudan a entender cómo interactúan los usuarios con nuestro sitio.</li>
                      <li><strong>Cookies de funcionalidad:</strong> Recuerdan preferencias y configuraciones.</li>
                      <li><strong>Cookies de publicidad:</strong> Utilizadas para mostrar anuncios relevantes.</li>
                      <li><strong>Cookies de redes sociales:</strong> Permiten compartir contenido en redes sociales.</li>
                    </ul>
                    
                    <p><strong>4.2 Control de cookies:</strong></p>
                    <p>La mayoría de los navegadores web permiten controlar las cookies a través de sus configuraciones. Puede optar por bloquear, eliminar o permitir cookies, aunque algunas partes de nuestro sitio pueden no funcionar correctamente sin ellas.</p>
                    
                    <p><strong>4.3 Señales de "Do Not Track":</strong></p>
                    <p>Actualmente, nuestros sistemas no reconocen las señales de "Do Not Track" de los navegadores. Sin embargo, respetamos sus opciones de privacidad como se describe en esta política.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="4">
                  <Accordion.Header>5. Seguridad de la Información</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>La seguridad de su información personal es importante para nosotros. Implementamos medidas de seguridad técnicas, administrativas y físicas diseñadas para proteger su información contra acceso no autorizado, pérdida, uso indebido o alteración.</p>
                    
                    <p>Algunas de nuestras medidas de seguridad incluyen:</p>
                    <ul>
                      <li>Encriptación de datos sensibles en tránsito y en reposo.</li>
                      <li>Controles de acceso estrictos para limitar quién puede acceder a su información.</li>
                      <li>Monitoreo de sistemas para detectar vulnerabilidades y posibles brechas.</li>
                      <li>Capacitación regular del personal sobre prácticas de seguridad y privacidad.</li>
                      <li>Evaluaciones periódicas de riesgo y auditorías de seguridad.</li>
                    </ul>
                    
                    <p>A pesar de nuestros esfuerzos, ningún método de transmisión o almacenamiento electrónico es 100% seguro. No podemos garantizar la seguridad absoluta de su información.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="5">
                  <Accordion.Header>6. Sus Derechos y Opciones</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Dependiendo de su ubicación, puede tener ciertos derechos con respecto a sus datos personales:</p>
                    
                    <p><strong>6.1 Acceso y portabilidad:</strong></p>
                    <p>Puede solicitar acceso a la información personal que tenemos sobre usted y recibir una copia de esta información en un formato estructurado y comúnmente utilizado.</p>
                    
                    <p><strong>6.2 Rectificación:</strong></p>
                    <p>Puede solicitar que corrijamos información personal inexacta o incompleta que tengamos sobre usted.</p>
                    
                    <p><strong>6.3 Eliminación:</strong></p>
                    <p>Puede solicitar que eliminemos su información personal en ciertas circunstancias (por ejemplo, cuando ya no sea necesaria para los fines para los que se recopiló).</p>
                    
                    <p><strong>6.4 Restricción y objeción:</strong></p>
                    <p>Puede solicitar que restrinjamos el procesamiento de su información personal o objetar a ciertos tipos de procesamiento (como el marketing directo).</p>
                    
                    <p><strong>6.5 Retirar el consentimiento:</strong></p>
                    <p>Si hemos recopilado y procesado su información personal con su consentimiento, puede retirar su consentimiento en cualquier momento. Esto no afectará la legalidad del procesamiento realizado antes de retirar su consentimiento.</p>
                    
                    <p><strong>6.6 Presentar una queja:</strong></p>
                    <p>Tiene derecho a presentar una queja ante una autoridad de protección de datos sobre nuestra recopilación y uso de su información personal.</p>
                    
                    <p>Para ejercer cualquiera de estos derechos, por favor contáctenos a través de privacidad@jadacompany.com o utilizando la información de contacto proporcionada al final de esta política.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="6">
                  <Accordion.Header>7. Retención de Datos</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Conservamos su información personal solo durante el tiempo necesario para cumplir con los fines para los que se recopiló, incluyendo cualquier requisito legal, contable o de informes.</p>
                    
                    <p>Para determinar el período de retención apropiado, consideramos:</p>
                    <ul>
                      <li>La cantidad, naturaleza y sensibilidad de la información personal.</li>
                      <li>El riesgo potencial de daño por uso o divulgación no autorizados.</li>
                      <li>Los fines para los que procesamos sus datos y si podemos lograr esos fines por otros medios.</li>
                      <li>Requisitos legales aplicables.</li>
                    </ul>
                    
                    <p>En algunas circunstancias, podemos anonimizar su información personal para que ya no pueda ser asociada con usted, en cuyo caso podemos utilizar dicha información sin previo aviso.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="7">
                  <Accordion.Header>8. Menores</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Nuestros servicios no están dirigidos a personas menores de 16 años, y no recopilamos intencionalmente información personal de niños menores de 16 años. Si descubrimos que hemos recopilado información personal de un niño menor de 16 años sin verificación del consentimiento parental, tomaremos medidas para eliminar esa información lo más rápido posible.</p>
                    
                    <p>Si usted es padre o tutor y cree que su hijo nos ha proporcionado información personal, por favor contáctenos a través de privacidad@jadacompany.com.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="8">
                  <Accordion.Header>9. Transferencias Internacionales de Datos</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Somos una organización global con operaciones en varios países. Su información personal puede ser transferida y procesada en países distintos a su país de residencia, donde pueden existir leyes de protección de datos diferentes.</p>
                    
                    <p>Cuando transferimos su información personal fuera de su país, tomamos medidas para garantizar que se proporcione un nivel adecuado de protección, que puede incluir:</p>
                    <ul>
                      <li>Transferir datos a países que han sido considerados por las autoridades competentes como proveedores de un nivel adecuado de protección.</li>
                      <li>Implementar acuerdos contractuales aprobados (como las Cláusulas Contractuales Estándar de la UE).</li>
                      <li>Obtener su consentimiento explícito para la transferencia propuesta después de informarle sobre los posibles riesgos.</li>
                      <li>Asegurar que la transferencia sea necesaria para la ejecución de un contrato entre usted y nosotros o para la implementación de medidas precontractuales tomadas a su solicitud.</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="9">
                  <Accordion.Header>10. Cambios a Esta Política</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestras prácticas o por otras razones operativas, legales o regulatorias. La versión actualizada se publicará en nuestro sitio web con una fecha de "última actualización" revisada.</p>
                    
                    <p>Le recomendamos revisar esta política periódicamente para mantenerse informado sobre cómo protegemos su información. Su uso continuado de nuestros servicios después de cualquier modificación constituye su aceptación de la política revisada.</p>
                    
                    <p>Para cambios significativos, haremos esfuerzos razonables para notificarle, como a través de un aviso prominente en nuestro sitio web o enviándole un correo electrónico.</p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="10">
                  <Accordion.Header>11. Contacto</Accordion.Header>
                  <Accordion.Body style={textStyles.paragraph}>
                    <p>Si tiene preguntas, comentarios o inquietudes sobre esta Política de Privacidad o nuestras prácticas de privacidad, por favor contáctenos a través de:</p>
                    
                    <p>
                      <strong>Correo electrónico:</strong> privacidad@jadacompany.com<br />
                      <strong>Dirección postal:</strong> JADA Company, Attn: Privacy Officer, 123 Main Street, Suite 456, Anytown, CA 12345, USA<br />
                      <strong>Teléfono:</strong> +1 (800) 123-4567
                    </p>
                    
                    <p>Si tiene una consulta o queja no resuelta que no hayamos abordado satisfactoriamente, puede tener el derecho de contactar a la autoridad de protección de datos en su jurisdicción.</p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              
              <p style={{ ...textStyles.paragraph, fontWeight: 'bold' }}>
                Esta Política de Privacidad fue actualizada por última vez el {fechaActualizacion}.
              </p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="shadow-sm mb-4" style={{ backgroundColor: colors.primaryLight, color: colors.white }}>
            <Card.Body style={{ padding: '25px' }}>
              <h3 style={{ fontFamily: typography.fontPrimary, fontSize: '22px', marginBottom: '15px' }}>
                Resumen de Privacidad
              </h3>
              <p style={{ fontFamily: typography.fontSecondary }}>
                En JADA Company:
              </p>
              <ul style={{ fontFamily: typography.fontSecondary, paddingLeft: '20px' }}>
                <li>Solo recopilamos los datos necesarios para brindarle nuestros servicios</li>
                <li>Nunca vendemos sus datos personales a terceros</li>
                <li>Utilizamos encriptación avanzada para proteger su información</li>
                <li>Usted tiene control sobre sus datos y puede ejercer sus derechos en cualquier momento</li>
                <li>Cumplimos con regulaciones globales de privacidad como GDPR y CCPA</li>
              </ul>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h4 style={{ fontFamily: typography.fontPrimary, color: colors.primaryDark, marginBottom: '15px' }}>
                Sus Derechos de Privacidad
              </h4>
              <div style={{ fontFamily: typography.fontSecondary, color: colors.primaryMedium }}>
                <p>Usted tiene derecho a:</p>
                <div className="d-grid gap-2">
                  <Button variant="outline-secondary" size="sm">Acceder a sus datos</Button>
                  <Button variant="outline-secondary" size="sm">Rectificar sus datos</Button>
                  <Button variant="outline-secondary" size="sm">Eliminar sus datos</Button>
                  <Button variant="outline-secondary" size="sm">Limitar el procesamiento</Button>
                  <Button variant="outline-secondary" size="sm">Oponerse al marketing</Button>
                </div>
                <p className="mt-3">
                  Contáctenos en <a href="mailto:privacidad@jadacompany.com" style={{ color: colors.primaryMedium }}>privacidad@jadacompany.com</a> para ejercer estos derechos.
                </p>
              </div>
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
                <li><a href="/politicas-empresa" style={{ color: colors.primaryMedium }}>Políticas para Empresas</a></li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PoliticasPrivacidad;