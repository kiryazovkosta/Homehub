export interface CreateFamilyRequest {
    name: string;
    description: string;
}

export interface UpdateFamilyRequest {
    id: string;
    name: string;
    description: string;
}