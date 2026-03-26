"use client"
import  { Resident  } from  "../types/resident.type";
import  { DataTable  } from  "@/components/ui/data-table";
import  { getColumns  } from  "./columns";
import  { LoadingTable  } from  '@/shared/components/LoadingTable';
import  { Alert, AlertDescription  } from  "@/components/ui/alert"
type ResidentsTableProps  =  {
  residents: Resident[];
  fetchResidents:  ()  =>  void;
  onEdit:  (resident: Resident)  =>  void;
  loading: boolean;
  error: string  |  null;
};
export default function ResidentsTable({
  residents,
  fetchResidents,
  onEdit,
  loading,
  error, 
}: ResidentsTableProps ) {
  const columns  = getColumns({ onEdit, fetchResidents });
  
  // 🔄 LOADING
  if (loading)  {
    return  <LoadingTable />;
  }
  
  
  // ✅ DATA 
  return  (
    <div className="bg-white/5 transition-colors backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
      
  
    {error && (
      <Alert variant="destructive" className="mb-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
     )}
      
      <DataTable columns={columns} data={residents} />

    </div>
   );
}