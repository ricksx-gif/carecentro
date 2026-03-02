"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

 const CENTER_ID = "5508e12b-2a23-4621-a75b-bd62db2a8b21"

export function useResidents() {
  const [residents, setResidents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResidents = async () => {
      const { data, error } = await supabase
        .from("residents")
        .select("*")
        .eq ("center_id", CENTER_ID)

      if (error) {
        console.error("Error fetching residents:", error)
      } else {
        setResidents(data || [])
      }

      setLoading(false)
    }

    fetchResidents()
  }, [])

  return { residents, loading }
}