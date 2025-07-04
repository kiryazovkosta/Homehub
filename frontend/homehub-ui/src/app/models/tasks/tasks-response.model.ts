export interface TasksListCollectionResponse {
    items: TaskListResponse[];
}

export interface TaskListResponse {
    id: string;
    title: string;
    description: string;
    priority: number;
    priorityValue: string;
    dueDate: string;
}

export interface TaskResponse {
    id: string;
    title: string;
    description: string;
    priority: number;
    priorityValue: string;
    dueDate: string;
    status: number;
    statusValue: string;
    createdAt: string;
    updatedAt: string | null;
}