using System.Net.Http.Headers;

namespace HomeHub.Api.Controllers;

using HomeHub.Api.DTOs.Supabase;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;

[ApiController]
[Route("api/images")]
public sealed class ImagesController(IHttpClientFactory httpClientFactory) : ControllerBase
{
    private readonly string _bucket = "images";
    private readonly string _users = "users";
    //private readonly string _key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyZ2RqZnVlbGZrYm9raGhyem10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NDk3MzgsImV4cCI6MjA2ODIyNTczOH0.kWYnW0yZzu_vIHrp5jdn78axnbGfYE3No2DbRqN_PeI";
    private readonly Supabase.SupabaseOptions _options = new()
    {
        AutoConnectRealtime = true
    };

    private readonly string _supabaseUser = "kosta.kiryazov@gmail.com";
    private readonly string _supabasePass = "Fil3_Upl0@d3r";

    [HttpPost]
    public async Task<ActionResult<SupabaseImageResponse>> UploadImage(
    IFormFile file)
    {
        try
        {
            var loginRequest = new SupabaseLoginRequest(_supabaseUser, _supabasePass);
            var accessToken = await AuthenticateUserAsync(loginRequest);
            if (accessToken == null)
            {
                return BadRequest(new { error = "Authentication failed." });
            }

            var uploadResult = await UploadFileToSupabaseAsync(file, accessToken);
            return uploadResult.IsSuccess? Ok(uploadResult) : BadRequest(uploadResult);
        }
        catch (Exception)
        {
            return BadRequest("Възникна проблем при качването на изображение в Supabase");
        }
    }

    private async Task<string?> AuthenticateUserAsync(SupabaseLoginRequest request)
    {
        using var httpClient = CreateSupabaseClient();
        var loginContent = new StringContent(
            System.Text.Json.JsonSerializer.Serialize(request),
            System.Text.Encoding.UTF8,
            "application/json"
        );

        var loginResponse = await httpClient.PostAsync(
            "auth/v1/token?grant_type=password",
            loginContent
        );
        var loginBody = await loginResponse.Content.ReadAsStringAsync();

        if (!loginResponse.IsSuccessStatusCode)
        {
            return null;
        }

        using var doc = System.Text.Json.JsonDocument.Parse(loginBody);
        return doc.RootElement.GetProperty("access_token").GetString();
    }

    private async Task<SupabaseImageResponse> UploadFileToSupabaseAsync(
        IFormFile file, string accessToken)
    {
        var filePath = Path.Combine(_users, file.FileName).Replace("\\", "/");
        var uploadUrl = $"storage/v1/object/{_bucket}/{filePath}";

        using HttpClient httpClient = CreateSupabaseClient(accessToken);
        using var memoryStream = new MemoryStream();
        await file.CopyToAsync(memoryStream);
        var fileBytes = memoryStream.ToArray();

        using var content = new ByteArrayContent(fileBytes);
        content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(file.ContentType);

        var response = await httpClient.PutAsync(uploadUrl, content);
        var responseBody = await response.Content.ReadAsStringAsync();

        return response.IsSuccessStatusCode ? 
            new SupabaseImageResponse(){ IsSuccess = true, Url = $"{httpClient.BaseAddress}{uploadUrl}", Body = responseBody, Error = null, StatusCode = null } : 
            new SupabaseImageResponse(){ IsSuccess = false, Url = null, Body = null, Error = responseBody, StatusCode = response.StatusCode };
    }

    private HttpClient CreateSupabaseClient(string? accessToken = null)
    {
        HttpClient client = httpClientFactory.CreateClient("supabase");
        client.DefaultRequestHeaders.Clear();
        client.DefaultRequestHeaders.Add("apikey", Environment.GetEnvironmentVariable("SUPABASE_TOKEN") ?? throw new InvalidOperationException("Supabase token is not set in environment variables."));
        if (!string.IsNullOrWhiteSpace(accessToken))
        {
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
        }

        return client;
    }
}