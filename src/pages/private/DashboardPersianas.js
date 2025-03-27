import React, { useState } from "react";
import persianas from "../../services/persianas"; // Importar la lista de persianas
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

const DashboardPersianas = () => {
  const [vistaGrilla, setVistaGrilla] = useState(true);

  const toggleVistaGrilla = () => {
    setVistaGrilla(!vistaGrilla);
  };

  return (
    <div className="dashboard-container">
      <div className="container">
        {/* Encabezado */}
        <div className="header">
          <h1 className="title">Mis Dispositivos</h1>
          <p className="paragraph">
            Gestiona tus persianas inteligentes en cada habitación de tu hogar
          </p>
        </div>

        {/* Barra de control */}
        <div className="control-bar">
          <div className="search-container">
            <i className="bi bi-search search-icon"></i>
            <input type="text" placeholder="Buscar dispositivos..." className="search-input" />
          </div>

          <div className="view-toggle">
            <div
              className={`view-button ${vistaGrilla ? "active-view" : "inactive-view"}`}
              onClick={() => vistaGrilla || toggleVistaGrilla()}
            >
              <i className="bi bi-grid-3x3-gap-fill"></i>
            </div>
            <div
              className={`view-button ${!vistaGrilla ? "active-view" : "inactive-view"}`}
              onClick={() => !vistaGrilla || toggleVistaGrilla()}
            >
              <i className="bi bi-list-ul"></i>
            </div>
          </div>
        </div>

        {/* Información de resultados */}
        <div className="results-info">Mostrando {persianas.length} dispositivos</div>

        {/* Grid de persianas */}
        <div className={`persianas-grid ${vistaGrilla ? "grid-view" : "list-view"}`}>
          {persianas.map((persiana) => (
            <div key={persiana._id} className="persiana-card">
              <div className={`persiana-content ${vistaGrilla ? "grid-mode" : "list-mode"}`}>
                <div className="icon-container">
                  <i className={`bi ${persiana.icon} persian-icon`}></i>
                </div>
                <div className="card-content">
                  <h3 className="card-title">{persiana.title}</h3>
                  <p className="card-room">
                    <i className="bi bi-house-door room-icon"></i>
                    {persiana.room}
                  </p>

                  <div className="status-container">
                    <span className={`status-badge ${persiana.status === "activo" ? "status-active" : "status-inactive"}`}>
                      <i className={`bi ${persiana.status === "activo" ? "bi-circle-fill" : "bi-circle"} status-icon`}></i>
                      {persiana.status === "activo" ? "Activo" : "Inactivo"}
                    </span>

                    <button className="action-button">Ver Más</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPersianas;
