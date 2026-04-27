import type { Resident } from "@/modules/residents/types/resident.type"

export type Medication = {
    id: string
    resident_id: string
    name: string
    dose: string
    schedule: string
    created_at?: string

    resident?: Pick<Resident, "id" | "name">
}