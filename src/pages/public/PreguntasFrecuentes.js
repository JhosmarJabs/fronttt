import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaSearch, FaHome, FaBoxOpen, FaTools, FaMoneyBillWave, FaShippingFast, FaQuestionCircle } from 'react-icons/fa';
import { colors, typography, layout, buttons, textStyles } from '../../styles/styles';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState({});

  // Categorías de preguntas
  const categories = [
    { id: 'all', name: 'Todas las preguntas', icon: <FaHome style={{color: colors.primaryLight}} /> },
    { id: 'products', name: 'Productos', icon: <FaBoxOpen style={{color: colors.primaryLight}} /> },
    { id: 'installation', name: 'Instalación y Medidas', icon: <FaTools style={{color: colors.primaryLight}} /> },
    { id: 'payments', name: 'Pagos y Financiación', icon: <FaMoneyBillWave style={{color: colors.primaryLight}} /> },
    { id: 'shipping', name: 'Envíos y Entregas', icon: <FaShippingFast style={{color: colors.primaryLight}} /> },
  ];

  // Lista de preguntas frecuentes organizadas por categoría
  const faqs = [
    // Productos
    {
      id: 1,
      question: '¿Qué tipos de persianas ofrecen?',
      answer: 'Disponemos de una amplia gama de persianas: enrollables, venecianas, verticales, plisadas, estores, panel japonés, persianas de exterior, y mucho más. Cada tipo tiene diferentes opciones de materiales y acabados para adaptarse a sus necesidades.',
      category: 'products'
    },
    {
      id: 2,
      question: '¿Qué diferencia hay entre las persianas enrollables y las venecianas?',
      answer: 'Las persianas enrollables consisten en una única pieza de tela que se enrolla alrededor de un eje, ofreciendo un aspecto limpio y minimalista. Las venecianas están formadas por lamas horizontales que pueden girar para regular la entrada de luz. Las enrollables son más sencillas de limpiar, mientras que las venecianas ofrecen mayor control de la luz.',
      category: 'products'
    },
    {
      id: 3,
      question: '¿Qué tipo de persianas son mejores para oscurecer por completo una habitación?',
      answer: 'Las persianas enrollables blackout o "screen" son las más efectivas para conseguir un oscurecimiento casi total. También ofrecemos persianas venecianas de aluminio con lamas más anchas o persianas de exterior que proporcionan un excelente bloqueo de la luz.',
      category: 'products'
    },
    {
      id: 4,
      question: '¿Qué materiales utilizan en sus persianas?',
      answer: 'Utilizamos una variedad de materiales de alta calidad: aluminio, PVC, madera natural, madera sintética, diversos tipos de tejidos (poliéster, algodón, fibra de vidrio), bambú y ratán. Cada material tiene sus propias ventajas en términos de durabilidad, mantenimiento y estética.',
      category: 'products'
    },
    {
      id: 5,
      question: '¿Ofrecen persianas motorizadas?',
      answer: 'Sí, disponemos de opciones de motorización para casi todos nuestros modelos de persianas. Ofrecemos motores con control remoto, control por smartphone e incluso compatibilidad con asistentes de voz como Alexa o Google Home para una experiencia domótica completa.',
      category: 'products'
    },
    {
      id: 6,
      question: '¿Cuál es la vida útil de sus persianas?',
      answer: 'La vida útil varía según el tipo y el uso, pero nuestras persianas están diseñadas para durar entre 7 y 15 años con un mantenimiento adecuado. Las persianas de aluminio y PVC suelen tener mayor durabilidad que las de tejido. Todos nuestros productos incluyen garantía del fabricante.',
      category: 'products'
    },
    {
      id: 7,
      question: '¿Son sus persianas resistentes a la humedad?',
      answer: 'Tenemos opciones específicas para ambientes húmedos como baños y cocinas. Las persianas de aluminio, PVC y ciertos tejidos técnicos son resistentes a la humedad. Para estos espacios, recomendamos evitar las de madera natural, que pueden deformarse con el tiempo en ambientes muy húmedos.',
      category: 'products'
    },
    {
      id: 8,
      question: '¿Puedo solicitar muestras de materiales antes de realizar un pedido?',
      answer: 'Sí, ofrecemos un servicio de muestras gratuito para que pueda comprobar los colores y texturas en su propio espacio antes de decidirse. Puede solicitar hasta 5 muestras sin coste a través de nuestra web.',
      category: 'products'
    },

    // Instalación y Medidas
    {
      id: 9,
      question: '¿Cómo puedo medir correctamente mis ventanas para las persianas?',
      answer: 'Ofrecemos guías detalladas para cada tipo de persiana en nuestra sección "Cómo medir". En general, debe decidir si quiere montaje interior (dentro del hueco de la ventana) o exterior (cubriendo todo el marco), y medir ancho y alto en varios puntos. Para mayor precisión, recomendamos nuestro servicio de medición profesional.',
      category: 'installation'
    },
    {
      id: 10,
      question: '¿Ofrecen servicio de instalación?',
      answer: 'Sí, contamos con un equipo de instaladores profesionales que trabajan en toda España. El coste del servicio depende de la ubicación y el volumen del pedido. En algunos casos, para pedidos superiores a cierta cantidad, la instalación puede ser gratuita.',
      category: 'installation'
    },
    {
      id: 11,
      question: '¿Puedo instalar las persianas yo mismo?',
      answer: 'Muchos de nuestros modelos están diseñados para facilitar la instalación DIY y vienen con instrucciones detalladas, plantillas de perforación y todos los herrajes necesarios. Sin embargo, para persianas motorizadas o de gran tamaño, recomendamos la instalación profesional.',
      category: 'installation'
    },
    {
      id: 12,
      question: '¿Qué herramientas necesito para instalar las persianas?',
      answer: 'Para una instalación básica, necesitará: taladro con brocas adecuadas para su pared, destornillador, cinta métrica, nivel, lápiz y escalera. Cada producto incluye una lista específica de herramientas recomendadas en las instrucciones de montaje.',
      category: 'installation'
    },
    {
      id: 13,
      question: '¿Las persianas vienen con todos los elementos necesarios para su instalación?',
      answer: 'Sí, todas nuestras persianas incluyen los soportes, tornillos y anclajes necesarios para una instalación estándar en pared o techo de madera, yeso o cemento. Para superficies especiales como azulejos o metal, puede ser necesario adquirir anclajes específicos.',
      category: 'installation'
    },
    {
      id: 14,
      question: '¿Qué hago si mis ventanas tienen formas especiales o tamaños no estándar?',
      answer: 'Ofrecemos servicios de persianas a medida para ventanas con formas especiales como trapezoidales, triangulares o circulares. En estos casos, le recomendamos contactar con nuestro servicio de atención al cliente para una evaluación personalizada.',
      category: 'installation'
    },
    {
      id: 15,
      question: '¿Puedo cambiar el lado del control de la persiana?',
      answer: 'Para la mayoría de nuestros modelos, puede elegir el lado del control (derecho o izquierdo) durante el proceso de pedido. En algunos casos, también es posible cambiar el lado después de la instalación, aunque esto puede variar según el modelo específico.',
      category: 'installation'
    },

    // Pagos y Financiación
    {
      id: 16,
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos tarjetas de crédito/débito (Visa, Mastercard, American Express), PayPal, transferencia bancaria y pago contra reembolso en pedidos seleccionados. Todos nuestros métodos de pago son seguros y están encriptados.',
      category: 'payments'
    },
    {
      id: 17,
      question: '¿Ofrecen opciones de financiación?',
      answer: 'Sí, para pedidos superiores a 300€, ofrecemos financiación sin intereses hasta 6 meses o financiación con intereses para plazos más largos (hasta 24 meses). Este servicio está disponible a través de nuestras entidades financieras colaboradoras y sujeto a aprobación crediticia.',
      category: 'payments'
    },
    {
      id: 18,
      question: '¿Cuándo se realiza el cargo por mi compra?',
      answer: 'Para compras con tarjeta o PayPal, el cargo se realiza en el momento de confirmar el pedido. En caso de transferencia bancaria, tendrá 3 días para realizar el pago y enviarnos el comprobante. Para pedidos a medida, puede requerirse un depósito inicial del 50%.',
      category: 'payments'
    },
    {
      id: 19,
      question: '¿Emiten factura por la compra?',
      answer: 'Sí, emitimos factura electrónica para todas las compras. La factura se envía automáticamente al email proporcionado durante el proceso de compra. Si necesita una factura con datos fiscales específicos, puede indicarlo durante el proceso de checkout.',
      category: 'payments'
    },
    {
      id: 20,
      question: '¿Hay algún coste adicional no incluido en el precio mostrado?',
      answer: 'El precio mostrado incluye el IVA. Los costes de envío se calculan según su ubicación y se muestran antes de finalizar la compra. La instalación es un servicio opcional con coste adicional, excepto en promociones específicas.',
      category: 'payments'
    },
    {
      id: 21,
      question: '¿Ofrecen descuentos para pedidos grandes o proyectos profesionales?',
      answer: 'Sí, tenemos una sección específica para profesionales (decoradores, arquitectos, constructores) con precios especiales para proyectos de gran volumen. También ofrecemos descuentos por cantidad en pedidos superiores a cierto importe para todos nuestros clientes.',
      category: 'payments'
    },

    // Envíos y Entregas
    {
      id: 22,
      question: '¿Cuál es el tiempo de entrega habitual?',
      answer: 'Para productos estándar en stock, el tiempo de entrega es de 3-5 días laborables. Para persianas a medida o personalizadas, el plazo varía entre 10-15 días laborables. Los tiempos exactos se confirman al realizar el pedido.',
      category: 'shipping'
    },
    {
      id: 23,
      question: '¿Envían a toda España?',
      answer: 'Sí, realizamos envíos a toda la península española, Islas Baleares, Islas Canarias, Ceuta y Melilla. Los tiempos de entrega y costes pueden variar para zonas insulares y territorios especiales.',
      category: 'shipping'
    },
    {
      id: 24,
      question: '¿Hacen envíos internacionales?',
      answer: 'Actualmente enviamos a Portugal y Francia. Para otros países europeos, por favor contacte con nuestro servicio de atención al cliente para verificar disponibilidad y condiciones de envío.',
      category: 'shipping'
    },
    {
      id: 25,
      question: '¿Cómo puedo hacer seguimiento de mi pedido?',
      answer: 'Una vez que su pedido sea enviado, recibirá un email con un número de seguimiento y un enlace para rastrear su paquete en tiempo real a través de la web de la empresa de transporte asignada.',
      category: 'shipping'
    },
    {
      id: 26,
      question: '¿Qué hago si mi pedido llega dañado?',
      answer: 'Recomendamos verificar el estado del producto en presencia del transportista. Si detecta daños, debe anotarlo en el albarán de entrega. En cualquier caso, dispone de 24 horas para reportar daños no evidentes en el momento de la entrega, adjuntando fotos del problema a nuestro departamento de atención al cliente.',
      category: 'shipping'
    },
    {
      id: 27,
      question: '¿Puedo cambiar la dirección de entrega una vez realizado el pedido?',
      answer: 'Si el pedido aún no ha sido procesado para envío, es posible cambiar la dirección contactando inmediatamente con nuestro servicio de atención al cliente. Una vez que el pedido esté en proceso de envío, no podemos garantizar cambios en la dirección de entrega.',
      category: 'shipping'
    },
    {
      id: 28,
      question: '¿Realizan entregas en días específicos o franjas horarias?',
      answer: 'Para la mayoría de las zonas, ofrecemos la posibilidad de seleccionar el día de entrega una vez que el pedido esté listo. Las franjas horarias específicas dependen de la empresa de transporte y la zona, pero generalmente se ofrece una ventana aproximada de 2-3 horas el día anterior a la entrega.',
      category: 'shipping'
    },
    {
      id: 29,
      question: '¿Las persianas vienen montadas o hay que ensamblarlas?',
      answer: 'La mayoría de nuestras persianas vienen pre-ensambladas y listas para instalar. Solo necesitará colocar los soportes y colgar la persiana. Los modelos más complejos pueden requerir algunos pasos adicionales de montaje, que están detallados en las instrucciones incluidas.',
      category: 'shipping'
    },
    {
      id: 30,
      question: '¿Tienen política de devoluciones?',
      answer: 'Sí, ofrecemos 14 días para devoluciones de productos estándar en perfectas condiciones y con su embalaje original. Para productos a medida o personalizados, solo aceptamos devoluciones en caso de defectos de fabricación. Los gastos de devolución corren por cuenta del cliente excepto en casos de productos defectuosos.',
      category: 'shipping'
    },
  ];

  // Manejar la expansión de las preguntas
  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filtrar las preguntas según la búsqueda y categoría
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Estilos basados en el archivo styles.js
  const pageStyles = {
    mainContainer: {
      minHeight: '100vh',
      backgroundColor: '#f5f7fa',
      paddingBottom: '50px',
    },
    header: {
      backgroundColor: colors.primaryDark,
      padding: '40px 0',
      marginBottom: '30px',
      textAlign: 'center',
    },
    headerTitle: {
      color: colors.white,
      fontFamily: typography.fontPrimary,
      fontSize: '32px',
      fontWeight: 'bold',
      margin: '0 0 10px 0',
    },
    headerSubtitle: {
      color: colors.white,
      fontFamily: typography.fontSecondary,
      fontSize: '16px',
      opacity: '0.8',
    },
    contentContainer: {
      ...layout.container,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    searchContainer: {
      width: '100%',
      maxWidth: '600px',
      marginBottom: '30px',
      position: 'relative',
    },
    searchInput: {
      width: '100%',
      padding: '12px 20px 12px 50px',
      fontSize: '16px',
      fontFamily: typography.fontSecondary,
      border: 'none',
      borderRadius: '30px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    searchIcon: {
      position: 'absolute',
      left: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: colors.primaryLight,
    },
    mainContent: {
      display: 'flex',
      width: '100%',
      gap: '30px',
      flexDirection: 'column',
      '@media (min-width: 768px)': {
        flexDirection: 'row',
      },
    },
    sidebar: {
      flex: '0 0 100%',
      '@media (min-width: 768px)': {
        flex: '0 0 280px',
      },
    },
    sidebarCard: {
      backgroundColor: colors.white,
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      overflow: 'hidden',
    },
    sidebarTitle: {
      padding: '15px 20px',
      margin: 0,
      backgroundColor: colors.primaryDark,
      color: colors.white,
      fontFamily: typography.fontPrimary,
      fontSize: '18px',
      fontWeight: 'bold',
    },
    categoryList: {
      listStyle: 'none',
      padding: '10px 0',
      margin: 0,
    },
    categoryItem: {
      padding: 0,
    },
    categoryButton: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      padding: '12px 20px',
      backgroundColor: 'transparent',
      border: 'none',
      textAlign: 'left',
      fontFamily: typography.fontSecondary,
      fontSize: '15px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    categoryButtonActive: {
      backgroundColor: `rgba(65, 90, 119, 0.1)`,
      borderLeft: `4px solid ${colors.primaryLight}`,
      color: colors.primaryDark,
      fontWeight: 'bold',
    },
    categoryIcon: {
      marginRight: '10px',
    },
    faqContainer: {
      flex: '1 1 auto',
    },
    faqCard: {
      backgroundColor: colors.white,
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      overflow: 'hidden',
    },
    faqHeader: {
      padding: '20px',
      borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
      display: 'flex',
      alignItems: 'center',
    },
    faqHeaderIcon: {
      color: colors.primaryLight,
      marginRight: '10px',
    },
    faqTitle: {
      margin: 0,
      fontFamily: typography.fontPrimary,
      fontSize: '20px',
      fontWeight: 'bold',
      color: colors.primaryDark,
    },
    faqList: {
      padding: '10px 20px',
    },
    questionItem: {
      borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
      marginBottom: '10px',
    },
    questionButton: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 0',
      backgroundColor: 'transparent',
      border: 'none',
      textAlign: 'left',
      cursor: 'pointer',
      fontFamily: typography.fontSecondary,
      fontSize: '16px',
      fontWeight: '600',
      color: colors.primaryMedium,
    },
    answerContainer: {
      padding: '0 0 15px 0',
    },
    answerText: {
      margin: 0,
      fontFamily: typography.fontSecondary,
      fontSize: '15px',
      lineHeight: '1.6',
      color: colors.primaryLight,
    },
    noResults: {
      padding: '30px 0',
      textAlign: 'center',
      fontFamily: typography.fontSecondary,
      color: colors.primaryLight,
    },
    cta: {
      backgroundColor: colors.primaryDark,
      padding: '50px 0',
      marginTop: '50px',
      textAlign: 'center',
    },
    ctaContainer: {
      ...layout.container,
    },
    ctaTitle: {
      color: colors.white,
      fontFamily: typography.fontPrimary,
      fontSize: '26px',
      fontWeight: 'bold',
      marginBottom: '15px',
    },
    ctaText: {
      color: colors.white,
      fontFamily: typography.fontSecondary,
      fontSize: '16px',
      maxWidth: '600px',
      margin: '0 auto 25px auto',
      opacity: '0.8',
    },
    ctaButton: {
      ...buttons.primary,
      backgroundColor: colors.white,
      color: colors.primaryDark,
      padding: '12px 30px',
      borderRadius: '30px',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={pageStyles.mainContainer}>
      {/* Header */}
      <div style={pageStyles.header}>
        <h1 style={pageStyles.headerTitle}>Preguntas Frecuentes</h1>
        <p style={pageStyles.headerSubtitle}>Todo lo que necesita saber sobre nuestras persianas</p>
      </div>

      <div style={pageStyles.contentContainer}>
        {/* Buscador */}
        <div style={pageStyles.searchContainer}>
          <FaSearch style={pageStyles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar preguntas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={pageStyles.searchInput}
          />
        </div>

        {/* Contenido principal */}
        <div style={{display: 'flex', flexWrap: 'wrap', width: '100%', gap: '20px'}}>
          {/* Sidebar de categorías */}
          <div style={{flex: '1 1 250px', minWidth: '250px', maxWidth: '300px'}}>
            <div style={pageStyles.sidebarCard}>
              <h2 style={pageStyles.sidebarTitle}>Categorías</h2>
              <ul style={pageStyles.categoryList}>
                {categories.map(category => (
                  <li key={category.id} style={pageStyles.categoryItem}>
                    <button
                      onClick={() => setActiveCategory(category.id)}
                      style={{
                        ...pageStyles.categoryButton,
                        ...(activeCategory === category.id ? pageStyles.categoryButtonActive : {})
                      }}
                    >
                      <span style={pageStyles.categoryIcon}>{category.icon}</span>
                      <span>{category.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lista de preguntas */}
          <div style={{flex: '1 1 600px'}}>
            <div style={pageStyles.faqCard}>
              <div style={pageStyles.faqHeader}>
                <FaQuestionCircle style={pageStyles.faqHeaderIcon} />
                <h2 style={pageStyles.faqTitle}>
                  {categories.find(c => c.id === activeCategory)?.name || 'Todas las preguntas'}
                </h2>
              </div>

              <div style={pageStyles.faqList}>
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map(faq => (
                    <div key={faq.id} style={pageStyles.questionItem}>
                      <button
                        onClick={() => toggleExpand(faq.id)}
                        style={pageStyles.questionButton}
                      >
                        <span>{faq.question}</span>
                        {expandedItems[faq.id] ? (
                          <FaChevronUp style={{color: colors.primaryLight}} />
                        ) : (
                          <FaChevronDown style={{color: colors.primaryLight}} />
                        )}
                      </button>
                      {expandedItems[faq.id] && (
                        <div style={pageStyles.answerContainer}>
                          <p style={pageStyles.answerText}>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div style={pageStyles.noResults}>
                    <p>No se encontraron preguntas que coincidan con tu búsqueda.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA - Llamada a la acción */}
      <div style={pageStyles.cta}>
        <div style={pageStyles.ctaContainer}>
          <h2 style={pageStyles.ctaTitle}>¿No encuentras respuesta a tu pregunta?</h2>
          <p style={pageStyles.ctaText}>
            Nuestro equipo de atención al cliente está disponible para ayudarte con cualquier duda específica sobre persianas.
          </p>
          <button style={pageStyles.ctaButton}>
            Contactar con Atención al Cliente
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;