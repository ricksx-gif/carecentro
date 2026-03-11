"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export function useResidents() {

  const [residents, setResidents] = useState<any[]>([])

  async function fetchResidents() {
    const { data, error } = await supabase
      .from("residents")
      .select("*")

    if (error){
      console.error(error)
      return
    }

     setResidents(data || [])

  }

  useEffect(() => {
    fetchResidents()
  }, [])
  return { residents, fetchResidents }
}