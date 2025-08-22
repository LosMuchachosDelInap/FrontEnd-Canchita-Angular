# GitHub Copilot - Contexto del Proyecto
# La Canchita de los Pibes - Sistema de Reservas

## 📋 Estado Actual del Proyecto (22 Agosto 2025)

### Tecnologías Principales:
- **Frontend**: Angular 18 SSR con Material Design
- **Backend**: PHP con MySQL 
- **Base de Datos**: MySQL (lacanchitadelospibes.sql)
- **Servidor**: XAMPP local

### Arquitectura Implementada:
- ✅ Sistema de Guards (AuthGuard, RoleGuard, AdminGuard, OwnerGuard, GuestGuard)
- ✅ Roles: Dueño, Administrador, Empleado, Cliente
- ✅ SSR-safe authentication con localStorage
- ✅ Control Flow moderno (@if, @for) - Angular 17+
- ✅ Rutas públicas y privadas
- ✅ Sistema de reservas con componentes separados

### Estructura de Rutas Actual:
```
/home                    → Público (landing page)
/reservas               → Público (catálogo de canchas) 
/reservas/nueva         → Privado (formulario reserva)
/dashboard/mis-reservas → Privado (historial usuario)
/admin/*                → Privado (panel administración)
/auth/sign-in           → Público (login)
/auth/sign-up           → Público (registro)
```

### Componentes Principales Creados:
1. **ReservasComponent** → Catálogo público de canchas
2. **NuevaReservaComponent** → Wizard de 4 pasos para reservar
3. **MisReservasComponent** → Historial/tabla de reservas del usuario
4. **HomeComponent** → Landing page con preview de canchas
5. **Sistema de Guards** → Control de acceso por roles

### Últimas Decisiones Técnicas:
- **Sintaxis Angular 17+**: Migramos de *ngIf/*ngFor a @if/@for
- **Lógica de Navegación Corregida**: 
  - "Mis Reservas" → Historial personal
  - "Reservar Canchas" → Catálogo público
- **Material Icons**: Restaurados en index.html
- **Images**: SVGs generados para canchas de ejemplo

### Configuraciones Específicas:
- **SSR Compatible**: isPlatformBrowser checks en auth.service
- **Track By**: Implementado en @for loops para performance
- **Route Guards**: Sistema completo de autorización
- **Error Handling**: Correcciones de sintaxis y estructura

### Problemas Resueltos Recientemente:
1. ❌ Icons mostrándose como texto → ✅ Google Fonts restaurado
2. ❌ SSR localStorage errors → ✅ Platform checks implementados  
3. ❌ *ngIf/*ngFor deprecated → ✅ Migrado a @if/@for
4. ❌ Lógica de reservas invertida → ✅ Rutas y componentes corregidos
5. ❌ Errores de compilación → ✅ Sintaxis y estructura arreglada

### Datos Mock Actuales:
- **3 Canchas**: Fútbol 5, Fútbol 7, Fútbol 11
- **Precios**: $2500, $3500, $5000 por hora
- **Horarios**: 08:00 - 22:00 con disponibilidad simulada
- **Estados de Reserva**: confirmada, pendiente, cancelada, completada

### Próximos Pasos Identificados:
- [ ] Conectar con backend PHP
- [ ] Implementar sistema de pagos
- [ ] Agregar notificaciones por email
- [ ] Sistema de reportes para admin
- [ ] Gestión de usuarios completa
- [ ] Dashboard de métricas

### Preferencias de Desarrollo Establecidas:
- ✅ Usar siempre @if/@for (Angular 17+)
- ✅ Standalone components
- ✅ Material Design UI
- ✅ Responsive design mobile-first
- ✅ TypeScript strict mode
- ✅ Código en español para labels/mensajes
- ✅ Documentación detallada

### Comandos de Desarrollo Frecuentes:
```bash
# Servidor desarrollo
ng serve

# Compilación
ng build

# Linting
ng lint

# Backend
cd BackEnd-Canchita && php -S localhost:8000
```

### Archivos Clave para Revisar:
- `app.routes.ts` → Configuración de rutas y guards
- `auth.service.ts` → Servicio de autenticación SSR-safe
- `shared/guards/` → Sistema de guards por rol
- `features/reservas/` → Componentes de reservas
- `features/dashboard/` → Panel de usuario
- `layouts/sidenav/` → Navegación por roles

---
**Última Actualización**: 22 Agosto 2025
**Estado**: ✅ Sistema base funcionando, listo para conectar backend
