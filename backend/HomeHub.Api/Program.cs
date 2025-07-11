using HomeHub.Api.Extensions;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder
    .AddControllers()
    .AddErrorHandling()
    .AddDatabase()
    .AddCors()
    .AddApplicationServices()
    .AddAuthenticationServices();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(options =>
    {
        options
            .WithTitle("HomeHub API")
            .WithTheme(ScalarTheme.DeepSpace)
            .WithDefaultHttpClient(ScalarTarget.CSharp, ScalarClient.HttpClient)
            .WithDarkMode();
    });

    await app.ApplyMigrationsAsync();
}

app.UseHttpsRedirection();

app.UseExceptionHandler();

app.UseCors(CorsOptions.PolicyName);

app.MapControllers();

await app.RunAsync();