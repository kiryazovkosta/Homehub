using System.Text;
using FluentValidation;
using HomeHub.Api.Common;
using HomeHub.Api.Database;
using HomeHub.Api.Database.Seeds;
using HomeHub.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.IdentityModel.Tokens;

namespace HomeHub.Api.Extensions;

using HomeHub.Api.Middlewares;
using HomeHub.Api.Settings;
using Newtonsoft.Json.Serialization;

public static class WebApplicationBuilderExtensions
{
    public static WebApplicationBuilder AddControllers(this WebApplicationBuilder builder)
    {
        builder.Services.AddControllers(options =>
            {
                options.ReturnHttpNotAcceptable = true;
            })
            .AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver
                = new CamelCasePropertyNamesContractResolver())
            .AddXmlSerializerFormatters();

        builder.Services.AddOpenApi();

        return builder;
    }

    public static WebApplicationBuilder AddErrorHandling(this WebApplicationBuilder builder)
    {
        builder.Services.AddProblemDetails(options =>
        {
            options.CustomizeProblemDetails = context =>
            {
                context.ProblemDetails.Extensions.TryAdd("requestId", context.HttpContext.TraceIdentifier);
            };
        });
        builder.Services.AddExceptionHandler<ValidationExceptionHandler>();
        builder.Services.AddExceptionHandler<GlobalExceptionHandler>();

        return builder;
    }

    public static WebApplicationBuilder AddDatabase(this WebApplicationBuilder builder)
    {
        builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options
                .UseNpgsql(
                    builder.Configuration.GetConnectionString(Databases.HomeHub),
                    npgsqlOptions => npgsqlOptions
                        .MigrationsHistoryTable(HistoryRepository.DefaultTableName, Schemas.Application))
                .UseSnakeCaseNamingConvention()
                .UseAsyncSeeding((context, _, cancellationToken) => Seeder.SeedDataAsync((ApplicationDbContext)context, cancellationToken))
        );

        builder.Services.AddDbContext<ApplicationIdentityDbContext>(options =>
            options
                .UseNpgsql(
                    builder.Configuration.GetConnectionString(Databases.HomeHub),
                    npgsqlOptions => npgsqlOptions
                        .MigrationsHistoryTable(HistoryRepository.DefaultTableName, Schemas.Identity))
                .UseSnakeCaseNamingConvention()
        );

        return builder;
    }

    public static WebApplicationBuilder AddCors(this WebApplicationBuilder builder)
    {
        CorsOptions corsOptions = builder.Configuration.GetSection(CorsOptions.SectionName).Get<CorsOptions>()!;
        builder.Services.AddCors(options =>
        {
            options.AddPolicy(CorsOptions.PolicyName, policy =>
            {
                policy
                    .WithOrigins(corsOptions.AllowedOrigins)
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
        });

        return builder;
    }

    public static WebApplicationBuilder AddApplicationServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddValidatorsFromAssemblyContaining<Program>(includeInternalTypes: true);

        //builder.Services.AddTransient<DataShapingService>();

        builder.Services.AddTransient<TokenProvider>();
        
        return builder;
    }

    public static WebApplicationBuilder AddAuthenticationServices(this WebApplicationBuilder builder)
    {
        builder.Services
            .AddIdentity<IdentityUser, IdentityRole>()
            .AddEntityFrameworkStores<ApplicationIdentityDbContext>();

        builder.Services.Configure<JwtAuthOptions>(builder.Configuration.GetSection("Jwt"));

        JwtAuthOptions? jwtAuthOptions = builder.Configuration.GetSection("Jwt").Get<JwtAuthOptions>() ?? throw new Exception("Invalid or non exists jwt section!");
        
        
        builder.Services
            .AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = jwtAuthOptions.Issuer,
                    ValidAudience = jwtAuthOptions.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtAuthOptions.Key))
                };
            });

        builder.Services.AddAuthorization();

        return builder;
    }
}