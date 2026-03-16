# Semana 1 — Frontend y Arquitectura Base (MVP)

## Objetivo

Construir la base del frontend y dejar una arquitectura inicial escalable para el SaaS CareCentro:

- Home personalizada
- Dashboard base
- Layout con sidebar
- Rutas principales del MVP (Residentes / Medicaciones / Pagos)
- Componente reutilizable `MetricCard`
- Estructura modular inicial (`modules/`)

> Fuente de verdad del plan: `ROADMAP.md` y `BACKLOG.MD`.

---

## Entregables implementados

### UI base (App Router)

- **Home**: pantalla de bienvenida.
  - Archivo: `app/page.tsx`
- **Layout raíz**: layout global (fuentes, `globals.css`, metadata).
  - Archivo: `app/layout.tsx`
- **Dashboard**: pantalla base con tarjetas de métricas.
  - Archivo: `app/dashboard/page.tsx`
- **Layout del dashboard**: sidebar + contenido.
  - Archivo: `app/dashboard/layout.tsx`

### Routing

Rutas base creadas dentro del dashboard:

- `app/dashboard/residentes/page.tsx`
- `app/dashboard/medicaciones/page.tsx`
- `app/dashboard/pagos/page.tsx`

### Componente reutilizable

- **`MetricCard`**: tarjeta simple para mostrar KPIs.
  - Archivo: `components/MetricCard.tsx`

### Estilos

- Tailwind CSS configurado y usado en la UI.
  - Archivo: `app/globals.css`

---

## Arquitectura (decisiones y por qué)

### Next.js App Router

Se usa **App Router** (carpeta `app/`) por:

- escalabilidad a layouts anidados
- composición por rutas (dashboard y módulos)
- estructura consistente para un SaaS que crecerá

### Layout anidado para el Dashboard

Se definió `app/dashboard/layout.tsx` como layout compartido para:

- reutilizar el sidebar en todas las pantallas internas
- mantener la navegación consistente
- evitar duplicación de UI

### Preparación para Feature-Based Architecture

En Semana 1 se deja lista la base para trabajar por **módulos por dominio** (que se completa en semanas posteriores con lógica real y capa de datos).

---

## Cómo ejecutar en local

1. Instalar dependencias:

```bash
npm install
```

2. Levantar el entorno:

```bash
npm run dev
```

3. Abrir:

- Home: `http://localhost:3000`
- Dashboard: `http://localhost:3000/dashboard`

---

## Limitaciones conocidas (Semana 1)

- Las métricas del dashboard son **base/placeholder** (no conectadas a la base de datos).
- No hay autenticación ni protección de rutas (planificado en Semana 4).

---

## Próximos pasos (según el roadmap)

Semana 2: Base de datos y CRUD completo de **Residentes** (con Supabase), manteniendo separación por capas y estructura modular.

