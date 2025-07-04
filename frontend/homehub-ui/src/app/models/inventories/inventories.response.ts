import { CategoryResponse } from "../categories/category-response.model";
import { LocationResponse } from "../locations/locations-response.model";

export interface InventoriesListCollectionResponse {
    items: InventoryListResponse[];
}

export interface InventoryListResponse {
    id: string;
    name: string;
    quantity: number;
    category: CategoryResponse;
    threshold: number;
}

export interface InventoryResponse {
    id: string;
    name: string;
    quantity: number;
    category: CategoryResponse;
    location: LocationResponse;
    threshold: number;
}