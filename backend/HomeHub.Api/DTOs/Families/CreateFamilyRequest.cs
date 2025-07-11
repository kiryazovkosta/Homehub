namespace HomeHub.Api.DTOs.Families;

public sealed record CreateFamilyRequest
{
    public required string Name { get; init; }
    public required string Description { get; init; }
}