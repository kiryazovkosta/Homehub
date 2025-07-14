namespace HomeHub.Api.Settings;

public sealed class JwtAuthOptions
{
    public required string Issuer { get; init; }
    public required string Audience { get; init; }
    public required string Key { get; init; }
    public int ExpirationInMinutes { get; init; }
    public int RefreshTokenExpirationDays { get; init; }
}