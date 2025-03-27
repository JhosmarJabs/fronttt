import React from "react";
import { Outlet } from "react-router-dom";
import { colors } from "../styles/styles";
import Footer from "./publica/Footer";
import PrivatePublicNavbar from "./privada/PublicNavbar";

const PublicLayout = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* Navbar personalizado para usuarios autenticados */}
      <PrivatePublicNavbar />

      {/* Contenido principal */}
      <main
        style={{
          flex: 1,
          backgroundColor: "#f8f9fa",
          paddingTop: "20px",
          paddingBottom: "40px",
        }}
      >
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
