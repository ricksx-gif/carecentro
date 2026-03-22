// Definición del modelo de datos para un residente.
// Centraliza el tipo de dato para ser usado en toda la aplicación.

export type Resident = {
  id: string
  name: string
  birth_date: string
  // TODO: añadir más campos si es necesario en el futuro
  // por ejemplo: room_number, status, etc.
}
