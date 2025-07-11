using HomeHub.Api.DTOs.Users;

namespace HomeHub.Api.DTOs.Families;

public sealed record FamilyWithUsersResponse
{
    public required string Id { get; init; }
    public required string Name { get; init; }
    public required string Description { get; init; }
    public required List<UserSimplyResponse> Users { get; init; }
}