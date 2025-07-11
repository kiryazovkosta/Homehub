using HomeHub.Api.DTOs.Common;
using HomeHub.Api.DTOs.Finances;

namespace HomeHub.Api.DTOs.Inventories;

public sealed record InventoriesListCollectionResponse : ICollectionResponse<InventoryListResponse>
{
    public required List<InventoryListResponse> Items { get; init; }
}
