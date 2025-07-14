namespace HomeHub.Api.DTOs.Auth;

public sealed record LoginUserRequest
{
    public required string Email { get; init; }
    public required string Password { get; init; }
    public bool RememberMe { get; init; }
}