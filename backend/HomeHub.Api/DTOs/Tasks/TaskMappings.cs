using HomeHub.Api.Entities;
using Task = HomeHub.Api.Entities.Task;

namespace HomeHub.Api.DTOs.Tasks;

internal static class TaskMappings
{
    public static Task ToEntity(this CreateTaskRequest request)
    {
        Task task = new()
        {
            Id = $"t_{Guid.CreateVersion7()}",
            Title = request.Title,
            Description = request.Description,
            Priority = request.Priority,
            DueDate = request.DueDate,
            Status = Status.Active,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = null
        };

        return task;
    }

    public static TaskResponse ToResponse(this Task task)
    {
        return new TaskResponse
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            Priority = task.Priority,
            DueDate = task.DueDate,
            Status = task.Status,
            CreatedAt = task.CreatedAt,
            UpdatedAt = task.UpdatedAt
        };
    }

    public static void UpdateFromRequest(this Task task, UpdateTaskRequest request)
    {
        task.Title = request.Title;
        task.Description = request.Description;
        task.Priority = request.Priority;
        task.DueDate = request.DueDate;

        task.UpdatedAt = DateTime.UtcNow;
    }
}