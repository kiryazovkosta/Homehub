import { JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string | string[];
    email?: string;
    nameid: string;
}