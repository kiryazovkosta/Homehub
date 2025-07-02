public sealed record UpdateInventoryRequest
{
    public required string Name { get; init; }
    public int Quantity { get; init; }
    public required string CategoryId { get; init; }
    public required string LocationId { get; init; }
    public int Threshold { get; init; }
}