import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, beforeEach, afterEach, vi } from "vitest";
import App from "../App";

const mockListar = vi.fn();
const mockObter = vi.fn();
const mockCriar = vi.fn();
const mockAtualizar = vi.fn();
const mockExcluir = vi.fn();

vi.mock("../services/alunoService", () => ({
  default: {
    listar: (...args) => mockListar(...args),
    obter: (...args) => mockObter(...args),
    criar: (...args) => mockCriar(...args),
    atualizar: (...args) => mockAtualizar(...args),
    excluir: (...args) => mockExcluir(...args),
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Fluxo completo de alunos (integração)", () => {
  it("lista, navega para novo aluno, cria e volta exibindo item", async () => {
    mockListar
      .mockResolvedValueOnce([]) // primeira montagem da lista
      .mockResolvedValueOnce([
        {
          id: 1,
          nome: "Ana",
          turma: "1001",
          curso: "Medicina",
          matricula: "123",
        },
      ]); // após criar e voltar
    mockCriar.mockResolvedValue({
      id: 1,
      nome: "Ana",
      turma: "1001",
      curso: "Medicina",
      matricula: "123",
    });

    render(<App />);

    expect(await screen.findByText(/Alunos/i)).toBeInTheDocument();
    expect(mockListar).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("link", { name: /Novo Aluno/i }));

    fireEvent.change(screen.getByLabelText(/Nome/i), {
      target: { value: "Ana" },
    });
    fireEvent.change(screen.getByLabelText(/Turma/i), {
      target: { value: "1001" },
    });
    fireEvent.change(screen.getByLabelText(/Curso/i), {
      target: { value: "Medicina" },
    });
    fireEvent.change(screen.getByLabelText(/Matrícula/i), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Salvar/i }));

    await waitFor(() => {
      expect(mockCriar).toHaveBeenCalledWith({
        nome: "Ana",
        turma: "1001",
        curso: "Medicina",
        matricula: "123",
      });
    });

    await waitFor(() => expect(mockListar).toHaveBeenCalledTimes(2));
    expect(mockAtualizar).not.toHaveBeenCalled();
    expect(mockExcluir).not.toHaveBeenCalled();
    expect(await screen.findByText("Ana")).toBeInTheDocument();
  });

  it("edita e exclui um aluno existente", async () => {
    mockListar
      .mockResolvedValueOnce([
        { id: 2, nome: "Bruno", turma: "2001", curso: "Direito", matricula: "456" },
      ])
      .mockResolvedValueOnce([
        { id: 2, nome: "Bruno Editado", turma: "2001", curso: "Direito", matricula: "456" },
      ]) // após editar
      .mockResolvedValueOnce([
        { id: 2, nome: "Bruno Editado", turma: "2001", curso: "Direito", matricula: "456" },
      ]) // após refresh manual
      .mockResolvedValueOnce([]); // após excluir
    mockObter.mockResolvedValue({
      id: 2,
      nome: "Bruno",
      turma: "2001",
      curso: "Direito",
      matricula: "456",
    });
    mockAtualizar.mockResolvedValue({});
    mockExcluir.mockResolvedValue({});

    // Mock de confirm
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);

    render(<App />);

    expect(await screen.findByText("Bruno")).toBeInTheDocument();

    // editar
    fireEvent.click(screen.getByRole("button", { name: /Editar aluno/i }));

    expect(await screen.findByDisplayValue("Bruno")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Nome/i), {
      target: { value: "Bruno Editado" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Salvar/i }));

    await waitFor(() => {
      expect(mockAtualizar).toHaveBeenCalledWith("2", {
        nome: "Bruno Editado",
        turma: "2001",
        curso: "Direito",
        matricula: "456",
      });
    });

    // aguarda lista recarregar com edição
    await waitFor(() => expect(mockListar).toHaveBeenCalledTimes(2));
    // voltar à lista e excluir
    expect(await screen.findByText("Bruno Editado")).toBeInTheDocument();

    // forçar branch de filtro e refresh parcial
    fireEvent.change(screen.getByPlaceholderText(/Buscar por nome/i), {
      target: { value: "Editado" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Atualizar/i }));
    await waitFor(() => expect(mockListar).toHaveBeenCalledTimes(3));

    fireEvent.click(screen.getByRole("button", { name: /Excluir aluno/i }));

    await waitFor(() => {
      expect(mockExcluir).toHaveBeenCalledWith(2);
    });
    await waitFor(() => expect(mockListar).toHaveBeenCalledTimes(4));
    expect(confirmSpy).toHaveBeenCalled();
    expect(screen.getByText(/Nenhum aluno cadastrado/i)).toBeInTheDocument();
  });
});
