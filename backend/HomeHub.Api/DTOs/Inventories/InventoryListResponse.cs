using HomeHub.Api.DTOs.Categories;

namespace HomeHub.Api.DTOs.Inventories;

public sealed record InventoryListResponse
{
    public required string Id { get; init; }
    public required string Name { get; init; }
    public int Quantity { get; init; }
    public required CategoryResponse Category { get; init; }
    public required int Threshold { get; init; }
    public required string Description { get; init; }
    public required string ImageUrl { get; init; }
}
