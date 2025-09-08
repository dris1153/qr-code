export const getErrorMessage = async (error: string | string[]): Promise<string> => {
  if (Array.isArray(error)) {
    return `error.${error[0]}`
  }
  return `error.${error}`
}

export const sleep = async (time: number) => {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve()
    }, time),
  )
}

export const preventInvalidKeys = (e: React.KeyboardEvent<HTMLInputElement>, preventKeys: string[]) => {
  if (!preventKeys.includes(e.key)) return

  e.preventDefault()
}
