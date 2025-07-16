namespace HomeHub.Api.DTOs.Supabase;

using System.Net;

public sealed record SupabaseImageResponse()
{
    public bool IsSuccess { get; init; }
    public string? Url { get; init; }
    public string? Body { get; init; }
    public string? Error { get; init; }
    public HttpStatusCode? StatusCode { get; init; }
}