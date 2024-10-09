import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserResponse } from "../../../types/user"

type PayloadResponse = {
  user: UserResponse
  token: string
}

type LoginType = {
  isLoggedIn: boolean
  loggedInUser: UserResponse | null
  token: string
}

const initialState: LoginType = {
  isLoggedIn: false,
  loggedInUser: null,
  token: '',
}

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, user: PayloadAction<PayloadResponse>) => {
      state.isLoggedIn = true
      state.loggedInUser = user.payload.user
      state.token = user.payload.token
    },

    logout: (state) => {
      state.isLoggedIn = false
      state.loggedInUser = null
    }
  }
})

export const { login, logout } = loginSlice.actions
export default loginSlice.reducer
