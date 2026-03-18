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
      // lógica de login (luego irá signIn)
      router.push('/login?registered=true');
    } catch (err: any) {
      setError(err.message || 'Error en el registro. Inténtalo de nuevo.');
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

  return { login, signUp, loading, error };
};