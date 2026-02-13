# 🏗️ Arquitectura del Proyecto - NestJS Backend

## Visión General

El backend ha sido **migrado de Express a NestJS** con una arquitectura moderna basada en TypeScript, con pruebas completas usando **Jest + Supertest**.

### Stack Tecnológico
- **Framework**: NestJS v10.3.0
- **Runtime**: Node.js con TypeScript
- **Database**: PostgreSQL con Drizzle ORM
- **Testing**: Jest + Supertest
- **Validation**: Zod + NestJS ValidationPipe

---

## 📁 Estructura del Proyecto

```
server/
├── main.ts                 # Entry point de la aplicación
├── app.module.ts          # Módulo raíz de NestJS
├── database/
│   ├── database.module.ts # Módulo de configuración de BD
│   └── database.service.ts # Servicio de conexión Drizzle ORM
├── health/
│   ├── health.module.ts
│   ├── health.controller.ts
│   ├── health.service.ts
│   ├── health.controller.spec.ts
│   └── health.service.spec.ts
├── messages/
│   ├── messages.module.ts
│   ├── messages.controller.ts
│   ├── messages.service.ts
│   ├── messages.controller.spec.ts
│   └── messages.service.spec.ts
└── [old files - deprecated]
    ├── index.ts (Express legacy)
    ├── routes.ts (Express legacy)
    ├── storage.ts (Express legacy)
    ├── vite.ts (Express legacy)
    └── static.ts (Express legacy)

test/
├── jest-e2e.json          # Configuración Jest para tests E2E
└── app.e2e-spec.ts        # Tests E2E de la aplicación

shared/
├── schema.ts              # Esquemas Drizzle + Zod
└── routes.ts              # Rutas compartidas

client/                     # React + Vite SPA
└── src/
    └── pages/
        └── HealthCollection.tsx  # Nueva página de colección
```

---

## 🏗️ Patrones Arquitectónicos

### 1. **Modular Architecture**
Cada funcionalidad está encapsulada en su propio módulo:

```typescript
@Module({
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
```

### 2. **Dependency Injection**
NestJS inyecta dependencias automáticamente:

```typescript
@Injectable()
export class MessagesService {
  constructor(private readonly databaseService: DatabaseService) {}
}
```

### 3. **Service Layer Pattern**
- **Controllers**: Manejan HTTP y rutas
- **Services**: Lógica de negocio
- **Database Service**: Acceso a datos

```typescript
@Controller('api/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  async findAll(): Promise<Message[]> {
    return this.messagesService.findAll();
  }
}
```

---

## 📡 Endpoints API

### Health Endpoint
```
GET /health
```
Retorna colección de camisetas deportivas de la BD.

**Response** (200):
```json
{
  "status": "healthy",
  "message": "Sports t-shirts collection",
  "timestamp": "2025-02-13T12:30:00.000Z",
  "count": 6,
  "data": [
    {
      "id": 1,
      "name": "Performance Dry-Fit",
      "category": "sports",
      "price": 39.99,
      "color": "Black",
      "material": "100% Polyester Mesh",
      "features": ["Moisture-wicking", "Breathable", "Lightweight"],
      "inStock": true
    }
  ]
}
```

### Messages Endpoints
```
GET /api/messages              # Obtener todos los mensajes
POST /api/messages             # Crear nuevo mensaje
```

---

## 🧪 Testing

### Unit Tests
Cada módulo tiene tests unitarios para **Controllers** y **Services**:

```bash
npm run test                # Ejecutar todos los tests
npm run test:watch         # Modo observador
npm run test:cov           # Con cobertura
```

**Archivos de tests**:
- `health.service.spec.ts` - Tests del servicio de health
- `health.controller.spec.ts` - Tests del controlador de health
- `messages.service.spec.ts` - Tests del servicio de mensajes
- `messages.controller.spec.ts` - Tests del controlador de mensajes

### E2E Tests
Tests de integración completa con Supertest:

```bash
npm run test:e2e           # Ejecutar tests E2E
```

**Archivo**: `test/app.e2e-spec.ts`

Prueba:
- ✅ Endpoint `/health` retorna datos correctamente
- ✅ Endpoint `GET /api/messages` retorna array
- ✅ Endpoint `POST /api/messages` crea mensaje
- ✅ Validación de entrada (Zod)
- ✅ Manejo de errores

---

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev                 # Ejecutar en modo desarrollo con watch
npm start:dev             # Alias de dev

# Build & Producción
npm run build             # Compilar TypeScript a JavaScript
npm start                 # Ejecutar en producción
npm run start:prod        # Ejecutar producción compilada

# Testing
npm test                  # Ejecutar tests unitarios/integración
npm run test:watch       # Modo observador
npm run test:cov         # Con reporte de cobertura
npm run test:e2e         # Tests E2E
npm run test:debug       # Debug mode

# Database
npm run db:push          # Sincronizar esquema con BD

# Checking
npm run check            # Validar TypeScript
```

---

## 🎯 Ventajas de NestJS

| Característica | Beneficio |
|---|---|
| **Decorators** | Código más limpio y legible |
| **Modules** | Organización clara y escalable |
| **Pipes** | Validación automática de datos |
| **Guards** | Control de acceso simplificado |
| **Interceptors** | Transformación de respuestas |
| **Exception Filters** | Manejo consistente de errores |
| **Built-in Testing** | Soporte completo para Jest/Supertest |

---

## 📝 Configuración

### Jest Configuration (`jest.config.js`)
- Soporta TypeScript via `ts-jest`
- Mapeo de rutas aliases (`@shared/*`)
- Cobertura de tests en `./coverage`

### TypeScript Configuration (`tsconfig.json`)
- Target: ES2021
- Module: CommonJS (para NestJS)
- Path aliases configurados
- Emit decorators habilitado

### NestJS Configuration (`nest-cli.json`)
- Source root: `server/`
- Compilador: Basado en TypeScript
- Assets: Incluye cliente compilado en producción

---

## 🚀 Próximos Pasos

1. **Agregar más módulos** (Products, Orders, Auth)
2. **Implementar Guards** para autenticación
3. **Agregar Logging** centralizado
4. **Circuit Breaker** para llamadas externas
5. **Rate Limiting** en endpoints
6. **Swagger/OpenAPI** para documentación

---

## 📚 Referencias

- [NestJS Docs](https://docs.nestjs.com/)
- [Jest Docs](https://jestjs.io/)
- [Supertest Docs](https://github.com/visionmedia/supertest)
- [Drizzle ORM](https://orm.drizzle.team/)
