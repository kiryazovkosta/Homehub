export interface UserSimplyResponse
{
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    familyRole: number,
    familyRoleValue: string
    description: string
    imageUrl: string
}

export interface UserAdminResponse
{
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    familyRole: number,
    familyRoleValue: string
    description: string
    imageUrl: string
    familyId: string,
    familyName: string
    isEdit: boolean
}