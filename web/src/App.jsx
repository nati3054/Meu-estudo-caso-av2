import { BrowserRouter } from "react-router-dom";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Container,
} from "@mui/material";
import NavBar from "./components/NavBar";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

const lavenderPalette = {
  primary: "#6C63FF",
  secondary: "#FF6584",
  background: "#F7F5FF",
  surface: "#FFFFFF",
  text: "#1F1B2F",
  muted: "#6B6784",
};

const theme = createTheme({
  palette: {
    primary: { main: lavenderPalette.primary },
    secondary: { main: lavenderPalette.secondary },
    background: {
      default: lavenderPalette.background,
      paper: lavenderPalette.surface,
    },
    text: {
      primary: lavenderPalette.text,
      secondary: lavenderPalette.muted,
    },
  },
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif',
    fontWeightMedium: 600,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: lavenderPalette.primary,
          boxShadow: "none",
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 28,
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 999,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
        }}
      >
        <BrowserRouter>
          <NavBar />
          <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
            <AppRoutes />
          </Container>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
