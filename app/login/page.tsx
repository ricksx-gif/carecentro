// app/login/page.tsx
import { LoginForm } from '@/modules/auth/components/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="
       min-h-screen
       w-full
       flex items-center justify-center
       bg-gradient-to-br from-black via-zinc-900 to-black
       ">

      <div className="w-full max-w-md">

       {/* <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            Inicia sesión 
          </h1>

          <p className="text-white/50 text-sm mt-1">
            Ingresa tus credenciales para acceder.
          </p>
        </div> */} 
        
          <LoginForm />
        
        <p className="mt-4 text-center text-sm text-white/50">
          ¿No tienes una cuenta?{' '}
          <Link 
          href="/register" 
          className="text-white hover:underline"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
