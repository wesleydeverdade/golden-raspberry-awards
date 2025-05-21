# Golden Raspberry Awards API

API para análise dos produtores vencedores do prêmio Framboesa de Ouro.

## 🛠️ Tecnologias

- Node.js

- Fastify

- Prisma ORM

- SQLite

- Vitest

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/wesleydeverdade/golden-raspberry-awards.git
```

Entre no diretório do projeto

```bash
  cd golden-raspberry-awards
```

Instale as dependências

```bash
  npm install
```

Crie o arquivo .env conforme o .env.example

```bash

cp .env.example .env
```

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`NODE_ENV`

`DATABASE_URL`

Como esse projeto é somente uma demo, as variáveis estarão preenchidas no arquivo de exemplo :)

### Banco de dados SGBD

Para inicializar o banco de dados, rode

```bash
  npm run db:init
```

Para preencher o banco de dados, com as informações do .csv

```bash
  npm run db:seed
```

Para visualizar o banco de dados via interface do prisma

```bash
  npm run db:interface
```

### Executando em modo de desenvolvimento:

```bash
  npm run start:dev
```

### Em modo de produção:

1. Gere a build

```bash
  npm run build
```

2. Execute o servidor a com a build:

```bash
  npm run start
```

## Uso/Exemplos

### `GET /awards/interval`

Retorna os produtores com os **menores** e **maiores** intervalos entre prêmios.

#### 🔄 Exemplo de resposta

```json
{
  "min": [
    {
      "producer": "Joel Silver",
      "interval": 1,
      "previousWin": 1990,
      "followingWin": 1991
    }
  ],
  "max": [
    {
      "producer": "Matthew Vaughn",
      "interval": 13,
      "previousWin": 2002,
      "followingWin": 2015
    }
  ]
}
```

## Rodando os testes

Para rodar os testes de integração, rode o seguinte comando

```bash
  npm run test
```
