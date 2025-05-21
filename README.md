# Golden Raspberry Awards API

API para análise dos produtores vencedores do prêmio Framboesa de Ouro.

## 📦 Requisitos

- [Node.js](https://nodejs.org/) v22.14.0+
- [Docker](https://www.docker.com/)
- [Docker Compose plugin](https://docs.docker.com/compose/install/)

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/wesleydeverdade/golden-raspberry-awards.git
```

Entre no diretório do projeto

```bash
  cd golden-raspberry-awards
```

Crie o arquivo .env copiando o .env.example

```bash

cp .env.example .env
```

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`NODE_ENV`

`PORT`

`DATABASE_URL`

Como esse projeto é somente uma demo, as variáveis estarão preenchidas no arquivo de exemplo :)

### 🚀 Subindo com Docker

Build e execução do container:

```bash
  docker compose up --build
```

A primeira execução vai rodar `npm run db:seed` automaticamente dentro do container golden-raspberry-awards para popular banco sqlite conforme o .csv

Parando a execução do container:

```bash
  docker compose down
```

### 💻 Acessando a aplicação

```bash
  http://localhost:3333/
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

Caso deseje rodar os testes de integração dentro do container do docker:

```bash
  docker exec -it golden-raspberry-awards sh
```

e após isso, rodar dentro do container esse comando:

```bash
  npm run test
```

para sair do container:

```bash
  exit
```
