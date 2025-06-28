import { store } from '@/redux/store'

const baseUrl = import.meta.env.BASE_URL

export async function fetcher<T>(
  path: string,
  options: RequestInit,
): Promise<T> {
  if (!baseUrl) {
    throw new Error('BASE_URL is not defined')
  }

  try {
    const response = await fetch(`${baseUrl}${path}`, updatedOptions(options))
    if (!response.ok) {
      const err = await response.json()
      throw new Error(err.error)
    }

    return (await response.json()) as T
  } catch (error) {
    console.error(error)
    throw error
  }
}

function updatedOptions(options: RequestInit) {
  const token = store.getState().login.token

  return {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
}
