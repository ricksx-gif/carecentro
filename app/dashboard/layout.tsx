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
import { usePathname } from "next/navigation";

// NAV
function DashboardNav() {
  const { profile, loading } = useUser();
  const pathname = usePathname();

  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-10 w-full bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { href: "/dashboard/residentes", label: "Residentes", icon: <Users className="h-5 w-5" /> },
    { href: "/dashboard/medicaciones", label: "Medicaciones", icon: <Syringe className="h-5 w-5" /> },
  ];

  if (profile?.role === 'admin') {
    navLinks.push({
      href: "/dashboard/pagos",
      label: "Pagos",
      icon: <CreditCard className="h-5 w-5" />
    });
  }
    return (
  <nav className="space-y-2">
    {navLinks.map((link) => (
      <Button
        key={link.href}
        asChild
        variant="ghost"
        className={`group relative w-full justify-start gap-3 rounded-lg px-3 py-2 transition-all duration-300
          hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]
          ${
            pathname === link.href
              ? "text-white"
              : "text-white/60 hover:text-white hover:bg-white/10"
          }
        `}
      >
        <Link href={link.href} className="flex items-center gap-3 w-full relative">
          
          {/* 🔥 INDICADOR ACTIVO */}
          {pathname === link.href && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full bg-white shadow-lg" />
          )}

          {/* 🔥 ICONO (con animación) */}
          <span className="transition-transform duration-300 group-hover:scale-110">
            {link.icon}
          </span>

          {link.label}
        </Link>
      </Button>
    ))}
  </nav>
)
}

// USER PROFILE
function UserProfile() {
  const { profile, loading } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return <div className="h-10 w-full bg-muted animate-pulse rounded-lg" />;
  }

  return (
    <div className="flex flex-col gap-4 text-white/80">
      <div>
        <p className="text-sm font-semibold">
          {profile?.full_name ?? 'Usuario'}
        </p>
        <p className="text-xs text-muted-foreground">
          {profile?.role === 'admin' ? 'Administrador' : 'Enfermería'}
        </p>
      </div>

      <Button
        onClick={handleLogout}
        variant="ghost"
        className="w-full justify-start gap-3 hover:bg-white/10 text-white/80 hover:text-white"
      >
        <LogOut className="h-5 w-5" />
        Cerrar Sesión
      </Button>
    </div>
  );
}

// LAYOUT CONTENT
function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  return (
     <div className="relative flex min-h-screen bg-background p-6">

    {/* 🔥 FONDO PRO */}
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#020617] via-[#0f172a] to-black" />
      {/* SIDEBAR */}
      <aside className="w-64 relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6 flex flex-col justify-between">
        
        {/* LIGHT EFFECT */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent" />

        <div className="relative z-10">
          <h2 className="text-lg font-bold tracking-tight mb-8 flex items-center gap-3 text-white">
            <Hospital className="h-6 w-6" />
            Velora
          </h2>

          <DashboardNav />
        </div>

        <div className="relative z-10">
          <UserProfile />
        </div>

      </aside>

      {/* MAIN */}
      <main className="flex-1 ml-4 relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8">
        
        {/* LIGHT EFFECT */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />

        <div className="relative z-10">
          {children}
        </div>

      </main>

    </div>
  );
}

// ROOT LAYOUT
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <DashboardLayoutContent>
        {children}
      </DashboardLayoutContent>
    </UserProvider>
  );
}