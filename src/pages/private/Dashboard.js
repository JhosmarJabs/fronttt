import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Card, Button, Form, Alert, Badge } from 'react-bootstrap';
import { colors, typography, iotStyles } from '../../styles/styles';
// Importamos mqtt
import mqtt from 'mqtt';
import io from 'socket.io-client';

// Colores llamativos para el componente de persianas
const persianasColors = {
  gradient1: "#8E2DE2", // Púrpura vibrante
  gradient2: "#4A00E0", // Azul eléctrico
  accentYellow: "#FFDD00", // Amarillo brillante
  accentCoral: "#FF6B6B", // Coral
  accentTeal: "#4ECDC4", // Turquesa
  primaryBackground: "#F7F9FC", // Fondo claro
};

// Configuración MQTT - Unificamos las configuraciones como en IoTTest
const API_URL = "http://localhost:5000"; // URL de tu backend
const MQTT_BROKER = "ws://127.0.0.1:9001"; // Puerto WebSocket de Mosquitto 
const MQTT_TOPIC = "sensores/led";

const Dashboard = () => {
  // MQTT Client state
  const [ledState, setLedState] = useState(false); // false = apagado, true = encendido
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const [mqttMessages, setMqttMessages] = useState({});
  const [mensajeEstado, setMensajeEstado] = useState("");

  // Estados para el control de persianas
  const [persianasPosition, setPersianasPosition] = useState(50); // 0: cerrado, 100: abierto
  const [temperature, setTemperature] = useState(24.5);
  const [humidity, setHumidity] = useState(65);
  const [luminosity, setLuminosity] = useState(80); // 0: oscuridad, 100: máxima luz
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState('manual'); // 'manual', 'auto', 'schedule'
  const [timeSchedule, setTimeSchedule] = useState({ open: '08:00', close: '20:00' });
  const [daysActive, setDaysActive] = useState(['lunes', 'martes', 'miércoles', 'jueves', 'viernes']);

  // MQTT Configuration
  const mqttConfig = {
    // Cambia estos valores según tu configuración
    host: '127.0.0.1',
    port: 9001, // Usamos el puerto WebSocket como en IoTTest
    protocol: 'ws', // Cambiado a WebSocket como IoTTest
    clientId: `dashboard_client_${Math.random().toString(16).substring(2, 8)}`,
    // Temas MQTT
    topics: {
      ledState: 'sensores/led',
      ledCommand: 'sensores/led',
      temperature: 'sensores/temperature',
      humidity: 'sensores/humidity',
      luminosity: 'sensores/luminosity', // Cambiar de 'home/luminosity'
      persianasPosition: 'sensores/motor/position',
      persianasCommand: 'sensores/motor/set',
      persianasMode: 'sensores/motor/mode',
      weatherData: 'sensores/weather'
    }
  };

  // Función para controlar el LED siguiendo la lógica de IoTTest
  const controlarLed = async (accion) => {
    try {
      // Intentar primero publicar directamente vía MQTT si está conectado
      if (client && isConnected) {
        client.publish(MQTT_TOPIC, accion === "encender" ? "1" : "0", { qos: 1 }, (error) => {
          if (error) {
            console.error("Error enviando comando MQTT:", error);
            setMensajeEstado("Error al enviar comando MQTT: " + error.message);
          } else {
            console.log(`Comando LED enviado vía MQTT: ${accion === "encender" ? "1" : "0"}`);
          }
        });
        // No necesitamos actualizar el estado, ya que recibiremos la actualización vía MQTT
      } else {
        // Fallback al método API REST como en IoTTest
        await fetch(`${API_URL}/control`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: accion })
        });
        console.log(`Comando LED enviado vía API REST: ${accion}`);
        
        // Obtener estado después de enviar el comando en caso de que MQTT no funcione
        obtenerEstado();
      }
    } catch (err) {
      console.error("Error enviando comando:", err);
      setMensajeEstado("Error al controlar el LED: " + err.message);
      // Intentar obtener estado vía API si falla MQTT
      obtenerEstado();
    }
  };

  // Nueva función para obtener el estado del LED vía API REST como en IoTTest
  const obtenerEstado = async () => {
    try {
      const res = await fetch(`${API_URL}/estado`);
      const data = await res.json();
      setLedState(data.state === "1");
      console.log(`Estado LED obtenido vía API: ${data.state === "1" ? "ENCENDIDO" : "APAGADO"}`);
    } catch (err) {
      console.error("Error obteniendo estado:", err);
      setMensajeEstado("Error al obtener estado vía API: " + err.message);
    }
  };

  // Conectar al broker MQTT con la misma lógica que IoTTest
  useEffect(() => {
    // Configuración mejorada para depuración como en IoTTest
    const mqttOptions = {
      keepalive: 30,
      connectTimeout: 5000,
      reconnectPeriod: 5000,
      clientId: mqttConfig.clientId,
    };
    
    console.log('Intentando conectar a MQTT broker:', MQTT_BROKER);
    const mqttClient = mqtt.connect(MQTT_BROKER, mqttOptions);
    
    mqttClient.on('connect', () => {
      console.log('Conectado al broker MQTT');
      setIsConnected(true);
      setConnectionError(null);
      setMensajeEstado("Conectado a MQTT y suscrito a tópicos");
      
      // Suscribirse a los temas relevantes
      Object.values(mqttConfig.topics).forEach(topic => {
        mqttClient.subscribe(topic, (err) => {
          if (!err) {
            console.log(`Suscrito a ${topic}`);
          } else {
            console.error(`Error al suscribirse a ${topic}:`, err);
            setMensajeEstado("Error al suscribirse: " + err.message);
          }
        });
      });
    });
    
    mqttClient.on('message', (topic, message) => {
      const payload = message.toString();
      console.log(`Mensaje recibido en ${topic}: ${payload}`);
      
      try {
        // Actualizar el estado según el tema recibido
        if (topic === mqttConfig.topics.temperature) {
          setTemperature(parseFloat(payload));
        } else if (topic === mqttConfig.topics.humidity) {
          setHumidity(parseFloat(payload));
        } else if (topic === mqttConfig.topics.luminosity) {
          setLuminosity(parseFloat(payload));
        } else if (topic === mqttConfig.topics.persianasPosition) {
          setPersianasPosition(parseInt(payload));
        } else if (topic === mqttConfig.topics.weatherData) {
          setWeatherData(JSON.parse(payload));
          setLoading(false);
        } else if (topic === mqttConfig.topics.persianasCommand) {
          const angle = parseInt(payload);
          setPersianasPosition(angle); // sincroniza el valor
        } else if (topic === mqttConfig.topics.ledState) {
          // Actualizamos la lógica como en IoTTest
          const estado = payload.toString();
          setLedState(estado === "1");
          console.log(`Estado del LED actualizado vía MQTT: ${estado === "1" ? "ENCENDIDO" : "APAGADO"}`);
        }
        
        // Guardar todos los mensajes MQTT para depuración
        setMqttMessages(prev => ({
          ...prev,
          [topic]: payload
        }));
      } catch (error) {
        console.error('Error al procesar mensaje MQTT:', error);
      }
    });
    
    mqttClient.on('error', (err) => {
      console.error('Error MQTT:', err);
      setConnectionError(`Error de conexión MQTT: ${err.message}`);
      setIsConnected(false);
      setMensajeEstado("Error de conexión MQTT: " + err.message);
    });
    
    mqttClient.on('offline', () => {
      console.log('Cliente MQTT desconectado');
      setIsConnected(false);
      setMensajeEstado("Desconectado del broker MQTT");
    });
    
    // Guardar cliente para uso posterior
    setClient(mqttClient);
    
    // Limpiar conexión al desmontar
    return () => {
      if (mqttClient) {
        mqttClient.end();
        console.log('Conexión MQTT terminada');
      }
    };
  }, []); // Se ejecuta solo una vez al montar el componente

  // Obtener estado inicial vía REST para tener un valor mientras se conecta MQTT
  useEffect(() => {
    obtenerEstado();
    // No necesitamos el intervalo ya que MQTT nos enviará actualizaciones en tiempo real
  }, []);

  // Función para encender el LED (estilo IoTTest)
  const encenderLed = () => {
    controlarLed("encender");
  };

  // Función para apagar el LED (estilo IoTTest)
  const apagarLed = () => {
    controlarLed("apagar");
  };

  // Publicar comando para mover las persianas (corregido)
  const publishPersianaCommand = useCallback((position) => {
    if (client && isConnected) {
      const angle = Math.max(0, Math.min(position, 100)); // Clamp para seguridad
      client.publish(mqttConfig.topics.persianasCommand, angle.toString(), { qos: 1 });
      console.log(`Ángulo de motor enviado: ${angle}`);
    }
  }, [client, isConnected, mqttConfig.topics.persianasCommand]);
  

  // Publicar modo de operación (mantenemos la función original)
  const publishModeCommand = useCallback((newMode) => {
    if (client && isConnected) {
      client.publish(mqttConfig.topics.persianasMode, newMode, { qos: 1 }, (error) => {
        if (error) {
          console.error('Error al publicar modo:', error);
        } else {
          console.log(`Modo enviado: ${newMode}`);
        }
      });
    } else {
      console.warn('No se puede enviar modo: no hay conexión MQTT');
      // Actualizamos localmente para ver el efecto en la UI (simulación)
      setMode(newMode);
    }
  }, [client, isConnected, mqttConfig.topics.persianasMode]);

  // Enviar configuración de programación (mantenemos la función original)
  const publishScheduleConfig = useCallback(() => {
    if (client && isConnected) {
      const scheduleConfig = {
        timeSchedule,
        daysActive
      };
      
      client.publish(
        `${mqttConfig.topics.persianasMode}/schedule`, 
        JSON.stringify(scheduleConfig), 
        { qos: 1 }, 
        (error) => {
          if (error) {
            console.error('Error al publicar configuración de horario:', error);
          } else {
            console.log('Configuración de horario enviada');
          }
        }
      );
    } else {
      console.warn('No se puede enviar configuración: no hay conexión MQTT');
    }
  }, [client, isConnected, mqttConfig.topics.persianasMode, timeSchedule, daysActive]);

  // Simulación de sensores (solo cuando no hay conexión MQTT)
  useEffect(() => {
    if (!isConnected) {
      const interval = setInterval(() => {
        // Simular fluctuación de temperatura
        setTemperature(prev => {
          const fluctuation = (Math.random() - 0.5) * 0.2;
          return parseFloat((prev + fluctuation).toFixed(1));
        });
        
        // Simular fluctuación de humedad
        setHumidity(prev => {
          const fluctuation = (Math.random() - 0.5) * 1.5;
          return parseFloat((prev + fluctuation).toFixed(1));
        });
        
        // Simular fluctuación de luminosidad según la hora del día
        const hour = new Date().getHours();
        let baseLuminosity;
        
        // Más luz durante el día (8am - 8pm)
        if (hour >= 8 && hour < 20) {
          baseLuminosity = 70 + Math.random() * 30; // 70-100% durante el día
        } else {
          baseLuminosity = Math.random() * 20; // 0-20% durante la noche
        }
        
        setLuminosity(parseFloat(baseLuminosity.toFixed(1)));
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isConnected]);

  // Simulación de API del clima (solo cuando no hay conexión MQTT)
  useEffect(() => {
    if (!isConnected) {
      const fetchWeatherData = async () => {
        setLoading(true);
        try {
          
          // Simulamos respuesta
          setTimeout(() => {
            setWeatherData({
              condition: 'partly_cloudy', // 'sunny', 'cloudy', 'rainy', 'windy'
              temperature: 23.5,
              humidity: 65,
              windSpeed: 10.4,
              forecast: [
                { day: 'Hoy', temp: 23, condition: 'partly_cloudy' },
                { day: 'Mañana', temp: 25, condition: 'sunny' },
                { day: 'Miércoles', temp: 22, condition: 'rainy' }
              ]
            });
            setLoading(false);
          }, 1500);
        } catch (error) {
          console.error("Error al obtener datos del clima:", error);
          setLoading(false);
        }
      };
  
      fetchWeatherData();
    }
  }, [isConnected]);

  // Función para manejar el cambio de posición de las persianas (CORREGIDA)
  const handleMovePersianas = (newPosition) => {
    // Asegurar que el valor es un número entre 0 y 100
    const validPosition = Math.max(0, Math.min(newPosition, 100));
    
    // Actualizar el estado local primero para una respuesta UI instantánea
    setPersianasPosition(validPosition);
    
    // Enviar el comando MQTT (solo si está conectado)
    publishPersianaCommand(validPosition);
  };
  

  // Función para cambiar el modo de operación
  const handleModeChange = (newMode) => {
    publishModeCommand(newMode);
    setMode(newMode); // Actualizar UI inmediatamente
  };

  // Función para manejar cambios en el horario
  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setTimeSchedule({
      ...timeSchedule,
      [name]: value
    });
  };

  // Función para manejar cambios en los días activos
  const handleDayToggle = (day) => {
    if (daysActive.includes(day)) {
      setDaysActive(daysActive.filter(d => d !== day));
    } else {
      setDaysActive([...daysActive, day]);
    }
  };

  // Función para guardar la configuración
  const saveSchedule = () => {
    console.log('Configuración de persianas guardada:', { timeSchedule, daysActive });
    publishScheduleConfig();
  };

  // Renderizar icono del clima según la condición usando clases de Bootstrap
  const renderWeatherIcon = (condition) => {
    switch(condition) {
      case 'sunny':
        return <i className="bi bi-sun-fill" style={{ fontSize: '32px', color: persianasColors.accentYellow }}></i>;
      case 'cloudy':
        return <i className="bi bi-cloud-fill" style={{ fontSize: '32px', color: colors.primaryLight }}></i>;
      case 'rainy':
        return <i className="bi bi-cloud-rain-fill" style={{ fontSize: '32px', color: colors.primaryMedium }}></i>;
      case 'windy':
        return <i className="bi bi-wind" style={{ fontSize: '32px', color: colors.primaryLight }}></i>;
      case 'partly_cloudy':
      default:
        return (
          <div className="d-flex align-items-center">
            <i className="bi bi-sun-fill" style={{ fontSize: '28px', color: persianasColors.accentYellow }}></i>
            <i className="bi bi-cloud-fill" style={{ fontSize: '28px', color: colors.primaryLight, marginLeft: '-12px' }}></i>
          </div>
        );
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-1 text-2xl font-bold" style={{ color: colors.primaryDark, fontFamily: typography.fontPrimary }}>
        Control de Persianas Inteligentes
      </h2>
      <p className="mb-4" style={{ color: colors.primaryLight, fontFamily: typography.fontSecondary }}>
        Administra tus persianas de forma automática basándote en la temperatura y condiciones del clima.
      </p>
      
      {/* Estado de conexión MQTT - Mejorado con el estilo de IoTTest */}
      <div style={{ 
        marginBottom: "20px", 
        padding: "10px", 
        backgroundColor: isConnected ? "#e6f7e6" : "#f7e6e6",
        borderRadius: "5px",
        border: `1px solid ${isConnected ? "#c3e6c3" : "#e6c3c3"}`
      }}>
        <p>
          <strong>Estado MQTT:</strong> {isConnected ? 
              "✅ Conectado en tiempo real" : 
              "❌ Desconectado (usando API REST como fallback)"}
        </p>
        {mensajeEstado && <p><small>{mensajeEstado}</small></p>}
      </div>
      
      {loading ? (
        <div className="text-center my-5">
          <p style={{ color: colors.primaryLight }}>Cargando datos del clima...</p>
        </div>
      ) : (
        <>
          <Row className="mb-4">
            {/* Panel de visualización y control de persianas */}
            <Col md={7} className="mb-4">
              <Card className="shadow-sm h-100" 
                style={{ 
                  borderRadius: '15px', 
                  border: 'none',
                  background: `linear-gradient(135deg, ${persianasColors.gradient1}, ${persianasColors.gradient2})`,
                  overflow: 'hidden'
                }}>
                <Card.Header 
                  className="border-0 d-flex justify-content-between align-items-center"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    padding: '15px 20px'
                  }}
                >
                  <h3 style={{ 
                    fontFamily: typography.fontPrimary, 
                    color: colors.white,
                    margin: 0,
                    fontSize: '1.3rem',
                    fontWeight: 'bold'
                  }}>
                    Control de Persianas
                  </h3>
                  <i className="bi bi-list" style={{ fontSize: '24px', color: colors.white }}></i>
                </Card.Header>
                <Card.Body className="p-4">
                  <Row>
                    <Col md={8}>
                      {/* Visualización de persianas */}
                      <div 
                        style={{ 
                          height: '250px', 
                          position: 'relative',
                          backgroundColor: colors.white,
                          border: `1px solid ${colors.accent}`,
                          borderRadius: '10px',
                          marginBottom: '20px',
                          overflow: 'hidden'
                        }}
                        className="d-flex align-items-center justify-content-center"
                      >
                        {/* Representación visual de la ventana */}
                        <div 
                          style={{ 
                            height: '100%', 
                            width: '100%', 
                            backgroundColor: '#C7E6FF',
                            position: 'relative',
                            borderRadius: '3px'
                          }}
                        >
                          {/* Elementos decorativos: sol y nubes */}
                          <div 
                            style={{
                              position: 'absolute',
                              top: '30px',
                              right: '30px'
                            }}
                          >
                            <i className="bi bi-sun-fill" style={{ fontSize: '40px', color: persianasColors.accentYellow }}></i>
                          </div>
                          
                          <div 
                            style={{
                              position: 'absolute',
                              top: '20px',
                              left: '20px'
                            }}
                          >
                            <i className="bi bi-cloud-fill" style={{ fontSize: '30px', color: "white" }}></i>
                          </div>
                          <div 
                            style={{
                              position: 'absolute',
                              top: '50px',
                              left: '70px'
                            }}
                          >
                            <i className="bi bi-cloud-fill" style={{ fontSize: '25px', color: "white" }}></i>
                          </div>
                          
                          {/* Persianas animadas */}
                          <div style={{ height: '100%', position: 'relative' }}>
                            {Array.from({ length: 8 }).map((_, i) => (
                              <div 
                                key={i}
                                style={{
                                  position: 'absolute',
                                  top: `${(i * 12.5)}%`,
                                  left: 0,
                                  right: 0,
                                  height: `${100 - persianasPosition <= i * 12.5 ? 0 : '12.5%'}`,
                                  backgroundColor: colors.primaryLight,
                                  borderBottom: `1px solid ${colors.primaryMedium}`,
                                  transition: 'height 0.5s ease'
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Control deslizante y botones - CORREGIDO */}
                      <div className="mb-3 d-flex align-items-center">
                        <i className="bi bi-arrow-down" style={{ fontSize: '24px', color: colors.white }}></i>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          step="1"
                          value={persianasPosition}
                          onChange={(e) => handleMovePersianas(parseInt(e.target.value))}
                          className="form-range mx-2 flex-grow-1"
                          style={{ height: '30px' }}
                        />
                        <i className="bi bi-arrow-up" style={{ fontSize: '24px', color: colors.white }}></i>
                      </div>

                      {/* Botones de control rápido */}
                      <div className="d-flex justify-content-between mt-2">
                        <Button 
                          onClick={() => handleMovePersianas(0)} 
                          style={{ 
                            backgroundColor: colors.white,
                            color: colors.primaryDark,
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            padding: '10px 15px'
                          }}
                        >
                          Cerrar
                        </Button>
                        <Button 
                          onClick={() => handleMovePersianas(50)} 
                          style={{ 
                            backgroundColor: persianasColors.accentTeal,
                            border: 'none',
                            borderRadius: '8px',
                            padding: '10px 15px'
                          }}
                        >
                          Media Altura
                        </Button>
                        <Button 
                          onClick={() => handleMovePersianas(100)} 
                          style={{ 
                            backgroundColor: persianasColors.accentCoral,
                            border: 'none',
                            borderRadius: '8px',
                            padding: '10px 15px'
                          }}
                        >
                          Abrir
                        </Button>
                      </div>
                    </Col>
                    <Col md={4}>
                      {/* Indicadores de temperatura y luminosidad */}
                      <Card className="mb-3 border-0 shadow-sm" style={{ borderRadius: '10px' }}>
                        <Card.Body className="p-3 d-flex flex-column align-items-center">
                          <i 
                            className="bi bi-thermometer-half" 
                            style={{ 
                              fontSize: '36px', 
                              color: temperature > 25 ? persianasColors.accentCoral : persianasColors.accentTeal 
                            }}
                          ></i>
                          <h4 style={{ 
                            fontFamily: typography.fontPrimary,
                            color: colors.primaryDark,
                            margin: '10px 0',
                            fontSize: '1.2rem',
                            textAlign: 'center'
                          }}>
                            Temperatura<br/>Interior
                          </h4>
                          <div style={{
                            fontFamily: typography.fontPrimary,
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            color: temperature > 25 ? persianasColors.accentCoral : persianasColors.accentTeal
                          }}>
                            {temperature}°C
                          </div>
                        </Card.Body>
                      </Card>
                      
                      {/* Sensor de luminosidad */}
                      <Card className="mb-3 border-0 shadow-sm" style={{ borderRadius: '10px' }}>
                        <Card.Body className="p-3 d-flex flex-column align-items-center">
                          <i 
                            className="bi bi-brightness-high" 
                            style={{ 
                              fontSize: '36px', 
                              color: luminosity > 50 ? persianasColors.accentYellow : colors.primaryMedium 
                            }}
                          ></i>
                          <h4 style={{ 
                            fontFamily: typography.fontPrimary,
                            color: colors.primaryDark,
                            margin: '10px 0',
                            fontSize: '1.2rem',
                            textAlign: 'center'
                          }}>
                            Luminosidad
                          </h4>
                          <div style={{
                            fontFamily: typography.fontPrimary,
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            color: luminosity > 50 ? persianasColors.accentYellow : colors.primaryMedium
                          }}>
                            {luminosity}%
                          </div>
                          <div className="w-100 mt-2" style={{ backgroundColor: '#e9ecef', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                            <div 
                              style={{ 
                                width: `${luminosity}%`, 
                                backgroundColor: luminosity > 50 ? persianasColors.accentYellow : colors.primaryMedium,
                                height: '100%',
                                transition: 'width 0.5s ease'
                              }}
                            />
                          </div>
                        </Card.Body>
                      </Card>

                      {/* NUEVO: Sensor de humedad */}
                      <Card className="mb-3 border-0 shadow-sm" style={{ borderRadius: '10px' }}>
                        <Card.Body className="p-3 d-flex flex-column align-items-center">
                          <i 
                            className="bi bi-droplet-fill" 
                            style={{ 
                              fontSize: '36px', 
                              color: humidity > 70 ? persianasColors.accentCoral : persianasColors.gradient2 
                            }}
                          ></i>
                          <h4 style={{ 
                            fontFamily: typography.fontPrimary,
                            color: colors.primaryDark,
                            margin: '10px 0',
                            fontSize: '1.2rem',
                            textAlign: 'center'
                          }}>
                            Humedad
                          </h4>
                          <div style={{
                            fontFamily: typography.fontPrimary,
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            color: humidity > 70 ? persianasColors.accentCoral : persianasColors.gradient2
                          }}>
                            {humidity}%
                          </div>
                          <div className="w-100 mt-2" style={{ backgroundColor: '#e9ecef', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                            <div 
                              style={{ 
                                width: `${humidity}%`, 
                                backgroundColor: humidity > 70 ? persianasColors.accentCoral : persianasColors.gradient2,
                                height: '100%',
                                transition: 'width 0.5s ease'
                              }}
                            />
                          </div>
                        </Card.Body>
                      </Card>

                      {/* Información del clima exterior (si está disponible) */}
                      {weatherData && (
                        <Card className="border-0 shadow-sm" style={{ borderRadius: '10px' }}>
                          <Card.Body className="p-3 d-flex flex-column align-items-center">
                            {renderWeatherIcon(weatherData.condition)}
                            <h4 style={{ 
                              fontFamily: typography.fontPrimary,
                              color: colors.primaryDark,
                              margin: '10px 0',
                              fontSize: '1.2rem',
                              textAlign: 'center'
                            }}>
                              Temperatura<br/>Exterior
                            </h4>
                            <div style={{
                              fontFamily: typography.fontPrimary,
                              fontSize: '2rem',
                              fontWeight: 'bold',
                              color: colors.primaryMedium
                            }}>
                              {weatherData.temperature}°C
                            </div>
                          </Card.Body>
                        </Card>
                      )}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            
            {/* Panel lateral con datos del clima y configuración */}
            <Col md={5} className="mb-4">
              <Row>
                {/* Información del clima */}
                {weatherData && (
                  <Col md={12} className="mb-4">
                    <Card className="shadow-sm" style={{ borderRadius: '10px', border: 'none' }}>
                      <Card.Body className="p-4">
                        <h4 style={{ 
                          fontFamily: typography.fontPrimary,
                          color: colors.primaryDark,
                          marginBottom: '15px',
                          fontSize: '1.2rem'
                        }}>
                          Clima Exterior
                        </h4>
                        
                        <div className="d-flex justify-content-between mb-3">
                          {weatherData.forecast.map((day, index) => (
                            <div 
                              key={index}
                              style={{ 
                                textAlign: 'center',
                                backgroundColor: persianasColors.primaryBackground,
                                borderRadius: '8px',
                                padding: '10px',
                                width: '32%'
                              }}
                            >
                              <small style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: colors.primaryMedium }}>
                                {day.day}
                              </small>
                              <div style={{ margin: '5px 0' }}>{renderWeatherIcon(day.condition)}</div>
                              <small style={{ fontWeight: 'bold', color: colors.primaryDark }}>{day.temp}°C</small>
                            </div>
                          ))}
                        </div>
                        
                        <div style={{ 
                          backgroundColor: 'rgba(65, 90, 119, 0.1)',
                          borderRadius: '8px',
                          padding: '10px',
                          fontSize: '0.9rem'
                        }}>
                          <div className="d-flex justify-content-between mb-2">
                            <span style={{ color: colors.primaryMedium }}>Humedad:</span>
                            <span style={{ color: colors.primaryDark, fontWeight: 'bold' }}>{humidity}%</span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span style={{ color: colors.primaryMedium }}>Velocidad del viento:</span>
                            <span style={{ color: colors.primaryDark, fontWeight: 'bold' }}>{weatherData.windSpeed} km/h</span>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                )}
                
                {/* Configuración de modos */}
                <Col md={12}>
                  <Card className="shadow-sm" style={{ borderRadius: '10px', border: 'none' }}>
                    <Card.Body className="p-4">
                      <h4 style={{ 
                        fontFamily: typography.fontPrimary,
                        color: colors.primaryDark,
                        marginBottom: '15px',
                        fontSize: '1.2rem'
                      }}>
                        Modo de Operación
                      </h4>
                      
                      <div className="d-flex flex-wrap mb-3">
                        <Button 
                          onClick={() => handleModeChange('manual')} 
                          style={{ 
                            backgroundColor: mode === 'manual' ? persianasColors.gradient1 : 'rgba(13, 27, 42, 0.1)',
                            color: mode === 'manual' ? colors.white : colors.primaryDark,
                            border: 'none',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            marginRight: '10px',
                            marginBottom: '10px'
                          }}
                        >
                          Manual
                        </Button>
                        <Button 
                          onClick={() => handleModeChange('auto')} 
                          style={{ 
                            backgroundColor: mode === 'auto' ? persianasColors.gradient1 : 'rgba(13, 27, 42, 0.1)',
                            color: mode === 'auto' ? colors.white : colors.primaryDark,
                            border: 'none',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            marginRight: '10px',
                            marginBottom: '10px'
                          }}
                        >
                          Automático
                        </Button>
                        <Button 
                          onClick={() => handleModeChange('schedule')} 
                          style={{ 
                            backgroundColor: mode === 'schedule' ? persianasColors.gradient1 : 'rgba(13, 27, 42, 0.1)',
                            color: mode === 'schedule' ? colors.white : colors.primaryDark,
                            border: 'none',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            marginBottom: '10px'
                          }}
                        >
                          Programado
                        </Button>
                      </div>
                      
                      {mode === 'schedule' && (
                        <div>
                          <Form.Group className="mb-3">
                            <Form.Label className="text-sm" style={{ color: colors.primaryMedium }}>Horario de apertura</Form.Label>
                            <Form.Control 
                              type="time" 
                              name="open" 
                              value={timeSchedule.open} 
                              onChange={handleScheduleChange}
                              className="border-gray-300 rounded"
                            />
                          </Form.Group>
                          
                          <Form.Group className="mb-3">
                            <Form.Label className="text-sm" style={{ color: colors.primaryMedium }}>Horario de cierre</Form.Label>
                            <Form.Control 
                              type="time" 
                              name="close" 
                              value={timeSchedule.close} 
                              onChange={handleScheduleChange}
                              className="border-gray-300 rounded"
                            />
                          </Form.Group>
                          
                          <Form.Group className="mb-3">
                            <Form.Label className="text-sm d-block mb-2" style={{ color: colors.primaryMedium }}>Días Activos</Form.Label>
                            <div className="d-flex flex-wrap">
                              {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map(day => (
                                <Form.Check 
                                  key={day}
                                  type="checkbox"
                                  id={`day-${day}`}
                                  label={day}
                                  checked={daysActive.includes(day.toLowerCase())}
                                  onChange={() => handleDayToggle(day.toLowerCase())}
                                  className="me-3 mb-2"
                                  inline
                                />
                              ))}
                            </div>
                            <div className="d-flex flex-wrap">
                              {['Sábado', 'Domingo'].map(day => (
                                <Form.Check 
                                  key={day}
                                  type="checkbox"
                                  id={`day-${day}`}
                                  label={day}
                                  checked={daysActive.includes(day.toLowerCase())}
                                  onChange={() => handleDayToggle(day.toLowerCase())}
                                  className="me-3 mb-2"
                                  inline
                                />
                              ))}
                            </div>
                          </Form.Group>
                          
                          <div className="text-end">
                            <Button 
                              onClick={saveSchedule}
                              style={{ 
                                background: `linear-gradient(to right, ${persianasColors.accentTeal}, ${persianasColors.gradient2})`,
                                border: 'none',
                                borderRadius: '8px'
                              }}
                            >
                              Guardar Programación
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {mode === 'auto' && (
                        <div style={{ 
                          backgroundColor: 'rgba(65, 90, 119, 0.1)',
                          borderRadius: '8px',
                          padding: '15px',
                          fontSize: '0.9rem'
                        }}>
                          <h5 style={{ 
                            fontFamily: typography.fontPrimary,
                            color: colors.primaryDark,
                            marginBottom: '10px',
                            fontSize: '1rem'
                          }}>
                            Reglas de automatización:
                          </h5>
                          <ul style={{ 
                            paddingLeft: '20px',
                            color: colors.primaryMedium
                          }}>
                            <li className="mb-2">Si la temperatura interior supera los 26°C, las persianas se cerrarán para mantener el fresco.</li>
                            <li className="mb-2">Si la temperatura es menor a 22°C y hay sol, las persianas se abrirán para calentar la habitación.</li>
                            <li className="mb-2">Si hay lluvia, las persianas se cerrarán automáticamente.</li>
                            <li>Si la luminosidad excede el 85%, las persianas se ajustarán para reducir el deslumbramiento.</li>
                          </ul>
                          <div className="mt-3" style={{ backgroundColor: persianasColors.accentYellow + '20', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                            <div className="d-flex align-items-center">
                              <i className="bi bi-sun-fill me-2" style={{ fontSize: '20px', color: persianasColors.accentYellow }}></i>
                              <span style={{ color: colors.primaryMedium }}>Configuración para días soleados</span>
                            </div>
                            <input 
                              type="range" 
                              min="0" 
                              max="100" 
                              step="5"
                              value="30"
                              className="form-range mt-2"
                              style={{ height: '25px' }}
                            />
                          </div>
                          
                          <div className="mt-3" style={{ backgroundColor: persianasColors.accentTeal + '20', padding: '10px', borderRadius: '5px' }}>
                            <div className="d-flex align-items-center">
                              <i className="bi bi-brightness-high me-2" style={{ fontSize: '20px', color: persianasColors.accentTeal }}></i>
                              <span style={{ color: colors.primaryMedium }}>Umbral de luminosidad</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mt-1 mb-1">
                              <small style={{ color: colors.primaryMedium }}>Menor</small>
                              <small style={{ color: colors.primaryMedium }}>Mayor</small>
                            </div>
                            <input 
                              type="range" 
                              min="50" 
                              max="95" 
                              step="5"
                              value="85"
                              className="form-range"
                              style={{ height: '25px' }}
                            />
                            <small style={{ color: colors.primaryMedium, display: 'block', textAlign: 'center', marginTop: '5px' }}>
                              Las persianas se ajustarán automáticamente cuando se supere este nivel
                            </small>
                          </div>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
          
          {/* Control de LED - Mejorado con el estilo de IoTTest */}
          <Card className="shadow-sm mb-4" style={{ borderRadius: '15px', border: 'none' }}>
            <Card.Body className="p-4">
              <h3 style={{ 
                color: colors.primaryDark, 
                fontFamily: typography.fontPrimary,
                marginBottom: '15px' 
              }}>
                💡 Control de LED (IoT)
              </h3>
              
              {/* Estado del LED */}
              <h4 style={{ marginBottom: '20px' }}>
                Estado del LED: <span style={{ 
                  color: ledState ? persianasColors.accentYellow : colors.primaryMedium,
                  fontWeight: "bold"
                }}>
                  {ledState ? "ENCENDIDO" : "APAGADO"}
                </span>
              </h4>
              
              {/* Botones de control al estilo IoTTest */}
              <div className="d-flex gap-3">
                <Button 
                  onClick={encenderLed} 
                  style={{ 
                    padding: "12px 20px", 
                    background: colors.primaryLight, 
                    color: colors.white,
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold"
                  }}
                >
                  Encender LED
                </Button>
                
                <Button 
                  onClick={apagarLed} 
                  style={{ 
                    padding: "12px 20px", 
                    background: colors.primaryMedium, 
                    color: colors.white,
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold"
                  }}
                >
                  Apagar LED
                </Button>
              </div>
            </Card.Body>
          </Card>
          
          {/* Panel de debug MQTT (opcional - útil durante el desarrollo) */}
          {isConnected && (
            <Card className="shadow-sm mb-4" style={{ borderRadius: '10px', border: 'none' }}>
              <Card.Header style={{ backgroundColor: colors.primaryDark, color: colors.white }}>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="m-0">Estado de Conexión MQTT</h5>
                  <Badge bg="success" pill>Conectado</Badge>
                </div>
              </Card.Header>
              <Card.Body className="p-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                <h6>Últimos mensajes recibidos:</h6>
                {Object.entries(mqttMessages).length === 0 ? (
                  <p className="text-muted">No hay mensajes recibidos aún.</p>
                ) : (
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Tema</th>
                        <th>Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(mqttMessages).map(([topic, message]) => (
                        <tr key={topic}>
                          <td><code>{topic}</code></td>
                          <td><code>{message}</code></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </Card.Body>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;