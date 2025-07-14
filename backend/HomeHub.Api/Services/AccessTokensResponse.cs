namespace HomeHub.Api.Services;

public sealed record AccessTokensResponse
{
    public required string AccessToken { get; init; } 
    public required string RefreshToken { get; init; }
}