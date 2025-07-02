namespace HomeHub.Api.DTOs.Bills;

public sealed record BillsListCollectionResponse
{
    public required List<BillListResponse> Items { get; init; }
}

public sealed record BillListResponse
{
    public required string Id { get; init; }
    public required string Title { get; init; }
    public required DateOnly DueDate { get; init; }
    public required decimal Amount { get; init; }
    public required bool IsPaid { get; init; }
}