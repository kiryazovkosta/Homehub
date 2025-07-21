using HomeHub.Api.DTOs.Common;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/services")]
public sealed class ServicesController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PaginationResponse<ServiceListResponse>>> GetServices()
    {
        IQueryable<ServiceListResponse> servicesQuery = new List<ServiceListResponse> {
            new() { Id = Guid.CreateVersion7().ToString(), Title = "Услуга 1", Description = "Описание на първата услуга, която предлагаме на нашите клиенти." },
            new() { Id = Guid.CreateVersion7().ToString(), Title = "Услуга 2", Description = "Описание на втората услуга, която предлагаме на нашите клиенти." },
            new() { Id = Guid.CreateVersion7().ToString(), Title = "Услуга 3", Description = "Описание на третата услуга, която предлагаме на нашите клиенти." }
        }.AsQueryable();

        var response = await PaginationResponse<ServiceListResponse>.CreateAsync(servicesQuery, 1, 10);
        return Ok(response);
    }
}