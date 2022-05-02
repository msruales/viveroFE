import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../models/user";
import {RootState} from "../store";

type AuthState = {
    user: User | null,
    token: string | null
}

const INITIAL_AUTH: AuthState = {
    user: null,
    token: null
}
const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_AUTH,
    reducers: {
        setCredentials: (state, {payload: {user, token}}: PayloadAction<{ user: User; token: string }>) => {
            localStorage.setItem('token', token);
            state.user = user
            state.token = token
        },
        setLogout: () => {
            localStorage.removeItem('token');
            return  {...INITIAL_AUTH}
        },
    }
})

export const {setCredentials, setLogout} = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectIsAuth = (state: RootState) => !!(state.auth.user && state.auth.token)
