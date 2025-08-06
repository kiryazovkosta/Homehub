import { FamilyRole } from "../auth/register-user-request.model";

export interface UpdateUserFromAdminRequest {
    id: string;
    firstName: string;
    lastName: string;
    description: string;
    imageUrl: string;
    familyId: string;
    familyRole: FamilyRole;
    password: string|null;
}