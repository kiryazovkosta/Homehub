import { UserSimplyResponse } from "../users/simple-user-response.model";

export interface FamilyWithUsersResponse {
    id: string,
    name: string,
    description: string,
    users: UserSimplyResponse[]
}