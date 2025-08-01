export interface CreateFinanceRequest {
    title: string;
    description: string;
    type: number;
    categoryId: string;
    amount: number;
    date: Date;
}

export interface UpdateFinanceRequest {
    id: number;
    title: string;
    description: string;
    type: number;
    categoryId: string;
    amount: number;
    date: Date;
}