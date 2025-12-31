# LinkIO Desafio

API RESTful para gerenciamento de pedidos de laboratório desenvolvida com Express, TypeScript, PostgreSQL e Drizzle ORM.

## 🚀 Tecnologias

- **Node.js** v20+
- **TypeScript** 5.9.3
- **Express** 5.0.1 - Framework web minimalista e flexível
- **PostgreSQL** 15 - Banco de dados relacional
- **Drizzle ORM** 0.45.1 - ORM type-safe
- **Zod** v4.2.1 - Validação de schemas
- **Docker & Docker Compose** - Containerização
- **JWT** (jsonwebtoken) - Autenticação stateless
- **bcryptjs** - Hash de senhas
- **CORS** - Middleware para controle de origem cruzada

## 📋 Pré-requisitos

- [Docker](https://www.docker.com/get-started) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado
- Porta `3333` disponível (API)
- Porta `5432` disponível (PostgreSQL)

## 🔧 Instalação e Execução

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd teste
```

### 2. Configure as variáveis de ambiente

O arquivo `.env` já está configurado com valores padrão:

```env
PORT=3333
POSTGRES_PASSWORD='linkio'
POSTGRES_PORT=5432
POSTGRES_HOST='localhost'
POSTGRES_USER='linkio'
POSTGRES_DB='linkio_db'
NODE_ENV='dev'
JWT_SECRET="secret-test"
```

> ⚠️ **IMPORTANTE**: Em produção, altere o `JWT_SECRET` para uma chave segura!

### 3. Inicie o projeto com Docker

```bash
# Construir e iniciar os containers
docker compose up --build -d

# Verificar logs
docker compose logs -f api

# Parar os containers
docker compose down
```

A API estará disponível em: **http://localhost:3333**

### 4. Verificar se está funcionando

```bash
curl http://localhost:3333
# Resposta esperada: {"status":"ok"}
```

## 🗄️ Banco de Dados

As migrations são executadas automaticamente ao iniciar o container. O banco criará automaticamente:

### Tabelas

**users**
- `id` (UUID, PK)
- `email` (VARCHAR 255, UNIQUE)
- `password` (VARCHAR 255, hash bcrypt)
- `created_at` (TIMESTAMP)

**orders**
- `id` (UUID, PK)
- `lab` (VARCHAR 255)
- `patient` (VARCHAR 255)
- `customer` (VARCHAR 255)
- `state` (ENUM: 'CREATED', 'ANALYSIS', 'COMPLETED')
- `status` (ENUM: 'ACTIVE', 'DELETED')
- `services` (JSONB)
- `user_id` (UUID, FK → users.id)
- `created_at` (TIMESTAMP)

## 📚 Documentação da API

### Base URL
```
http://localhost:3333
```

---

## 🔓 Rotas Públicas

### Health Check

**GET /**

Verifica se a API está funcionando.

**Resposta (200)**:
```json
{
  "status": "ok"
}
```

---

### Criar Usuário

**POST /users**

Cria um novo usuário no sistema.

**Body (JSON)**:
```json
{
  "email": "usuario@example.com",
  "password": "senha123"
}
```

**Validações**:
- `email`: Deve ser um email válido
- `password`: Mínimo 6, máximo 100 caracteres

**Resposta (200)**:
```json
{
  "email": "usuario@example.com",
  "password": null,
  "id": "uuid-gerado-automaticamente"
}
```

**Erros**:
- `400`: Validação falhou (email inválido, senha muito curta)
- `409`: Email já cadastrado

---

### Login

**POST /auth/login**

Autentica um usuário e retorna um token JWT.

**Body (JSON)**:
```json
{
  "email": "usuario@example.com",
  "password": "senha123"
}
```

**Validações**:
- `email`: Deve ser um email válido
- `password`: Mínimo 6, máximo 100 caracteres

**Resposta (200)**:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Erros**:
- `400`: Validação falhou
- `401`: Credenciais inválidas (email não existe ou senha incorreta)

---

## 🔒 Rotas Protegidas (Requerem Autenticação)

Todas as rotas abaixo requerem o header:
```
Authorization: Bearer <seu-token-jwt>
```

---

### Criar Pedido

**POST /orders**

Cria um novo pedido de laboratório.

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body (JSON)**:
```json
{
  "lab": "Laboratório Central",
  "patient": "João da Silva",
  "customer": "Hospital Municipal",
  "services": [
    {
      "name": "Hemograma Completo",
      "value": 50.00,
      "status": "PENDING"
    },
    {
      "name": "Glicemia",
      "value": 30.00,
      "status": "PENDING"
    }
  ]
}
```

**Validações**:
- `lab`: String, mínimo 6, máximo 100 caracteres
- `patient`: String, mínimo 6, máximo 100 caracteres
- `customer`: String, mínimo 6, máximo 100 caracteres
- `services`: Array de objetos
  - `name`: String, mínimo 6, máximo 100 caracteres
  - `value`: Número
  - `status`: "PENDING" ou "DONE"

**Resposta (200)**:
```json
{
  "id": "uuid-do-pedido",
  "lab": "Laboratório Central",
  "patient": "João da Silva",
  "customer": "Hospital Municipal",
  "_state": "CREATED",
  "status": "ACTIVE",
  "services": [
    {
      "name": "Hemograma Completo",
      "value": 50,
      "status": "PENDING"
    }
  ],
  "userId": "uuid-do-usuario"
}
```

**Erros**:
- `400`: Validação falhou
- `401`: Token inválido ou ausente

---

### Buscar Pedidos do Usuário

**GET /orders?userId={userId}&state={state}**

Busca pedidos de um usuário específico.

**Headers**:
```
Authorization: Bearer <token>
```

**Query Parameters**:
- `userId` (obrigatório): UUID do usuário
- `state` (opcional): Filtrar por estado ("CREATED", "ANALYSIS", "COMPLETED")

**Exemplos**:
```bash
# Todos os pedidos do usuário
GET /orders?userId=123e4567-e89b-12d3-a456-426614174000

# Apenas pedidos criados
GET /orders?userId=123e4567-e89b-12d3-a456-426614174000&state=CREATED

# Apenas pedidos em análise
GET /orders?userId=123e4567-e89b-12d3-a456-426614174000&state=ANALYSIS
```

**Resposta (200)**:
```json
[
  {
    "id": "uuid-do-pedido",
    "lab": "Laboratório Central",
    "patient": "João da Silva",
    "customer": "Hospital Municipal",
    "_state": "CREATED",
    "status": "ACTIVE",
    "services": [...],
    "userId": "uuid-do-usuario"
  }
]
```

**Erros**:
- `400`: userId inválido (não é UUID)
- `401`: Token inválido ou ausente

---

### Avançar Estado do Pedido

**PATCH /orders/:id/advance**

Avança o estado do pedido na máquina de estados.

**Estados possíveis**:
```
CREATED → ANALYSIS → COMPLETED
```

**Headers**:
```
Authorization: Bearer <token>
```

**URL Parameters**:
- `id`: UUID do pedido

**Exemplo**:
```bash
PATCH /orders/123e4567-e89b-12d3-a456-426614174000/advance
```

**Resposta (200)**:
```json
{
  "id": "uuid-do-pedido",
  "_state": "ANALYSIS",
  ...
}
```

**Erros**:
- `400`: ID inválido (não é UUID)
- `401`: Token inválido ou ausente
- `404`: Pedido não encontrado

---

## 🧪 Exemplos de Uso Completo

### Fluxo completo: Criar usuário, fazer login e criar pedido

```bash
# 1. Criar usuário
curl -X POST http://localhost:3333/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "senha123"
  }'

# Resposta:
# {"email":"joao@example.com","password":null,"id":"<UUID>"}

# 2. Fazer login
curl -X POST http://localhost:3333/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "senha123"
  }'

# Resposta:
# {"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}

# 3. Salvar o token em uma variável
TOKEN="<seu-token-aqui>"

# 4. Criar pedido
curl -X POST http://localhost:3333/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "lab": "Laboratório XYZ",
    "patient": "Maria Silva",
    "customer": "Hospital ABC",
    "services": [
      {
        "name": "Exame de Sangue",
        "value": 100.50,
        "status": "PENDING"
      }
    ]
  }'

# 5. Buscar pedidos (use o userId retornado ao criar o usuário)
USER_ID="<uuid-do-usuario>"
curl -X GET "http://localhost:3333/orders?userId=$USER_ID" \
  -H "Authorization: Bearer $TOKEN"

# 6. Avançar estado do pedido (use o id retornado ao criar o pedido)
ORDER_ID="<uuid-do-pedido>"
curl -X PATCH "http://localhost:3333/orders/$ORDER_ID/advance" \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🛠️ Scripts Disponíveis

### Desenvolvimento Local (sem Docker)

```bash
# Instalar dependências
npm install

# Desenvolvimento com hot reload
npm run dev

# Build do projeto
npm run build

# Executar migrations
npm run migrate

# Executar testes
npm test

# Executar testes em watch mode
npm run test:watch
```

### Com Docker

```bash
# Iniciar projeto
docker compose up -d

# Ver logs
docker compose logs -f api

# Parar projeto
docker compose down

# Rebuild completo
docker compose up --build -d

# Executar migrations manualmente (se necessário)
docker exec linkio-api npm run migrate

# Acessar shell do container
docker exec -it linkio-api sh

# Ver logs do banco de dados
docker compose logs -f linkio-db
```

---

## 🏗️ Arquitetura

O projeto segue os princípios de **Clean Architecture** e **Domain-Driven Design (DDD)**:

```
src/
├── core/                 # Regras de negócio centrais
│   └── errors/          # Erros customizados
├── domain/              # Camada de domínio
│   ├── cryptography/    # Interfaces de criptografia
│   ├── repositories/    # Interfaces de repositórios
│   └── useCases/        # Casos de uso
├── infra/               # Camada de infraestrutura
│   ├── config/          # Configurações (env, zod)
│   ├── database/        # Drizzle ORM, migrations, schemas
│   └── http/            # Express, rotas, controllers
│       ├── controllers/ # Controladores HTTP
│       ├── middlewares/ # JWT, validações Zod
│       ├── routes/      # Definição de rotas
│       ├── services/    # Serviços de aplicação
│       └── validations/ # Schemas Zod
└── server.ts            # Ponto de entrada
```

### Princípios seguidos:
- ✅ **Dependency Injection**
- ✅ **Separation of Concerns**
- ✅ **Single Responsibility**
- ✅ **Type Safety** (TypeScript + Zod)
- ✅ **Clean Architecture**

---

## 🔒 Segurança

- ✅ Senhas hasheadas com **bcryptjs**
- ✅ Autenticação via **JWT**
- ✅ Validação de entrada com **Zod v4**
- ✅ CORS configurado
- ✅ SQL Injection protegido (Drizzle ORM)
- ✅ Constraints no banco de dados

> ⚠️ **ATENÇÃO**: Troque o `JWT_SECRET` em produção!

---

## 📊 Status Codes da API

| Código | Significado |
|--------|-------------|
| 200 | Sucesso |
| 400 | Erro de validação |
| 401 | Não autenticado / Credenciais inválidas |
| 404 | Recurso não encontrado |
| 409 | Conflito (ex: email já existe) |
| 500 | Erro interno do servidor |

---

## 🐛 Troubleshooting

### Porta 3333 já está em uso
```bash
# Descobrir processo usando a porta
lsof -i :3333

# Matar o processo
kill -9 <PID>
```

### Migrations não foram executadas
```bash
# Executar migrations manualmente
docker exec linkio-api npm run migrate
```

### Container não inicia
```bash
# Ver logs detalhados
docker compose logs -f api

# Rebuild completo
docker compose down
docker compose up --build -d
```

### Problemas com banco de dados
```bash
# Resetar banco de dados (CUIDADO: apaga todos os dados!)
docker compose down -v
docker compose up -d
```

---

## 📝 Validações de Campos

### Usuário (POST /users, POST /auth/login)
- `email`: Formato de email válido
- `password`: 6-100 caracteres

### Pedido (POST /orders)
- `lab`: 6-100 caracteres
- `patient`: 6-100 caracteres
- `customer`: 6-100 caracteres
- `services[].name`: 6-100 caracteres
- `services[].value`: Número válido
- `services[].status`: "PENDING" ou "DONE"

### Query Parameters
- `userId`: UUID válido
- `state`: "CREATED", "ANALYSIS" ou "COMPLETED" (opcional)

---

## 🧪 Testes Manuais com cURL

### Health Check
```bash
curl http://localhost:3333
```

### Criar usuário
```bash
curl -X POST http://localhost:3333/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"senha123"}'
```

### Login
```bash
curl -X POST http://localhost:3333/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"senha123"}'
```

### Criar pedido (substitua TOKEN)
```bash
curl -X POST http://localhost:3333/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "lab":"Lab Central",
    "patient":"João Silva",
    "customer":"Hospital XYZ",
    "services":[{"name":"Hemograma","value":50,"status":"PENDING"}]
  }'
```

---

## 📄 Licença

ISC

---

## 👨‍💻 Desenvolvimento

**Versão**: 1.0.0
**Node.js**: v20+
**TypeScript**: 5.9.3

---

## 🔄 Máquina de Estados do Pedido

```
┌─────────┐     advance     ┌──────────┐     advance     ┌───────────┐
│ CREATED │ ─────────────> │ ANALYSIS │ ─────────────> │ COMPLETED │
└─────────┘                 └──────────┘                 └───────────┘
```

Cada chamada ao endpoint `PATCH /orders/:id/advance` move o pedido para o próximo estado.

---

## 🔄 Migração Fastify → Express

Este projeto foi **migrado de Fastify para Express** mantendo 100% da funcionalidade original.

### Principais mudanças:
- ✅ Framework: `fastify` → `express`
- ✅ CORS: `@fastify/cors` → `cors` middleware
- ✅ JWT: `@fastify/jwt` → `jsonwebtoken` (biblioteca direta)
- ✅ Validação: `fastify-type-provider-zod` → Middleware `validateZod` customizado
- ✅ Rotas: Plugins Fastify → `Router()` do Express
- ✅ Error Handler: `setErrorHandler()` → Middleware de erro Express

### Arquivos migrados:
- [app.ts](src/infra/http/app.ts) - Configuração principal da aplicação
- [server.ts](src/infra/http/server.ts) - Inicialização do servidor
- [user-routes.ts](src/infra/http/routes/user-routes.ts) - Rotas de usuário
- [auth-routes.ts](src/infra/http/routes/auth-routes.ts) - Rotas de autenticação
- [order-routes.ts](src/infra/http/routes/order-routes.ts) - Rotas de pedidos

Para mais detalhes sobre a migração, veja [MIGRACAO_COMPLETA.md](MIGRACAO_COMPLETA.md)

---

**Feito com ❤️ usando Express, TypeScript e Docker**
