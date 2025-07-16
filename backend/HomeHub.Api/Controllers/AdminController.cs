using HomeHub.Api.Database;
using HomeHub.Api.DTOs.Common;
using HomeHub.Api.DTOs.Finances;
using HomeHub.Api.DTOs.Users;
using HomeHub.Api.Entities;
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

}