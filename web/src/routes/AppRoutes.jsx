import { Routes, Route } from "react-router-dom";
import ListaAlunos from "../pages/ListaAluno";
import FormAluno from "../pages/AlunoProduto";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ListaAlunos />} />
      <Route path="/novo" element={<FormAluno />} />
      <Route path="/editar/:id" element={<FormAluno />} />
    </Routes>
  );
}
