// modules/auth/components/RegisterForm.tsx
"use client";

import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RegisterForm() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [centerName, setCenterName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { registerOwner, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden", {
        style: { 
           background: "rgba(0,0,0,0.8)",
           color: "#fff",
           border: "1px solid rgba(255,255,255,0.1)",
           backdropFilter: "blur(10px)",
        },
      }) 
      return
    }
      try {
       await registerOwner({
       email, 
       password,
       name,
       centerName,
     });

     // REDIRECT AQUI
     router.push("/dashboard")

    }catch (err) {
      console.error(err);
    }
  };

  return (
  <div
    className="
    w-full max-w-md
    rounded-3xl
    bg-white/5 backdrop-blur-2xl
    border border-white/10
    shadow-[0_10px_50px_rgba(0,0,0,0.5)]
    p-6
  "
  >
    <div className="mb-6 text-center">
      <h1 className="text-3xl font-semibold text-white tracking-tight">
        Crear una cuenta
      </h1>
    </div>

    <form onSubmit={handleSubmit} className="mt-6 space-y-6 w-full">
      
      {/* Nombre */}
      <div className="space-y-2">
        <label className="text-white/60 text-sm">
          Nombre completo
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl px-3 py-2.5
          bg-white/5 border border-white/10
          text-white
          focus:ring-2 focus:ring-white/20
          outline-none transition-all"
        />
      </div>

      {/* Centro */}
      <div className="space-y-2">
        <label className="text-white/60 text-sm">
          Nombre del centro
        </label>
        <input
          type="text"
          required
          value={centerName}
          onChange={(e) => setCenterName(e.target.value)}
          className="w-full rounded-xl px-3 py-2.5
          bg-white/5 border border-white/10
          text-white
          focus:ring-2 focus:ring-white/20
          outline-none transition-all"
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-white/60 text-sm">
          Correo Electrónico
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl px-3 py-2.5
          bg-white/5 border border-white/10
          text-white
          focus:ring-2 focus:ring-white/20
          outline-none transition-all"
        />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label className="text-white/60 text-sm">
          Contraseña
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl px-3 py-2.5
          bg-white/5 border border-white/10
          text-white
          focus:ring-2 focus:ring-white/20
          outline-none transition-all"
        />
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <label className="text-white/60 text-sm">
          Confirmar contraseña
        </label>
        <input
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded-xl px-3 py-2.5
          bg-white/5 border border-white/10
          text-white
          focus:ring-2 focus:ring-white/20
          outline-none transition-all"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="text-sm text-red-500">
          {error}
        </div>
      )}

      {/* Botón */}
      <button
        type="submit"
        disabled={loading}
        className="w-full mt-4
        py-2.5 rounded-xl
        bg-white text-black font-semibold
        hover:bg-white/90
        transition-all"
      >
        {loading ? "Creando cuenta..." : "Crear cuenta"}
      </button>
    </form>
  </div>
);
}
