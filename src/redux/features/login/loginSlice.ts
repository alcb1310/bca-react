import { createSlice } from "@reduxjs/toolkit"

type LoginType = {
  isLoggedIn: boolean
}

const initialState: LoginType = {
  isLoggedIn: false
}

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.isLoggedIn = false
    }
  }
})

export const { login, logout } = loginSlice.actions
export default loginSlice.reducer
