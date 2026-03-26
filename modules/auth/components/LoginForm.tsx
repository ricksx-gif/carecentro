// modules/auth/components/LoginForm.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <div
      className="
        w-full max-w-md
        rounded-2xl
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-[0_0_40px_rgba(255,255,255,0.05)] shadow-black/20
        p-4
       " >

        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            Inicia sesión 
          </h1>

          <p className="text-white/50 text-sm mt-1">
            Ingresa tus credenciales para acceder.
          </p>
        </div> 
        
    <form onSubmit={handleSubmit} className="mt-6 space-y-5 w-full p-4">
      <div>
        <label
          htmlFor="email"
          className="text-sm text-white/60 mb-1 block"
        >
          Correo Electrónico
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg px-3 py-2
             bg-white/5 border border-white/10
             text-white placeholder:text-white/40
             backdrop-blur-lg
             focus:outline-none focus:ring-1
             focus:border-white/20 focus:bg-white/10
             transition-all"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="text-sm text-white/60 mb-1 block" 
        >
          Contraseña
        </label>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg px-3 py-2
             bg-white/5 border border-white/10
             text-white placeholder:text-white/40
             backdrop-blur-lg
             focus:outline-none focus:ring-1
             focus:border-white/20 focus:bg-white/10
             transition-all"
          />
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-600">
          <p>{error}</p>
        </div>
      )}

      <div>
        <Button 
         type="submit" 
         disabled={loading} 
         className=" 
           w-full mt-6
           py-2 rounded-lg
           bg-white/10
           text-white font-medium
           border border-white/10
           hover:bg-white/20
           hover:scale-[1.02]
           active:scale-[0.99]
           transition-all">
          {loading ? (
            <>
              <Loader2 className="text-sm text-white/60 mb-1 block" />
              Iniciando sesión...
            </>
          ) : (
            'Iniciar Sesión'
          )}
        </Button>
      </div>
    </form>
    </div>
  );
}
