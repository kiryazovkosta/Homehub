using HomeHub.Api.DTOs.Common;
using HomeHub.Api.DTOs.Services;
using Microsoft.AspNetCore.Mvc;

namespace HomeHub.Api.Controllers;

[ApiController]
[Route("api/services")]
public sealed class ServicesController : ControllerBase
{
    [HttpGet]
    public ActionResult<PaginationResponse<ServiceListResponse>> GetServices()
    {
        var services = new List<ServiceListResponse> {
            new() { Id = Guid.CreateVersion7().ToString(), Title = "Услуга 1", Description = "Описание на първата услуга, която предлагаме на нашите клиенти." },
            new() { Id = Guid.CreateVersion7().ToString(), Title = "Услуга 2", Description = "Описание на втората услуга, която предлагаме на нашите клиенти." },
            new() { Id = Guid.CreateVersion7().ToString(), Title = "Услуга 3", Description = "Описание на третата услуга, която предлагаме на нашите клиенти." }
        };

        var response = new PaginationResponse<ServiceListResponse>()
        {
            Items = services, Page = 1, PageSize = 10, TotalCount = 3
        };
        return Ok(response);
    }
}

public static class QueryableExtensions
{
    public static IQueryable<T> ToAsyncSafeQueryable<T>(this IEnumerable<T> source)
    {
        // If you have a real async provider (like EF Core), return as is.
        // For in-memory, just return AsQueryable().
        return source.AsQueryable();
    }
}