namespace HomeHub.Api.DTOs.Auth;

public sealed record RecoverPasswordRequest
{
    public required string Email { get; init; }
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public required string Password { get; init; }
    public required string ConfirmPassword { get; init; }
    
}