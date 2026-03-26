import { useState } from "react";
import { Medication } from "../types/medication.type";
import { handleError } from "@/utils/handleError";
import {
  insertMedication,
  getMedicationsByResident,
  deleteMedication,
  updateMedication,
} from "../services/medications.service";

export function useMedications() {
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState<string | null>(null);
  const [medications, setMedications] = useState<Medication[]>([]);

  async function fetchMedications(residentId: string) {
    try {
      setLoading(true);
      setError(null);
      
      const data = await getMedicationsByResident(residentId);

      setMedications(data || []);
    } catch (err: unknown) {
      const parsedError = handleError(err);
      setError(parsedError.message);
    } finally {
      setLoading(false);
    }
  }

  async function createMedication(medication: Omit<Medication, "id" | "created_at">) {
    try {
      setLoading(true);
      setError(null);
      
      await insertMedication(medication);
    

      await fetchMedications(medication.resident_id);
    } catch (err: unknown) {
      const parsedError = handleError(err);
      setError(parsedError.message);
    } finally {
      setLoading(false);
    }
  }

  async function editMedication(  
    medicationId: string,  
    residentId: string,  
    medication: Pick<Medication, "name" | "dose" | "schedule">  
  ) {
    try {
      setLoading(true);
      setError(null);
      
      await updateMedication(medicationId, medication);

      await fetchMedications(residentId);
    } catch (err: unknown) {
      const parsedError = handleError(err);
      setError(parsedError.message);
    } finally {
      setLoading(false);
    }
  }

  async function removeMedication(medicationId: string, residentId: string) {
    try {
      setLoading(true);
      setError(null);
      
      await deleteMedication(medicationId);

      await fetchMedications(residentId);
    } catch (err: unknown) {
      const parsedError = handleError(err);
      setError(parsedError.message);
    } finally {
      setLoading(false);
    }
  }

  return {  
    medications,  
    loading,  
    error,  
    fetchMedications,  
    createMedication,  
    editMedication,  
    removeMedication,  
  };
}