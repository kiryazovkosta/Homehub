using HomeHub.Api.Entities;

public sealed record UpdateTaskRequest
{
    public required string Title { get; init; }
    public required string Description { get; init; }
    public required Priority Priority { get; init; }
    public DateOnly DueDate { get; init; }
}