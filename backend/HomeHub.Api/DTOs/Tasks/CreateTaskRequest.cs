using HomeHub.Api.Entities;

namespace HomeHub.Api.DTOs.Tasks;

public sealed record CreateTaskRequest
{
    public required string Title { get; init; }
    public required string Description { get; init; }
    public required Priority Priority { get; init; }
    public DateOnly DueDate { get; init; }
}