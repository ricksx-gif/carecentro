# Semana 2 — Base de Datos y CRUD de Residentes (MVP)

## Objetivo

Implementar la gestión completa de **Residentes** (CRUD) conectada a Supabase, siguiendo la arquitectura modular por dominio.

> Fuente de verdad del plan: `ROADMAP.md` y `BACKLOG.MD`.

---

## Entregables implementados

### Cliente de Supabase

- Se centraliza la creación del cliente Supabase para reutilizarlo en servicios.
  - Archivo: `lib/supabase.ts`

> Nota: las variables de entorno necesarias se gestionan en `.env.local` (no deben hardcodearse en el código).

### Módulo `residents` (feature-based)

Ubicación: `modules/residents/`

#### Services (acceso a datos)

- Operaciones contra Supabase:
  - Insert: `insertResidentTest(...)`
  - Update: `updateResident(...)`
  - Delete: `deleteResident(...)`
  - Archivo: `modules/residents/services/residents.service.ts`

#### Hooks (lógica/estado)

- Hook `useResidents()`:
  - Lee residentes desde Supabase (`select("*")`)
  - Mantiene estado en UI y expone `fetchResidents()`
  - Archivo: `modules/residents/hooks/useResidents.ts`

#### Components (UI)

- Formulario alta/edición:
  - Archivo: `modules/residents/components/ResidentForm.tsx`
- Tabla/listado + delete + seleccionar para editar:
  - Archivo: `modules/residents/components/ResidentsTable.tsx`
- Header del módulo + total:
  - Archivo: `modules/residents/components/ResidentsHeader.tsx`

### Pantalla del módulo

- Página de residentes del dashboard:
  - Archivo: `app/dashboard/residentes/page.tsx`
- Responsabilidad:
  - componer `Header + Form + Table`
  - mantener estado de selección para edición

---

## Arquitectura aplicada (capas y responsabilidades)

### 1) Components (UI)

- **No** se conectan directamente a Supabase.
- Reciben callbacks (`fetchResidents`, `onEdit`, etc.) y manejan eventos de UI.

### 2) Hooks (lógica de negocio + estado)

- Orquestan la carga y refresco de datos.
- Aíslan detalles de estado y “cuándo refrescar” del renderizado.

### 3) Services (datos)

- Único punto que ejecuta queries a Supabase.
- Mantiene el acceso a datos centralizado y testeable.

---

## Cómo probar (manual)

1. Abrir `http://localhost:3000/dashboard/residentes`.
2. Crear un residente desde el formulario.
3. Verificar que aparece en la tabla.
4. Editar: click en “Editar”, modificar datos, guardar.
5. Eliminar: click en “Eliminar”, confirmar, y verificar refresco.

---

## Limitaciones conocidas (Semana 2)

- Tipado: en algunos puntos se usa `any` (por ejemplo props) y tipos locales; es mejor consolidar un `Resident` en `modules/residents/types/`.
- Validaciones: son básicas (campos obligatorios); faltan validaciones más robustas (formatos, constraints, mensajes por campo).
- Multi-tenant: aún no se aplica aislamiento por centro/usuario (planificado en Semana 6 y seguridad en Semana 4).

---

## Próximos pasos (según roadmap/backlog)

Semana 3: implementar y completar módulos **Medicaciones** y **Pagos**, y luego avanzar con métricas financieras reales en el dashboard.

