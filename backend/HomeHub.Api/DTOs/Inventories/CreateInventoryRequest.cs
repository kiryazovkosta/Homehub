using HomeHub.Api.Common.Constants;

namespace HomeHub.Api.DTOs.Inventories;

public sealed record CreateInventoryRequest
{
    public required string Name { get; init; }
    public required string Description { get; init; }
    public required string CategoryId { get; init; }
    public required string LocationId { get; init; }
    public int Quantity { get; init; }
    public int Threshold { get; init; }
    public required string ImageUrl { get; init; } = InventoryConstant.DefaultImage;
}