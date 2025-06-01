import { createSlice } from '@reduxjs/toolkit'

const cookie =
  document.cookie
    .split(';')
    .find((cookie) => cookie.includes('BCA-TOKEN'))
    ?.split('=')[1] || ''

type LoginType = {
  isLoggedIn: boolean
  token: string
}

const initialState: LoginType = {
  isLoggedIn: !!cookie,
  token: cookie,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false
      state.token = ''

      document.cookie =
        'BCA-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;'
    },
  },
})

export const { logout } = loginSlice.actions
export default loginSlice.reducer
