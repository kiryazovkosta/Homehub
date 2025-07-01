using System.Linq.Expressions;
using Task = HomeHub.Api.Entities.Task;

internal static class TaskQueries
{
    public static Expression<Func<Task, TaskListResponse>> ToListResponse()
    {
        return t => new TaskListResponse
        {
            Id = t.Id,
            Title = t.Title,
            Description = t.Description.Length <= 100 ? t.Description : t.Description.Substring(0, 100),
            Priority = t.Priority,
            DueDate = t.DueDate
        };
    }

    public static Expression<Func<Task, TaskResponse>> ToResponse()
    {
        return t => new TaskResponse
        {
            Id = t.Id,
            Title = t.Title,
            Description = t.Description,
            Priority = t.Priority,
            DueDate = t.DueDate,
            Status = t.Status,
            CreatedAt = t.CreatedAt,
            UpdatedAt = t.UpdatedAt
        };
    }
}