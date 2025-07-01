using HomeHub.Api.Entities;

namespace HomeHub.Api.DTOs.Tasks;

public sealed record TasksListCollectionResponse
{
    public required List<TaskListResponse> Items { get; init; }
}

public sealed record TaskListResponse
{
    public required string Id { get; init; }
    public required string Title { get; init; }
    public required string Description { get; init; }
    public required Priority Priority { get; init; }
    public DateOnly DueDate { get; init; }
}

public sealed record TaskResponse
{
    public required string Id { get; init; }
    public required string Title { get; init; }
    public required string Description { get; init; }
    public required Priority Priority { get; init; }
    public DateOnly DueDate { get; init; }
    public required Status Status{ get; set; }
    public DateTime CreatedAt{ get; set; }
    public DateTime? UpdatedAt{ get; set; }
}