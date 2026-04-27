import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// 🔒 Rutas restringidas (solo OWNER y ADMIN)
const restrictedRoutes = ['/dashboard/pagos']

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
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
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const user = session?.user

  // 🔒 Si no está autenticado → login
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 🔁 Si ya está autenticado → no puede ir a login/register
  if (
    user &&
    (request.nextUrl.pathname.startsWith('/login') ||
      request.nextUrl.pathname.startsWith('/register'))
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // 🔐 Control por roles
  if (user) {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (error || !profile) {
      console.warn('Usuario sin perfil. Redirigiendo...')
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    const userRole = profile.role
    const requestedPath = request.nextUrl.pathname

    // 🔥 OWNER → acceso total
    if (userRole === 'OWNER') {
      return response
    }

    // 🔥 ADMIN → acceso casi total
    if (userRole === 'ADMIN') {
      return response
    }

    // 🔥 STAFF → acceso restringido
    if (userRole === 'STAFF') {
      const isRestrictedRoute = restrictedRoutes.some(route =>
        requestedPath.startsWith(route)
      )

      if (isRestrictedRoute) {
        console.log(`Acceso denegado para STAFF a: ${requestedPath}`)
        return NextResponse.redirect(new URL('/dashboard', request.url))
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