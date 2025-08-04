using HomeHub.Api.Database;
using HomeHub.Api.DTOs.Common;
using HomeHub.Api.DTOs.Finances;
using HomeHub.Api.DTOs.Users;
using HomeHub.Api.Entities;
using HomeHub.Api.DTOs.Families;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace HomeHub.Api.Controllers;

[Authorize(Roles=Roles.Administrator)]
[ApiController]
[Route("api/admin")]

public sealed class AdminController(ApplicationDbContext dbContext) : ControllerBase
{
    [HttpGet("users/{id}")]
    public async Task<ActionResult<UserResponse>> GetUserById(string id)
    {
        UserResponse? user = await dbContext
            .Users
            .Where(u => u.Id == id)
            .Select(UserQueries.ProjectToResponse())
            .FirstOrDefaultAsync();
        if (user is null)
        {
            return NotFound();
        }

        return Ok(user);
    }

    [HttpGet("users")]
    public async Task<ActionResult<PaginationResponse<UserSimplyResponse>>> GetUsers([FromQuery] PageQueryParameters query)
    {
        IQueryable<UserSimplyResponse> usersQuery = dbContext
            .Users
            .Select(UserQueries.ProjectToListResponse());

        var response = await PaginationResponse<UserSimplyResponse>.CreateAsync(usersQuery, query.Page, query.PageSize);
        return Ok(response);
    }

    [HttpGet("families")]
    public async Task<ActionResult<PaginationResponse<FamilyResponse>>> GetFamilies([FromQuery] PageQueryParameters query)
    {
        IQueryable<FamilyResponse> familiesQuery = dbContext
            .Families
            .Where(f => f.Name != "Администратори")
            .Select(FamilyQueries.ToResponse());

        var response = await PaginationResponse<FamilyResponse>.CreateAsync(familiesQuery, query.Page, query.PageSize);
        return Ok(response);
    }

    [HttpGet("dashboard")]
    public async Task<ActionResult<DashboardResponse>> GetDashboard()
    {
        var response = new DashboardResponse
        {
            Families = await dbContext.Families.CountAsync(),
            Users = await dbContext.Users.CountAsync(),
            ActiveSessions = 2,
            Finances = await dbContext.Finances.CountAsync(),
            Bills = await dbContext.Bills.CountAsync(),
            Inventories = await dbContext.Inventories.CountAsync()
        };
        return Ok(response);
    }

}