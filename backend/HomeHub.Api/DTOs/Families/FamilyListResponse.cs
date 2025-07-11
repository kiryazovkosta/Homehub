using HomeHub.Api.DTOs.Common;

namespace HomeHub.Api.DTOs.Families;

public sealed record FamilyListResponse
{
    public required string Id { get; init; }
    public required string Name { get; init; }
}

