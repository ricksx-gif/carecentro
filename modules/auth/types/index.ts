// modules/auth/types/index.ts

export type UserRole = 'OWNER' | 'ADMIN' | 'STAFF';

export type RegisterOwnerData = {
  email: string;
  password: string;
  name: string;
  centerName: string;
};

export type Credentials = {
  email: string;
  password: string;
};

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  center_id: string | null;
}