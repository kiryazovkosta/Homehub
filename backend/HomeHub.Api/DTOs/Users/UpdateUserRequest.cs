using HomeHub.Api.Entities;

namespace HomeHub.Api.DTOs.Users;

public sealed record UpdateUserRequest
{
    public required string Id { get; init; }
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public required FamilyRole FamilyRole { get; init; }
    public required string Description { get; init; }
    public required string ImageUrl { get; init; }
}