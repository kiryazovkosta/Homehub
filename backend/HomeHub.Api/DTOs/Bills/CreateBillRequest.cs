namespace HomeHub.Api.DTOs.Bills;

public sealed record CreateBillRequest
{
    public required string Title { get; set; }
    public required string Description { get; set; }
    public decimal Amount { get; set; }
    public DateOnly DueDate { get; set; }
    public required string CategoryId { get; set; }
}