namespace HomeHub.Api.Entities;

public sealed class Inventory
{
    public required string Id { get; set; }
    public required string Name { get; set; }
    public int Quantity { get; set; }
    public required string CategoryId { get; set; }
    public required Category Category { get; set; }
    public required string LocationId { get; set; }
    public required Location Location { get; set; }
    public required int Threshold { get; set; } = 0;
    public string UserId { get; set; } = null!;
    public User User { get; set; } = null!;
}