namespace HomeHub.Api.DTOs.Supabase;

public sealed record SupabaseLoginRequest(string Email, string Password);