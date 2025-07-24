import { FamilyRole } from "../auth/register-user-request.model";

export interface UpdateUserRequest {
    id: string;
    firstName: string;
    lastName: string;
    familyRole: FamilyRole;
    description: string;
    imageUrl: string;
}