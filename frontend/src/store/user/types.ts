export interface UserState {
    loginProcess: ProcessState,
    registerProcess: ProcessState,
    updateProcess: ProcessState,
    userInfo: User | null
}

export interface ProcessState {
    loading: boolean,
    error: Error | null,
    success: boolean | null
}

export interface User {
    firstName: string,
    lastName: string,
    email: string,
    access: string,
    refresh: string,
}

export interface UserError {
    status: any,
    message: string
}

export interface UserLoginDetails {
    username: string,
    password: string
}

export interface UserProfileDetails {
    firstName: string,
    lastName: string,
    token: string | null
}

export interface UserRegisterDetails {
    email: string,
    firstName: string,
    lastName: string,
    password: string,
}