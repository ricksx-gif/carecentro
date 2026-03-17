# CareCentro - Backlog de Desarrollo (MVP)

Este backlog convierte el roadmap del proyecto en tareas técnicas que se deben implementar.

Reglas:

- Completar tareas en orden.
- Marcar con [x] cuando estén terminadas.
- No saltar módulos sin terminar los anteriores.

---

# Semana 1 — Frontend y Arquitectura Base

## Arquitectura inicial
[x] Crear estructura inicial del proyecto
[x] Configurar layout principal
[x] Crear sidebar de navegación

## Dashboard base
[x] Crear página dashboard
[x] Crear componente MetricCard
[x] Mostrar métricas básicas en dashboard

## Routing
[x] Crear ruta residentes
[x] Crear ruta medicaciones
[x] Crear ruta pagos

## Arquitectura modular
[x] Crear carpeta modules
[x] Separar lógica por dominio
[x] Organizar estructura del proyecto

---

# Semana 2 — CRUD de Residentes

## Base de datos
[x] Crear tabla residents en Supabase
[x] Definir columnas principales
[x] Configurar relaciones básicas

## Conexión backend
[x] Configurar cliente Supabase
[x] Conectar aplicación con base de datos

## CRUD residentes

### Create
[x] Crear formulario nuevo residente
[x] Validar campos

### Read
[x] Crear página lista residentes
[x] Mostrar residentes desde base de datos

### Update
[x] Crear función editar residente

### Delete
[x] Crear función eliminar residente

---

# Semana 3 — Medicaciones y Pagos

## Medicaciones

### Base de datos
[x] Crear tabla medications
[x] Relacionar medicaciones con residentes

### CRUD medicaciones
[x] Crear formulario medicación
[x] Crear lista medicaciones
[x] Editar medicación
[x] Eliminar medicación

## Pagos

### Base de datos
[x] Crear tabla payments

### CRUD pagos
[x] Registrar pago
[x] Listar pagos
[x] Editar pago
[x] Eliminar pago

## Dashboard financiero
[ ] Mostrar métricas de pagos
[ ] Mostrar ingresos totales

---

# Semana 4 — Autenticación

## Auth
[ ] Implementar login
[ ] Implementar registro

## Seguridad
[ ] Proteger rutas privadas
[ ] Implementar middleware de autenticación

## Roles
[ ] Crear rol admin
[ ] Crear rol enfermería
[ ] Restringir acceso según rol

---

# Semana 5 — UI Profesional

## Experiencia de usuario
[ ] Mejorar diseño general
[ ] Crear tabla profesional residentes

## Estados UI
[ ] Implementar loading states
[ ] Manejar errores de API

## Panel familiar
[ ] Crear vista familiar
[ ] Limitar acceso a información

## Componentes reutilizables
[ ] Crear carpeta shared/components
[ ] Unificar estilos

---

# Semana 6 — Lógica SaaS

## Reportes
[ ] Generar PDF de residentes

## Métricas
[ ] Agregar métricas avanzadas al dashboard

## Suscripciones
[ ] Diseñar modelo planes SaaS

## Multi-tenant
[ ] Separar datos por centro

## Optimización
[ ] Optimizar consultas SQL

---

# Semana 7 — Automatización

## WhatsApp
[ ] Integrar WhatsApp Business API
[ ] Crear recordatorios automáticos

## Notificaciones
[ ] Crear sistema de notificaciones internas

## Auditoría
[ ] Registrar logs del sistema
[ ] Guardar historial de acciones

## Seguridad
[ ] Revisar seguridad básica

## Testing
[ ] Realizar pruebas generales

---

# Semana 8 — Lanzamiento

## Producción
[ ] Deploy en Vercel
[ ] Configurar variables de entorno

## Dominio
[ ] Conectar dominio

## Infraestructura
[ ] Configurar backups automáticos
[ ] Configurar monitoreo

## Lanzamiento
[ ] Checklist final MVP