namespace HomeHub.Api.DTOs.Auth;

public sealed class RefreshTokenRequest
{
    public required string RefreshToken { get; init; }
}