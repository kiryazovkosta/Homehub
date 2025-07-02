namespace HomeHub.Api.DTOs.Bills;

using Categories;

public sealed record BillResponse
{
    public required string Id { get; init; }
    public required string Title { get; init; }
    public required string Description { get; init; }
    public decimal Amount { get; set; }
    public DateOnly DueDate { get; init; }
    public bool IsPaid { get; set; }
    public string? FileUrl { get; init; }
    public required CategoryResponse Category { get; init; }
}