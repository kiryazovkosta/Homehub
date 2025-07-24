import { FamilyRole } from "../auth/register-user-request.model"
import { FamilyResponse } from "../families/family-response.model"

export interface UserProfileResponse {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  familyRole: FamilyRole,
  familyRoleValue: string,
  description: string,
  imageUrl: string,
  family: FamilyResponse
}