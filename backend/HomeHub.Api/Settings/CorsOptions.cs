public sealed class CorsOptions
{
    public const string SectionName = "Cors";
    public const string PolicyName = "HomeHubCorsPolicy";
    public required string[] AllowedOrigins { get; init; }
}