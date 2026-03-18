// app/login/page.tsx
import { LoginForm } from '@/modules/auth/components/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Inicia sesión en CareCentro
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ingresa tus credenciales para acceder al panel de administración.
          </p>
        </div>
        <div className="flex justify-center">
          <LoginForm />
        </div>
        <p className="mt-2 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
