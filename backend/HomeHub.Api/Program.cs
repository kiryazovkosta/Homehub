using FluentValidation;
using HomeHub.Api.Common;
using HomeHub.Api.Database;
using HomeHub.Api.Database.Seeds;
using HomeHub.Api.Extensions;
using HomeHub.Api.Middlewares;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(options =>
{
    options.ReturnHttpNotAcceptable = true;
})
.AddXmlSerializerFormatters();

builder.Services.AddValidatorsFromAssemblyContaining<Program>(includeInternalTypes: true);

builder.Services.AddProblemDetails(options =>
{
    options.CustomizeProblemDetails = context =>
    {
        context.ProblemDetails.Extensions.TryAdd("requestId", context.HttpContext.TraceIdentifier);
    };
});
builder.Services.AddExceptionHandler<ValidationExceptionHandler>();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();

builder.Services.AddOpenApi();

Console.WriteLine(builder.Configuration.GetConnectionString(Databases.HomeHub));

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options
        .UseNpgsql(
            builder.Configuration.GetConnectionString(Databases.HomeHub),
            npgsqlOptions => npgsqlOptions
                .MigrationsHistoryTable(HistoryRepository.DefaultTableName, Schemas.Application))
    .UseSnakeCaseNamingConvention()
    .UseAsyncSeeding((context, _, cancellationToken) => Seeder.SeedDataAsync((ApplicationDbContext)context, cancellationToken))
    );


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

app.MapControllers();

await app.RunAsync();