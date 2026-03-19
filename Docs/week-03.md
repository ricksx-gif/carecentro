# Semana 3 — CRUD de Medicaciones y Pagos (MVP)

## Objetivo

Expandir la funcionalidad del sistema implementando la gestión completa (CRUD) para los módulos de **Medicaciones** y **Pagos**, siguiendo la arquitectura establecida. Además, se busca reemplazar las métricas estáticas del dashboard con datos financieros reales.

> Fuente de verdad del plan: `ROADMAP.md` y `BACKLOG.MD`.

---

## Entregables implementados

### Módulo `medications` (feature-based)

Ubicación: `modules/medications/`

- **Services**: Lógica de acceso a datos para la tabla `medications` en Supabase.
  - Archivo: `modules/medications/services/medications.service.ts`
- **Hooks**: Hook `useMedications` para gestionar el estado y la carga de datos en la UI.
  - Archivo: `modules/medications/hooks/useMedications.ts`
- **Components**:
  - `MedicationForm.tsx`: Formulario para crear y editar medicaciones.
  - `MedicationsList.tsx`: Listado para mostrar, editar y eliminar medicaciones.
- **Types**: Definición del tipo `Medication`.
  - Archivo: `modules/medications/types/medication.type.ts`
- **Página del módulo**:
  - Archivo: `app/dashboard/medicaciones/page.tsx`

### Módulo `payments` (feature-based)

Ubicación: `modules/payments/`

- **Services**: Lógica de acceso a datos para la tabla `payments`.
  - Archivo: `modules/payments/services/payments.service.ts`
- **Hooks**: Hook `usePayments` para la gestión de datos de pagos.
  - Archivo: `modules/payments/hooks/usePayments.ts`
- **Components**:
  - `PaymentForm.tsx`: Formulario para registrar y editar pagos.
  - `PaymentsList.tsx`: Listado de pagos con funcionalidades de edición/eliminación.
- **Types**: Definición del tipo `Payment`.
  - Archivo: `modules/payments/types/payment.type.ts`
- **Página del módulo**:
  - Archivo: `app/dashboard/pagos/page.tsx`

### Dashboard Financiero

- **Dashboard**: La página principal del dashboard ahora consume el hook `usePayments` para mostrar métricas financieras reales (ej. "Ingresos Totales").
  - Archivo: `app/dashboard/page.tsx`

---

## Arquitectura aplicada

Se ha replicado la arquitectura de capas definida en la Semana 2 para los nuevos módulos `medications` y `payments`.

- **Componentes (UI)**: Responsables únicamente del renderizado y la captura de eventos.
- **Hooks (Lógica de UI)**: Orquestan el estado, la carga de datos y las acciones del usuario.
- **Servicios (Capa de Datos)**: Centralizan toda la comunicación con Supabase, manteniendo el resto de la aplicación agnóstica a la fuente de datos.

Esta consistencia acelera el desarrollo y facilita el mantenimiento, ya que todos los módulos siguen el mismo patrón predecible.

---

## Cómo probar (manual)

1.  Navegar a `http://localhost:3000/dashboard/medicaciones`.
    - Crear, editar y eliminar medicaciones.
2.  Navegar a `http://localhost:3000/dashboard/pagos`.
    - Registrar, editar y eliminar pagos.
3.  Volver a `http://localhost:3000/dashboard`.
    - Verificar que las métricas financieras (ej. "Ingresos Totales") se actualizan en función de los pagos registrados.

---

## Limitaciones conocidas (Semana 3)

- **Relaciones de datos**: Las medicaciones y los pagos aún no están explícitamente vinculados a un residente específico en la UI, aunque la base de datos esté preparada para ello.
- **UI de Dashboard**: Las métricas son básicas. Funcionalidades como filtros por fecha o gráficos no están implementadas.
- **Seguridad**: El acceso a la sección de pagos no está restringido, lo cual es un riesgo.

---

## Próximos pasos (según roadmap/backlog)

Semana 4: Abordar la seguridad de forma prioritaria, implementando un sistema de **autenticación y roles de usuario** para proteger las rutas y restringir el acceso a módulos sensibles como el de Pagos.
