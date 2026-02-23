// Layout específico del módulo Dashboard.
// Este layout envuelve todas las rutas dentro de /dashboard
// y define la estructura base con sidebar + contenido dinámico.
export default function DashboardLayout({
  children,
}: {
  // children representa el contenido de cada página hija
  // (por ejemplo: /dashboard, /dashboard/residentes, etc.)
  children: React.ReactNode;
}) {
  return (
    // Contenedor principal en modo flex para dividir sidebar y contenido
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar lateral del sistema */}
      <aside className="w-64 bg-blue-600 text-white p-6">
        
        {/* Nombre de la aplicación */}
        <h2 className="text-xl font-bold mb-8">CareCentro</h2>

        {/* Navegación principal del dashboard */}
        <nav className="space-y-4">
          <p>Dashboard</p>
          <p>Residentes</p>
          <p>Medicaciones</p>
          <p>Pagos</p>
        </nav>

      </aside>

      {/* 
        Sección principal donde se renderiza el contenido
        dinámico según la ruta activa.
        Aquí Next inyecta automáticamente el children.
      */}
      <main className="flex-1 p-10">{children}</main>

    </div>
  );
}