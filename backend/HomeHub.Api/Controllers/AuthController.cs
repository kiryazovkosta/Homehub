using HomeHub.Api.Services;
using HomeHub.Api.Settings;
using Microsoft.Extensions.Options;

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
    ApplicationDbContext applicationDbContext,
    TokenProvider tokenProvider,
    IOptions<JwtAuthOptions> jwtOptions) : ControllerBase
{
    private readonly JwtAuthOptions _jwtAuthOptions = jwtOptions.Value; 
    
    [HttpPost("register")]
    public async Task<ActionResult<AccessTokensResponse>> Register(RegisterUserRequest request)
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
        applicationDbContext.Users.Add(user);

        await applicationDbContext.SaveChangesAsync();

        TokenRequest tokenRequest = new(user.IdentityId, user.Email, [Roles.Member]);
        AccessTokensResponse accessToken = tokenProvider.GenerateTokens(tokenRequest);

        var refreshToken = new RefreshToken
        {
            Id = Guid.CreateVersion7(),
            UserId = identityUser.Id,
            Token = accessToken.RefreshToken,
            ExpiresAtUtc = DateTime.UtcNow.AddDays(_jwtAuthOptions.RefreshTokenExpirationDays),
        };

        identityDbContext.RefreshTokens.Add(refreshToken);
        await identityDbContext.SaveChangesAsync();

        await transaction.CommitAsync();

        return Ok(accessToken);
    }

    [HttpPost("login")]
    public async Task<ActionResult<AccessTokensResponse>> Login(LoginUserRequest request)
    {
        var identityUser = await userManager.FindByEmailAsync(request.Email);
        if (identityUser is null || !await userManager.CheckPasswordAsync(identityUser, request.Password) )
        {
            return Unauthorized();
        }

        IList<string> roles =  await userManager.GetRolesAsync(identityUser);

        TokenRequest tokenRequest = new(identityUser.Id, request.Email, roles);
        AccessTokensResponse accessToken = tokenProvider.GenerateTokens(tokenRequest);

        var refreshToken = new RefreshToken
        {
            Id = Guid.CreateVersion7(),
            UserId = identityUser.Id,
            Token = accessToken.RefreshToken,
            ExpiresAtUtc = DateTime.UtcNow.AddDays(_jwtAuthOptions.RefreshTokenExpirationDays),
        };

        identityDbContext.RefreshTokens.Add(refreshToken);
        await identityDbContext.SaveChangesAsync();

        return Ok(accessToken); 
    }

    [HttpPost("refresh")]
    public async Task<ActionResult<AccessTokensResponse>> Refresh(RefreshTokenRequest request)
    {
        RefreshToken? refreshToken = await identityDbContext.RefreshTokens
            .Include(rt => rt.User)
            .FirstOrDefaultAsync(rt => rt.Token == request.RefreshToken);
        if (refreshToken is null)
        {
            return Unauthorized();
        }

        if (refreshToken.ExpiresAtUtc < DateTime.UtcNow)
        {
            return Unauthorized();
        }

        IList<string> roles = await userManager.GetRolesAsync(refreshToken.User);

        TokenRequest tokenRequest = new(refreshToken.User.Id, refreshToken.User.Email!, roles);
        AccessTokensResponse accessToken = tokenProvider.GenerateTokens(tokenRequest);
        
        refreshToken.Token = accessToken.RefreshToken;
        refreshToken.ExpiresAtUtc = DateTime.UtcNow.AddDays(_jwtAuthOptions.RefreshTokenExpirationDays);
        await identityDbContext.SaveChangesAsync();
        return Ok(accessToken);
    }
}