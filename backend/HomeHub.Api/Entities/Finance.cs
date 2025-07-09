namespace HomeHub.Api.Entities;

public sealed class Finance
{
    public required string Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public FinanceType Type { get; set; }
    public required string CategoryId { get; set; }
    public Category Category { get; set; } = null!;
    public decimal Amount { get; set; }
    public DateOnly Date { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}
