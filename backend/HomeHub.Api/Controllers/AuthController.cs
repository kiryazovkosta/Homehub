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

        TokenRequest tokenRequest = new(user.IdentityId, user.Email, user.Id, [Roles.Member]);
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

        User? user = await applicationDbContext.Users.FirstOrDefaultAsync(u => u.IdentityId == identityUser.Id);
        if (user is null)
        {
            return Unauthorized();
        }

        IList<string> roles =  await userManager.GetRolesAsync(identityUser);

        TokenRequest tokenRequest = new(identityUser.Id, request.Email, user.Id, roles);
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

        User? user = await applicationDbContext.Users.FirstOrDefaultAsync(u => u.IdentityId == refreshToken.UserId);
        if (user is null)
        {
            return Unauthorized();
        }

        IList<string> roles = await userManager.GetRolesAsync(refreshToken.User);

        TokenRequest tokenRequest = new(refreshToken.User.Id, refreshToken.User.Email!, user.Id, roles);
        AccessTokensResponse accessToken = tokenProvider.GenerateTokens(tokenRequest);
        
        refreshToken.Token = accessToken.RefreshToken;
        refreshToken.ExpiresAtUtc = DateTime.UtcNow.AddDays(_jwtAuthOptions.RefreshTokenExpirationDays);
        await identityDbContext.SaveChangesAsync();
        return Ok(accessToken);
    }

    [HttpPut("recover-password")]
    public async Task<ActionResult> RecoverPassword(RecoverPasswordRequest request)
    {
        IdentityUser? identityUser = await userManager.FindByEmailAsync(request.Email);
        if (identityUser is null)
        {
            return Problem(
                detail: "1.Неуспешен опит за смяна на паролата. Моля опитайте отново.",
                statusCode: StatusCodes.Status400BadRequest);
        }

        if (await userManager.IsInRoleAsync(identityUser, Roles.Administrator))
        {
            return Problem(
                detail: "2.Неуспешен опит за смяна на паролата. Моля опитайте отново.",
                statusCode: StatusCodes.Status400BadRequest);
        }

        User? user = await applicationDbContext.Users
            .FirstOrDefaultAsync(u => u.IdentityId == identityUser.Id);
        if (user is null)
        {
            return Problem(
                detail: "3.Неуспешен опит за смяна на паролата. Моля опитайте отново.",
                statusCode: StatusCodes.Status400BadRequest);
        }

        if (user.Email != request.Email || 
            user.FirstName != request.FirstName || 
            user.LastName != request.LastName)
        {
            return Problem(
                detail: "4.Неуспешен опит за смяна на паролата. Моля опитайте отново.",
                statusCode: StatusCodes.Status400BadRequest);
        }

        if (request.Password != request.ConfirmPassword)
        {
            return Problem(
                detail: "5.Неуспешен опит за смяна на паролата. Моля опитайте отново.",
                statusCode: StatusCodes.Status400BadRequest);
        }

        var token = await userManager.GeneratePasswordResetTokenAsync(identityUser);
        var identityResult = await userManager.ResetPasswordAsync(identityUser, token, request.Password);
        if (!identityResult.Succeeded)
        {
            return Problem(
                detail: "6.Възникна проблем при обновяването на потребителя",
                statusCode: StatusCodes.Status400BadRequest);
        }
        
        return Ok(new { request.Email });
    }
}