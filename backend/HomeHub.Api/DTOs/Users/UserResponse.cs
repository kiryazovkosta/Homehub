using HomeHub.Api.DTOs.Families;
using HomeHub.Api.Entities;

namespace HomeHub.Api.DTOs.Users;

public sealed record UserResponse
{
    public required string Id { get; init; }
    public required string Email { get; init; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public FamilyRole FamilyRole { get; set; }
    public required string FamilyRoleValue { get; init; }
    public required string Description { get; init; }
    public required string ImageUrl { get; init; }
    public required FamilyResponse Family { get; init; }
}