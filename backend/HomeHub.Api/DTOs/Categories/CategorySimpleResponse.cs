namespace HomeHub.Api.DTOs.Categories;

public sealed record CategorySimpleResponse
{
    public required string Id { get; init; }
    public required string Name { get; init; }
}