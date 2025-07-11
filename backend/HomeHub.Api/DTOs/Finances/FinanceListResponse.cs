using HomeHub.Api.Entities;

namespace HomeHub.Api.DTOs.Finances;

public sealed record FinanceListResponse
{
    public required string Id { get; init; }
    public required string Title { get; init; }
    public required string Description { get; init; }
    public FinanceType Type { get; init; }
    public required string TypeValue { get; init; }
    public decimal Amount { get; init; }
}