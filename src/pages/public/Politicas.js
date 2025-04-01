import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Accordion,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";
import { colors, textStyles, typography } from "../../styles/styles";
import { API_URL } from "../../config";

const Politicas = () => {
  const [politicas, setPoliticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPoliticas = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/politicas`);

        if (!response.ok) {
          throw new Error(
            `Error al obtener las políticas: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        // Tomamos el primer elemento del array, ya que la API devuelve un array
        setPoliticas(data.length > 0 ? data[0] : null);
        setError(null);
      } catch (error) {
        console.error("Error al obtener las políticas:", error);
        setError(
          "No se pudieron cargar las políticas. Por favor, intenta más tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPoliticas();
  }, []);

  const styles = {
    pageContainer: {
      backgroundColor: colors.white,
      color: colors.primaryDark,
      paddingTop: "80px",
      paddingBottom: "80px",
      minHeight: "100vh",
    },
    headerSection: {
      marginBottom: "60px",
      position: "relative",
      paddingBottom: "20px",
    },
    title: {
      ...textStyles.title,
      textAlign: "center",
      marginBottom: "30px",
      position: "relative",
      display: "inline-block",
    },
    titleLine: {
      content: '""',
      position: "absolute",
      bottom: "-10px",
      left: "50%",
      width: "80px",
      height: "3px",
      backgroundColor: colors.primaryLight,
      transform: "translateX(-50%)",
    },
    subtitle: {
      ...textStyles.subtitle,
      textAlign: "left",
      marginBottom: "25px",
      padding: "0 0 10px 0",
      borderBottom: `2px solid ${colors.primaryLight}`,
      display: "inline-block",
    },
    sectionIntro: {
      ...textStyles.paragraph,
      fontSize: "18px",
      lineHeight: "1.8",
      marginBottom: "40px",
      maxWidth: "85%",
      margin: "0 auto 40px auto",
      textAlign: "center",
    },
    sectionDivider: {
      margin: "50px 0",
      height: "2px",
      background: `linear-gradient(to right, ${colors.white}, ${colors.primaryLight}, ${colors.white})`,
      border: "none",
    },
    policyCard: {
      borderRadius: "8px",
      boxShadow: "0 6px 18px rgba(0, 0, 0, 0.07)",
      border: "none",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      overflow: "hidden",
      marginBottom: "25px",
      borderLeft: `4px solid ${colors.primaryMedium}`,
      backgroundColor: colors.white,
    },
    cardHeader: {
      backgroundColor: colors.white,
      borderBottom: `1px solid ${colors.primaryLight}`,
      padding: "20px 25px 15px",
    },
    cardTitle: {
      fontSize: "20px",
      fontFamily: typography.fontPrimary,
      fontWeight: "600",
      color: colors.primaryDark,
      margin: 0,
      position: "relative",
      paddingLeft: "15px",
    },
    cardTitleIcon: {
      position: "absolute",
      left: "-5px",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "18px",
      color: colors.primaryLight,
    },
    cardBody: {
      padding: "25px",
    },
    paragraph: {
      ...textStyles.paragraph,
      fontSize: "16px",
      lineHeight: "1.75",
      color: colors.primaryMedium,
      marginBottom: "10px",
    },
    highlightText: {
      backgroundColor: `${colors.primaryLight}25`, // 25% opacity
      padding: "2px 5px",
      borderRadius: "3px",
      fontWeight: "600",
    },
    accordionCustom: {
      marginBottom: "20px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
      borderRadius: "8px",
      overflow: "hidden",
    },
    accordionHeader: {
      backgroundColor: colors.white,
      padding: 0,
      border: "none",
    },
    accordionButton: {
      backgroundColor: colors.white,
      color: colors.primaryDark,
      fontFamily: typography.fontPrimary,
      fontWeight: "600",
      fontSize: "18px",
      padding: "20px 25px",
      position: "relative",
      display: "flex",
      alignItems: "center",
      borderBottom: `1px solid ${colors.primaryLight}25`,
      width: "100%",
      textAlign: "left",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: `${colors.primaryLight}10`,
      },
    },
    accordionBody: {
      padding: "25px",
      backgroundColor: colors.white,
    },
    loadingContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "300px",
      width: "100%",
      textAlign: "center",
    },
    errorContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "50vh",
      width: "100%",
      textAlign: "center",
      padding: "30px",
    },
  };

  // Función para aplicar resaltado al texto
  const highlightTextInContent = (text, highlights = []) => {
    if (!highlights || highlights.length === 0) return text;

    let result = text;
    highlights.forEach((highlight) => {
      if (text.includes(highlight)) {
        result = result.replace(
          highlight,
          `<span style="background-color: ${colors.primaryLight}25; padding: 2px 5px; border-radius: 3px; font-weight: 600;">${highlight}</span>`
        );
      }
    });

    return (
      <p
        style={styles.paragraph}
        dangerouslySetInnerHTML={{ __html: result }}
      />
    );
  };

  // Función para manejar el desplazamiento suave al cargar la página
  useEffect(() => {
    // Comprueba si hay un hash en la URL
    if (window.location.hash && politicas) {
      const id = window.location.hash.substring(1); // Elimina el # del hash
      const element = document.getElementById(id);

      if (element) {
        // Añade un pequeño retraso para permitir que la página se cargue completamente
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [politicas]); // Añadido politicas como dependencia para que se ejecute cuando los datos estén disponibles

  // Renderizar indicador de carga mientras se obtienen los datos
  if (loading) {
    return (
      <div style={styles.pageContainer}>
        <Container>
          <div style={styles.loadingContainer}>
            <Spinner
              animation="border"
              role="status"
              variant="primary"
              style={{ marginBottom: "20px" }}
            >
              <span className="visually-hidden">Cargando políticas...</span>
            </Spinner>
            <p style={{ fontSize: "18px", color: colors.primaryMedium }}>
              Cargando políticas de JADA Company...
            </p>
          </div>
        </Container>
      </div>
    );
  }

  // Si hay un error, mostrar mensaje de error sin datos de respaldo
  if (error || !politicas) {
    return (
      <div style={styles.pageContainer}>
        <Container>
          <div style={styles.errorContainer}>
            <Alert
              variant="danger"
              style={{ maxWidth: "600px", width: "100%" }}
            >
              <Alert.Heading>Error al cargar las políticas</Alert.Heading>
              <p>
                {error ||
                  "No se pudieron obtener las políticas. Por favor, intenta más tarde."}
              </p>
              <hr />
              <div className="d-flex justify-content-between">
                <Button
                  variant="outline-danger"
                  onClick={() => window.location.reload()}
                >
                  {" "}
                  Intentar nuevamente{" "}
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={() => window.history.back()}
                >
                  {" "}
                  Volver atrás
                </Button>
              </div>
            </Alert>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <Container>
        {/* Header Section */}
        <Row style={styles.headerSection}>
          <Col xs={12} className="text-center">
            <h1 style={styles.title}>
              {politicas?.pageTitle || "Políticas de JADA Company"}
              <div style={styles.titleLine}></div>
            </h1>
            <p style={styles.sectionIntro}>
              {politicas?.pageIntro ||
                "Conozca nuestras políticas y lineamientos"}
            </p>
          </Col>
        </Row>

        {/* Client Policies Section */}
        {politicas?.clientPolicies && (
          <Row className="mb-5" id="cliente">
            <Col xs={12}>
              <h2 style={styles.subtitle}>{politicas.clientPolicies.title}</h2>
              <p style={{ ...styles.paragraph, marginBottom: "30px" }}>
                {politicas.clientPolicies.intro}
              </p>

              <Accordion defaultActiveKey="0" style={styles.accordionCustom}>
                {politicas.clientPolicies.items.map((policy, index) => (
                  <Accordion.Item eventKey={String(index)} key={policy.id}>
                    <Accordion.Header style={styles.accordionHeader}>
                      <span>
                        {policy.icon} {policy.title}
                      </span>
                    </Accordion.Header>
                    <Accordion.Body style={styles.accordionBody}>
                      {policy.content.map((paragraph, i) => (
                        <div key={i}>
                          {policy.highlights && policy.highlights.length > 0
                            ? highlightTextInContent(paragraph, policy.highlights)
                            : <p style={styles.paragraph}>{paragraph}</p>
                          }
                        </div>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Col>
          </Row>
        )}

        <hr style={styles.sectionDivider} />

        {/* Company Policies Section */}
        {politicas?.companyPolicies && (
          <Row className="mb-5" id="empresa">
            <Col xs={12}>
              <h2 style={styles.subtitle}>{politicas.companyPolicies.title}</h2>
              <p style={{ ...styles.paragraph, marginBottom: "30px" }}>
                {politicas.companyPolicies.intro}
              </p>

              <Row>
                {politicas.companyPolicies.items.map((policy) => (
                  <Col md={6} className="mb-4" key={policy.id}>
                    <Card style={styles.policyCard}>
                      <Card.Header style={styles.cardHeader}>
                        <h3 style={styles.cardTitle}>
                          <span style={styles.cardTitleIcon}>
                            {policy.icon}
                          </span>
                          {policy.title}
                        </h3>
                      </Card.Header>
                      <Card.Body style={styles.cardBody}>
                        {policy.content.map((paragraph, i) => (
                          <div key={i}>
                            {policy.highlights && policy.highlights.length > 0
                              ? highlightTextInContent(paragraph, policy.highlights)
                              : <p style={styles.paragraph}>{paragraph}</p>
                            }
                          </div>
                        ))}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        )}

        <hr style={styles.sectionDivider} />

        {/* Privacy Policies Section */}
        {politicas?.privacyPolicies && (
          <Row id="privacidad">
            <Col xs={12}>
              <h2 style={styles.subtitle}>{politicas.privacyPolicies.title}</h2>
              <p style={{ ...styles.paragraph, marginBottom: "30px" }}>
                {politicas.privacyPolicies.intro}
              </p>

              <Row>
                {politicas.privacyPolicies.items.map((policy) => (
                  <Col md={6} lg={4} className="mb-4" key={policy.id}>
                    <Card style={styles.policyCard}>
                      <Card.Header style={styles.cardHeader}>
                        <h3 style={styles.cardTitle}>
                          <span style={styles.cardTitleIcon}>
                            {policy.icon}
                          </span>
                          {policy.title}
                        </h3>
                      </Card.Header>
                      <Card.Body style={styles.cardBody}>
                        {policy.content.map((paragraph, i) => (
                          <div key={i}>
                            {policy.highlights && policy.highlights.length > 0
                              ? highlightTextInContent(paragraph, policy.highlights)
                              : <p style={styles.paragraph}>{paragraph}</p>
                            }
                          </div>
                        ))}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Politicas;