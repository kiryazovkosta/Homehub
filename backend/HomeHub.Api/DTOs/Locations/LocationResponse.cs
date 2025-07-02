namespace HomeHub.Api.DTOs.Locations;

public sealed record LocationResponse
{
    public required string Id { get; init; }
    public required string Name { get; init; }
    public string? Description { get; init; }
}