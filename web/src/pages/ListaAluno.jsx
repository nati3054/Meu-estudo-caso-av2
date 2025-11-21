import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Stack,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import alunoService from "../services/alunoService";

export default function ListaAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const carregarAlunos = async (showFullLoader = true) => {
    if (showFullLoader) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }
    try {
      const lista = await alunoService.listar();
      setAlunos(lista);
    } finally {
      if (showFullLoader) {
        setLoading(false);
      } else {
        setRefreshing(false);
      }
    }
  };

  useEffect(() => {
    carregarAlunos();
  }, []);

  const filteredAlunos = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return alunos;
    return alunos.filter((aluno) =>
      `${aluno.nome} ${aluno.turma} ${aluno.curso} ${aluno.matricula}`
        .toLowerCase()
        .includes(term)
    );
  }, [alunos, search]);

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir este aluno?")) {
      await alunoService.excluir(id);
      carregarAlunos();
    }
  };

  if (loading)
    return (
      <Box
        sx={{
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );

  return (
    <Paper
      sx={{
        p: { xs: 2, md: 4 },
        backgroundColor: "background.paper",
        boxShadow: "0px 30px 70px rgba(108, 99, 255, 0.15)",
        borderRadius: 5,
      }}
    >
      <Stack spacing={3}>
        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
            color="text.primary"
            gutterBottom
          >
            Alunos
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Cadastre os alunos, turmas e cursos para manter tudo organizado.
          </Typography>
        </Box>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", md: "center" }}
        >
          <TextField
            placeholder="Buscar por nome, turma, curso ou matrícula"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            size="small"
            sx={{
              width: { xs: "100%", md: 480 },
              "& .MuiInputBase-root": {
                borderRadius: 999,
                height: 40,
                fontSize: 14,
              },
              "& .MuiInputBase-input": {
                padding: "8px 14px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <Box
            sx={{
              px: 2,
              py: 1,
              minWidth: 120,
              borderRadius: 999,
              backgroundColor: "rgba(108, 99, 255, 0.1)",
              color: "primary.main",
              fontWeight: 600,
              fontSize: 14,
              textAlign: "center",
            }}
          >
            {alunos.length} itens
          </Box>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={() => carregarAlunos(false)}
            disabled={refreshing}
            sx={{
              alignSelf: { xs: "stretch", md: "center" },
              borderRadius: 999,
              height: 40,
              px: 3,
            }}
          >
            {refreshing ? "Atualizando..." : "Atualizar"}
          </Button>
        </Stack>
        <TableContainer
          sx={{
            borderRadius: 4,
            width: "100%",
            overflow: "hidden",
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
        >
          <Box sx={{ width: "100%", overflowX: "auto", p: { xs: 1.5, md: 2 } }}>
            <Table sx={{ minWidth: 600 }}>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "rgba(108, 99, 255, 0.08)",
                }}
              >
                <TableCell sx={{ whiteSpace: "nowrap" }}>ID</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Nome</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Turma</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Curso</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Matrícula</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }} align="right">
                  Acoes
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAlunos.map((aluno) => (
                <TableRow
                  key={aluno.id}
                  hover
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    {aluno.id}
                  </TableCell>
                  <TableCell>{aluno.nome}</TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    {aluno.turma}
                  </TableCell>
                  <TableCell>{aluno.curso}</TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    {aluno.matricula}
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap" }} align="right">
                    <IconButton
                      color="primary"
                      onClick={() => navigate(`/editar/${aluno.id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(aluno.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredAlunos.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    {alunos.length === 0
                      ? "Nenhum aluno cadastrado."
                      : "Nenhum aluno encontrado para sua busca."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            </Table>
          </Box>
        </TableContainer>
      </Stack>
    </Paper>
  );
}
