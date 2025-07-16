using HomeHub.Api.Database;
using HomeHub.Api.Database.Seeds;
using HomeHub.Api.Extensions;
using HomeHub.Api.Settings;
using Microsoft.AspNetCore.Identity;
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

    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();
    await Seeder.SeedDataAsync(dbContext, userManager, CancellationToken.None);

    await app.SeedInitialDataAsync();
}

app.UseHttpsRedirection();

app.UseExceptionHandler();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors(CorsOptions.PolicyName);

app.MapControllers();

await app.RunAsync();