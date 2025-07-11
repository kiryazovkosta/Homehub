using FluentValidation;
using HomeHub.Api.Database;
using HomeHub.Api.DTOs.Finances;
using HomeHub.Api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeHub.Api.Controllers;

[ApiController]
[Route("api/finances")]
public sealed class FinancesController(ApplicationDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PaginationResponse<FinanceListResponse>>> GetFinances(
        [FromQuery] FinancesQueryParameters query)
    {
        query.Search ??= query.Search?.Trim().ToLower();

        IQueryable<FinanceListResponse> financesQuery = dbContext
            .Finances
            .Where(f => query.Search == null ||
                f.Title.ToLower().Contains(query.Search) ||
                f.Description.ToLower().Contains(query.Search))
            .Where(f => query.Type == null || f.Type == query.Type)
            .Where(f => query.CategoryId == null || f.CategoryId == query.CategoryId)
            .Where(f => query.Amount == null || f.Amount >= query.Amount)
            .Where(f => query.Date == null || f.Date >= query.Date)
            .Select(FinanceQueries.ToListResponse());

        var response = await PaginationResponse<FinanceListResponse>.CreateAsync(financesQuery, query.Page, query.PageSize);

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

    [HttpGet("summary")]
    public ActionResult<FinancesSummaryResponse> GetFinancesSummary()
    {
        FinancesSummaryResponse financesSummary = new()
        {
            StartDate = new DateOnly(2025, 7, 1),
            EndDate = new DateOnly(2025, 7, 31),
            TotalIncome = 10240.00M,
            TotalExpense = 8450.30M
        };

        return Ok(financesSummary);
    }

    [HttpPost]
    public async Task<ActionResult<FinanceResponse>> CreateFinance(
        [FromBody] CreateFinanceRequest request,
        IValidator<CreateFinanceRequest> validator,
        CancellationToken cancellationToken)
    {
        await validator.ValidateAndThrowAsync(request, cancellationToken);
        
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
        IValidator<UpdateFinanceRequest> validator,
        CancellationToken cancellationToken)
    {
        await validator.ValidateAndThrowAsync(request, cancellationToken);
        
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