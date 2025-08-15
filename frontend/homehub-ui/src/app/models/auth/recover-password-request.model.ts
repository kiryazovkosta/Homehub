export interface RecoverPasswordRequest {
    email: string;
    firstname: string;
    lastName: string;
    password: string;
    confirmPassword: string;
}

export interface RecoverPasswordResponse {
    email: string;
}