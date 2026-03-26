export type AppError = {
  message: string
  code?: string
}

export function handleError(error: unknown): AppError {
  if (typeof error === "object" && error !== null) {
    const err = error as any

    if (err.message) {
      return {
        message: err.message,
        code: err.code,
      }
    }
  }

  if (typeof error === "string") {
    return {
      message: error,
    }
  }

  return {
    message: "Ocurrió un error inesperado",
  }
}