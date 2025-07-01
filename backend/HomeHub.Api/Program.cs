using HomeHub.Api.Common;
using HomeHub.Api.Database;
using HomeHub.Api.Entities;
using HomeHub.Api.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using Scalar.AspNetCore;
using Task = System.Threading.Tasks.Task;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(options =>
{
    options.ReturnHttpNotAcceptable = true;
})
.AddXmlSerializerFormatters();

builder.Services.AddOpenApi();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options
        .UseNpgsql(
            builder.Configuration.GetConnectionString(Databases.HomeHub),
            npgsqlOptions => npgsqlOptions
                .MigrationsHistoryTable(HistoryRepository.DefaultTableName, Schemas.Application))
    .UseSnakeCaseNamingConvention()
    .UseSeeding((context, _) =>
    {
        SeedData((ApplicationDbContext)context);
    })
    .UseAsyncSeeding((context, _, cancellationToken) => SeedDataAsync((ApplicationDbContext)context, cancellationToken)));


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

app.MapControllers();

await app.RunAsync();
return;

static void SeedData(ApplicationDbContext context)
{
    if (context.Categories.Any())
        return;

    var categories = new[]
    {
        new Category { Id = Guid.NewGuid().ToString(), Name = "Домакинство", Type = CategoryType.Finance },
        new Category { Id = Guid.NewGuid().ToString(), Name = "Транспорт", Type = CategoryType.Finance },
        new Category { Id = Guid.NewGuid().ToString(), Name = "Заплата", Type = CategoryType.Finance }
    };

    context.Categories.AddRange(categories);
    context.SaveChanges();
}

static async Task SeedDataAsync(ApplicationDbContext context, CancellationToken cancellationToken)
{
    if (await context.Categories.AnyAsync(cancellationToken))
        return;

    var categories = new[]
    {
        new Category { Id = Guid.NewGuid().ToString(), Name = "Домакинство", Type = CategoryType.Finance },
        new Category { Id = Guid.NewGuid().ToString(), Name = "Транспорт", Type = CategoryType.Finance },
        new Category { Id = Guid.NewGuid().ToString(), Name = "Заплата", Type = CategoryType.Finance }
    };

    await context.Categories.AddRangeAsync(categories, cancellationToken);
    await context.SaveChangesAsync(cancellationToken);
}

