// Layout específico del módulo Dashboard.
// Este layout envuelve todas las rutas dentro de /dashboard
// y define la estructura base con sidebar + contenido dinámico.
'use client';
import Link from "next/link";
import { UserProvider, useUser } from "@/modules/auth/context/UserProvider";
import { Button } from "@/components/ui/button";

// Componente de navegación que ahora consume el contexto de usuario y usa el nuevo sistema de diseño
function DashboardNav() {
  const { profile, loading } = useUser();

  // No mostrar nada mientras se carga el perfil para evitar parpadeos
  if (loading) {
    return null;
  }

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/residentes", label: "Residentes" },
    { href: "/dashboard/medicaciones", label: "Medicaciones" },
  ];

  if (profile?.role === 'admin') {
    navLinks.push({ href: "/dashboard/pagos", label: "Pagos" });
  }

  return (
    <nav className="space-y-2">
      {navLinks.map((link) => (
        <Button key={link.href} asChild variant="ghost" className="w-full justify-start">
          <Link href={link.href}>
            {link.label}
          </Link>
        </Button>
      ))}
    </nav>
  );
}

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 bg-primary text-primary-foreground p-6">
        <h2 className="text-xl font-bold mb-8">CareCentro</h2>
        <DashboardNav />
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