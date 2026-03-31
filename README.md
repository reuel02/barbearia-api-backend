# 💈 Barbearia API (Back-end)

> API RESTful para gerenciamento de barbearias, profissionais, serviços e agendamentos inteligentes (com validação de conflitos de horário).

## 🛠️ Tecnologias Utilizadas

O sistema foi construído com foco em performance e arquitetura limpa, utilizando:

* **Node.js & Express** - Motor da API e roteamento.
* **PostgreSQL & pg** - Banco de dados relacional para persistência de dados.
* **Bcrypt** - Segurança e criptografia de senhas (Hash).
* **JWT** - Autenticação de usuário e admnistrador.
* **Dotenv** - Proteção de credenciais e gerenciamento de variáveis de ambiente.

## ⚙️ Como Rodar Localmente

Para rodar este projeto na sua máquina, siga os passos abaixo:

1. Clone este repositório:
    git clone https://github.com/reuel02/barbearia-api-backend.git

2. Acesse a pasta do projeto e instale as dependências:
    cd barbearia-api-backend
    npm install

3. Crie um arquivo `.env` na raiz do projeto e configure suas credenciais de banco de dados (use o `.env.example` como base):
  * PORT=3000
  * PGUSER=seu_user_postgres
  * PGHOST=localhost
  * PGDATABASE=seu_bancodedados_postgres
  * PGPASSWORD=sua_senha_postgres
  * JWT_SECRETKEY=sua_chave_secreta_jwt

4. Inicie o servidor em modo de desenvolvimento:
    npm run dev

## 🗺️ Mapa de Rotas (Endpoints)

A API possui um sistema de segurança baseado em Middlewares. As rotas estão divididas em três níveis de acesso: **Público**, **Autenticado** (`authMiddleware`) e **Administrador** (`authAdmin`).

### 🔓 Acesso Público

#### 🔐 Autenticação (`/autenticar`)
* `POST /autenticar/registrar` - Cadastra um novo usuário no sistema.
* `POST /autenticar/login` - Autentica o usuário e gera o token de acesso.

---

### 🔒 Acesso Autenticado (Requer Token JWT)

#### 👥 Usuários (`/usuarios`)
* `GET /usuarios/listar/barbeiros` - Retorna a lista de barbeiros disponíveis.
* `GET /usuarios/listar/clientes` - Retorna a base de clientes cadastrados.

---

### 🛡️ Acesso Administrador / Barbeiro (Requer Token JWT + Nível Admin)

#### ✂️ Serviços (`/servicos`)
* `GET /servicos/listar` - Retorna o catálogo de todos os cortes e serviços.
* `POST /servicos/cadastrar` - Adiciona um novo serviço ao sistema.
* `PATCH /servicos/atualizar/:id` - Atualiza os dados (ex: preço) de um serviço específico.
* `DELETE /servicos/remover/:id` - Remove um serviço do catálogo.

#### 🕒 Horários de Trabalho (`/horarios`)
* `GET /horarios/listar` - Lista as configurações de expediente.
* `POST /horarios/inserir/:id` - Cadastra a jornada de trabalho de um profissional.
* `PATCH /horarios/atualizar/:id` - Altera o horário de trabalho de um profissional.
* `DELETE /horarios/remover/:id` - Remove uma configuração de horário.

#### 📅 Agendamentos (`/agendamentos`)
* `GET /agendamentos/disponiveis` - Consulta horários livres.
* `POST /agendamentos/agendar` - Realiza a reserva de um novo horário.
* `GET /agendamentos/listar/cliente/:cliente_id` - Lista o histórico de cortes de um cliente.
* `GET /agendamentos/listar/barbeiro/:barbeiro_id` - Lista a agenda de trabalho diária de um barbeiro.
* `PATCH /agendamentos/atualizar/status/:id` - Altera o status do agendamento (ex: Pendente para Concluído ou Cancelado).

---
👷‍♂️ Desenvolvido com disciplina por *Reuel Ferreira*.
