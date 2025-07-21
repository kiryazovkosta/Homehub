public sealed record ServiceListResponse
{
    public required string Id { get; init; }
    public required string Title { get; init; }
    public required string Description { get; init; }
}