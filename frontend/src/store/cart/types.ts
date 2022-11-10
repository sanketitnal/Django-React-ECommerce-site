export interface ProcessState {
    loading: boolean,
    error: Error | null,
    success: boolean | null
}

export interface CartState {
    addtocartProcess: ProcessState
}