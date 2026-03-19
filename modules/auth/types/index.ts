// modules/auth/types/index.ts
import { Credentials } from '@supabase/supabase-js';

export type UserRole = 'admin' | 'enfermeria';

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
}

export type { Credentials };
