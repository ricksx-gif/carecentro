// 1. FILENAME: middleware.ts
// 2. LOCATION: /
// 3. PURPOSE: Este middleware protege las rutas del dashboard, asegurando que solo los usuarios autenticados puedan acceder.

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Definir aquí las rutas que requieren rol de administrador
const adminRoutes = ['/dashboard/pagos'];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // Si omites esta parte, el usuario se deslogueará al refrescar la página.
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          // Si omites esta parte, el usuario no podrá desloguearse.
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
    data: { user },
  } = await supabase.auth.getUser()

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
    const isAdminRoute = adminRoutes.some(route => request.nextUrl.pathname.startsWith(route));

    if (isAdminRoute) {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      // Si no tiene perfil o no es admin, redirigir
      if (error || !profile || profile.role !== 'admin') {
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
