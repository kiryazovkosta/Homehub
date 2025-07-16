using System.Security.Claims;
using HomeHub.Api.Entities;
using HomeHub.Api.Services;

namespace HomeHub.Api.Controllers;

using Database;
using DTOs.Users;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

[Authorize]
[ApiController]
[Route("api/users")]
public sealed class UsersController(ApplicationDbContext dbContext, UserContext userContext) : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<ActionResult<UserResponse>> GetUserById(string id)
    {
        string? userId = await userContext.GetUserIdAsync();
        if (string.IsNullOrWhiteSpace(userId))
        {
            return Unauthorized();
        }

        UserResponse? user = await dbContext
            .Users
            .Where(u => u.Id == id)
            .Select(UserQueries.ProjectToResponse())
            .FirstOrDefaultAsync();
        if (user is null || id != userId)
        {
            return NotFound();
        }

        return Ok(user);
    }

    [HttpGet("me")]
    public async Task<ActionResult<UserResponse>> GetCurrentUser()
    {
        string? userId = await userContext.GetUserIdAsync();
        if (string.IsNullOrWhiteSpace(userId))
        {
            return Unauthorized();
        }
        
        UserResponse? user = await dbContext
            .Users
            .Where(u => u.Id == userId)
            .Select(UserQueries.ProjectToResponse())
            .FirstOrDefaultAsync();
        if (user is null)
        {
            return NotFound();
        }

        return Ok(user);
    }


}