namespace HomeHub.Api.Extensions;

using Database;
using Microsoft.EntityFrameworkCore;

public static class DatabaseExtensions
{
    public static async Task ApplyMigrationsAsync(this WebApplication app)
    {
        await using AsyncServiceScope scope = app.Services.CreateAsyncScope();
        await using ApplicationDbContext dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        try
        {
            await dbContext.Database.MigrateAsync();
            app.Logger.LogInformation("Application database migrations applied successfully.");

        }
        catch(Exception ex)
        {
            app.Logger.LogError(ex, "An error occurred while applying database migrations." );
            throw;
        }
    }
}