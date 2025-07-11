using HomeHub.Api.Entities;

namespace HomeHub.Api.DTOs.Tasks;

public sealed record TaskResponse
{
    public required string Id { get; init; }
    public required string Title { get; init; }
    public required string Description { get; init; }
    public required Priority Priority { get; init; }
    public required string PriorityValue { get; init; }
    public DateOnly DueDate { get; init; }
    public required Status Status{ get; init; }
    public required string StatusValue{ get; init; }
    public DateTime CreatedAt { get; init; }
    public DateTime? UpdatedAt{ get; init; }
}