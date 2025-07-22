export interface PaginationListResponse<T> {
    items: T[];
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    asPreviousPage: boolean;
    hasNextPage: boolean;
}