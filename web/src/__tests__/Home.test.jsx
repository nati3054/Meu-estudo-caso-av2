import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, beforeEach, vi } from "vitest";
import Home from "../pages/Home";

const navigateMock = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => navigateMock,
}));

describe("Home", () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  it("exibe hero e aciona CTAs", () => {
    render(<Home />);

    expect(
      screen.getByText(/Organize alunos, turmas e cursos com clareza/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Painel acadêmico/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Ir para Alunos/i }));
    expect(navigateMock).toHaveBeenCalledWith("/alunos");

    fireEvent.click(screen.getByRole("button", { name: /Cadastrar novo/i }));
    expect(navigateMock).toHaveBeenCalledWith("/novo");
  });
});
