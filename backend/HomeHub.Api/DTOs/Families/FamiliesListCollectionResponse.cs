using HomeHub.Api.DTOs.Common;

namespace HomeHub.Api.DTOs.Families;

public sealed record FamiliesListCollectionResponse : ICollectionResponse<FamilyListResponse>
{
    public required List<FamilyListResponse> Items { get; init; }
}