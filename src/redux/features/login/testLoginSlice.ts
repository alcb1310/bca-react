import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type LoginType = {
  isLoggedIn: boolean
  token: string
}

const initialState: LoginType = {
  isLoggedIn: false,
  token: '',
}

export const testLoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, user: PayloadAction<string>) => {
      state.isLoggedIn = true
      state.token = user.payload

      document.cookie = `BCA-TOKEN=${user.payload}; expires=1 day; path=/`
    },

    logout: (state) => {
      state.isLoggedIn = false
      state.token = ''

      document.cookie =
        'BCA-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;'
    },
  },
})

export const { login, logout } = testLoginSlice.actions
export default testLoginSlice.reducer
