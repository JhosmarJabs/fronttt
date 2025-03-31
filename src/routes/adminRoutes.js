import React from "react";
import { Route } from "react-router-dom";

// Layout admin
import AdminLayout from "../layouts/AdminLayout.js";

// Páginas administrativas
import Dashboard from "../pages/admin/Dashboard.js";
// Componentes de Usuarios
import UsuariosGeneral from "../pages/admin/usuarios/UsuariosGeneral.js";
import UsuariosBajas from "../pages/admin/usuarios/UsuariosBajas.js";
import UsuariosCambios from "../pages/admin/usuarios/UsuariosCambios.js";

import ProductosGeneral from "../pages/admin/iot/ProductosGeneral.js";
// Importar el nuevo componente de Alta de Productos
import ProductosAlta from "../pages/admin/iot/ProductosAlta.js";
import IoTTest from "../pages/admin/iot/IoTTest.js";

import InformacionModificacion from "../pages/admin/informacion/InformacionModificacion.js";
import InformacionVista from "../pages/admin/informacion/InformacionVista.js";

import PoliticasGeneral from "../pages/admin/politicas/PoliticasGeneral.js";
import PoliticasEmpresa from "../pages/admin/politicas/PoliticasEmpresa.js";
import PoliticasPrivacidad from "../pages/admin/politicas/PoliticasPrivacidad.js";
import PoliticasCliente from "../pages/admin/politicas/PoliticasCliente.js";

import PreguntasGeneral from "../pages/admin/preguntas/PreguntasGeneral.js";
import PreguntasAltas from "../pages/admin/preguntas/PreguntasAltas.js";
import PreguntasBajas from "../pages/admin/preguntas/PreguntasBajas.js";
import PreguntasCambios from "../pages/admin/preguntas/PreguntasCambios.js";

// Definición de rutas administrativas
const adminRoutes = (
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
    
    {/* Usuarios */}
    <Route path="usuarios" element={<UsuariosGeneral />} />
    <Route path="usuarios/bajas" element={<UsuariosBajas />} />
    <Route path="usuarios/cambios" element={<UsuariosCambios />} />
    
    {/* IoT */}
    <Route path="productos" element={<ProductosGeneral />} />
    <Route path="productos/alta" element={<ProductosAlta />} /> {/* Nueva ruta para alta de productos */}
    <Route path="iot/test" element={<IoTTest />} />
    
    {/* Información */}
    <Route path="informacion/modificacion" element={<InformacionModificacion />} />
    <Route path="informacion/vista" element={<InformacionVista />} />
    
    {/* Políticas */}
    <Route path="politicas" element={<PoliticasGeneral />} />
    <Route path="politicas/empresa" element={<PoliticasEmpresa />} />
    <Route path="politicas/privacidad" element={<PoliticasPrivacidad />} />
    <Route path="politicas/cliente" element={<PoliticasCliente />} />
    
    {/* Preguntas */}
    <Route path="preguntas" element={<PreguntasGeneral />} />
    <Route path="preguntas/altas" element={<PreguntasAltas />} />
    <Route path="preguntas/bajas" element={<PreguntasBajas />} />
    <Route path="preguntas/cambios" element={<PreguntasCambios />} />
  </Route>
);

export default adminRoutes;