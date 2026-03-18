// modules/auth/services/auth.service.ts
import { supabase } from '@/lib/supabase';
import { Credentials } from '../types';

export const signInWithPassword = async (credentials: Credentials) => {
  const { data, error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    throw error;
  }

  return data;
};

export const signUp = async (credentials: Credentials) => {
  const { data, error } = await supabase.auth.signUp(credentials);

  if (error) {
    throw error;
  }

  return data;
};
