# Estrutura de Pastas e Arquivos do NestJS

Este documento explica a estrutura de pastas e arquivos padrão de um projeto NestJS, ajudando a entender a organização do código e as convenções utilizadas.

## Visão Geral da Estrutura

Um projeto NestJS típico segue uma estrutura modular, onde cada funcionalidade é organizada em seu próprio módulo. A estrutura básica inclui:

```
projeto/
├── src/                  # Código fonte da aplicação
│   ├── main.ts           # Ponto de entrada da aplicação
│   ├── app.module.ts     # Módulo principal
│   ├── status/           # Módulo de status (exemplo)
│   │   ├── status.controller.ts
│   │   └── status.module.ts
│   └── ...               # Outros módulos
├── test/                 # Testes automatizados
├── node_modules/         # Dependências instaladas
├── package.json          # Configurações e dependências do projeto
├── tsconfig.json         # Configurações do TypeScript
└── ...                   # Outros arquivos de configuração
```

## Componentes Principais

### 1. Pasta `src/`

Esta é a pasta principal onde fica todo o código fonte da aplicação.

#### 1.1. `main.ts`

Este é o ponto de entrada da aplicação. Ele inicializa o aplicativo NestJS e configura aspectos globais.

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
```

**Explicação:**

- `NestFactory.create()` - Cria uma instância da aplicação NestJS
- `app.enableCors()` - Habilita o CORS para permitir requisições de diferentes origens
- `app.listen(3000)` - Inicia o servidor na porta 3000

#### 1.2. `app.module.ts`

Este é o módulo raiz da aplicação, que importa todos os outros módulos.

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, '..', 'database.sqlite'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    StatusModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

**Explicação:**

- `@Module()` - Define um módulo NestJS
- `imports` - Lista de módulos importados
- `controllers` - Lista de controladores disponíveis neste módulo
- `providers` - Lista de provedores (serviços, etc.) disponíveis neste módulo

### 2. Módulos

Os módulos são a unidade básica de organização no NestJS. Cada funcionalidade é encapsulada em seu próprio módulo.

#### 2.1. Estrutura de um Módulo

Um módulo típico contém:

```
modulo/
├── modulo.controller.ts  # Controladores que lidam com requisições HTTP
├── modulo.service.ts     # Serviços que contêm a lógica de negócios
├── modulo.entity.ts      # Entidades que representam tabelas no banco de dados
├── modulo.dto.ts         # Objetos de transferência de dados
└── modulo.module.ts      # Definição do módulo
```

#### 2.2. Exemplo: Módulo de Status

```
status/
├── status.controller.ts  # Controlador que responde a requisições na rota /status
└── status.module.ts      # Módulo que organiza o controlador
```

### 3. Arquivos de Configuração

#### 3.1. `package.json`

Define as dependências do projeto e scripts para executar comandos.

```json
{
  "name": "portal-de-sistemas-api",
  "version": "0.0.1",
  "scripts": {
    "build": "nest build",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:prod": "node dist/main",
    "test": "jest"
  },
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/typeorm": "^10.0.0",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1",
    "sqlite3": "^5.1.6",
    "typeorm": "^0.3.0"
  }
}
```

#### 3.2. `tsconfig.json`

Configurações do TypeScript para o projeto.

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2021",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true
  }
}
```

## Conceitos Fundamentais do NestJS

### 1. Decoradores

O NestJS utiliza decoradores para definir metadados sobre classes e métodos:

- `@Controller()` - Define um controlador
- `@Get()`, `@Post()`, etc. - Define métodos HTTP
- `@Module()` - Define um módulo
- `@Injectable()` - Define um serviço
- `@Entity()` - Define uma entidade de banco de dados

### 2. Injeção de Dependência

O NestJS utiliza injeção de dependência para gerenciar a criação e o ciclo de vida dos objetos:

```typescript
@Injectable()
export class UserService {
  constructor(private readonly repository: Repository<User>) {}
  
  findAll(): Promise<User[]> {
    return this.repository.find();
  }
}
```

### 3. Pipes, Guards e Interceptors

O NestJS oferece vários mecanismos para processar requisições:

- **Pipes**: Transformam dados de entrada
- **Guards**: Controlam o acesso a rotas
- **Interceptors**: Modificam o resultado de um método

## Boas Práticas

1. **Modularização**: Organize o código em módulos coesos
2. **Separação de Responsabilidades**: Use controladores para requisições HTTP e serviços para lógica de negócios
3. **Validação de Dados**: Use DTOs e pipes para validar dados de entrada
4. **Testes**: Escreva testes unitários e de integração
5. **Documentação**: Documente suas APIs usando Swagger ou similar

## Conclusão

A estrutura do NestJS é projetada para criar aplicações escaláveis e manuteníveis. Seguindo as convenções e boas práticas, você pode desenvolver APIs robustas de forma eficiente.
