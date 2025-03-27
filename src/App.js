import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Importación de rutas
import publicRoutes from "./routes/publicRoutes";
import privateRoutes from "./routes/privateRoutes";
import adminRoutes from "./routes/adminRoutes";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rutas públicas */}
          {publicRoutes}
          
          {/* Rutas privadas */}
          {privateRoutes}
          
          {/* Rutas administrativas */}
          {adminRoutes}
        </Routes>
      </div>
    </Router> 
  );
}

export default App;