import React from "react";
import { Route } from "react-router-dom";

// Layouts
import Navbar from "../layouts/publica/NavbarPublica";
import Footer from "../layouts/publica/Footer.js";

// Páginas públicas
import Inicio from "../pages/public/Inicio.js";
import Productos from "../pages/public/Productos.js";
import ProductoDetalle from "../pages/public/ProductoDetalle.js"; // Importamos el componente ProductoDetalle
import Servicios from "../pages/public/Servicios.js";
import Nosotros from "../pages/public/Nosotros.js";
import Contacto from "../pages/public/Contacto.js";
import Login from "../pages/public/Login.js";
import Politicas from "../pages/public/Politicas.js";
import Testimonios from "../pages/public/Testimonios.js";

// Componente para el área pública
export const PublicRoute = ({ children }) => {
  return (<><Navbar />{children}<Footer /> </>);
};

// Definición de rutas públicas
const publicRoutes = [
  <Route key="home" path="/" element={ <PublicRoute> <Inicio /> </PublicRoute>}/>,
  <Route key="productos" path="/productos" element={ <PublicRoute> <Productos /> </PublicRoute>}/>,
  <Route key="productoDetalle" path="/producto/:id" element={ <PublicRoute> <ProductoDetalle /> </PublicRoute>}/>,
  <Route key="servicios" path="/servicios" element={ <PublicRoute> <Servicios /> </PublicRoute>}/>,
  <Route key="nosotros" path="/nosotros" element={ <PublicRoute> <Nosotros /> </PublicRoute>}/>,
  <Route key="contacto" path="/contacto" element={ <PublicRoute> <Contacto /> </PublicRoute>}/>,
  <Route key="politicas" path="/politicas" element={ <PublicRoute> <Politicas /> </PublicRoute>}/>,
  <Route key="testimonios" path="/testimonios" element={ <PublicRoute> <Testimonios /> </PublicRoute>}/>,
  <Route key="login" path="/login" element={ <PublicRoute> <Login /> </PublicRoute>}/>,
  <Route key="default" path="*" element={ <PublicRoute> <Inicio /> </PublicRoute>}/>,
];

export default publicRoutes;