import { Store } from '@tanstack/react-store'

const cookie =
  document.cookie
    .split(';')
    .find((cookie) => cookie.includes('BCA-TOKEN'))
    ?.split('=')[1] || ''

export const loginStore = new Store({
  isloggedIn: !!cookie,
  token: cookie,
})

export const loginApplication = (token: string) => {
  document.cookie = `BCA-TOKEN=${token}; expires=1 day; path=/`
  loginStore.setState((state) => {
    return { ...state, isLoggedIn: true, token }
  })
}

export const logout = () => {
  document.cookie = 'BCA-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;'
  loginStore.setState((state) => {
    return { ...state, isLoggedIn: false, token: '' }
  })
}
