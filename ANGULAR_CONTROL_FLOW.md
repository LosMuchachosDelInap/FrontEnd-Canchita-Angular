# Guía de Sintaxis Angular 17+ (Control Flow)

## Refactorización Completada ✅

Se ha actualizado toda la aplicación para usar la nueva sintaxis de control flow de Angular 17+.

## Nuevas Sintaxis a Usar

### 1. Condicionales: `@if` en lugar de `*ngIf`

#### ❌ Sintaxis Antigua (Angular <17)
```html
<div *ngIf="condition">Contenido</div>
<div *ngIf="condition; else elseBlock">Contenido</div>
<ng-template #elseBlock>Contenido alternativo</ng-template>
```

#### ✅ Nueva Sintaxis (Angular 17+)
```html
@if (condition) {
  <div>Contenido</div>
}

@if (condition) {
  <div>Contenido principal</div>
} @else {
  <div>Contenido alternativo</div>
}

@if (condition1) {
  <div>Opción 1</div>
} @else if (condition2) {
  <div>Opción 2</div>
} @else {
  <div>Opción por defecto</div>
}
```

### 2. Bucles: `@for` en lugar de `*ngFor`

#### ❌ Sintaxis Antigua (Angular <17)
```html
<div *ngFor="let item of items; index as i; trackBy: trackByFn">
  {{ i }}: {{ item.name }}
</div>
```

#### ✅ Nueva Sintaxis (Angular 17+)
```html
@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
}

@for (item of items; track item.id; let i = $index) {
  <div>{{ i }}: {{ item.name }}</div>
}

@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
} @empty {
  <div>No hay elementos</div>
}
```

### 3. Condicional Switch: `@switch` en lugar de `*ngSwitch`

#### ❌ Sintaxis Antigua (Angular <17)
```html
<div [ngSwitch]="value">
  <div *ngSwitchCase="'option1'">Opción 1</div>
  <div *ngSwitchCase="'option2'">Opción 2</div>
  <div *ngSwitchDefault>Opción por defecto</div>
</div>
```

#### ✅ Nueva Sintaxis (Angular 17+)
```html
@switch (value) {
  @case ('option1') {
    <div>Opción 1</div>
  }
  @case ('option2') {
    <div>Opción 2</div>
  }
  @default {
    <div>Opción por defecto</div>
  }
}
```

## Variables Contextuales en `@for`

### Variables disponibles:
- `$index` - Índice actual (número)
- `$count` - Total de elementos (número)
- `$first` - Es el primer elemento (boolean)
- `$last` - Es el último elemento (boolean)
- `$even` - Índice par (boolean)
- `$odd` - Índice impar (boolean)

#### Ejemplo completo:
```html
@for (user of users; track user.id; let i = $index, isFirst = $first, isLast = $last) {
  <div [class.first]="isFirst" [class.last]="isLast">
    {{ i + 1 }}. {{ user.name }}
  </div>
} @empty {
  <div>No hay usuarios</div>
}
```

## Archivos Actualizados

- ✅ `src/app/features/admin/usuarios/usuarios.html`
- ✅ `src/app/features/reservas/reservas.component.ts`
- ✅ `src/app/features/reservas/nueva-reserva.component.ts`
- ✅ `src/app/shared/components/usuarios-modal/usuarios-modal.component.html`

## Ventajas de la Nueva Sintaxis

1. **Mejor Performance**: Control flow nativo sin directivas estructurales
2. **Mejor Legibilidad**: Sintaxis más clara y familiar
3. **Mejor Tree-shaking**: Código más optimizable
4. **Type Safety**: Mejor soporte de TypeScript
5. **Bundle Size**: Archivos finales más pequeños

## Notas Importantes

- La sintaxis antigua sigue funcionando (retrocompatibilidad)
- Se recomienda migrar gradualmente
- Los elementos `@if`, `@for`, `@switch` deben estar en el nivel raíz del template
- No se pueden combinar con otras directivas estructurales en el mismo elemento

## Recordatorios para Futuro Código

- ✅ Usar `@if` en lugar de `*ngIf`
- ✅ Usar `@for` en lugar de `*ngFor`
- ✅ Usar `@switch` en lugar de `*ngSwitch`
- ✅ Incluir siempre `track` en los bucles `@for`
- ✅ Considerar usar `@empty` para mostrar estados vacíos
