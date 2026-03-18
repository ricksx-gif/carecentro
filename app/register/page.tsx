// app/register/page.tsx
import RegisterForm from "@/modules/auth/components/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Crear una cuenta
        </h2>
        <RegisterForm />
        <p className="text-sm text-center text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
