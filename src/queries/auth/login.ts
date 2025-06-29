import type { LoginInput } from '@/types/login'
import type { UserResponse } from '@/types/user'
import { fetcher } from '@/utils/fetch'

type loginResponse = {
  token: string
  user: UserResponse
}

export function useLoginMutation({ login }: Readonly<{ login: LoginInput }>) {
  return fetcher<loginResponse>('/login', {
    method: 'POST',
    body: JSON.stringify(login),
  })
}
