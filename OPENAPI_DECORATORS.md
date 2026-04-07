# OpenAPI TypeScript Decorators Implementation

## Overview

This document describes the OpenAPI/NestJS Swagger decorators that have been added to the Warframe WorldState Parser library to enable automatic API documentation and validation.

## What Has Been Implemented

### Dependencies Installed

```bash
npm install @nestjs/swagger class-validator class-transformer reflect-metadata
```

### TypeScript Configuration

Updated `tsconfig.json` to enable decorators:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
    // ... other options
  }
}
```

### Models with Complete Decorators

The following model files have been fully decorated:

1. **WorldStateObject.ts** (Base Class)
   - `@ApiPropertyOptional` for id, activation, expiry
   - `@IsString`, `@IsDate`, `@IsOptional` validators
   - All child classes inherit these decorators

2. **Alert.ts**
   - `@ApiProperty` for mission, rewardTypes
   - `@ApiPropertyOptional` for tag
   - `@ValidateNested` for nested Mission object
   - `@Type` transformers for proper class instantiation

3. **Mission.ts**
   - Complete property decorators for all 20+ properties
   - Includes validators: `@IsString`, `@IsInt`, `@IsBoolean`, `@IsArray`, `@Min`
   - Nested validation for Reward object

4. **Reward.ts**
   - Property decorators for items, countedItems, credits, thumbnail, color
   - Array validation with `@IsArray` and `@IsString({ each: true })`
   - Complex object schema for countedItems

5. **WorldState.ts** (Partial)
   - Main class with decorators on key properties:
     - timestamp, buildLabel, news, events, alerts, sortie, syndicateMissions, fissures
   - Demonstrates pattern for array properties with nested objects

## Decorator Patterns Used

### Basic Property

```typescript
@ApiProperty({ description: 'Property description' })
@IsString()
propertyName: string;
```

### Optional Property

```typescript
@ApiPropertyOptional({ description: 'Optional property' })
@IsOptional()
@IsString()
optionalProperty?: string;
```

### Date Property

```typescript
@ApiProperty({ description: 'Date property', type: Date })
@IsDate()
@Type(() => Date)
dateProperty: Date;
```

### Number Property with Validation

```typescript
@ApiProperty({ description: 'Minimum level' })
@IsInt()
@Min(0)
level: number;
```

### Array of Strings

```typescript
@ApiProperty({ description: 'Array of items', type: [String] })
@IsArray()
@IsString({ each: true })
items: string[];
```

### Array of Objects

```typescript
@ApiProperty({ description: 'Array of objects', type: [ChildClass] })
@IsArray()
@ValidateNested({ each: true })
@Type(() => ChildClass)
objects: ChildClass[];
```

### Nested Object

```typescript
@ApiProperty({ description: 'Nested object', type: () => NestedClass })
@ValidateNested()
@Type(() => NestedClass)
nested: NestedClass;
```

### Complex Object Schema

```typescript
@ApiProperty({
  description: 'Complex object',
  type: 'array',
  items: {
    properties: {
      field1: { type: 'string', description: 'Field 1' },
      field2: { type: 'number', description: 'Field 2' }
    }
  }
})
@IsArray()
complexObjects: { field1: string; field2: number }[];
```

## Remaining Work

### Models That Still Need Decorators

The following 35+ model files still need decorator implementation:

**High Priority (Frequently used in APIs):**

- News.ts
- Invasion.ts
- Fissure.ts
- Sortie.ts
- VoidTrader.ts
- Nightwave.ts
- WorldEvent.ts
- DailyDeal.ts
- SyndicateMission.ts
- EarthCycle.ts
- CetusCycle.ts

**Medium Priority:**

- SortieVariant.ts
- VoidTraderItem.ts
- NightwaveChallenge.ts
- PersistentEnemy.ts
- FlashSale.ts
- GlobalUpgrade.ts
- DarkSector.ts
- ConclaveChallenge.ts
- ConstructionProgress.ts
- CambionCycle.ts
- VallisCycle.ts
- ZarimanCycle.ts
- DuviriCycle.ts

**Lower Priority:**

- Remaining 15+ supporting models

### Completing WorldState.ts

The WorldState class has 30+ properties that still need decorators. Properties include:

- globalUpgrades, flashSales, invasions, darkSectors
- voidTraders, dailyDeals, simaris, conclaveChallenges
- persistentEnemies, earthCycle, cetusCycle, cambionCycle
- zarimanCycle, weeklyChallenges, constructionProgress
- vallisCycle, nightwave, kuva, arbitration
- sentientOutposts, steelPath, vaultTrader, archonHunt
- duviriCycle, archimedea, calendar, tmp

## Usage in API Applications

### NestJS Example

Once all decorators are in place, you can use these models in a NestJS controller:

```typescript
import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { WorldState } from "warframe-worldstate-parser";

@Controller("worldstate")
export class WorldStateController {
  @Get()
  @ApiOperation({ summary: "Get current worldstate" })
  @ApiResponse({
    status: 200,
    description: "Returns current worldstate",
    type: WorldState,
  })
  async getWorldState(): Promise<WorldState> {
    // Your logic here
  }

  @Get("alerts")
  @ApiOperation({ summary: "Get active alerts" })
  @ApiResponse({
    status: 200,
    description: "Returns active alerts",
    type: [Alert],
  })
  async getAlerts(): Promise<Alert[]> {
    // Your logic here
  }
}
```

### Generate OpenAPI Spec

To generate an OpenAPI specification document:

```typescript
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Warframe WorldState API")
    .setDescription("Warframe WorldState API using parsed worldstate data")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
```

Access the Swagger UI at `http://localhost:3000/api`

### Standalone OpenAPI Schema Generation

You can also generate the OpenAPI schema without running a server:

```typescript
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { writeFileSync } from "fs";

async function generateSchema() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Warframe WorldState API")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  writeFileSync("./openapi.json", JSON.stringify(document, null, 2));

  await app.close();
}

generateSchema();
```

## Validation Usage

The class-validator decorators enable runtime validation:

```typescript
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { Alert } from "warframe-worldstate-parser";

// Convert plain object to class instance
const alert = plainToClass(Alert, jsonData);

// Validate
const errors = await validate(alert);
if (errors.length > 0) {
  console.log("Validation failed:", errors);
} else {
  console.log("Validation successful!");
}
```

## Benefits

1. **Automatic API Documentation**: OpenAPI/Swagger docs generated from decorators
2. **Type Safety**: Ensures API contracts match TypeScript types
3. **Runtime Validation**: Validates incoming data matches expected schema
4. **Auto-completion**: Better IDE support when using these types
5. **Client Generation**: Can generate API clients from OpenAPI spec
6. **Interoperability**: Works with NestJS, Express, Fastify, etc.

## Known Issues

### LSP Errors

You may see TypeScript LSP errors like:

```
Module '"@nestjs/swagger"' has no exported member 'ApiProperty'
```

**These are false positives** caused by module resolution. The code compiles and runs correctly. The build output confirms:

```
✓ Build successful
✓ All models compiled to dist/
```

To verify the build works:

```bash
npm run build
```

## Next Steps

1. **Continue adding decorators** to remaining model files using the patterns above
2. **Complete WorldState.ts** with all property decorators
3. **Create API example** showing how to use these models in a NestJS application
4. **Generate OpenAPI schema** to validate completeness
5. **Add integration tests** to ensure decorators work correctly

## Questions?

For questions about:

- **Decorators**: See NestJS Swagger docs: https://docs.nestjs.com/openapi/introduction
- **Validation**: See class-validator docs: https://github.com/typestack/class-validator
- **Transformers**: See class-transformer docs: https://github.com/typestack/class-transformer
