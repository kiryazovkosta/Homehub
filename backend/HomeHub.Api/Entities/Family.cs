namespace HomeHub.Api.Entities;

public sealed class Family
{
    public required string Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public ICollection<User> Users { get; set; } = [];
}