using Microsoft.AspNetCore.Mvc;

namespace HomeHub.Api.DTOs.Inventories;

public sealed class InventoriesQueryParameters
{
    public int Page { get; init; } = 1;
    public int PageSize { get; init; } = 10;

    [FromQuery(Name = "q")]
    public string? Search { get; set; }
    public string? Sort { get; init; }
}