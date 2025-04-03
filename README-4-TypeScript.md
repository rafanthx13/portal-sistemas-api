# TypeScript: Teoria e Aplicação no Projeto

Este documento explica os conceitos fundamentais do TypeScript e como ele é utilizado no projeto Portal de Sistemas API.

## O que é TypeScript?

TypeScript é um superconjunto de JavaScript desenvolvido pela Microsoft que adiciona tipagem estática opcional à linguagem. Ele foi projetado para o desenvolvimento de aplicações grandes e complexas, oferecendo recursos que ajudam a prevenir erros em tempo de desenvolvimento.

### Principais Características do TypeScript

1. **Tipagem Estática**: Permite definir tipos para variáveis, parâmetros de funções e retornos.
2. **Sintaxe Moderna**: Suporta recursos modernos do JavaScript (ES6+) e adiciona recursos próprios.
3. **Compilação**: O código TypeScript é compilado para JavaScript, permitindo compatibilidade com navegadores e ambientes mais antigos.
4. **Suporte a Objetos Orientados**: Oferece recursos de programação orientada a objetos como classes, interfaces, herança e polimorfismo.
5. **Integração com IDEs**: Fornece autocompletar, refatoração e detecção de erros em tempo real.

## Conceitos Fundamentais do TypeScript

### 1. Tipos Básicos

```typescript
// Tipos primitivos
let nome: string = "João";
let idade: number = 30;
let ativo: boolean = true;
let valor: null = null;
let indefinido: undefined = undefined;

// Arrays
let frutas: string[] = ["maçã", "banana", "laranja"];
let numeros: Array<number> = [1, 2, 3, 4, 5];

// Tuplas (arrays com tipos fixos)
let pessoa: [string, number] = ["Maria", 25];

// Enums (conjuntos de valores nomeados)
enum Cor {
  Vermelho,
  Verde,
  Azul
}
let corFavorita: Cor = Cor.Azul;

// Any (qualquer tipo)
let qualquerValor: any = 10;
qualquerValor = "texto";
qualquerValor = true;

// Void (ausência de tipo, geralmente usado para funções que não retornam valor)
function logarMensagem(): void {
  console.log("Mensagem");
}

// Never (representa valores que nunca ocorrem)
function lancarErro(): never {
  throw new Error("Erro!");
}
```

### 2. Interfaces

Interfaces definem contratos que objetos devem seguir:

```typescript
interface Usuario {
  id: number;
  nome: string;
  email: string;
  ativo?: boolean; // Propriedade opcional
}

const usuario: Usuario = {
  id: 1,
  nome: "João",
  email: "joao@exemplo.com"
};
```

### 3. Classes

Classes permitem criar objetos com propriedades e métodos:

```typescript
class Animal {
  // Propriedades
  private nome: string;
  protected especie: string;
  
  // Construtor
  constructor(nome: string, especie: string) {
    this.nome = nome;
    this.especie = especie;
  }
  
  // Métodos
  public fazerSom(): void {
    console.log("Som genérico");
  }
  
  public getNome(): string {
    return this.nome;
  }
}

// Herança
class Cachorro extends Animal {
  constructor(nome: string) {
    super(nome, "Canis");
  }
  
  public fazerSom(): void {
    console.log("Au au!");
  }
}
```

### 4. Genéricos

Genéricos permitem criar componentes reutilizáveis que funcionam com diferentes tipos:

```typescript
function primeiroElemento<T>(array: T[]): T {
  return array[0];
}

const primeiroNumero = primeiroElemento<number>([1, 2, 3]);
const primeiraString = primeiroElemento<string>(["a", "b", "c"]);
```

### 5. Decoradores

Decoradores são uma proposta experimental que permite adicionar comportamento a classes e métodos:

```typescript
function logar(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const metodoOriginal = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log(`Chamando método ${propertyKey} com argumentos:`, args);
    const resultado = metodoOriginal.apply(this, args);
    console.log(`Método ${propertyKey} retornou:`, resultado);
    return resultado;
  };
  
  return descriptor;
}

class Calculadora {
  @logar
  somar(a: number, b: number): number {
    return a + b;
  }
}
```

## TypeScript no Projeto NestJS

### Configuração do TypeScript

No projeto Portal de Sistemas API, o TypeScript é configurado através do arquivo `tsconfig.json`:

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
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false
  }
}
```

**Explicação das Configurações:**

- `module`: Define o sistema de módulos (CommonJS para Node.js)
- `declaration`: Gera arquivos de declaração (.d.ts)
- `emitDecoratorMetadata`: Habilita suporte a decoradores
- `experimentalDecorators`: Permite o uso de decoradores
- `target`: Versão do JavaScript para qual o código será compilado
- `outDir`: Diretório onde os arquivos compilados serão salvos

### Como o TypeScript é Usado no Projeto

#### 1. Decoradores para Metadados

O NestJS utiliza decoradores para definir metadados sobre classes e métodos:

```typescript
// src/status/status.controller.ts
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

Neste exemplo:

- `@Controller('status')` define um controlador que responde a requisições na rota `/status`
- `@Get()` define um método que responde a requisições HTTP GET

#### 2. Tipagem para Entidades

O TypeORM utiliza decoradores e tipos para definir entidades de banco de dados:

```typescript
// Exemplo de uma entidade (não presente no projeto atual)
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column({ default: true })
  ativo: boolean;
}
```

#### 3. Injeção de Dependência Tipada

O NestJS utiliza injeção de dependência com tipos:

```typescript
// Exemplo de um serviço (não presente no projeto atual)
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) {}

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }
}
```

#### 4. DTOs (Data Transfer Objects)

DTOs são usados para definir a estrutura dos dados transferidos entre camadas:

```typescript
// Exemplo de um DTO (não presente no projeto atual)
export class CriarUsuarioDto {
  nome: string;
  email: string;
  senha: string;
}
```

## Fluxo de Compilação e Execução

1. **Desenvolvimento**: Você escreve código TypeScript (.ts)
2. **Compilação**: O TypeScript compila o código para JavaScript (.js)
3. **Execução**: O Node.js executa o código JavaScript compilado

No projeto, este processo é gerenciado pelos scripts no `package.json`:

```json
"scripts": {
  "build": "nest build",
  "start": "nest start",
  "start:dev": "nest start --watch",
  "start:prod": "node dist/main"
}
```

- `npm run build`: Compila o projeto
- `npm run start:dev`: Compila e executa o projeto em modo de desenvolvimento com recompilação automática
- `npm run start:prod`: Executa a versão compilada para produção

## Benefícios do TypeScript no Projeto

1. **Detecção de Erros em Tempo de Desenvolvimento**: O TypeScript identifica erros antes da execução do código.
2. **Melhor Documentação**: Os tipos servem como documentação do código.
3. **Refatoração Segura**: Facilita a refatoração do código sem introduzir erros.
4. **Autocompletar e IntelliSense**: Melhora a experiência de desenvolvimento com sugestões de código.
5. **Integração com Frameworks**: O NestJS é construído com TypeScript, oferecendo uma experiência de desenvolvimento consistente.

## Conclusão

O TypeScript é uma ferramenta poderosa que adiciona tipagem estática ao JavaScript, tornando o desenvolvimento mais seguro e produtivo. No projeto Portal de Sistemas API, o TypeScript é utilizado em conjunto com o NestJS para criar uma API robusta e bem estruturada.

A combinação de TypeScript com NestJS permite aproveitar os recursos modernos da linguagem enquanto se beneficia da arquitetura modular e dos padrões de design do framework.
