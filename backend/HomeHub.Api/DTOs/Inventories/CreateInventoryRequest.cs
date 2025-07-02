namespace HomeHub.Api.DTOs.Inventories;

public sealed record CreateInventoryRequest
{
    public required string Name { get; init; }
    public int Quantity { get; init; }
    public required string CategoryId { get; init; }
    public required string LocationId { get; init; }
    public int Threshold { get; init; }
}