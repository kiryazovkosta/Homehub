import { CategoryResponse } from "../categories/category-response.model";

export interface FinanceListResponse {
    id: string;
    title: string;
    description: string;
    type: number;
    typeValue: string;
    amount: number;
    userId: string;
}

export interface FinanceResponse {
    id: string;
    title: string;
    description: string;
    type: number;
    typeValue: string;
    category: CategoryResponse;
    amount: number;
    date: Date;
    createdAt: Date;
    updatedAt: Date | null;
    userId: string;
}

