using System.Linq.Expressions;
using HomeHub.Api.Extensions;
using Task = HomeHub.Api.Entities.Task;

namespace HomeHub.Api.DTOs.Tasks;

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
            PriorityValue = t.Priority.GetDescription(),
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
            PriorityValue = t.Priority.GetDescription(),
            DueDate = t.DueDate,
            Status = t.Status,
            StatusValue = t.Status.GetDescription(),
            CreatedAt = t.CreatedAt,
            UpdatedAt = t.UpdatedAt
        };
    }
}