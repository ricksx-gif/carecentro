// modules/auth/hooks/useAuth.ts
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPassword, signUp as signUpService } from '../services/auth.service';
import { Credentials } from '../types';
import * as authService from '../services/auth.service';
import { RegisterOwnerData } from '../types';

export const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerOwner = async (data: RegisterOwnerData) => {
  return authService.registerOwner(data);
};

  const login = async (credentials: Credentials) => {
    setLoading(true);
    setError(null);

    try {
      // Llamada al servicio de autenticación de Supabase
      await signInWithPassword(credentials);
      // En caso de éxito, redirigir al dashboard con una recarga de página
      window.location.href = ('/dashboard');
    } catch (err: any) {
      // Si hay un error (ej. credenciales incorrectas), mostrarlo
      setError(err.message || 'Error en el inicio de sesión. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (credentials: Credentials) => {
    setLoading(true);
    setError(null);

    try {
      await signUpService(credentials);
      router.push('/login?registered=true');
    } catch (err: any) {
      setError(err.message || 'Error en el registro. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return {
  login,
  signUp,
  registerOwner, // 👈 AGREGA ESTO
  loading,
  error,
};
};