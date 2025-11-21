import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Paper, Typography } from "@mui/material";
import alunoService from "../services/alunoService";
import FormAluno from "../components/FormAluno";

export default function FormAlunoPage() {
  const { id } = useParams();
  const [aluno, setAluno] = useState({
    nome: "",
    turma: "",
    curso: "",
    matricula: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      alunoService.obter(id).then((data) => {
        setAluno({
          nome: data.nome,
          turma: data.turma,
          curso: data.curso,
          matricula: data.matricula,
        });
        setLoading(false);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAluno((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (id) {
      await alunoService.atualizar(id, {
        nome: aluno.nome,
        turma: aluno.turma,
        curso: aluno.curso,
        matricula: aluno.matricula,
      });
    } else {
      await alunoService.criar({
        nome: aluno.nome,
        turma: aluno.turma,
        curso: aluno.curso,
        matricula: aluno.matricula,
      });
    }
    setLoading(false);
    navigate("/alunos");
  };

  return (
    <Paper
      sx={{
        p: { xs: 2, sm: 4 },
        maxWidth: 400,
        mx: "auto",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        align="center"
        color="primary"
        fontWeight="bold"
      >
        {id ? "Editar Aluno" : "Novo Aluno"}
      </Typography>
      <FormAluno
        aluno={aluno}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/alunos")}
      />
    </Paper>
  );
}
