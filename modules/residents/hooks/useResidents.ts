"use client"

import { useState } from "react";

export function useResidents() {
    const [residents, setResidents] = useState([
        {id: 1, name: "Maria Lopez", age: 82},
        {id: 2, name: "Carlos Perez", age: 76},
    ])

    return {
        residents,
        setResidents,
    }
}