export interface CreateInventoryRequest {
    name: string;
    description: string;
    categoryId: string;
    locationId: string;
    quantity: number;
    threshold: number;
    imageUrl: string;
}