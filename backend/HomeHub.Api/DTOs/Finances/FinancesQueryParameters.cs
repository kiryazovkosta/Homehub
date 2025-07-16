using HomeHub.Api.Entities;
using Microsoft.AspNetCore.Mvc;

public sealed record FinancesQueryParameters : PageQueryParameters
{
    [FromQuery(Name = "q")]
    public string? Search { get; set; }
    public FinanceType? Type { get; init; }
    public string? CategoryId { get; init; }
    public decimal? Amount { get; init; }
    public DateOnly? Date { get; init; }
    public string? Sort { get; init; }
}

public record PageQueryParameters
{
    public int Page { get; init; } = 1;
    public int PageSize { get; init; } = 6;
}