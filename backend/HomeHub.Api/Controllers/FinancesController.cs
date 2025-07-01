using HomeHub.Api.Database;
using HomeHub.Api.DTOs.Finances;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeHub.Api.Controllers;

[ApiController]
[Route("api/finances")]
public sealed class FinancesController(ApplicationDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<FinancesListCollectionResponse>> GetFinances()
    {
        List<FinanceListResponse> finances = await dbContext
            .Finances
            .Select(FinanceQueries.ToListResponse())
            .ToListAsync();

        var response = new FinancesListCollectionResponse
        {
            Items = finances
        };

        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<FinanceResponse>> GetFinance(string id)
    {
        FinanceResponse? finance = await dbContext
            .Finances
            .Include(f => f.Category)
            .Where(f => f.Id == id)
            .Select(FinanceQueries.ToResponse())
            .FirstOrDefaultAsync();

        if (finance is null)
        {
            return NotFound();
        }

        return Ok(finance);
    }

    [HttpPost]
    public async Task<ActionResult<FinanceResponse>> CreateFinance(
        [FromBody] CreateFinanceRequest request,
        CancellationToken cancellationToken)
    {
        var category = await dbContext.Categories
            .FirstOrDefaultAsync(c => c.Id == request.CategoryId, cancellationToken);
        if (category is null)
        {
            return NotFound();
        }
        
        var finance = request.ToEntity(category);
        if (finance.CategoryId != request.CategoryId || finance.Category.Id != request.CategoryId)
        {
            return BadRequest();
        }
        
        dbContext.Finances.Add(finance);
        await dbContext.SaveChangesAsync(cancellationToken);
        FinanceResponse response = finance.ToResponse();
        return CreatedAtAction(nameof(GetFinance), new { id = response.Id }, response);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateFinance(
        string id,
        [FromBody] UpdateFinanceRequest request,
        CancellationToken cancellationToken)
    {
        var finance = await dbContext.Finances.FirstOrDefaultAsync(f => f.Id == id, cancellationToken);
        if (finance is null)
        {
            return NotFound();
        }

        finance.UpdateFromRequest(request);
        await dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteFinance(string id)
    {
        var finance = await dbContext.Finances.FirstOrDefaultAsync(t => t.Id == id);
        if (finance is null)
        {
            return NotFound();
        }

        dbContext.Finances.Remove(finance);
        await dbContext.SaveChangesAsync();
        return NoContent();
    }
}