# 💻 Trabalho Final – Frontend React CRUD de Alunos

Este projeto é uma aplicação **frontend** desenvolvida com **React** (via **Vite**) que realiza operações de **CRUD** (Create, Read, Update, Delete) para alunos, consumindo uma **API REST pública**.  
O objetivo é demonstrar o uso de **rotas, integração com API e interface moderna** utilizando o **Material UI**.

> 🔗 **API utilizada:** [http://leoproti.com.br/alunos](http://leoproti.com.br/alunos)

---

## 🚀 Funcionalidades

✅ Listagem de alunos  
✅ Cadastro de novos alunos  
✅ Edição de alunos existentes  
✅ Exclusão de alunos  
✅ Interface moderna com **Material UI**  
✅ Navegação entre páginas com **React Router DOM**

---

## 📦 Estrutura Esperada do Produto (API)

```json
{
  "id": 0,
  "nome": "string",
  "preco": 0
}
```

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
|-------------|-------------|
| [React](https://react.dev/) | Biblioteca principal para a interface |
| [Vite](https://vitejs.dev/) | Ferramenta de build e servidor local |
| [Material UI](https://mui.com/) | Componentes visuais prontos e responsivos |
| [React Router DOM](https://reactrouter.com/) | Controle de rotas e navegação |
| [Axios](https://axios-http.com/) | Requisições HTTP para a API |

---

## ⚙️ Instalação do Projeto

1. **Instale as dependências principais** (na pasta do projeto):

   ```bash
   npm install
   ```

2. **Caso esteja iniciando do zero** ou falte alguma dependência, execute:

   ```bash
   npm install react react-dom
   npm install react-router-dom @mui/material @mui/icons-material @emotion/react @emotion/styled axios
   npm install --save-dev vite @vitejs/plugin-react
   ```

---

## ▶️ Como Rodar o Projeto

```bash
npm run dev
```

Acesse no navegador: [http://localhost:5173](http://localhost:5173)

> 💡 Se der erro, verifique se as dependências foram instaladas corretamente com `npm install`.

---

## 🧩 Estrutura de Pastas Recomendada

```
src/
├── pages/        # Páginas principais (Listar, Criar, Editar)
├── components/   # Componentes reutilizáveis (Formulário, Tabela, etc)
├── services/     # Serviços para requisições HTTP (Axios)
└── routes/       # Definição das rotas da aplicação
```

---

## 🌍 Rotas da Aplicação

| Rota | Descrição |
|------|------------|
| `/` | Exibe todos os alunos |
| `/novo` | Cadastra novo produto |
| `/editar/:id` | Edita um produto existente |

---

## 🔌 Exemplos de Requisições à API

```js
// GET - Listar todos os alunos
axios.get("http://leoproti.com.br/alunos");

// POST - Criar novo produto
axios.post("http://leoproti.com.br/alunos", {
  nome: "Produto Novo",
  preco: 10
});

// PUT - Atualizar produto existente
axios.put("http://leoproti.com.br/alunos/1", {
  nome: "Produto Atualizado",
  preco: 20
});

// DELETE - Remover produto
axios.delete("http://leoproti.com.br/alunos/1");
```

---

## 🧰 Solução de Problemas Comuns

### ❌ Erro: “Failed to resolve import 'react-router-dom'”
Esse erro significa que o pacote **React Router DOM** não está instalado.  
Execute:

```bash
npm install react-router-dom
```

### 📦 Outros casos comuns

| Biblioteca | Comando de Instalação |
|-------------|-----------------------|
| **Material UI** | `npm install @mui/material @mui/icons-material @emotion/react @emotion/styled` |
| **Axios** | `npm install axios` |

Após corrigir as dependências, reinicie o projeto:

```bash
npm run dev
```

---

## 🧾 Observações

- O projeto foi desenvolvido utilizando **React + Vite** para maior performance.  
- Todas as operações CRUD são executadas diretamente na **API pública fornecida**.  
- Os componentes seguem o padrão visual do **Material UI**.  
- As rotas são gerenciadas via **React Router DOM**.

---

## 📚 Referências

- [Documentação do React](https://react.dev/)
- [Documentação do Vite](https://vitejs.dev/)
- [Documentação do Material UI](https://mui.com/)
- [Documentação do React Router](https://reactrouter.com/en/main)
- [Documentação do Axios](https://axios-http.com/docs/intro)

---

## 🧪 Testes (Vitest)

O projeto utiliza **Vitest** para executar testes unitários e de componentes. Abaixo há instruções de instalação, configuração e execução.

### 📥 Instalação

Execute (no diretório `web`):

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

### ⚙️ Configuração mínima

Crie um arquivo `vitest.config.js` na raiz do `web`:

```js
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    globals: true,
  },
})
```

No arquivo `src/setupTests.ts`, importe a biblioteca de assertions:

```ts
import '@testing-library/jest-dom'
```

### 🧾 Scripts úteis (adicione em `package.json` do `web`)

```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage"
  }
}
```

### 🧪 Exemplo de teste

Arquivo exemplo: `src/__tests__/Home.test.jsx`

```jsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from '../pages/Home'

describe('Home', () => {
  it('renderiza o título da página', () => {
    render(<Home />)
    expect(screen.getByText(/alunos/i)).toBeTruthy()
  })
})
```

### ▶️ Como executar

- Rodar todos os testes uma vez:

```bash
npm run test
```

- Rodar em modo observação (watch):

```bash
npm run test:watch
```

- Gerar relatório de cobertura:

```bash
npm run test:coverage
```

---

## ✨ Autor(a)

**Natalia Ferreira**  
💻 Projeto desenvolvido como parte da disciplina **Desenvolvimento Profissional: Estudo de Caso com Rotas e Consumo de API**.
