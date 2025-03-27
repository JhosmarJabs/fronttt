import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';
import { colors } from "../../../styles/styles"; // Importamos los estilos

const API_URL = "http://localhost:5000"; // URL de tu backend
const MQTT_BROKER = "ws://127.0.0.1:9001"; // Puerto WebSocket de Mosquitto 
// Alternativas:
// const MQTT_BROKER = "ws://localhost:9001";
// const MQTT_BROKER = "mqtt://localhost:9001"; // Intenta con mqtt:// si ws:// no funciona
const MQTT_TOPIC = "sensores/led";

const IoTTest = () => {
    const [estadoLed, setEstadoLed] = useState("Desconocido");
    const [mqttConnected, setMqttConnected] = useState(false);
    const [client, setClient] = useState(null);
    const [mensajeEstado, setMensajeEstado] = useState("");

    // Configurar conexión MQTT
    useEffect(() => {
        // Inicializar cliente MQTT con opciones adicionales para depuración
        const mqttOptions = {
            keepalive: 30,
            connectTimeout: 5000,
            reconnectPeriod: 5000,
            clientId: 'iottest_' + Math.random().toString(16).substr(2, 8),
        };
        
        console.log('Intentando conectar a MQTT broker:', MQTT_BROKER);
        const mqttClient = mqtt.connect(MQTT_BROKER, mqttOptions);
        
        mqttClient.on('connect', () => {
            console.log('Conectado al broker MQTT');
            setMqttConnected(true);
            
            // Suscribirse al tópico cuando se conecte
            mqttClient.subscribe(MQTT_TOPIC, (err) => {
                if (!err) {
                    console.log(`Suscrito a ${MQTT_TOPIC}`);
                    setMensajeEstado("Conectado a MQTT y suscrito a tópicos");
                } else {
                    console.error('Error en suscripción:', err);
                    setMensajeEstado("Error al suscribirse: " + err.message);
                }
            });
        });
        
        mqttClient.on('message', (topic, message) => {
            console.log(`Mensaje recibido en tópico ${topic}: ${message.toString()}`);
            
            if (topic === MQTT_TOPIC) {
                const estado = message.toString();
                setEstadoLed(estado === "1" ? "ENCENDIDO" : "APAGADO");
            }
        });
        
        mqttClient.on('error', (err) => {
            console.error('Error MQTT:', err);
            setMensajeEstado("Error de conexión MQTT: " + err.message);
        });
        
        mqttClient.on('offline', () => {
            console.log('Cliente MQTT desconectado');
            setMqttConnected(false);
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
    }, []);

    // Función para controlar el LED (mantiene la funcionalidad anterior)
    const controlarLed = async (accion) => {
        try {
            // Intentar primero publicar directamente vía MQTT si está conectado
            if (client && mqttConnected) {
                client.publish(MQTT_TOPIC, accion === "encender" ? "1" : "0");
                // No necesitamos esperar ya que recibiremos la actualización vía MQTT
            } else {
                // Fallback al método API REST
                await fetch(`${API_URL}/control`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ action: accion })
                });
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

    // Función para obtener el estado mediante API REST (como fallback)
    const obtenerEstado = async () => {
        try {
            const res = await fetch(`${API_URL}/estado`);
            const data = await res.json();
            setEstadoLed(data.state === "1" ? "ENCENDIDO" : "APAGADO");
        } catch (err) {
            console.error("Error obteniendo estado:", err);
            setMensajeEstado("Error al obtener estado vía API: " + err.message);
        }
    };

    // Obtener estado inicial vía REST para tener un valor mientras se conecta MQTT
    useEffect(() => {
        obtenerEstado();
        // No necesitamos el intervalo ya que MQTT nos enviará actualizaciones en tiempo real
    }, []);

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <h1 style={{ color: colors.primaryDark }}>💡 Control de LED (IoT)</h1>
            
            {/* Estado de conexión MQTT */}
            <div style={{ 
                marginBottom: "20px", 
                padding: "10px", 
                backgroundColor: mqttConnected ? "#e6f7e6" : "#f7e6e6",
                borderRadius: "5px",
                border: `1px solid ${mqttConnected ? "#c3e6c3" : "#e6c3c3"}`
            }}>
                <p>
                    <strong>Estado MQTT:</strong> {mqttConnected ? 
                        "✅ Conectado en tiempo real" : 
                        "❌ Desconectado (usando API REST como fallback)"}
                </p>
                {mensajeEstado && <p><small>{mensajeEstado}</small></p>}
            </div>
            
            {/* Estado del LED */}
            <h2>
                Estado del LED: <span style={{ 
                    color: estadoLed === "ENCENDIDO" ? colors.primaryMedium : colors.accent,
                    fontWeight: "bold"
                }}>
                    {estadoLed}
                </span>
            </h2>
            
            {/* Botones de control */}
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button 
                    onClick={() => controlarLed("encender")} 
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
                </button>
                
                <button 
                    onClick={() => controlarLed("apagar")} 
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
                </button>
            </div>
        </div>
    );
};

export default IoTTest;