using FluentValidation;
using HomeHub.Api.Services;
using Microsoft.AspNetCore.Authorization;

namespace HomeHub.Api.Controllers;

using Database;
using DTOs.Families;
using DTOs.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Authorize]
[ApiController]
[Route("api/families")]

public sealed class FamiliesController(
    ApplicationDbContext dbContext,
    UserContext userContext) : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<FamiliesListCollectionResponse>> GetFamilies()
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

    [HttpGet("me")]
    public async Task<IActionResult> GetFamily()
    {
        string? familyId = await userContext.GetFamilyIdAsync();
        if (string.IsNullOrWhiteSpace(familyId))
        {
            return Unauthorized();
        }

        FamilyWithUsersResponse? family = await dbContext
            .Families
            .Where(f => f.Id == familyId)
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