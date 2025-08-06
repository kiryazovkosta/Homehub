using HomeHub.Api.Database;
using HomeHub.Api.DTOs.Auth;
using HomeHub.Api.DTOs.Common;
using HomeHub.Api.DTOs.Families;
using HomeHub.Api.DTOs.Finances;
using HomeHub.Api.DTOs.Users;
using HomeHub.Api.Entities;
using HomeHub.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace HomeHub.Api.Controllers;

[Authorize(Roles=Roles.Administrator)]
[ApiController]
[Route("api/admin")]

public sealed class AdminController(
    ApplicationDbContext dbContext, 
    UserManager<IdentityUser> userManager,
    ApplicationIdentityDbContext identityDbContext) : ControllerBase
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
    public async Task<ActionResult<PaginationResponse<UserAdminResponse>>> GetUsers([FromQuery] PageQueryParameters query)
    {
        IQueryable<UserAdminResponse> usersQuery = dbContext
            .Users
            .Include(u => u.Family)
            .Select(UserQueries.ProjectToListResponse())
            .OrderBy(u => u.FamilyId);

        var response = await PaginationResponse<UserAdminResponse>.CreateAsync(usersQuery, query.Page, query.PageSize);
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

    [HttpPost("users/register")]
    public async Task<ActionResult<UserSimplyResponse>> Register(RegisterUserRequest request)
    {
        await using IDbContextTransaction transaction = await identityDbContext.Database.BeginTransactionAsync();
        dbContext.Database.SetDbConnection(identityDbContext.Database.GetDbConnection());
        await dbContext.Database.UseTransactionAsync(transaction.GetDbTransaction());

        var identityUser = new IdentityUser
        {
            Email = request.Email,
            UserName = request.Email
        };

        if (request.Password != request.ConfirmPassword)
        {
            return BadRequest("Password mismatch");
        }

        bool familyExists = await dbContext.Families.AnyAsync(f => f.Id == request.FamilyId);
        if (!familyExists)
        {
            return BadRequest("Non existing family");
        }

        IdentityResult createUserResult = await userManager.CreateAsync(identityUser, request.Password);
        if (!createUserResult.Succeeded)
        {
            var extensions = new Dictionary<string, object?>
            {
                {
                    "errors",
                    createUserResult.Errors.ToDictionary(e => e.Code, e => e.Description)
                }
            };
            return Problem(
                detail: "Unable to register user, please try again",
                statusCode: StatusCodes.Status400BadRequest,
                extensions: extensions);
        }

        IdentityResult addToRoleResult = await userManager.AddToRoleAsync(identityUser, Roles.Member);
        if (!addToRoleResult.Succeeded)
        {
            var extensions = new Dictionary<string, object?>
            {
                {
                    "errors",
                    addToRoleResult.Errors.ToDictionary(e => e.Code, e => e.Description)
                }
            };
            return Problem(
                detail: "Unable to register user, please try again",
                statusCode: StatusCodes.Status400BadRequest,
                extensions: extensions);
        }

        User user = request.ToEntity(identityUser.Id);
        dbContext.Users.Add(user);

        await dbContext.SaveChangesAsync();

        await transaction.CommitAsync();

        return Ok(user.ToResponse());
    }

    [HttpPut("users/update")]
    public async Task<ActionResult<FamilyWithUsersResponse>> UpdateUserById(UpdateUserFromAdminRequest query)
    {
        var user = await dbContext.Users.Where(u => u.Id == query.Id).FirstOrDefaultAsync();
        if (user is null)
        {
            return NotFound("Потребителят не съществува");
        }

        try
        {
            user.FirstName = query.FirstName;
            user.LastName = query.LastName;
            user.Description = query.Description;
            user.ImageUrl = query.ImageUrl;
            user.FamilyId = query.FamilyId;
            user.FamilyRole = query.FamilyRole;
            if (!string.IsNullOrWhiteSpace(query.Password))
            {
                var identityUser = await userManager.FindByIdAsync(user.IdentityId);
                if (identityUser is null)
                {
                    return NotFound("Потребителят не съществува");
                }

                var token = await userManager.GeneratePasswordResetTokenAsync(identityUser);
                var identityResult = await userManager.ResetPasswordAsync(identityUser, token, query.Password);
                if (!identityResult.Succeeded)
                {
                    return Problem(
                        detail: "Възникна проблем при обновяването на потребителя",
                        statusCode: StatusCodes.Status400BadRequest);
                }
            }

            dbContext.Users.Update(user);
            await dbContext.SaveChangesAsync();

            return Ok(query.Id);
        }
        catch (Exception)
        {
            return Problem(
                detail: "Възникна непоправим проблем при обновяването на потребителя",
                statusCode: StatusCodes.Status400BadRequest);
        }
    }

    [HttpDelete("users/delete/{id}")]
    public async Task<ActionResult<FamilyWithUsersResponse>> UpdateUserById(string id)
    {
        var user = await dbContext.Users.Where(u => u.Id == id).FirstOrDefaultAsync();
        if (user is null)
        {
            return NotFound("Потребителят не съществува");
        }

        try
        {
            var finances = await dbContext.Finances.AnyAsync(f => f.UserId == id);
            var bills = await dbContext.Bills.AnyAsync(f => f.UserId == id);
            var tasks = await dbContext.Tasks.AnyAsync(f => f.UserId == id);
            var inventories = await dbContext.Inventories.AnyAsync(f => f.UserId == id);

            if (finances || bills || tasks || inventories)
            {
                return Problem(
                    detail: "Потребителя има бизнес операции в системата и изтриването му е невъзможно!",
                    statusCode: StatusCodes.Status400BadRequest);
            }

            var identityUser = await userManager.FindByIdAsync(user.IdentityId);
            if (identityUser is null)
            {
                return NotFound("Потребителят не съществува");
            }

            var deleteResult = await userManager.DeleteAsync(identityUser);
            if (!deleteResult.Succeeded)
            {
                return Problem(
                    detail: "Възникна проблем при изтриването на потребителя",
                    statusCode: StatusCodes.Status400BadRequest);
            }

            dbContext.Users.Remove(user);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception)
        {
            return Problem(
                detail: "Възникна непоправим проблем при изтриването на потребителя!",
                statusCode: StatusCodes.Status400BadRequest);
        }
    }
}