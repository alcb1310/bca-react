import { store } from '@/redux/store'

const baseUrl = import.meta.env.VITE_BACKEND_SERVER

export async function fetcher<T>(
  path: string,
  options: RequestInit,
): Promise<T | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 1000)) // TODO: remove
  if (!baseUrl) {
    throw new Error('BASE_URL is not defined')
  }

  try {
    const response = await fetch(`${baseUrl}${path}`, updatedOptions(options))
    if (!response.ok) {
      const err = await response.json()
      throw new Error(err.error)
    }

    if (response.status === 204) {
      return
    }

    return (await response.json()) as T
  } catch (error) {
    console.error('fetcher', error)
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
