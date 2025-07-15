# FrontEnd-Canchita-Angular 🚀

Cliente web Angular para el sistema de reservas de canchas "La Canchita de los Pibes"

## 📋 Descripción

Este será el frontend del sistema "La Canchita de los Pibes", desarrollado en Angular 17+ con TypeScript. Proporcionará una interfaz de usuario moderna y responsiva para gestionar reservas de canchas deportivas.

## 🛠️ Tecnologías a Utilizar

- **Angular 17+**
- **TypeScript**
- **RxJS** - Para programación reactiva
- **Angular Material** o **Bootstrap** - Para componentes UI
- **Chart.js** - Para gráficos y estadísticas
- **FullCalendar** - Para el sistema de reservas
- **JWT** - Para autenticación
- **HttpClient** - Para comunicación con API REST

## 📁 Estructura Planificada

```
FrontEnd-Canchita-Angular/
├── src/
│   ├── app/
│   │   ├── core/                # Servicios principales
│   │   │   ├── auth/           # Autenticación
│   │   │   ├── guards/         # Guards de rutas
│   │   │   └── interceptors/   # HTTP interceptors
│   │   ├── shared/             # Componentes compartidos
│   │   │   ├── components/     # Componentes reutilizables
│   │   │   ├── pipes/          # Pipes personalizados
│   │   │   └── models/         # Interfaces y modelos
│   │   ├── features/           # Módulos de funcionalidades
│   │   │   ├── auth/          # Login/Register
│   │   │   ├── reservas/      # Gestión de reservas
│   │   │   ├── admin/         # Panel de administración
│   │   │   └── dashboard/     # Dashboard principal
│   │   └── layouts/           # Layouts de la aplicación
│   ├── assets/                # Recursos estáticos
│   └── environments/          # Configuraciones de entorno
├── angular.json              # Configuración de Angular
├── package.json             # Dependencias del proyecto
└── README.md               # Este archivo
```

## 🚀 Instalación (Próximamente)

1. **Instalar Angular CLI:**
   ```bash
   npm install -g @angular/cli
   ```

2. **Crear proyecto Angular:**
   ```bash
   ng new canchita-app --routing --style=scss
   cd canchita-app
   ```

3. **Instalar dependencias adicionales:**
   ```bash
   npm install @angular/material @angular/cdk @angular/animations
   npm install @fullcalendar/angular @fullcalendar/core
   npm install chart.js ng2-charts
   npm install @auth0/angular-jwt
   ```

4. **Configurar entorno:**
   ```bash
   # Configurar environment.ts con URL de la API
   ```

## 🔧 Configuración Planificada

### API Base URL
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost/BackEnd-Canchita/src/Controllers'
};
```

### Servicios Principales
- **AuthService** - Autenticación JWT
- **ReservasService** - Gestión de reservas
- **UsuariosService** - Gestión de usuarios
- **AdminService** - Funcionalidades de administración

## 📚 Funcionalidades Planificadas

### Para Usuarios
- ✅ Login/Registro responsive
- ✅ Dashboard personalizado
- ✅ Calendario interactivo para reservas
- ✅ Historial de reservas
- ✅ Perfil de usuario

### Para Administradores
- ✅ Panel de administración
- ✅ Gestión de empleados
- ✅ Reportes y estadísticas
- ✅ Configuración del sistema

### Características Técnicas
- ✅ Responsive design (mobile-first)
- ✅ Progressive Web App (PWA)
- ✅ Lazy loading de módulos
- ✅ Interceptores para manejo de errores
- ✅ Guards para protección de rutas
- ✅ Internacionalización (i18n)

## 🎨 Diseño UI/UX

- **Tema**: Deportivo y moderno
- **Colores**: Verde (canchas), Azul (acciones), Gris (neutro)
- **Tipografía**: Roboto o similar
- **Componentes**: Material Design o Bootstrap
- **Animaciones**: Suaves y funcionales

## 🧪 Testing (Planificado)

- **Unit Tests**: Jasmine + Karma
- **E2E Tests**: Cypress
- **Coverage**: Mínimo 80%

## 🔄 Arquitectura de Comunicación

```
┌─────────────────────────────────┐
│     Angular Frontend            │
│                                 │
│  ┌─────────────────────────────┐│
│  │     HTTP Client             ││
│  │   - JWT Headers             ││
│  │   - Error Handling          ││
│  │   - Loading States          ││
│  └─────────────────────────────┘│
└─────────────────────────────────┘
            │
            │ REST API Calls
            │
┌─────────────────────────────────┐
│       PHP Backend              │
│                                 │
│  ┌─────────────────────────────┐│
│  │     API Endpoints           ││
│  │   - JSON Responses          ││
│  │   - JWT Authentication      ││
│  │   - CORS Headers            ││
│  └─────────────────────────────┘│
└─────────────────────────────────┘
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Add: nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Autores

- **Los Muchachos del INAP** - *Desarrollo inicial* - [LosMuchachosDelInap](https://github.com/LosMuchachosDelInap)

## 📞 Contacto

Para soporte técnico o consultas:
- Email: info@canchitapibes.com
- Teléfono: +54 11 1234-5678

---

⚠️ **Nota**: Este es un proyecto en desarrollo. El código Angular se creará próximamente.

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
