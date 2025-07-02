namespace HomeHub.Api.Entities;

public sealed class Location
{
    public required string Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
}