# Configuraciones y Preferencias del Proyecto
# Para mantener consistencia entre sesiones de Copilot

## 🛠 Configuraciones Técnicas Establecidas

### TypeScript/Angular:
```json
{
  "strictMode": true,
  "standalone": true,
  "ssr": true,
  "controlFlow": "angular17+",
  "materialDesign": "latest"
}
```

### Estructura de Archivos Preferida:
```
src/app/
├── features/          # Componentes por funcionalidad
├── shared/            # Servicios, guards, utilities
│   ├── guards/        # AuthGuard, RoleGuard, etc.
│   ├── services/      # auth.service.ts, etc.
│   └── components/    # Componentes reutilizables
├── layouts/           # Header, footer, sidenav
└── assets/           # Imágenes, estilos globales
```

### Naming Conventions:
- **Componentes**: `kebab-case.component.ts`
- **Servicios**: `camelCase.service.ts`  
- **Guards**: `PascalCaseGuard`
- **Interfaces**: `IPascalCase`
- **Variables**: `camelCase`
- **Constantes**: `UPPER_SNAKE_CASE`

## 🎨 UI/UX Preferences

### Material Design Theme:
```scss
$primary: #2e7d32;    // Verde
$accent: #1976d2;     // Azul
$warn: #f44336;       // Rojo
```

### Responsive Breakpoints:
```scss
$mobile: 768px;
$tablet: 1024px;
$desktop: 1200px;
```

### Icons Patterns:
- **Navegación**: home, people, sports_soccer, event
- **Acciones**: add, edit, delete, visibility
- **Estados**: check_circle, warning, error, info

## 🔐 Authentication Patterns

### User Roles Hierarchy:
```
Dueño (Owner)
├── Administrador
│   ├── Empleado
│   │   └── Cliente
│   └── Bar
└── Estacionamiento
```

### Route Protection:
```typescript
// Público
{ path: '/home' }
{ path: '/reservas' }

// Autenticado
{ path: '/dashboard/*', canActivate: [AuthGuard] }

// Admin
{ path: '/admin/*', canActivate: [AuthGuard, AdminGuard] }

// Role Specific  
{ canActivate: [RoleGuard], data: { roles: ['Dueño'] } }
```

## 📱 Component Patterns

### Standalone Component Template:
```typescript
@Component({
  selector: 'app-[name]',
  standalone: true,
  imports: [CommonModule, /* Material modules */],
  template: `
    <div class="[name]-container">
      @if (condition) {
        <!-- Content -->
      }
    </div>
  `,
  styles: [`
    .[name]-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
  `]
})
```

### Service Template:
```typescript
@Injectable({
  providedIn: 'root'
})
export class ServiceName {
  private readonly baseUrl = 'http://localhost:8000/api';
  
  constructor(private http: HttpClient) {}
}
```

## 🚀 Development Workflow

### Comandos Frecuentes:
```bash
# Desarrollo
ng serve --host 0.0.0.0 --port 4200

# Build
ng build --configuration development

# Lint
ng lint --fix

# Tests
ng test --watch=false
```

### Git Workflow:
```bash
git add .
git commit -m "feat: descripción del cambio"
git push origin main
```

### Commit Message Convention:
- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `refactor:` Refactorización sin cambios funcionales
- `style:` Cambios de estilo/formato
- `docs:` Documentación

## 📊 Data Patterns

### Mock Data Structure:
```typescript
interface Cancha {
  id: number;
  nombre: string;
  tipo: string;
  precio: number;
  imagen: string;
  caracteristicas: { icon: string; nombre: string }[];
}

interface Reserva {
  id: number;
  fecha: Date;
  hora: string;
  duracion: number;
  cancha: Cancha;
  estado: 'confirmada' | 'pendiente' | 'cancelada' | 'completada';
  total: number;
}
```

## 🐛 Common Issues & Solutions

### SSR Issues:
```typescript
// ✅ USAR
if (isPlatformBrowser(this.platformId)) {
  localStorage.setItem(key, value);
}

// ❌ EVITAR
localStorage.setItem(key, value);
```

### Material Icons Missing:
```html
<!-- En index.html -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

### Control Flow Migration:
```html
<!-- ✅ USAR -->
@if (condition) { <div>Content</div> }
@for (item of items; track item.id) { <div>{{ item }}</div> }

<!-- ❌ EVITAR -->
<div *ngIf="condition">Content</div>
<div *ngFor="let item of items">{{ item }}</div>
```

---
**Instrucciones para Copilot**:
1. Siempre revisar estos archivos al empezar trabajo en el proyecto
2. Mantener estos patrones establecidos
3. Actualizar cuando se tomen nuevas decisiones técnicas
4. Priorizar consistencia sobre innovación
