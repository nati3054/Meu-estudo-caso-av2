import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ListaAlunos from "../pages/ListaAluno";
import FormAluno from "../pages/FormAluno";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/alunos" element={<ListaAlunos />} />
      <Route path="/novo" element={<FormAluno />} />
      <Route path="/editar/:id" element={<FormAluno />} />
    </Routes>
  );
}
