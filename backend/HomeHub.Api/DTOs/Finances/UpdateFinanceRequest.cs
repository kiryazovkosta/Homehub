using HomeHub.Api.Entities;

namespace HomeHub.Api.DTOs.Finances;

public sealed record UpdateFinanceRequest
{
    public required string Title { get; init; }
    public required string Description { get; init; }
    public FinanceType Type { get; init; }
    public required string CategoryId { get; init; }
    public decimal Amount { get; init; }
    public DateOnly Date { get; init; }
}