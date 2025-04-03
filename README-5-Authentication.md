# Implementação de Autenticação Segura no NestJS

Este documento explica a implementação de autenticação segura no projeto Portal de Sistemas API, utilizando as melhores práticas do NestJS.

## Visão Geral

A autenticação implementada segue o padrão JWT (JSON Web Token), que é uma abordagem stateless para autenticação. Isso significa que o servidor não precisa armazenar informações de sessão, tornando a aplicação mais escalável.

## Componentes da Autenticação

### 1. Entidade de Usuário

A entidade `User` representa um usuário no sistema:

```typescript
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
```

**Características de Segurança:**

- Senha armazenada como hash (nunca em texto puro)
- Email único para evitar duplicatas
- Timestamps para auditoria

### 2. DTOs (Data Transfer Objects)

Os DTOs definem a estrutura dos dados para registro e login:

```typescript
// LoginDto
export class LoginDto {
  @IsEmail({}, { message: 'Por favor, forneça um email válido' })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password: string;
}

// RegisterDto
export class RegisterDto {
  @IsEmail({}, { message: 'Por favor, forneça um email válido' })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'A confirmação de senha é obrigatória' })
  confirmPassword: string;
}
```

**Validação de Dados:**

- Validação de email
- Comprimento mínimo de senha
- Confirmação de senha no registro

### 3. Serviço de Usuários

O `UsersService` gerencia operações relacionadas a usuários:

```typescript
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(email: string, password: string): Promise<User> {
    // Verificar se o usuário já existe
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    // Criar novo usuário
    const user = this.usersRepository.create({
      email,
      password,
    });

    return this.usersRepository.save(user);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
}
```

**Funcionalidades:**

- Criação de usuários com verificação de duplicidade
- Validação de credenciais
- Busca de usuários por email e ID

### 4. Estratégia JWT

A estratégia JWT valida tokens e extrai informações do usuário:

```typescript
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'chave-secreta-temporaria',
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }
    return { id: user.id, email: user.email };
  }
}
```

**Configuração:**

- Extração do token do cabeçalho Authorization
- Validação da expiração do token
- Verificação da existência do usuário

### 5. Serviço de Autenticação

O `AuthService` gerencia operações de autenticação:

```typescript
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Verificar se as senhas coincidem
    if (registerDto.password !== registerDto.confirmPassword) {
      throw new UnauthorizedException('As senhas não coincidem');
    }

    // Criar usuário
    const user = await this.usersService.create(
      registerDto.email,
      registerDto.password,
    );

    // Gerar token
    const token = this.generateToken(user.id);

    return {
      message: 'Usuário registrado com sucesso',
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  async login(loginDto: LoginDto) {
    // Validar usuário
    const user = await this.usersService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Gerar token
    const token = this.generateToken(user.id);

    return {
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }
}
```

**Funcionalidades:**

- Registro de usuários
- Login com validação de credenciais
- Geração de tokens JWT

### 6. Controlador de Autenticação

O `AuthController` expõe endpoints para autenticação:

```typescript
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
```

**Endpoints:**

- `POST /auth/register`: Registra um novo usuário
- `POST /auth/login`: Autentica um usuário existente

### 7. Guard JWT

O `JwtAuthGuard` protege rotas que requerem autenticação:

```typescript
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

**Uso:**

```typescript
@Get('profile')
@UseGuards(JwtAuthGuard)
async getProfile(@CurrentUser() user: any) {
  return this.usersService.findById(user.id);
}
```

### 8. Decorador CurrentUser

O decorador `CurrentUser` facilita o acesso ao usuário autenticado:

```typescript
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
```

## Fluxo de Autenticação

1. **Registro**:
   - Cliente envia email e senha para `/auth/register`
   - Servidor valida os dados, cria o usuário e retorna um token JWT

2. **Login**:
   - Cliente envia email e senha para `/auth/login`
   - Servidor valida as credenciais e retorna um token JWT

3. **Acesso a Recursos Protegidos**:
   - Cliente envia o token JWT no cabeçalho `Authorization: Bearer <token>`
   - Servidor valida o token e permite o acesso ao recurso

## Boas Práticas de Segurança Implementadas

1. **Senhas Criptografadas**: Uso de bcrypt para hash de senhas
2. **Validação de Dados**: Uso de class-validator para validação de entrada
3. **Tokens JWT**: Autenticação stateless com tokens JWT
4. **Proteção de Rotas**: Uso de guards para proteger rotas sensíveis
5. **Tratamento de Erros**: Mensagens de erro apropriadas sem expor detalhes sensíveis
6. **Expiração de Tokens**: Tokens JWT com tempo de expiração configurável

## Como Usar a Autenticação

### Registro de Usuário

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "usuario@exemplo.com", "password": "senha123", "confirmPassword": "senha123"}'
```

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "usuario@exemplo.com", "password": "senha123"}'
```

### Acesso a Recurso Protegido

```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer <token_jwt>"
```

## Próximos Passos

1. **Implementar Refresh Tokens**: Para renovação automática de tokens
2. **Adicionar Roles/Permissões**: Para controle de acesso baseado em papéis
3. **Implementar 2FA**: Autenticação de dois fatores para maior segurança
4. **Adicionar Rate Limiting**: Para prevenir ataques de força bruta
5. **Configurar CORS**: Para controle de acesso cross-origin
