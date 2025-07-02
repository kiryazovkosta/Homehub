using HomeHub.Api.DTOs.Categories;
using HomeHub.Api.DTOs.Locations;

namespace HomeHub.Api.DTOs.Inventories;

public sealed record InventoriesListCollectionResponse
{
    public required List<InventoryListResponse> Items { get; init; }
}

public sealed record InventoryListResponse
{
    public required string Id { get; init; }
    public required string Name { get; init; }
    public int Quantity { get; init; }
    public required CategoryResponse Category { get; init; }
    public required int Threshold { get; init; }
}

public sealed record InventoryResponse
{
    public required string Id { get; init; }
    public required string Name { get; init; }
    public int Quantity { get; init; }
    public required CategoryResponse Category { get; init; }
    public required LocationResponse Location { get; init; }
    public required int Threshold { get; init; }
}