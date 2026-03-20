// 1. FILENAME: middleware.ts
// 2. LOCATION: /
// 3. PURPOSE: Este middleware protege las rutas del dashboard, asegurando que solo los usuarios autenticados puedan acceder.

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Definir aquí las rutas que requieren rol de administrador
const adminRoutes = ['/dashboard/pagos'];
// Definir aquí las rutas que requieren rol de enfermería
const enfermeriaRoutes = ['/dashboard/medicaciones', '/dashboard/residentes'];
 

export async function middleware(request: NextRequest) {
 let response = NextResponse.next()

const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        response.cookies.set({
          name,
          value,
          ...options,
        })
      },
      remove(name: string, options: CookieOptions) {
        response.cookies.set({
          name,
          value: '',
          ...options,
        })
      },
    },
  }
)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const user = session?.user

  // Redirigir a login si no hay usuario y se intenta acceder a rutas protegidas
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirigir al dashboard si hay usuario y se intenta acceder a login o register
  if (user && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register'))) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Lógica de control de acceso por roles
  if (user) {
    const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
    
    // Si hay un error obteniendo el perfil o no tiene, redirigimos al dashboard por seguridad
    if(error || !profile){
      console.log(`Redirecting user with no profile from ${request.nextUrl.pathname}`);
      // If the user is on the dashboard, and has no profile, we redirect them to the dashboard
      // to avoid a redirect loop.
      if(request.nextUrl.pathname.startsWith('/dashboard')){
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
      return response;
    }
    
    const userRole = profile.role;
    const requestedPath = request.nextUrl.pathname;

    // Si el usuario es admin, tiene acceso a todo.
    if(userRole === 'admin'){
      return response;
    }

    // Si el usuario es enfermeria, comprobamos si tiene acceso.
    if(userRole === 'enfermeria'){
      // An admin should not be able to access enfermeria routes if they are not explicitly allowed to.
      const isEnfermeriaRoute = enfermeriaRoutes.some(route => requestedPath.startsWith(route));
      const isAdminRoute = adminRoutes.some(route => requestedPath.startsWith(route));

      // Allow access to non-protected routes.
      if(!isEnfermeriaRoute && !isAdminRoute) {
        return response;
      }

      if (isAdminRoute && !isEnfermeriaRoute) {
        console.log(`Redirecting non-admin user from ${request.nextUrl.pathname}`);
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
  }

  return response
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
    '/',
  ],
}
