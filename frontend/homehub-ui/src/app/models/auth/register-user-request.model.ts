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

export const familyRoleLabels: Record<number, string> = {
  [FamilyRole.Father]: 'Баща',
  [FamilyRole.Mother]: 'Майка',
  [FamilyRole.PaternalUncle]: 'Чичо (по бащина линия)',
  [FamilyRole.MaternalUncle]: 'Чичо (по майчина линия)',
  [FamilyRole.PaternalAunt]: 'Леля (по бащина линия)',
  [FamilyRole.MaternalAunt]: 'Леля (по майчина линия)',
  [FamilyRole.PaternalCousin]: 'Братовчед (по бащина линия)',
  [FamilyRole.MaternalCousin]: 'Братовчед (по майчина линия)',
  [FamilyRole.Son]: 'Син',
  [FamilyRole.Daughter]: 'Дъщеря',
  [FamilyRole.Other]: 'Друго'
};