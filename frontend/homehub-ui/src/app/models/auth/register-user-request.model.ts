export interface RegisterUserRequest {
    firstName: string,
    lastName: string,
    password: string,
    confirmPassword: string,
    email: string,
    familyRole: FamilyRole,
    description: string,
    imageUrl: string,
    familyId: string,
}

export enum FamilyRole {
    Father = 1,
    Mother = 2,
    PaternalUncle = 3,
    MaternalUncle = 4,
    PaternalAunt = 5,
    MaternalAunt = 6,
    PaternalCousin = 7,
    MaternalCousin = 8,
    Son = 9,
    Daughter = 10,
    Other = 99
}