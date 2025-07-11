using HomeHub.Api.Database;
using HomeHub.Api.DTOs.Users;
using Microsoft.EntityFrameworkCore;

namespace HomeHub.Api.Controllers;

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/users")]

public sealed class UsersController(ApplicationDbContext dbContext) : ControllerBase
{
    [HttpGet("{id}")]
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
}