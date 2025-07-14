namespace HomeHub.Api.Controllers;

using Database;
using DTOs.Users;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

[Authorize]
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