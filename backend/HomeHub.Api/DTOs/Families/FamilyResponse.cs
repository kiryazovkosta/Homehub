namespace HomeHub.Api.DTOs.Families;

public sealed record FamilyResponse
{
    public required string Id { get; init; }
    public required string Name { get; init; }
    public required string Description { get; init; }
}