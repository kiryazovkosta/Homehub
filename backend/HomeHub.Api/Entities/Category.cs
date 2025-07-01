namespace HomeHub.Api.Entities;

public sealed class Category
{
    public required string Id { get; set; }
    public required string Name { get; set; }
    public CategoryType Type { get; set; }
}