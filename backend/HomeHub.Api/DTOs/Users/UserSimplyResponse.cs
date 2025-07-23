namespace HomeHub.Api.DTOs.Users;

public sealed record UserSimplyResponse
{
    public required string Id { get; init; }
    public required string Email { get; init; }
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public required string FamilyRoleValue { get; init; }
    public required string Description { get; init; }
    public required string ImageUrl { get; init; }
}