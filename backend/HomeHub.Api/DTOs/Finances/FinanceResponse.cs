using HomeHub.Api.DTOs.Users;

namespace HomeHub.Api.DTOs.Finances;

using HomeHub.Api.DTOs.Categories;
using HomeHub.Api.Entities;

public sealed record FinanceResponse
{
    public required string Id { get; init; }
    public required string Title { get; init; }
    public required string Description { get; init; }
    public FinanceType Type { get; init; }
    public required string TypeValue { get; init; }
    public required CategoryResponse Category { get; init; }
    public decimal Amount { get; init; }
    public DateOnly Date { get; init; }
    public DateTime CreatedAt { get; init; }
    public DateTime? UpdatedAt { get; init; }
    public required string UserId { get; init; }
}