// Layout específico del módulo Dashboard.
// Este layout envuelve todas las rutas dentro de /dashboard
// y define la estructura base con sidebar + contenido dinámico.
'use client';
import Link from "next/link";
import { UserProvider, useUser } from "@/modules/auth/context/UserProvider";
import { Button } from "@/components/ui/button";
import { CreditCard, Hospital, LayoutDashboard, LogOut, Syringe, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

// Componente de navegación que ahora consume el contexto de usuario y usa el nuevo sistema de diseño
function DashboardNav() {
  const { profile, loading } = useUser();

  // No mostrar nada mientras se carga el perfil para evitar parpadeos
  if (loading) {
    return <div className="space-y-2">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-10 w-full bg-primary/50 animate-pulse rounded-lg" />
      ))}
    </div>;
  }

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { href: "/dashboard/residentes", label: "Residentes", icon: <Users className="h-5 w-5" /> },
    { href: "/dashboard/medicaciones", label: "Medicaciones", icon: <Syringe className="h-5 w-5" /> },
  ];

  if (profile?.role === 'admin') {
    navLinks.push({ href: "/dashboard/pagos", label: "Pagos", icon: <CreditCard className="h-5 w-5" /> });
  }

  return (
    <nav className="space-y-2">
      {navLinks.map((link) => (
        <Button key={link.href} asChild variant="ghost" className="w-full justify-start gap-3">
          <Link href={link.href}>
            {link.icon}
            {link.label}
          </Link>
        </Button>
      ))}
    </nav>
  );
}

function UserProfile() {
  const { profile, loading } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return <div className="h-10 w-full bg-primary/50 animate-pulse rounded-lg" />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm font-semibold">{profile?.full_name ?? 'Usuario'}</p>
        <p className="text-xs text-primary-foreground/70">{profile?.role === 'admin' ? 'Administrador' : 'Enfermería'}</p>
      </div>
      <Button onClick={handleLogout} variant="ghost" className="w-full justify-start gap-3">
        <LogOut className="h-5 w-5" />
        Cerrar Sesión
      </Button>
    </div>
  )
}

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 bg-primary text-primary-foreground p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Hospital className="h-7 w-7" />
            CareCentro
          </h2>
          <DashboardNav />
        </div>
        <UserProfile />
      </aside>
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}

// El layout principal ahora provee el contexto de usuario
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </UserProvider>
  );
}