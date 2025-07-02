namespace HomeHub.Api.DTOs.Bills;

public sealed record UpdateBillRequest
{
    public required string Title { get; set; }
    public required string Description { get; set; }
    public decimal Amount { get; set; }
    public DateOnly DueDate { get; set; }
    public required string CategoryId { get; set; }
}