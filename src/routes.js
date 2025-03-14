import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Clientes from "./pages/Clientes";
import NovoCliente from "./pages/NovoCliente";

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/cliente/novo/:clienteId" element={<NovoCliente />} />
    </Routes>
  );
}
