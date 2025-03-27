const urlI = "https://st2.depositphotos.com/2001755/8564/i/450/depositphotos_85647140-stock-photo-beautiful-landscape-with-birds.jpg";

const persianas = [
    {
        _id: "750a1f1b3e0d3a001d2b5c21",
        title: "Habitacion",
        room: "",
        status: "activo",
        icon: "bi-window",
        type: "motorizada",
        controlType: "remoto",
        lastUsed: "2025-03-14T08:30:00",
        batteryLevel: 85,
        schedule: {
            open: "07:00",
            close: "20:00"
        },
        features: ["id", "Ubicacion", "Fecha de adquicion", "Nombre del dispositivo", "Estado"] //Detalles
    },
    {
        _id: "750a1f1b3e0d3a001d2b5c22",
        title: "Cocina",
        room: "",
        status: "activo",
        icon: "bi-window",
        type: "smart",
        controlType: "app",
        lastUsed: "2025-03-15T07:15:00",
        batteryLevel: 92,
        schedule: {
            open: "06:30",
            close: "19:00"
        },
        features: ["Control por app", "Integración con asistentes", "Ahorro energético"]
    },
    {
        _id: "750a1f1b3e0d3a001d2b5c23",
        title: "Cuarto de baño",
        room: "",
        status: "inactivo",
        icon: "bi-window",
        type: "blackout",
        controlType: "remoto",
        lastUsed: "2025-03-12T22:45:00",
        batteryLevel: 45,
        schedule: {
            open: "08:00",
            close: "21:30"
        },
        features: ["Aislamiento térmico", "Control total de luz", "Silencioso"]
    },
    {
        _id: "750a1f1b3e0d3a001d2b5c24",
        title: "Dormitorio",
        room: "",
        status: "activo",
        icon: "bi-window",
        type: "solar",
        controlType: "app",
        lastUsed: "2025-03-14T18:20:00",
        batteryLevel: 78,
        schedule: {
            open: "07:30",
            close: "18:45"
        },
        features: ["Panel solar integrado", "Resistente a humedad", "Auto-ajuste"]
    }
];

export default persianas;