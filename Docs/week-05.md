# Semana 5 — UI/UX y Sistema de Tablas (Dashboard MVP)

## Objetivo

Mejorar significativamente la experiencia de usuario (UI/UX) del dashboard mediante la implementación de componentes reutilizables, estados visuales consistentes y un sistema de tablas profesional. El objetivo es estandarizar la interfaz, reducir duplicación de código y preparar la base para una arquitectura escalable tipo SaaS.

> Fuente de verdad del plan: `ROADMAP.md` y `BACKLOG.MD`.

---

## Entregables implementados

### Sistema de UI Reutilizable

Se creó un sistema base de componentes visuales para estandarizar la interfaz:

- **SectionCard**: Contenedor reutilizable con estilo glass (transparente + blur).
- **EmptyState**: Estado vacío para listas/tablas sin datos.
- **ErrorState**: Manejo visual de errores con opción de reintento.
- **LoadingSpinner**: Indicador de carga reutilizable.

📂 Ubicación:
- `shared/components/SectionCard.tsx`
- `shared/components/EmptyState.tsx`
- `shared/components/ErrorState.tsx`
- `shared/components/LoadingSpinner.tsx`

---

### Sistema de Tabla Modular

Se implementó una arquitectura reutilizable para tablas basada en composición:

- **TableContainer**:
  - Maneja estados: loading, error, empty
  - Encapsula lógica visual
- **DataTable (shadcn/ui)**:
  - Renderiza datos con TanStack Table

📂 Ubicación:
- `shared/components/TableContainer.tsx`
- `components/ui/data-table.tsx`

---

### Estandarización de Dropdown (UI System)

Se creó un sistema unificado para acciones en tablas:

- **DropdownItem**:
  - Variante `default` (acciones normales)
  - Variante `danger` (acciones destructivas)
  - Elimina duplicación de estilos

📂 Ubicación:
- `shared/components/DropdownItem.tsx`

---

### Refactor del Módulo de Residents

- Migración a `DataTable` + `TableContainer`
- Implementación de `columns.tsx`
- Separación clara de responsabilidades:
  - UI
  - lógica (hook)
  - servicios

📂 Archivos clave:
- `modules/residents/components/ResidentsTable.tsx`
- `modules/residents/components/columns.tsx`
- `modules/residents/hooks/useResidents.ts`

---

### Refactor del Módulo de Medications

- Eliminación de tabla manual (`MedicationsList`)
- Creación de:
  - `MedicationsTable`
  - `columns.tsx`
- Implementación de hook autónomo (`useMedications`)
- Integración completa con TableContainer

📂 Archivos clave:
- `modules/medications/components/MedicationsTable.tsx`
- `modules/medications/components/columns.tsx`
- `modules/medications/hooks/useMedications.ts`

---

### Refactor del Módulo de Payments

- Eliminación de tabla manual (`PaymentsList`)
- Creación de:
  - `PaymentsTable`
  - `columns.tsx`
- Implementación de hook autónomo (`usePayments`)
- Integración completa con sistema de tablas

📂 Archivos clave:
- `modules/payments/components/PaymentsTable.tsx`
- `modules/payments/components/columns.tsx`
- `modules/payments/hooks/usePayments.ts`

---

### Arquitectura de Hooks (Patrón Unificado)

Todos los módulos ahora siguen el mismo patrón:
