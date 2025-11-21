# 📱 Trabalho Final – React Native CRUD de Alunos (Expo)

Este projeto é uma aplicação **React Native** criada com **Expo**, que realiza operações de **CRUD** (Create, Read, Update, Delete) de alunos consumindo uma **API REST pública**.  
O objetivo é demonstrar o uso de **rotas, navegação e integração com API** em um app mobile moderno.

> 🔗 **API utilizada:** [http://leoproti.com.br/alunos](http://leoproti.com.br/alunos)

---

## 🚀 Funcionalidades

✅ Listagem de alunos  
✅ Cadastro de novos alunos  
✅ Edição de alunos existentes  
✅ Exclusão de alunos  
✅ Interface responsiva e amigável  
✅ Navegação entre telas com **React Navigation**

---

## 📦 Estrutura Esperada do alunos (API)

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
| [React Native](https://reactnative.dev/) | Desenvolvimento mobile multiplataforma |
| [Expo](https://expo.dev/) | Execução e empacotamento do app |
| [React Navigation](https://reactnavigation.org/) | Gerenciamento de rotas e telas |
| [Axios](https://axios-http.com/) | Consumo da API REST |

---

## ⚙️ Instalação do Projeto

1. **Instale o Expo CLI** (caso ainda não tenha):
   ```bash
   npm install -g expo-cli
   ```

2. **Crie ou acesse seu projeto Expo:**
   ```bash
   npx create-expo-app@latest app
   cd app
   ```

3. **Instale as dependências principais:**
   ```bash
   npm install @react-navigation/native @react-navigation/native-stack
   npm install axios
   npx expo install react-native-screens react-native-safe-area-context
   ```

---

## ▶️ Como Rodar o Projeto

```bash
expo start
```

Abra o app **Expo Go** no celular e escaneie o QR Code exibido no terminal.

> 💡 Dica: também é possível testar no **Android Studio** ou **emulador iOS**.

---

## 🧩 Estrutura de Pastas Recomendada

```
src/
├── screens/      # Telas principais (Listar, Criar, Editar)
├── components/   # Componentes reutilizáveis (Formulário, Lista, Botões)
├── services/     # Configuração do Axios e chamadas HTTP
└── router/       # Definição das rotas e navegação
```

---

## 🌍 Rotas da Aplicação

| Rota | Descrição |
|------|------------|
| `/Alunos` | Exibe todos os alunos |
| `/NovoAlunos` | Permite cadastrar novo alunos |
| `/EditarAlunos/:id` | Edita um alunos existente |

---

## 🔌 Exemplos de Requisições à API

```js
// GET - Listar todos os alunos
axios.get("http://leoproti.com.br/alunos");

// POST - Criar um novo alunos
axios.post("http://leoproti.com.br/alunos", {
  nome: "Alunos Novo",
  preco: 10
});

// PUT - Atualizar um alunos
axios.put("http://leoproti.com.br/alunos/1", {
  nome: "Alunos Atualizado",
  preco: 20
});

// DELETE - Remover um alunos
axios.delete("http://leoproti.com.br/alunos/1");
```

---

## 🧭 Expo Router – Navegação Simplificada com Expo

O **Expo Router** oferece uma forma moderna de criar rotas em projetos **Expo**, inspirada no modelo do **Next.js**.  
Com ele, **a estrutura de pastas define automaticamente as rotas**.

### 📂 Estrutura de Exemplo

```
app/
  index.tsx           # Tela inicial
  alunos.tsx        # Lista de alunos
  alunos/
    [id].tsx          # Tela de detalhes ou edição
```

### 🧠 Como Navegar entre Telas

```tsx
import { useRouter } from "expo-router";

const router = useRouter();

router.push("/alunos");    // Vai para a tela de alunos
router.push("/alunos/1");  // Vai para o alunos com id 1
router.back();               // Volta para a tela anterior
```

### ⚙️ Configuração Rápida do Expo Router

1. Instale:
   ```bash
   npm install expo-router
   ```

2. No `app.json` ou `app.config.js`:
   ```json
   {
     "expo": {
       "entryPoint": "./node_modules/expo-router/entry"
     }
   }
   ```

3. Estruture suas telas dentro da pasta `app/` e rode:
   ```bash
   npx expo start
   ```

---

## 🧾 Observações Importantes

- O projeto utiliza **React Navigation** ou **Expo Router** para a navegação.  
- Todas as operações de CRUD são realizadas **diretamente na API pública**.  
- Para testes em dispositivos físicos, use o **app Expo Go**.  
- As telas foram construídas com foco em **usabilidade e responsividade**.

---

## 📚 Referências

- [Documentação do React Native](https://reactnative.dev/)
- [Documentação do Expo](https://docs.expo.dev/)
- [Documentação do Axios](https://axios-http.com/docs/intro)
- [React Navigation](https://reactnavigation.org/)
- [Documentação do Expo Router](https://expo.github.io/router/docs)

---

## ✨ Autor(a)

**Natalia Ferreira**  
💻 Projeto desenvolvido como atividade prática da disciplina **Desenvolvimento Profissional: Estudo de Caso com Rotas e Consumo de API**.
