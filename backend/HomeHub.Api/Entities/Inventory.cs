using HomeHub.Api.Common.Constants;

namespace HomeHub.Api.Entities;

public sealed class Inventory
{
    public required string Id { get; set; }
    public required string Name { get; set; }
    public int Quantity { get; set; }
    public required string CategoryId { get; set; }
    public Category Category { get; set; } = null!;
    public required string LocationId { get; set; }
    public Location Location { get; set; } = null!;
    public required int Threshold { get; set; } = 0;
    public string UserId { get; set; } = null!;
    public User User { get; set; } = null!;
    public required string Description { get; set; }
    public required string ImageUrl { get; set; } = InventoryConstant.DefaultImage;
}