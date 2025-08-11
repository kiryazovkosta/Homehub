using FluentValidation;
using HomeHub.Api.Database;
using HomeHub.Api.DTOs.Categories;
using HomeHub.Api.DTOs.Common;
using HomeHub.Api.DTOs.Inventories;
using HomeHub.Api.Entities;
using HomeHub.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeHub.Api.Controllers;

[ApiController]
[Route("api/inventories")]
public sealed class InventoriesController(
    ApplicationDbContext dbContext,
    UserContext userContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<InventoriesListCollectionResponse>> GetInventories(
        [FromQuery] InventoriesQueryParameters parameters,
        UserContext userContext)
    {
        string? familyId = await userContext.GetFamilyIdAsync();
        if (string.IsNullOrWhiteSpace(familyId))
        {
            return Unauthorized();
        }

        IQueryable<InventoryListResponse> inventoriesQuery = dbContext
            .Inventories
            .Include(i => i.User)
            .Include(i => i.Category)
            .Where(i => i.User.FamilyId == familyId)
            .Where(i => parameters.Search == null ||
                        i.Name.ToLower().Contains(parameters.Search) ||
                        i.Description.ToLower().Contains(parameters.Search))
            .OrderByDescending(i => i.Id)
            .Select(InventoryQueries.ToListResponse());

        var response = await PaginationResponse<InventoryListResponse>.CreateAsync(inventoriesQuery, parameters.Page, parameters.PageSize);
        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<InventoryResponse>> GetInventory(string id)
    {
        InventoryResponse? inventory = await dbContext
            .Inventories
            .Include(i => i.Category)
            .Include(i => i.Location)
            .Where(t => t.Id == id)
            .Select(InventoryQueries.ToResponse())
            .FirstOrDefaultAsync();

        if (inventory is null)
        {
            return NotFound();
        }

        return Ok(inventory);
    }

    [HttpGet("low-stock")]
    public async Task<ActionResult<InventoriesListCollectionResponse>> GetLowInStockInventories()
    {
        List<InventoryListResponse> tasks = await dbContext
            .Inventories
            .Include(i => i.Category)
            .Where(i => i.Threshold < i.Quantity)
            .Select(InventoryQueries.ToListResponse())
            .ToListAsync();
        var response = new InventoriesListCollectionResponse
        {
            Items = tasks
        };

        return Ok(response);
    }

    [HttpGet("categories")]
    public ActionResult<List<CategorySimpleResponse>> GetCategories()
    {
        var categories = dbContext.Categories
            .Where(c => c.Type == CategoryType.Inventory)
            .Select(c => new CategorySimpleResponse { Id = c.Id, Name = c.Name })
            .ToList();
        return Ok(categories);
    }

    [HttpPost]
    public async Task<ActionResult<InventoryResponse>> CreateInventory(
        [FromBody] CreateInventoryRequest request,
        IValidator<CreateInventoryRequest> validator,
        CancellationToken cancellationToken)
    {
        string? userId = await userContext.GetUserIdAsync(cancellationToken);
        if (string.IsNullOrWhiteSpace(userId))
        {
            return Unauthorized();
        }

        await validator.ValidateAndThrowAsync(request, cancellationToken);

        var category = await dbContext.Categories.FirstOrDefaultAsync(c => c.Id == request.CategoryId, cancellationToken);
        if (category is null)
        {
            return NotFound();
        }

        var location = await dbContext.Locations.FirstOrDefaultAsync(l => l.Id == request.LocationId, cancellationToken);
        if (location is null)
        {
            return NotFound();
        }

        var inventory = request.ToEntity(userId, category, location);
        dbContext.Inventories.Add(inventory);
        await dbContext.SaveChangesAsync(cancellationToken);
        InventoryResponse response = inventory.ToResponse();
        return CreatedAtAction(nameof(GetInventory), new { id = response.Id }, response);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateInventory(
        string id,
        [FromBody] UpdateInventoryRequest request,
        IValidator<UpdateInventoryRequest> validator,
        CancellationToken cancellationToken)
    {
        await validator.ValidateAndThrowAsync(request, cancellationToken);
        
        var inventory = await dbContext.Inventories.FirstOrDefaultAsync(t => t.Id == id, cancellationToken);
        if (inventory is null)
        {
            return NotFound();
        }

        inventory.UpdateFromRequest(request);
        await dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteInventory(
        string id,
        CancellationToken cancellationToken)
    {
        string? familyId = await userContext.GetFamilyIdAsync(cancellationToken);
        if (string.IsNullOrWhiteSpace(familyId))
        { 
            return Unauthorized();
        }

        var inventory = await dbContext.Inventories
            .Include(i => i.User)
            .FirstOrDefaultAsync(t => t.Id == id, cancellationToken);
        if (inventory is null)
        {
            return NotFound();
        }
        
        if (inventory.User.FamilyId != familyId)
        {
            return Unauthorized();
        }

        dbContext.Inventories.Remove(inventory);
        await dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }
}