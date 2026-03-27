import    { Card, CardContent   } from    "@/components/ui/card";
import    { useResidents   } from    "../hooks/useResidents";
// Importación faltante agregada para poder usar Alert de shadcn
import    { Alert, AlertDescription   } from    "@/components/ui/alert";


export default function FamilyPanel()  {
  const    { residents, loading, error  } = useResidents();
  
  if(loading) return  <div>Cargando...</div>;
  
  const resident = residents?.[0];
  
  if(!resident) return  
  <div>
    No hay residentes disponibles
  </div>;
  
  const calculateAge = (birthDate: string) => {
  
    const today = new Date();
    const birth = new Date(birthDate);
  
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };
  

  // Se agrega la condicional para mostrar el Alert de error, manteniendo el resto de la UI igual
  return (
    <Card>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <h2>{resident.name}</h2>

          { resident.birth_date && (
            <p>Edad: {calculateAge(resident.birth_date)}</p>
          )}

          
          
      </CardContent>
    </Card>
  );
}