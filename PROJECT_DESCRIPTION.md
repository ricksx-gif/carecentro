# CareCentro — Contexto del Proyecto

## Descripción del Proyecto

CareCentro es una plataforma SaaS diseñada para ayudar a centros de cuidado de adultos mayores a gestionar residentes, medicaciones y pagos de forma estructurada y digital.

El sistema permite a administradores y cuidadores registrar información de residentes, tratamientos médicos y pagos realizados, todo desde un panel administrativo centralizado.

El proyecto se está desarrollando como un **Minimum Viable Product (MVP)** con arquitectura escalable que permitirá evolucionar hacia un SaaS completo.

---

# Objetivo del SaaS

El objetivo de CareCentro es proporcionar un sistema digital que simplifique la gestión diaria de centros de cuidado para adultos mayores.

La plataforma busca:

- centralizar la información de los residentes
- registrar medicaciones asociadas a cada residente
- gestionar pagos y registros financieros
- mejorar la organización administrativa del centro
- reducir errores en registros manuales
- proporcionar una base tecnológica escalable

---

# Problema que Resuelve

Muchos centros de cuidado pequeños y medianos gestionan su información utilizando:

- hojas de cálculo
- registros en papel
- sistemas desconectados

Esto genera problemas como:

- pérdida de información médica
- dificultad para llevar control de medicaciones
- falta de visibilidad financiera
- duplicación de información
- procesos administrativos ineficientes

CareCentro busca resolver estos problemas proporcionando **una única plataforma digital para la gestión del centro**.

---

# Funcionalidades Principales

Actualmente el MVP incluye tres módulos principales.

## Módulo Residents

Permite gestionar la información de los residentes de forma eficiente y profesional.

Funcionalidades:

- **Crear, actualizar y eliminar** residentes a través de un formulario en una ventana modal.
- **Visualizar residentes** en una tabla profesional con paginación, búsqueda por nombre y ordenamiento de columnas.
- **Acciones rápidas** (editar, eliminar) en cada fila de la tabla para una gestión ágil.

---

## Módulo Medications

Permite registrar medicaciones asociadas a cada residente.

Funcionalidades:

- registrar medicaciones
- visualizar medicaciones por residente
- eliminar medicaciones
- relación directa con residentes

---

## Módulo Payments

Permite registrar pagos realizados por residentes.

Funcionalidades:

- registrar pagos
- visualizar historial de pagos
- eliminar pagos
- relación directa con residentes

---

# Tecnologías Utilizadas

## Frontend

- Next.js (App Router)
- React
- TypeScript

## Estilos

- Tailwind CSS

## Backend y Base de Datos

- Supabase
- PostgreSQL

## Herramientas de Desarrollo

- Cursor AI
- Git
- GitHub

---

# Arquitectura del Sistema

El sistema utiliza una **Feature-Based Architecture**.

Cada funcionalidad del sistema se implementa como un módulo independiente.

Esto permite:

- escalabilidad
- mantenibilidad
- separación clara de responsabilidades
- desarrollo modular

---

# Estructura de Carpetas

app/
dashboard/

modules/
residents/
medications/
payments/

lib/
supabase.ts

Docs/


---

# Estructura de un Módulo

Cada módulo sigue la misma estructura.

modules/
module-name/
components/
hooks/
services/
types/


---

# Explicación de Cada Capa

## Components

Contienen la interfaz de usuario.

Responsabilidades:

- formularios
- tablas
- botones
- eventos de usuario

Los componentes **no deben comunicarse directamente con la base de datos**.

---

## Hooks

Los hooks contienen la lógica de negocio.

Ejemplos:

- useResidents
- useMedications
- usePayments

Responsabilidades:

- manejar estado
- llamar servicios
- actualizar UI

---

## Services

Los servicios se comunican con Supabase.

Ejemplo:

- insertResident()
- insertMedication()
- insertPayment()

Responsabilidades:

- consultas a la base de datos
- operaciones CRUD

---

## Types

Define los modelos de datos con TypeScript en su propia carpeta.

Ejemplo de archivo: `modules/residents/types/resident.type.ts`

Ejemplo de tipo:

- Resident
- Medication
- Payment

Esto garantiza un tipado fuerte y centralizado en todo el sistema.

---

# Módulos Actuales del Sistema

modules
residents
medications
payments


Cada módulo es independiente.

Esto permite agregar nuevos módulos en el futuro como:

staff
appointments
medical_records
reports


---

# Arquitectura de Base de Datos

El modelo actual es relacional.

residents
│
├── medications
│
└── payments


Relaciones:

- un residente puede tener múltiples medicaciones
- un residente puede tener múltiples pagos

Claves foráneas:

medications.resident_id → residents.id
payments.resident_id → residents.id


---

# Reglas para Crear Nuevos Módulos

Todo nuevo módulo debe seguir la estructura:

modules/
module-name/
components/
hooks/
services/
types/


Reglas:

1. Los componentes no deben acceder directamente a la base de datos.
2. Toda lógica de datos debe pasar por hooks.
3. Los servicios son los únicos que llaman a Supabase.
4. Cada módulo debe ser independiente.

5. Evitar dependencias cruzadas entre módulos.

---

# Escalabilidad del Sistema

El sistema está diseñado para crecer de forma modular.

Para mantener la escalabilidad:

- usar arquitectura modular
- mantener separación de responsabilidades
- reutilizar hooks y servicios cuando sea posible
- evitar lógica duplicada
- mantener consistencia entre módulos

---

# Roadmap de Desarrollo

El desarrollo del sistema sigue un roadmap estructurado de 8 semanas para construir el MVP del SaaS.

Actualmente el proyecto ha completado las siguientes etapas.

**Semana 1**  
Configuración inicial del proyecto  
Inicialización de Next.js  
Configuración del entorno de desarrollo  
Conexión con Supabase  

**Semana 2**  
Diseño del esquema de base de datos  
Definición de la arquitectura modular  
Implementación del módulo Residents (CRUD básico)

**Semana 3**  
Modelo de medicaciones vinculado a residentes  
CRUD completo del módulo Medications  
Modelo de pagos vinculado a residentes  
CRUD completo del módulo Payments

**Semana 4**
Implementación de autenticación y roles de usuario.

**Semana 5**
Mejora de la interfaz de usuario y experiencia de usuario.

---
Estado actual del proyecto:

**Semana 5 — UI Profesional completada**

Se han finalizado tareas clave para mejorar la experiencia de usuario:
- **Tabla de Residentes Profesional:** Se implementó una tabla de datos avanzada con búsqueda, paginación y ordenamiento.
- **Formularios en Modales:** La creación y edición de residentes ahora se realiza en ventanas modales (Dialogs), mejorando el flujo de trabajo.
- **Diseño General:** Se ha mejorado la consistencia visual y la usabilidad del módulo de residentes.

El sistema actualmente incluye:

- Módulo Residents (con UI profesional)
- Módulo Medications
- Módulo Payments
- Autenticación de usuarios

---

# Visión a Largo Plazo

CareCentro evolucionará hacia una plataforma SaaS completa para la gestión de centros de cuidado.

En el futuro podrá incluir:

- historial médico completo
- gestión de personal
- recordatorios de medicación
- reportes administrativos
- paneles analíticos
- arquitectura multi-tenant

## Plan de desarrollo

El proyecto sigue dos documentos principales:

ROADMAP.md → planificación general del proyecto  
BACKLOG.md → tareas técnicas que deben implementarse

Las tareas del backlog deben completarse en orden.



































































































































































































































