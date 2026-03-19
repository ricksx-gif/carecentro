# Semana 4 — Autenticación y Roles de Usuario (MVP)

## Objetivo

Asegurar la aplicación implementando un sistema de autenticación robusto y un control de acceso basado en roles (RBAC). El objetivo es proteger las rutas del dashboard, diferenciar entre un rol de `admin` y `enfermeria`, y restringir el acceso a módulos sensibles.

> Fuente de verdad del plan: `ROADMAP.md` y `BACKLOG.MD`.

---

## Entregables implementados

### Sistema de Autenticación

- **Página de Login**: Permite a los usuarios iniciar sesión.
  - Archivo: `app/login/page.tsx` y `modules/auth/components/LoginForm.tsx`
- **Página de Registro**: Permite a nuevos usuarios registrarse.
  - Archivo: `app/register/page.tsx` y `modules/auth/components/RegisterForm.tsx`
- **Servicio de Autenticación**: Funciones `signInWithPassword`, `signUp`, `signOut` y `getUserProfile`.
  - Archivo: `modules/auth/services/auth.service.ts`

### Control de Acceso por Roles (RBAC)

- **Base de Datos**:
  - Se creó una tabla `profiles` para extender los datos de `auth.users`.
  - Se añadió una columna `role` usando un tipo `ENUM` de PostgreSQL (`admin`, `enfermeria`).
  - Se implementó un **trigger** (`handle_new_user`) para crear un perfil automáticamente al registrar un usuario, asignando el rol `enfermeria` por defecto.
- **Middleware de Seguridad**:
  - Protege todas las rutas bajo `/dashboard`.
  - Redirige a los usuarios no autenticados a `/login`.
  - **Verifica el rol del usuario**: Si un usuario que no es `admin` intenta acceder a una ruta de administrador (ej. `/dashboard/pagos`), es redirigido a `/dashboard`.
  - Archivo: `middleware.ts`
- **Contexto de Usuario en UI**:
  - `UserProvider`: Un contexto de React que obtiene y provee los datos del perfil del usuario (incluido el rol) a toda la aplicación del dashboard.
  - `useUser`: Hook personalizado para acceder fácilmente a los datos del usuario.
  - Archivo: `modules/auth/context/UserProvider.tsx`
- **UI Dinámica**:
  - La barra de navegación lateral ahora utiliza el `useUser` hook.
  - El enlace a la sección "Pagos" **solo es visible** si el usuario tiene el rol `admin`.
  - Archivo: `app/dashboard/layout.tsx`

---

## Arquitectura aplicada

### Seguridad en Capas (Defense in Depth)

1.  **Server-Side (Middleware)**: La primera y más fuerte barrera de seguridad. El middleware en `Next.js` se ejecuta en el servidor antes de renderizar la página, impidiendo que usuarios no autorizados accedan a las rutas protegidas a nivel de red.
2.  **Client-Side (UI)**: Como segunda capa, la interfaz de usuario se adapta al rol del usuario. Ocultar los enlaces y botones no solo mejora la experiencia de usuario (UX) al no mostrar opciones irrelevantes, sino que también previene que el usuario intente realizar acciones no permitidas.

### Gestión de Perfiles de Usuario

Se utilizó el patrón recomendado por Supabase: mantener la tabla `auth.users` para la autenticación y crear una tabla `public.profiles` separada para almacenar metadatos adicionales del usuario (como el rol). Esto mantiene una separación limpia de responsabilidades.

---

## Cómo probar (manual)

1.  **Rol `enfermeria` (por defecto)**:
    - Ve a `http://localhost:3000/register` y crea un nuevo usuario.
    - Inicia sesión.
    - **Verifica**: El enlace "Pagos" en la barra lateral no debe ser visible.
    - Intenta acceder a `http://localhost:3000/dashboard/pagos` directamente en el navegador. **Verifica**: Debes ser redirigido a `/dashboard`.
2.  **Rol `admin`**:
    - Usando el explorador de tablas de Supabase, cambia manualmente el `role` del usuario que creaste a `admin` en la tabla `profiles`.
    - Vuelve a iniciar sesión con ese usuario.
    - **Verifica**: El enlace "Pagos" ahora debe ser visible en la barra lateral.
    - **Verifica**: Ahora puedes acceder a la página de Pagos sin ser redirigido.

---

## Limitaciones conocidas (Semana 4)

- **Gestión de Roles**: La asignación de roles es manual (directamente en la base de datos). No existe una interfaz para que un administrador gestione los roles de otros usuarios.
- **Interfaz de Login**: El hook `useAuth` y el formulario de login tienen una lógica simplificada que podría mejorarse con un manejo de estados y errores más detallado.

---

## Próximos pasos (según roadmap/backlog)

Semana 5: Centrarse en la **experiencia de usuario (UI/UX)**, mejorando el diseño general, implementando estados de carga (`loading states`) y creando una tabla de residentes más profesional.
