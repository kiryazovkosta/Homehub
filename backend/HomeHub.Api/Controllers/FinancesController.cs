using FluentValidation;
using HomeHub.Api.Database;
using HomeHub.Api.DTOs.Categories;
using HomeHub.Api.DTOs.Finances;
using HomeHub.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HomeHub.Api.DTOs.Common;
using HomeHub.Api.Entities;
using HomeHub.Api.Extensions;

namespace HomeHub.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/finances")]
public sealed class FinancesController(
    ApplicationDbContext dbContext,
    UserContext userContext
    ) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PaginationResponse<FinanceListResponse>>> GetFinances(
        [FromQuery] FinancesQueryParameters query)
    {
        string? familyId = await userContext.GetFamilyIdAsync();
        if (string.IsNullOrWhiteSpace(familyId))
        {
            return Unauthorized();
        }
        
        query.Search ??= query.Search?.Trim().ToLower();

        IQueryable<FinanceListResponse> financesQuery = dbContext
            .Finances
            .Include(f => f.User)
            .Where(f => f.User.FamilyId == familyId)
            .Where(f => query.Search == null ||
                f.Title.ToLower().Contains(query.Search) ||
                f.Description.ToLower().Contains(query.Search))
            .Where(f => query.Type == null || f.Type == query.Type)
            .Where(f => query.CategoryId == null || f.CategoryId == query.CategoryId)
            .Where(f => query.Amount == null || f.Amount >= query.Amount)
            .Where(f => query.Date == null || f.Date >= query.Date)
            .OrderByDescending(f => f.CreatedAt)
            .Select(FinanceQueries.ToListResponse());

        var response = await PaginationResponse<FinanceListResponse>.CreateAsync(financesQuery, query.Page, query.PageSize);

        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<FinanceResponse>> GetFinance(string id)
    {
        string? familyId = await userContext.GetFamilyIdAsync();
        if (string.IsNullOrWhiteSpace(familyId))
        {
            return Unauthorized();
        }

        FinanceResponse? finance = await dbContext
            .Finances
            .Include(f => f.Category)
            .Include(f => f.User)
            .Where(f => f.Id == id && f.User.FamilyId == familyId)
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

    [HttpGet("types")]
    public ActionResult<List<EnumResponse>> GetFinancesTypes()
    {
        var types = Enum.GetValues<FinanceType>()
            .Select(m => new EnumResponse()
            {
                Id = (int)m, 
                Value = m.GetDescription()
            })
            .ToList();
        return Ok(types);
    }
    
    [HttpGet("categories")]
    public ActionResult<List<CategorySimpleResponse>> GetFinancesCategories()
    {
        var categories = dbContext.Categories
            .Where(c => c.Type == CategoryType.Finance)
            .Select(c => new CategorySimpleResponse { Id = c.Id, Name = c.Name })
            .ToList();
        return Ok(categories);
    }

    [HttpPost]
    public async Task<ActionResult<FinanceResponse>> CreateFinance(
        [FromBody] CreateFinanceRequest request,
        IValidator<CreateFinanceRequest> validator,
        CancellationToken cancellationToken)
    {
        string? userId = await userContext.GetUserIdAsync(cancellationToken);
        if (string.IsNullOrWhiteSpace(userId))
        {
            return Unauthorized();
        }

        await validator.ValidateAndThrowAsync(request, cancellationToken);
        
        var category = await dbContext.Categories
            .FirstOrDefaultAsync(c => c.Id == request.CategoryId, cancellationToken);
        if (category is null)
        {
            return NotFound();
        }
        
        var finance = request.ToEntity(category, userId);
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
        string? userId = await userContext.GetUserIdAsync(cancellationToken);
        if (string.IsNullOrWhiteSpace(userId))
        {
            return Unauthorized();
        }
        
        await validator.ValidateAndThrowAsync(request, cancellationToken);
        
        var finance = await dbContext.Finances.FirstOrDefaultAsync(f => f.Id == id && f.UserId == userId, cancellationToken);
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
        string? userId = await userContext.GetUserIdAsync();
        if (string.IsNullOrWhiteSpace(userId))
        {
            return Unauthorized();
        }

        var finance = await dbContext.Finances.FirstOrDefaultAsync(f => f.Id == id && f.UserId == userId);
        if (finance is null)
        {
            return NotFound();
        }

        dbContext.Finances.Remove(finance);
        await dbContext.SaveChangesAsync();
        return NoContent();
    }
}