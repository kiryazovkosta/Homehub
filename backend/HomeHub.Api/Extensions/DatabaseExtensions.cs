namespace HomeHub.Api.Extensions;

using Database;
using Microsoft.EntityFrameworkCore;

public static class DatabaseExtensions
{
    public static async Task ApplyMigrationsAsync(this WebApplication app)
    {
        await using AsyncServiceScope scope = app.Services.CreateAsyncScope();
        await using ApplicationDbContext applicationDbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        await using ApplicationIdentityDbContext identityBbContext = scope.ServiceProvider.GetRequiredService<ApplicationIdentityDbContext>();
        try
        {
            await applicationDbContext.Database.MigrateAsync();
            app.Logger.LogInformation("Application database migrations applied successfully.");
            
            await identityBbContext.Database.MigrateAsync();
            app.Logger.LogInformation("Identity database migrations applied successfully.");
        }
        catch(Exception ex)
        {
            app.Logger.LogError(ex, "An error occurred while applying database migrations." );
            throw;
        }
    }
}