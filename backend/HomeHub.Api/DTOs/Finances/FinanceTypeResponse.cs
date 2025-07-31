namespace HomeHub.Api.DTOs.Finances;

public sealed record EnumResponse
{
    public int Id { get; init; }
    public required string Value { get; init; }
}