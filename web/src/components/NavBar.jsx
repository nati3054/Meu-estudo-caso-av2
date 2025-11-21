import { AppBar, Toolbar, Button, Stack } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HomeIcon from "@mui/icons-material/Home";

export default function NavBar() {
  const location = useLocation();
  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path);
  return (
    <AppBar position="static" sx={{ borderRadius: 0 }}>
      <Toolbar>
        <Stack direction="row" spacing={2}>
          <Button
            color={isActive("/") && !isActive("/alunos") ? "secondary" : "inherit"}
            variant={isActive("/") && !isActive("/alunos") ? "contained" : "text"}
            component={RouterLink}
            to="/"
            startIcon={<HomeIcon />}
            sx={{ fontWeight: isActive("/") && !isActive("/alunos") ? "bold" : "normal" }}
          >
            Início
          </Button>
          <Button
            color={isActive("/alunos") ? "secondary" : "inherit"}
            variant={isActive("/alunos") ? "contained" : "text"}
            component={RouterLink}
            to="/alunos"
            startIcon={<ListAltIcon />}
            sx={{ fontWeight: isActive("/alunos") ? "bold" : "normal" }}
          >
            Alunos
          </Button>
          <Button
            color={location.pathname === "/novo" ? "secondary" : "inherit"}
            variant={location.pathname === "/novo" ? "contained" : "text"}
            component={RouterLink}
            to="/novo"
            startIcon={<AddCircleOutlineIcon />}
            sx={{
              fontWeight: location.pathname === "/novo" ? "bold" : "normal",
            }}
          >
            Novo Aluno
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
