namespace HomeHub.Api.DTOs.Auth;

using Entities;

public sealed record RegisterUserRequest
{
    public required string Email { get; init; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required  string Password { get; set; }
    public required string ConfirmPassword { get; set; }
    public FamilyRole FamilyRole { get; set; }
    public required string Description { get; init; }
    public required string ImageUrl { get; init; }
    public required string FamilyId { get; init; }
}