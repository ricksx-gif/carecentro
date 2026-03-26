// app/register/page.tsx
import RegisterForm from "@/modules/auth/components/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="
       min-h-screen
       w-full
       flex items-center justify-center
       bg-gradient-to-br from-black via-zinc-900 to-black
    ">
    <div className="w-full max-w-md" >

     {/*} <div className="mb-6 text-center">
        <h1 className="text-3xl font-semibold text-white tracking-tighter">
       .   Crear una cuenta
        </h1>
      </div> */}

        <RegisterForm />

        <p className="mt-4 text-center text-sm text-white/50">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" 
          className="text-white hover:underline"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
