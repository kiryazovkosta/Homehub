using HomeHub.Api.Entities;

namespace HomeHub.Api.DTOs.Categories;

public sealed record CategoryResponse
{
    public required string Id { get; init; }
    public required string Name { get; init; }
    public CategoryType Type { get; init; }
    public required string TypeValue { get; init; }
}