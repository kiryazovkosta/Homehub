import { CategoryResponse } from "../categories/category-response.model";

export interface BillsListCollectionResponse {
    items: BillListResponse[];
}

export interface BillListResponse {
    id: string;
    title: string;
    dueDate: string; // ISO date string, напр. "2025-07-04"
    amount: number;
    isPaid: boolean;
}

export interface BillResponse {
    id: string;
    title: string;
    description: string;
    amount: number;
    dueDate: string; // ISO date string, напр. "2025-07-04"
    isPaid: boolean;
    fileUrl: string | null;
    category: CategoryResponse;
}

