import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum Role {
    User = 'User',
    Admin = 'Admin'
}

interface Registration {
    isOpen: boolean
    selectedRole: Role
    inputEmail: string
    inputPassword: string
    inputName: string
    isSignUp: boolean
}

const initialState: Registration = {
    isOpen: false,
    selectedRole: Role.User,
    inputEmail: '',
    inputPassword: '',
    inputName: '',
    isSignUp:false
}

export const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        openRegistration: (state) => {
            state.isOpen = true
        },
        closeRegistration: (state) => {
            state.isOpen = false
        },
        inputEmail: (state, action: PayloadAction<string>) => {
            state.inputEmail = action.payload
        },
        inputPassword: (state, action: PayloadAction<string>) => {
            state.inputPassword = action.payload
        },
        inputName: (state, action: PayloadAction<string>) => {
            state.inputName = action.payload
        },
        setRole: (state, action: PayloadAction<Role>) => {
            state.selectedRole = action.payload
        },
        toggleSignUp: (state) => {
            state.isSignUp = !state.isSignUp
        }
    }
})

export const { openRegistration, closeRegistration, inputEmail, inputPassword, setRole, inputName, toggleSignUp } = registrationSlice.actions
export default registrationSlice.reducer