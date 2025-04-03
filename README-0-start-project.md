# Configuração Inicial do Projeto Portal de Sistemas API

Este documento descreve os passos necessários para configurar e iniciar o projeto Portal de Sistemas API.

## Pré-requisitos

- Node.js (versão 18 ou superior)
- Git

## Passos para Configuração

1. Instalar o CLI do NestJS globalmente:

```bash
npm i -g @nestjs/cli
```

2. Criar um novo projeto NestJS:

```bash
nest new portal-de-sistemas-api
```

3. Instalar dependências adicionais:

```bash
cd portal-de-sistemas-api
npm install @nestjs/typeorm typeorm sqlite3
```

4. Iniciar a aplicação:

```bash
npm run start:dev
```

## Estrutura do Projeto

```
portal-de-sistemas-api/
├── src/
│   ├── main.ts
│   └── app.module.ts
├── database.sqlite
├── package.json
└── tsconfig.json
```

## Configuração do Banco de Dados

O projeto utiliza SQLite como banco de dados principal. O arquivo do banco de dados é criado automaticamente na raiz do projeto como `database.sqlite`.

## Comandos Úteis

- Iniciar a aplicação em modo desenvolvimento:

```bash
npm run start:dev
```

- Executar testes:

```bash
npm run test
```

- Construir a aplicação:

```bash
npm run build
```

## Próximos Passos

1. Configurar autenticação e autorização
2. Implementar módulos principais
3. Configurar validação de dados
4. Implementar testes automatizados
