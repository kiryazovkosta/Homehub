using FluentValidation;

namespace HomeHub.Api.Controllers;

using Database;
using DTOs.Families;
using DTOs.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/families")]

public sealed class FamiliesController(ApplicationDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<TasksListCollectionResponse>> GetFamilies()
    {
        List<FamilyListResponse> tasks = await dbContext
            .Families
            .Select(FamilyQueries.ToListResponse())
            .ToListAsync();

        var response = new FamiliesListCollectionResponse
        {
            Items = tasks
        };

        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetFamily(string id)
    {
        FamilyWithUsersResponse? family = await dbContext
            .Families
            .Where(f => f.Id == id)
            .Select(FamilyQueries.ProjectToResponse())
            .FirstOrDefaultAsync()
            ;
        if (family is null)
        {
            return NotFound();
        }

        return Ok(family);
    }

    [HttpPost]
    public async Task<ActionResult<TaskResponse>> CreateTask(
        [FromBody] CreateFamilyRequest request,
        IValidator<CreateFamilyRequest> validator,
        CancellationToken cancellationToken)
    {
        await validator.ValidateAndThrowAsync(request, cancellationToken);
        var family = request.ToEntity();
        dbContext.Families.Add(family);
        await dbContext.SaveChangesAsync(cancellationToken);
        FamilyResponse response = family.ToResponse();
        return CreatedAtAction(nameof(GetFamily), new { id = response.Id }, response);
    }
}