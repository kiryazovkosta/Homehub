namespace HomeHub.Api.Entities;

public sealed class Bill
{
    public required string Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public decimal Amount { get; set; }
    public DateOnly DueDate { get; set; }
    public bool IsPaid { get; set; }
    public string? FileUrl { get; set; }
    public required string CategoryId { get; set; }
    public required Category Category { get; set; }
    public string UserId { get; set; } = null!;
    public User User { get; set; } = null!;

    public void Pay()
    {
        IsPaid = true;
    }
}