namespace HomeHub.Api.Controllers;

using Database;
using DTOs.Auth;
using DTOs.Users;
using Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

[ApiController]
[Route("/api/auth")]
[AllowAnonymous]
public sealed class AuthController(
    UserManager<IdentityUser> userManager,
    ApplicationIdentityDbContext identityDbContext,
    ApplicationDbContext applicationDbContext) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterUserRequest request)
    {
        await using IDbContextTransaction transaction = await identityDbContext.Database.BeginTransactionAsync();
        applicationDbContext.Database.SetDbConnection(identityDbContext.Database.GetDbConnection());
        await applicationDbContext.Database.UseTransactionAsync(transaction.GetDbTransaction());
        
        var identityUser = new IdentityUser
        {
            Email = request.Email,
            UserName = request.Email
        };

        if (request.Password != request.ConfirmPassword)
        {
            return BadRequest("Password mismatch");
        }

        bool familyExists = await applicationDbContext.Families.AnyAsync(f => f.Id == request.FamilyId);
        if (!familyExists)
        {
            return BadRequest("Non existing family");
        }
        
        IdentityResult identityResult = await userManager.CreateAsync(identityUser, request.Password);
        if (!identityResult.Succeeded)
        {
            var extensions = new Dictionary<string, object?>
            {
                {
                    "errors", 
                    identityResult.Errors.ToDictionary(e => e.Code, e => e.Description)
                }
            };
            return Problem(
                detail: "Unable to register user, please try again",
                statusCode: StatusCodes.Status400BadRequest,
                extensions: extensions);
        }

        User user = request.ToEntity(identityUser.Id);
        applicationDbContext.Users.Add(user);

        await applicationDbContext.SaveChangesAsync();

        await transaction.CommitAsync();
        
        return Ok(user.Id);
    }
}