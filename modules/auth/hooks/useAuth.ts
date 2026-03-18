// modules/auth/hooks/useAuth.ts
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPassword, signUp as signUpService } from '../services/auth.service';
import { Credentials } from '../types';

export const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: Credentials) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithPassword(credentials);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Error en el inicio de sesión. Revisa tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (credentials: Credentials) => {
    setLoading(true);
    setError(null);
    try {
      await signUpService(credentials);
      // You might want to show a success message to the user
      // For now, redirecting to login
      router.push('/login?registered=true');
    } catch (err: any)
      setError(err.message || 'Error en el registro. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return { login, signUp, loading, error };
};
