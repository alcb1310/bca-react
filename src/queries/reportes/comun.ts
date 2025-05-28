const url = import.meta.env.VITE_BACKEND_SERVER

type LevelType = {
  key: string
  value: string
}

export async function useGetAllLevelsQuery({
  token,
}: Readonly<{ token: string }>) {
  const response = await fetch(`${url}/reportes/levels`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return (await response.json()) as LevelType[]
}
