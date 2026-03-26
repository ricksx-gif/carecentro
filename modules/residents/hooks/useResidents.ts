"use client";
import { useEffect, useState } from "react";
import { Resident } from "../types/resident.type";
import { getResidents } from "../services/residents.service";  // Nuevo import agregado
import { handleError } from '@/utils/handleError';  // Nuevo import agregado

export function useResidents() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const [residents, setResidents] = useState<Resident[]>([])

    async function fetchResidents() {
        try {
            setLoading(true);  // nuevo código agregado al inicio de la función para establecer el estado de carga en true
            setError(null);  // nuevo código agregado al inicio de la función para eliminar cualquier error previo
            
            const data = await getResidents();
                
            if (data instanceof Error) {
                const parsedError = handleError(data);
                throw new Error(parsedError.message);
            }   // Nuevo código en el catch para manejar errores y convertirlos a string con handleError
        
            setResidents(data); 
        } catch (err: unknown ){
            const parsedError = handleError(err);   // nuevo código en el catch para manejar errores y pasarlos al error del estado usando handleError
            setError(parsedError.message);
        } finally {
            setLoading(false);  // nuevo código en el finally para establecer el estado de carga en false una vez que finalice la operación de fetchResidents
        }
    }
  
    useEffect(() => {
        fetchResidents();
    }, []);
  
    return {
        residents,
        loading,  // nuevo código para retornar el estado de carga
        error,  // nuevo código para retornar el estado de error
        fetchResidents,
    };
}