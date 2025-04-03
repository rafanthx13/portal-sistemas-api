# Estrutura da Pasta Status

Este documento explica a estrutura e o propósito da pasta `status` e seus arquivos, que foram criados para implementar uma rota de verificação de status da API.

## Visão Geral

A pasta `status` contém dois arquivos principais:

1. `status.controller.ts` - Define o controlador que gerencia as requisições HTTP
2. `status.module.ts` - Define o módulo que organiza o controlador

Esta estrutura segue o padrão de arquitetura do NestJS, que utiliza uma abordagem modular para organizar o código.

## Arquivos da Pasta Status

### 1. status.controller.ts

Este arquivo define o controlador que responde às requisições HTTP para a rota `/status`.

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller('status')
export class StatusController {
  @Get()
  getStatus() {
    return {
      status: 'online',
      timestamp: new Date().toISOString(),
      message: 'API do Portal de Sistemas está funcionando!'
    };
  }
}
```

**Explicação:**

- `@Controller('status')` - Define um controlador que responde a requisições na rota `/status`
- `@Get()` - Define um método que responde a requisições HTTP GET
- O método `getStatus()` retorna um objeto JSON com:
    - `status`: Indica que a API está online
    - `timestamp`: Data e hora atual em formato ISO
    - `message`: Mensagem informativa sobre o estado da API

### 2. status.module.ts

Este arquivo define o módulo que organiza o controlador de status.

```typescript
import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';

@Module({
  controllers: [StatusController],
})
export class StatusModule {}
```

**Explicação:**

- `@Module()` - Define um módulo NestJS
- `controllers: [StatusController]` - Registra o controlador de status neste módulo
- Este módulo é importado no `app.module.ts` para que a rota de status esteja disponível na aplicação

## Por que Criamos Esta Estrutura?

1. **Verificação de Saúde (Health Check)**: A rota `/status` permite verificar rapidamente se a API está funcionando.

2. **Monitoramento**: Esta rota pode ser usada por ferramentas de monitoramento para verificar a disponibilidade da API.

3. **Organização do Código**: Seguimos o padrão modular do NestJS, que separa as responsabilidades em:
   - Controladores (controllers): Lidam com as requisições HTTP
   - Módulos (modules): Organizam os controladores e outros componentes

4. **Escalabilidade**: Esta estrutura facilita a adição de novas funcionalidades no futuro, mantendo o código organizado.

## Como Acessar a Rota de Status

Após iniciar a aplicação com `npm run start:dev`, você pode acessar a rota de status em:

```
http://localhost:3000/status
```

A resposta será um JSON com informações sobre o estado da API.
