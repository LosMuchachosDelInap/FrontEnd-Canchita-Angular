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
  "materialDesign": "latest",
  "firebaseAuth": "latest",
  "googleLogin": "integrated"
}
```

### Authentication Configuration:
```typescript
// Firebase Config (environment.ts)
export const environment = {
  firebaseConfig: {
    // Firebase credentials
  },
  backendUrl: 'http://localhost:8000' // PHP embedded server
};

// Authentication Types
type AuthProvider = 'email' | 'google';
type UserRole = 'Dueño' | 'Administrador' | 'Empleado' | 'Cliente';
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

### Authentication Methods (UPDATED):
```typescript
// Hybrid Authentication System
interface User {
  id: number;
  email: string;
  firebase_uid?: string; // For Google users
  rol: UserRole;
  nombre: string;
  apellido: string;
}

// Firebase Google Login
const googleUser = await this.firebaseAuth.signInWithGoogle();
// Backend sync
const backendUser = await this.http.post('/google-auth.php', { firebaseUser });

// Traditional email/password
const user = await this.http.post('/validarUsuario.php', { email, password });
```

### Route Protection:
```typescript
// Público
{ path: '/home' }
{ path: '/reservas' }

// Autenticado (email OR google)
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

# Backend PHP (embedded server)
php -S localhost:8000

# Build
ng build --configuration development

# Lint
ng lint --fix

# Tests
ng test --watch=false

# Firebase
npm install firebase @angular/fire
```

### Backend Connection (UPDATED):
```bash
# PHP Embedded Server (recommended)
cd BackEnd-Canchita
php -S localhost:8000

# XAMPP (alternative)
# Start Apache + MySQL in XAMPP Control Panel
# URL: http://localhost/BackEnd-Canchita
```

---
**Instrucciones para Copilot**:
1. Siempre revisar estos archivos al empezar trabajo en el proyecto
2. Mantener estos patrones establecidos
3. Actualizar cuando se tomen nuevas decisiones técnicas
4. Priorizar consistencia sobre innovación

## 🔥 Firebase & Google Login Patterns (ACTUALIZADO - Sep 2025)

### Firebase Service Pattern:
```typescript
@Injectable({ providedIn: 'root' })
export class FirebaseAuthService {
  constructor(
    private auth: Auth,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  async signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.auth, provider);
    await this.syncWithBackend(result.user);
  }
}
```

### Google Button Styling (Official):
```scss
.google-btn {
  background-color: #dc4e41;
  color: white;
  border: none;
  
  .google-icon {
    font-family: 'Material Icons';
    font-weight: bold;
  }
}
```

### Backend Integration Pattern:
```php
// google-auth.php
header('Content-Type: application/json; charset=utf-8');
include 'cors.php';

$data = json_decode(file_get_contents('php://input'), true);
$firebase_uid = $data['firebase_uid'];
$email = $data['email'];

// Check existing user or create new
$query = "SELECT * FROM usuario WHERE firebase_uid = ? OR email = ?";
```

### Advanced Error Handling:
```typescript
// Fallback user creation
private async createFallbackUser(firebaseUser: User): Promise<void> {
  const fallbackUser: User = {
    id: Date.now(),
    email: firebaseUser.email || 'google-user@example.com',
    firebase_uid: firebaseUser.uid,
    nombre: firebaseUser.displayName?.split(' ')[0] || 'Usuario',
    apellido: firebaseUser.displayName?.split(' ')[1] || 'Google',
    rol: 'Cliente' as UserRole
  };
  
  this.authService.setUserFromFirebase(fallbackUser);
}
```

**Última Actualización**: 3 Septiembre 2025
**Firebase Integration**: ✅ Completamente funcional
