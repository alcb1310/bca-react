import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserResponse } from "../../../types/user"

type LoginType = {
  isLoggedIn: boolean
  loggedInUser: UserResponse | null
}

const initialState: LoginType = {
  isLoggedIn: false,
  loggedInUser: null
}

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, user: PayloadAction<UserResponse>) => {
      state.isLoggedIn = true
      state.loggedInUser = user.payload
    },

    logout: (state) => {
      state.isLoggedIn = false
      state.loggedInUser = null
    }
  }
})

export const { login, logout } = loginSlice.actions
export default loginSlice.reducer
