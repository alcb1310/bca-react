import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface LoginState {
    isLoggedIn: boolean
    jwt: string
}

const initialState: LoginState = {
    isLoggedIn: localStorage.getItem("BCAToken") !== null,
    jwt: localStorage.getItem("BCAToken") ?? ""
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logIn: (state, action: PayloadAction<string>) => {
            localStorage.setItem("BCAToken", action.payload)
            state.isLoggedIn = true
            state.jwt = action.payload
        },
        logOut: (state) => {
            localStorage.removeItem("BCAToken")
            state.isLoggedIn = false
        }
    }
})

export const { logIn, logOut } = loginSlice.actions
export default loginSlice.reducer
