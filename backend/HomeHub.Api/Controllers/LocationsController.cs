using HomeHub.Api.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/locations")]
public sealed class LocationsController(ApplicationDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<Location>> GetLocations()
    {
        List<Location> locations = await dbContext
            .Locations
            //.Select(FinanceQueries.ToListResponse())
            .ToListAsync();

        //var response = new FinancesListCollectionResponse
        //{
        //    Items = finances
        //};

        return Ok(locations);
    }
}