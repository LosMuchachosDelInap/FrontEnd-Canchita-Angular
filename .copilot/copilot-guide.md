# 🤖 GitHub Copilot - Guía de Continuidad
# La Canchita de los Pibes

> **Para mantener contexto consistente entre diferentes PCs/sesiones**

## 🎯 Cómo usar estos archivos

### **Al iniciar trabajo en nueva PC/sesión:**
1. **Lee primero**: `.copilot/project-context.md`
2. **Revisa decisiones**: `.copilot/conversation-history.md`  
3. **Aplica patrones**: `.copilot/development-preferences.md`

### **Durante el desarrollo:**
- Mantén los patrones establecidos
- Pregunta por contexto previo si es necesario
- Actualiza estos archivos con decisiones nuevas

### **Al finalizar sesión importante:**
- Actualiza `conversation-history.md` con nuevas decisiones
- Modifica `project-context.md` si hay cambios estructurales
- Commit y push de todos los cambios

## 📂 Archivos de Contexto

| Archivo | Propósito | Actualizar cuando |
|---------|-----------|-------------------|
| `project-context.md` | Estado actual completo | Cambios estructurales importantes |
| `conversation-history.md` | Historial de decisiones | Cada sesión significativa |
| `development-preferences.md` | Patrones y configuraciones | Nuevas preferencias técnicas |
| `copilot-guide.md` | Esta guía | Cambios en el workflow |

## 🔄 Workflow Recomendado

### **Inicio de Sesión**:
```bash
# 1. Actualizar código
git pull origin main

# 2. Revisar contexto
cat .copilot/project-context.md

# 3. Verificar estado
npm install && ng serve
```

### **Durante Desarrollo**:
- Mencionar: "Revisa el contexto previo en .copilot/"
- Preguntar: "¿Qué decisiones tomamos sobre [tema]?"
- Referir: "Según nuestras conversaciones anteriores..."

### **Final de Sesión**:
```bash
# 1. Actualizar contexto
# Editar .copilot/conversation-history.md

# 2. Commit todo
git add .
git commit -m "docs: actualizar contexto Copilot + [cambios]"
git push origin main
```

## 💡 Tips para Continuidad

### **Frases clave para usar con Copilot**:
- "Según nuestro contexto establecido..."
- "Mantén los patrones que definimos para..."
- "Revisa .copilot/project-context.md antes de..."
- "¿Esto está alineado con nuestras decisiones previas?"

### **Referencias rápidas**:
- **Arquitectura**: Ver `project-context.md` → "Arquitectura Implementada"
- **Problemas resueltos**: Ver `conversation-history.md` → "Sesión X"
- **Patrones de código**: Ver `development-preferences.md` → "Component Patterns"

### **Mantener sincronización**:
1. **Git frecuente** - Push/pull regular
2. **Contexto actualizado** - Editar archivos .copilot/
3. **Decisiones documentadas** - No solo código, también el "por qué"

## 🚨 Importante

### **Siempre hacer cuando:**
- Cambias arquitectura → Actualizar `project-context.md`
- Tomas decisión técnica → Actualizar `conversation-history.md`  
- Estableces nuevo patrón → Actualizar `development-preferences.md`
- Resuelves problema complejo → Documentar en todos

### **Jamás hacer:**
- Ignorar patrones establecidos sin discutir
- Cambiar arquitectura sin actualizar contexto
- Tomar decisiones técnicas sin documentar

---

## 🎪 Ejemplo de Uso

**En nueva PC, al abrir proyecto:**

```
Humano: "Hola Copilot, voy a trabajar en La Canchita de los Pibes. 
Revisa .copilot/project-context.md para entender dónde estamos."

Copilot: "Perfecto! Veo que tienes Angular 18 SSR con sistema de reservas 
implementado, guards por roles, y migramos a @if/@for. ¿En qué quieres trabajar?"

Humano: "Necesito agregar validación de email en el formulario de registro."

Copilot: "Según development-preferences.md, usamos Material Design y 
validaciones reactivas. Veo que ya tienes AuthService configurado..."
```

---
**¡Con esto tendrás continuidad perfecta entre cualquier PC! 🚀**
