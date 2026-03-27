"use client";
import { useEffect, useState } from "react";
import { Resident } from "../types/resident.type";
import { getResidents, deleteResident as deleteResidentService } from "../services/residents.service";
import { handleError } from '@/utils/handleError';
import { toast } from "sonner";

export function useResidents() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const [residents, setResidents] = useState<Resident[]>([])
    
    async function fetchResidents() {
        try {
            setLoading(true);
            setError(null);
            
            const data = await getResidents();
                
            if (data instanceof Error) {
                const parsedError = handleError(data);
                throw new Error(parsedError.message);
            }
        
            setResidents(data); 
        } catch (err: unknown ){
            const parsedError = handleError(err);
            setError(parsedError.message);
        } finally {
            setLoading(false);
        }
    }
  
    useEffect(() => {
        fetchResidents();
    }, []);
    
    const deleteResident = async (resident: Resident) => {
      try  {
        setError(null);

        await deleteResidentService(resident.id);
  
        toast.success("Residente eliminado correctamente");
  
        await fetchResidents();
      
      } catch (err)  {
        const parsedError = handleError(err);
        setError(parsedError.message);

        toast.error(parsedError.message);
      } 
    };
    
   return {
        residents,
        loading,
        error,
        fetchResidents,
        deleteResident,
    };
}