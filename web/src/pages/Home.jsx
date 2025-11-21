import { Box, Button, Paper, Stack, Typography, Chip, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, md: 0 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: "5% 10% auto",
          height: 240,
          borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, rgba(108,99,255,0.25), transparent 60%)",
          filter: "blur(18px)",
          zIndex: 0,
        }}
      />
      <Paper
        sx={{
          p: { xs: 3, md: 5 },
          maxWidth: 880,
          width: "100%",
          mx: "auto",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(255,101,132,0.18), rgba(108,99,255,0.12))",
            top: -60,
            right: -70,
          }}
        />
        <Stack spacing={3} alignItems="center" sx={{ position: "relative", zIndex: 1 }}>
          <Chip
            label="Painel acadêmico"
            color="secondary"
            sx={{ fontWeight: 600, backgroundColor: "rgba(255,101,132,0.15)" }}
          />
          <Typography variant="h3" fontWeight={800} color="text.primary" sx={{ letterSpacing: -0.5 }}>
            Organize alunos, turmas e cursos com clareza
          </Typography>
          <Typography variant="body1" color="text.secondary" maxWidth={640}>
            Centralize cadastros, acompanhe matrículas e mantenha as turmas atualizadas em poucos cliques.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/alunos")}
              sx={{ borderRadius: 999, px: 3 }}
            >
              Ir para Alunos
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/novo")}
              sx={{ borderRadius: 999, px: 3 }}
            >
              Cadastrar novo
            </Button>
          </Stack>
          <Divider flexItem sx={{ width: "100%", my: 2 }} />
          <Stack direction={{ xs: "column", md: "row" }} spacing={3} justifyContent="center" width="100%">
            <FeatureCard title="Cadastro rápido" description="Inclua aluno, turma, curso e matrícula em um formulário simples." />
            <FeatureCard title="Busca inteligente" description="Encontre por nome, turma, curso ou matrícula instantaneamente." />
            <FeatureCard title="Controle seguro" description="Edite ou exclua cadastros com confirmação e feedback imediato." />
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}

function FeatureCard({ title, description }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2.5,
        flex: 1,
        minWidth: 220,
        borderRadius: 3,
        textAlign: "left",
        borderColor: "rgba(108,99,255,0.25)",
      }}
    >
      <Typography variant="subtitle1" fontWeight={700} gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Paper>
  );
}
