using Microsoft.AspNetCore.Mvc;

namespace HomeHub.Api.DTOs.Supabase;

public sealed class SupabaseImageRequest
{
    [FromForm]
    public required string Folder { get; set; }

    [FromForm]
    public required IFormFile File { get; set; }
}