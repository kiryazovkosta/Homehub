using HomeHub.Api.Entities;

namespace HomeHub.Api.DTOs.Tasks;

public sealed record TaskListResponse
{
    public required string Id { get; init; }
    public required string Title { get; init; }
    public required string Description { get; init; }
    public required Priority Priority { get; init; }
    public required string PriorityValue { get; init; }
    public DateOnly DueDate { get; init; }
}
