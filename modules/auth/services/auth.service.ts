// modules/auth/services/auth.service.ts
import { supabase } from '@/lib/supabase';
import { Credentials, Profile } from '../types';

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

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
};

export const getUserProfile = async (): Promise<Profile | null> => {
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profileError) {
    // No hemos lanzado un error aquí por si el perfil aún no se ha creado.
    // En un futuro, se podría loggear este evento.
    console.error('Error fetching profile:', profileError);
    return null;
  }

  return profile;
};
