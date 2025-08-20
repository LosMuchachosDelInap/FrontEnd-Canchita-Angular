# Comandos para habilitar Angular SSR

# 1. Agregar Angular Universal
ng add @nguniversal/express-engine

# 2. Construir para SSR
ng build --configuration production
ng run tu-app:server:production

# 3. Servir la aplicación
npm run serve:ssr

# Notas importantes:
# - SSR renderiza la página inicial en el servidor
# - Las interacciones posteriores siguen siendo SPA
# - Mejor para SEO y carga inicial
# - Requiere servidor Node.js para producción
