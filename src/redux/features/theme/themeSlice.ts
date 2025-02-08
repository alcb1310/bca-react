import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ModeType = 'light' | 'dark'
interface ThemeState {
    mode: ModeType
}

const initialState: ThemeState = {
    mode: 'light',
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setMode(state, action: PayloadAction<ModeType>) {
            state.mode = action.payload
        },
    },
})

export const { setMode } = themeSlice.actions
export default themeSlice.reducer
