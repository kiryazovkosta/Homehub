import { CategoryResponse } from "../categories/category-response.model";

export interface FinanceListResponse {
    id: string;
    title: string;
    description: string;
    type: number;
    typeValue: string;
    amount: number;
}

export interface FinanceResponse {
    id: string;
    title: string;
    description: string;
    type: number;
    typeValue: string;
    category: CategoryResponse;
    amount: number;
    date: string;
    createdAt: string;
    updatedAt: string | null;
}