# CareCentro - Backlog de Desarrollo (MVP)

Este backlog convierte el roadmap del proyecto en tareas técnicas estructuradas para implementación con IA.

Reglas:

- Completar tareas en orden
- Marcar con [x] cuando estén terminadas
- No saltar módulos sin terminar los anteriores

## Flujo de trabajo con IA

- Claude es responsable de leer y analizar el BACKLOG.md
- Claude debe seleccionar la siguiente tarea a implementar
- Claude debe diseñar la solución
- Claude debe generar instrucciones exactas para DeepSeek

- DeepSeek NO tiene acceso al BACKLOG.md
- DeepSeek solo ejecuta instrucciones proporcionadas
- DeepSeek NO debe tomar decisiones de arquitectura
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
[x] Mostrar métricas de pagos
[x] Mostrar ingresos totales

---

# Semana 4 — Autenticación

## Auth
[x] Implementar login
[x] Implementar registro

## Seguridad
[x] Proteger rutas privadas
[x] Implementar middleware de autenticación

## Roles
[x] Crear rol admin
[x] Crear rol enfermería
[x] Restringir acceso según rol

---

# Semana 5 — UI Profesional

## Experiencia de usuario
[x] Mejorar diseño general
[x] Crear tabla profesional residentes

---

## TASK ID: UI-01
Título: Implementar loading states

Descripción:
Agregar estados de carga en componentes del sistema para mejorar la experiencia de usuario.

Criterios de aceptación:
- [x] Mostrar indicador de carga en tablas
- [x] Mostrar loading en formularios
- [x] Evitar bloqueos completos de UI

---

## TASK ID: UI-02
Título: Manejo de errores de API

Descripción:
Implementar manejo de errores en llamadas a la API y mostrar feedback al usuario.

Criterios de aceptación:
- [x] Capturar errores en hooks
- [x] Mostrar mensajes de error en UI
- [x] Evitar fallos silenciosos

---

## TASK ID: UI-03
Título: Panel familiar

Descripción:
Crear una vista para familiares con acceso limitado a información del residente.

Criterios de aceptación:
- [x] Crear nueva vista
- [x] Restringir datos sensibles
- [x] Validar permisos

---

## TASK ID: UI-04
Título: Componentes reutilizables

Descripción:
Crear sistema de componentes compartidos para mejorar consistencia.

Criterios de aceptación:
- [x] Crear carpeta shared/components
- [x] Unificar estilos
- [x] Reutilizar componentes existentes

---

# Semana 6 — Lógica SaaS

## TASK ID: SAAS-01
Título: Generar reportes PDF

Descripción:
Permitir generar reportes PDF de residentes.

Criterios de aceptación:
- [x] Generar PDF desde datos reales
- [x] Diseño legible
- [x] Descarga funcional

---

## TASK ID: SAAS-02
Título: Métricas avanzadas

Descripción:
Agregar métricas avanzadas al dashboard.

Criterios de aceptación:
- [x] Mostrar nuevas métricas
- [x] Integrar con datos existentes
- [x] Visualización clara

---

## TASK ID: SAAS-03
Título: Modelo de suscripciones

Descripción:
Diseñar sistema de planes para SaaS.

Criterios de aceptación:
- [ ] Definir tipos de planes
- [ ] Asociar funcionalidades a planes
- [ ] Preparar base para pagos

---

## TASK ID: SAAS-04
Título: Multi-tenant

Descripción:
Separar datos por centro (multi-tenant).

Criterios de aceptación:
- [ ] Aislar datos por organización
- [ ] Ajustar queries
- [ ] Validar acceso por usuario

---

## TASK ID: SAAS-05
Título: Optimización de consultas

Descripción:
Optimizar consultas SQL para mejorar rendimiento.

Criterios de aceptación:
- [ ] Reducir tiempos de respuesta
- [ ] Evitar consultas innecesarias
- [ ] Revisar índices

---

# Semana 7 — Automatización

## TASK ID: AUTO-01
Título: Integración WhatsApp

Descripción:
Integrar WhatsApp Business API para comunicación.

Criterios de aceptación:
- [ ] Conectar API
- [ ] Enviar mensajes básicos
- [ ] Manejar errores

---

## TASK ID: AUTO-02
Título: Recordatorios automáticos

Descripción:
Crear sistema de recordatorios de medicación.

Criterios de aceptación:
- [ ] Programar envíos
- [ ] Asociar a residentes
- [ ] Validar ejecución

---

## TASK ID: AUTO-03
Título: Notificaciones internas

Descripción:
Sistema de notificaciones dentro de la app.

Criterios de aceptación:
- [ ] Crear sistema de notificaciones
- [ ] Mostrar en UI
- [ ] Marcar como leídas

---

## TASK ID: AUTO-04
Título: Auditoría del sistema

Descripción:
Registrar acciones importantes del sistema.

Criterios de aceptación:
- [ ] Guardar logs
- [ ] Registrar usuario y acción
- [ ] Consultar historial

---

## TASK ID: AUTO-05
Título: Seguridad general

Descripción:
Revisar seguridad del sistema.

Criterios de aceptación:
- [ ] Validar inputs
- [ ] Revisar permisos
- [ ] Prevenir vulnerabilidades

---

## TASK ID: AUTO-06
Título: Testing general

Descripción:
Realizar pruebas completas del sistema.

Criterios de aceptación:
- [ ] Probar módulos principales
- [ ] Detectar errores
- [ ] Validar flujos críticos

---

# Semana 8 — Lanzamiento

## TASK ID: DEPLOY-01
Título: Deploy en producción

Criterios de aceptación:
- [ ] Deploy en Vercel
- [ ] Configurar variables de entorno

---

## TASK ID: DEPLOY-02
Título: Configuración de dominio

Criterios de aceptación:
- [ ] Conectar dominio
- [ ] Verificar acceso

---

## TASK ID: DEPLOY-03
Título: Infraestructura

Criterios de aceptación:
- [ ] Configurar backups
- [ ] Configurar monitoreo

---

## TASK ID: DEPLOY-04
Título: Lanzamiento MVP

Criterios de aceptación:
- [ ] Checklist completo
- [ ] Sistema funcional