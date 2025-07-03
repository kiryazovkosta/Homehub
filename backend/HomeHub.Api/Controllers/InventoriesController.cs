using FluentValidation;
using HomeHub.Api.Database;
using HomeHub.Api.DTOs.Inventories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeHub.Api.Controllers;

[ApiController]
[Route("api/inventories")]
public sealed class InventoriesController(ApplicationDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<InventoriesListCollectionResponse>> GetInventories()
    {
        List<InventoryListResponse> tasks = await dbContext
            .Inventories
            .Include(i => i.Category)
            .Select(InventoryQueries.ToListResponse())
            .ToListAsync();

        var response = new InventoriesListCollectionResponse
        {
            Items = tasks
        };

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

    [HttpPost]
    public async Task<ActionResult<InventoryResponse>> CreateInventory(
        [FromBody] CreateInventoryRequest request,
        IValidator<CreateInventoryRequest> validator,
        CancellationToken cancellationToken)
    {
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

        var inventory = request.ToEntity(category, location);
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
    public async Task<ActionResult> DeleteInventory(string id)
    {
        var inventory = await dbContext.Inventories.FirstOrDefaultAsync(t => t.Id == id);
        if (inventory is null)
        {
            return NotFound();
        }

        dbContext.Inventories.Remove(inventory);
        await dbContext.SaveChangesAsync();
        return NoContent();
    }
}