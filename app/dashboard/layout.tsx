// Layout específico del módulo Dashboard.
// Este layout envuelve todas las rutas dentro de /dashboard
// y define la estructura base con sidebar + contenido dinámico.
'use client';
import Link from "next/link";
import { UserProvider, useUser } from "@/modules/auth/context/UserProvider";

// Componente de navegación que ahora consume el contexto de usuario
function DashboardNav() {
  const { profile, loading } = useUser();

  // No mostrar nada mientras se carga el perfil para evitar parpadeos
  if (loading) {
    return null;
  }

  return (
    <nav className="space-y-4">
      <Link href="/dashboard" className="block p-2 rounded hover:bg-blue-500" >
        Dashboard
      </Link>
      <Link href="/dashboard/residentes" className="block p-2 rounded hover:bg-blue-500">
        Residentes
      </Link>
      <Link href="/dashboard/medicaciones" className="block p-2 rounded hover:bg-blue-500" >
        Medicaciones
      </Link>
      {/* El enlace a Pagos solo se muestra si el usuario es admin */}
      {profile?.role === 'admin' && (
        <Link href="/dashboard/pagos" className="block p-2 rounded hover:bg-blue-500">
          Pagos
        </Link>
      )}
    </nav>
  );
}


function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-blue-600 text-white p-6">
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