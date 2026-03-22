/**
 * @file middleware.ts
 * @description Este middleware se encarga de la seguridad y el control de acceso de la aplicación.
 *
 * Sus responsabilidades principales son:
 * 1. **Protección de Rutas**: Asegura que solo los usuarios autenticados puedan acceder a las rutas del dashboard.
 * 2. **Redirección**:
 *    - Redirige a `/login` a los usuarios no autenticados que intentan acceder al dashboard.
 *    - Redirige a `/dashboard` a los usuarios ya autenticados que intentan acceder a `/login` o `/register`.
 * 3. **Control de Acceso Basado en Roles (RBAC)**:
 *    - Verifica el rol del usuario (`admin` o `enfermeria`) y restringe el acceso a ciertas rutas según su rol.
 *
 * Utiliza el cliente de Supabase para SSR (`createServerClient`) para gestionar la sesión del usuario
 * a través de las cookies en cada petición.
 */

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Rutas restringidas solo para administradores.
const adminRoutes = ['/dashboard/pagos'];
// Rutas restringidas para el rol de enfermería (y también para admin).
const enfermeriaRoutes = ['/dashboard/medicaciones', '/dashboard/residentes'];

/**
 * Función principal del middleware que se ejecuta para las rutas definidas en `config.matcher`.
 *
 * @param request - La petición entrante (`NextRequest`).
 * @returns Una respuesta (`NextResponse`) que puede ser la continuación de la petición o una redirección.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Crea un cliente de Supabase específico para el entorno de servidor (middleware/SSR).
  // Se encarga de leer y escribir las cookies de sesión de forma segura.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;

  // --- Lógica de Redirección para Usuarios Autenticados y No Autenticados ---

  // Si no hay usuario y se intenta acceder a una ruta protegida, redirigir a login.
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si ya hay un usuario, no debería poder ver las páginas de login o registro.
  if (user && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register'))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // --- Lógica de Control de Acceso por Roles (RBAC) ---
  if (user) {
    const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    // Si hay un error o el perfil no existe, redirigir al dashboard como medida de seguridad.
    if(error || !profile){
      console.warn(`Usuario sin perfil o con error intentando acceder a ${request.nextUrl.pathname}. Redirigiendo a /dashboard.`);
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
    const userRole = profile.role;
    const requestedPath = request.nextUrl.pathname;

    // El rol 'admin' tiene acceso a todas las rutas. No se aplican más restricciones.
    if(userRole === 'admin'){
      return response;
    }

    // El rol 'enfermeria' solo tiene acceso a las rutas de enfermería.
    if(userRole === 'enfermeria'){
      // Si la ruta solicitada es una ruta de admin, se le deniega el acceso.
      const isAdminRoute = adminRoutes.some(route => requestedPath.startsWith(route));
      if (isAdminRoute) {
        console.log(`Acceso denegado para rol 'enfermeria' a la ruta de admin: ${requestedPath}. Redirigiendo.`);
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
  }

  return response;
}

/**
 * Configuración del Middleware.
 *
 * El `matcher` es un filtro que define en qué rutas se ejecutará el middleware.
 * Esto es una optimización de rendimiento para evitar que se ejecute en cada petición
 * (por ejemplo, en las de archivos estáticos de Next.js como imágenes o CSS).
 *
 * Rutas cubiertas:
 * - `/dashboard/:path*`: Todas las rutas anidadas bajo `/dashboard`.
 * - `/login`, `/register`, `/`: Las páginas de autenticación y la página principal.
 */
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
    '/',
  ],
}
