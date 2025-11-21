# 📱💻 Trabalho Final – CRUD de Alunos (Mobile + Web)

Este projeto é uma aplicação **full-stack** que demonstra operações de **CRUD** (Create, Read, Update, Delete) de alunos em duas plataformas:
- **Mobile**: Aplicação React Native desenvolvida com **Expo**
- **Web**: Aplicação frontend React desenvolvida com **Vite**

Ambas consomem a mesma **API REST pública** e demonstram o uso de **rotas, navegação, integração com API e interfaces modernas**.

> 🔗 **API utilizada:** [http://leoproti.com.br/alunos](http://leoproti.com.br/alunos)

---

## 📂 Estrutura do Projeto

```
meu-estudo-caso-av2/
├── mobile/          # Aplicação React Native (Expo)
│   ├── app/         # Telas e rotas
│   ├── components/  # Componentes reutilizáveis
│   ├── scripts/     # Serviços (axios, API)
│   ├── package.json
│   └── README.md    # Documentação específica do mobile
│
├── web/             # Aplicação React (Vite)
│   ├── src/
│   │   ├── pages/      # Páginas principais
│   │   ├── components/ # Componentes reutilizáveis
│   │   ├── services/   # Serviços (axios, API)
│   │   ├── routes/     # Definição de rotas
│   │   └── __tests__/  # Testes (Vitest)
│   ├── package.json
│   └── README.md    # Documentação específica do web
│
└── README_GERAL.md  # Este arquivo
```

---

## 🚀 Funcionalidades Comuns

✅ Listagem de alunos  
✅ Cadastro de novos alunos  
✅ Edição de alunos existentes  
✅ Exclusão de alunos  
✅ Interface responsiva e amigável  
✅ Navegação entre telas/páginas  
✅ Integração com API REST

---

## 📦 Estrutura de Dados (API)

```json
{
  "id": 0,
  "nome": "string",
  "preco": 0
}
```

---

## 🛠️ Tecnologias Utilizadas

### Mobile (React Native)

| Tecnologia | Finalidade |
|-------------|-------------|
| [React Native](https://reactnative.dev/) | Desenvolvimento mobile multiplataforma |
| [Expo](https://expo.dev/) | Execução e empacotamento do app |
| [Expo Router](https://expo.github.io/router/docs) | Navegação baseada em arquivos |
| [Axios](https://axios-http.com/) | Consumo da API REST |

### Web (React)

| Tecnologia | Finalidade |
|-------------|-------------|
| [React](https://react.dev/) | Biblioteca principal para a interface |
| [Vite](https://vitejs.dev/) | Ferramenta de build e servidor local |
| [Material UI](https://mui.com/) | Componentes visuais prontos e responsivos |
| [React Router DOM](https://reactrouter.com/) | Controle de rotas e navegação |
| [Axios](https://axios-http.com/) | Requisições HTTP para a API |
| [Vitest](https://vitest.dev/) | Testes unitários e de componentes |

---

## ⚙️ Instalação e Execução

### 📱 Mobile

#### Instalação

1. **Instale o Expo CLI** (caso ainda não tenha):
   ```bash
   npm install -g expo-cli
   ```

2. **Acesse a pasta do mobile e instale as dependências:**
   ```bash
   cd mobile
   npm install
   ```

#### Executar

```bash
cd mobile
expo start
```

Abra o app **Expo Go** no celular e escaneie o QR Code exibido no terminal.

> 💡 Dica: também é possível testar no **Android Studio** ou **emulador iOS**.

---

### 💻 Web

#### Instalação

1. **Acesse a pasta do web e instale as dependências:**
   ```bash
   cd web
   npm install
   ```

#### Executar

```bash
cd web
npm run dev
```

Acesse no navegador: [http://localhost:5173](http://localhost:5173)

---

## 🌍 Rotas

### Mobile

| Rota | Descrição |
|------|------------|
| `/` | Tela inicial |
| `/alunos` | Lista de alunos |
| `/alunos/[id]` | Detalhes/edição de aluno |
| `/alunos/novo` | Cadastro de novo aluno |

### Web

| Rota | Descrição |
|------|------------|
| `/` | Página inicial (lista de alunos) |
| `/novo` | Cadastro de novo aluno |
| `/editar/:id` | Edição de aluno existente |

---

## 🔌 Exemplos de Requisições à API

```js
// GET - Listar todos os alunos
axios.get("http://leoproti.com.br/alunos");

// POST - Criar novo aluno
axios.post("http://leoproti.com.br/alunos", {
  nome: "Aluno Novo",
  preco: 10
});

// PUT - Atualizar aluno existente
axios.put("http://leoproti.com.br/alunos/1", {
  nome: "Aluno Atualizado",
  preco: 20
});

// DELETE - Remover aluno
axios.delete("http://leoproti.com.br/alunos/1");
```

---

## 🧪 Testes (Vitest – Apenas Web)

O projeto **web** utiliza **Vitest** para testes unitários e de componentes.

### Instalação

```bash
cd web
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

### Scripts de teste

```bash
# Rodar testes uma vez
npm run test

# Rodar em modo observação
npm run test:watch

# Gerar relatório de cobertura
npm run test:coverage
```

### Exemplo de teste

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

> Para mais detalhes sobre testes, consulte `web/README.md`

---

## 🧰 Solução de Problemas

### Mobile

**Erro ao iniciar com Expo:**
```bash
# Limpe o cache e tente novamente
cd mobile
npm install
expo start -c
```

**Aplicativo não encontra a API:**
- Verifique se a URL da API está correta: `http://leoproti.com.br/alunos`
- Certifique-se de que seu dispositivo/emulador tem acesso à internet

### Web

**Erro: "Failed to resolve import 'react-router-dom'"**
```bash
cd web
npm install react-router-dom
```

**Erro de dependências do Material UI:**
```bash
cd web
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
```

**Reinicie o servidor de desenvolvimento:**
```bash
cd web
npm run dev
```

---

## 📚 Documentações Específicas

Para informações detalhadas sobre cada projeto:

- **Mobile**: Veja `mobile/README.md`
- **Web**: Veja `web/README.md`

---

## 📚 Referências Úteis

### React Native & Expo
- [Documentação do React Native](https://reactnative.dev/)
- [Documentação do Expo](https://docs.expo.dev/)
- [Expo Router](https://expo.github.io/router/docs)

### React & Web
- [Documentação do React](https://react.dev/)
- [Documentação do Vite](https://vitejs.dev/)
- [Documentação do Material UI](https://mui.com/)
- [React Router](https://reactrouter.com/en/main)
- [Vitest](https://vitest.dev/)

### HTTP & Ferramentas
- [Documentação do Axios](https://axios-http.com/docs/intro)
- [API de Teste](http://leoproti.com.br/alunos)

---

## ✨ Autor(a)

**Natalia Ferreira**  
💻 Projeto desenvolvido como atividade prática da disciplina **Desenvolvimento Profissional: Estudo de Caso com Rotas e Consumo de API**.

---

## 📝 Notas Importantes

- ✅ Ambas as aplicações consomem a **mesma API pública**
- ✅ Todas as operações CRUD são executadas **diretamente na API**
- ✅ Cada aplicação possui sua própria documentação detalhada em seu `README.md`
- ✅ O projeto **web** inclui testes automatizados com **Vitest**
- ✅ As interfaces foram desenvolvidas com foco em **usabilidade e responsividade**

---

**Última atualização:** 19 de novembro de 2025
