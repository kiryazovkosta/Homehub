using HomeHub.Api.Common;
using HomeHub.Api.Common.Constants;
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
    // .UseSeeding((context, _) =>
    // {
    //     SeedData((ApplicationDbContext)context);
    // })
    .UseAsyncSeeding((context, _, cancellationToken) => SeedDataAsync((ApplicationDbContext)context, cancellationToken))
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

app.MapControllers();

await app.RunAsync();
return;

// static void SeedData(ApplicationDbContext context)
// {
//     bool seedData = false;

//     if (!context.Categories.Any())
//     {
//         seedData = true;
//         context.Categories.AddRange(
//         [
//             // Финанси – Приходи
//             new Category { Id = CategoryConstants.Category1Id, Name = "Заплата", Type = CategoryType.Finance },
//             new Category { Id = CategoryConstants.Category2Id, Name = "Бонус", Type = CategoryType.Finance },
//             new Category { Id = CategoryConstants.Category3Id, Name = "Подарък", Type = CategoryType.Finance },
//             new Category { Id = CategoryConstants.Category4Id, Name = "Възстановена сума", Type = CategoryType.Finance },
//             new Category { Id = CategoryConstants.Category5Id, Name = "Лихва", Type = CategoryType.Finance },
//             new Category { Id = CategoryConstants.Category6Id, Name = "Друг приход", Type = CategoryType.Finance },

//             // Финанси – Разходи
//             new Category { Id = CategoryConstants.Category7Id, Name = "Храна и напитки", Type = CategoryType.Finance },
//             new Category { Id = CategoryConstants.Category8Id, Name = "Транспорт", Type = CategoryType.Finance },
//             new Category { Id = CategoryConstants.Category9Id, Name = "Сметки", Type = CategoryType.Finance },
//             new Category { Id = CategoryConstants.Category10Id, Name = "Забавления", Type = CategoryType.Finance },
//             new Category { Id = CategoryConstants.Category11Id, Name = "Здраве", Type = CategoryType.Finance },
//             new Category { Id = CategoryConstants.Category12Id, Name = "Облекло", Type = CategoryType.Finance },
//             new Category { Id = CategoryConstants.Category13Id, Name = "Образование", Type = CategoryType.Finance },
//             new Category { Id = CategoryConstants.Category14Id, Name = "Наем", Type = CategoryType.Finance },
//             new Category { Id = CategoryConstants.Category15Id, Name = "Застраховка", Type = CategoryType.Finance },
//             new Category { Id = CategoryConstants.Category16Id, Name = "Друг разход", Type = CategoryType.Finance },

//             // Наличности (Inventories)
//             new Category { Id = CategoryConstants.Category17Id, Name = "Храни", Type = CategoryType.Inventory },
//             new Category { Id = CategoryConstants.Category18Id, Name = "Напитки", Type = CategoryType.Inventory },
//             new Category { Id = CategoryConstants.Category19Id, Name = "Препарати за почистване", Type = CategoryType.Inventory },
//             new Category { Id = CategoryConstants.Category20Id, Name = "Тоалетни принадлежности", Type = CategoryType.Inventory },
//             new Category { Id = CategoryConstants.Category21Id, Name = "Електроника", Type = CategoryType.Inventory },
//             new Category { Id = CategoryConstants.Category22Id, Name = "Мебели", Type = CategoryType.Inventory },
//             new Category { Id = CategoryConstants.Category23Id, Name = "Облекло", Type = CategoryType.Inventory },
//             new Category { Id = CategoryConstants.Category24Id, Name = "Инструменти", Type = CategoryType.Inventory },
//             new Category { Id = CategoryConstants.Category25Id, Name = "Канцеларски материали", Type = CategoryType.Inventory },
//             new Category { Id = CategoryConstants.Category26Id, Name = "Други", Type = CategoryType.Inventory },

//             // Сметки (Bills)
//             new Category { Id = CategoryConstants.Category27Id, Name = "Ток", Type = CategoryType.Bill },
//             new Category { Id = CategoryConstants.Category28Id, Name = "Вода", Type = CategoryType.Bill },
//             new Category { Id = CategoryConstants.Category29Id, Name = "Газ", Type = CategoryType.Bill },
//             new Category { Id = CategoryConstants.Category30Id, Name = "Интернет", Type = CategoryType.Bill },
//             new Category { Id = CategoryConstants.Category31Id, Name = "Телефон", Type = CategoryType.Bill },
//             new Category { Id = CategoryConstants.Category32Id, Name = "Наем", Type = CategoryType.Bill },
//             new Category { Id = CategoryConstants.Category33Id, Name = "Застраховка", Type = CategoryType.Bill },
//             new Category { Id = CategoryConstants.Category34Id, Name = "Извозване на отпадъци", Type = CategoryType.Bill },
//             new Category { Id = CategoryConstants.Category35Id, Name = "Телевизия", Type = CategoryType.Bill },
//             new Category { Id = CategoryConstants.Category36Id, Name = "Поддръжка", Type = CategoryType.Bill }
//         ]);
//     }

//     if (!context.Locations.Any())
//     {
//         seedData = true;
//         context.Locations.AddRange(
//         [
//             new Location { Id = LocationConstants.Location1Id, Name = "Кухня", Description = "Основна зона за готвене" },
//             new Location { Id = LocationConstants.Location2Id, Name = "Хладилник", Description = "Вътре в хладилника" },
//             new Location { Id = LocationConstants.Location3Id, Name = "Баня", Description = "Шкаф в банята" },
//             new Location { Id = LocationConstants.Location4Id, Name = "Гараж", Description = "Рафт в гаража" },
//             new Location { Id = LocationConstants.Location5Id, Name = "Склад", Description = "Помещение за съхранение на храни" },
//             new Location { Id = LocationConstants.Location6Id, Name = "Всекидневна", Description = "Шкаф или чекмедже в хола" },
//             new Location { Id = LocationConstants.Location7Id, Name = "Спалня", Description = "Гардероб или кутия под леглото" },
//             new Location { Id = LocationConstants.Location8Id, Name = "Мазе", Description = "Помещение в мазето" },
//             new Location { Id = LocationConstants.Location9Id, Name = "Таван", Description = "Кутии за съхранение на тавана" },
//             new Location { Id = LocationConstants.Location10Id, Name = "Домашен офис", Description = "Чекмеджета в работното бюро" }
//         ]);
//     }

//     if (seedData)
//     {
//         context.SaveChanges();
//     }
// }

static async Task SeedDataAsync(ApplicationDbContext context, CancellationToken cancellationToken)
{
    bool seedData = false;
    bool dataExists = await context.Categories.AnyAsync(cancellationToken);
    if (!dataExists)
    {
        seedData = true;
        await context.Categories.AddRangeAsync([
            // Финанси – Приходи
            new Category { Id = CategoryConstants.Category1Id, Name = "Заплата", Type = CategoryType.Finance },
            new Category { Id = CategoryConstants.Category2Id, Name = "Бонус", Type = CategoryType.Finance },
            new Category { Id = CategoryConstants.Category3Id, Name = "Подарък", Type = CategoryType.Finance },
            new Category { Id = CategoryConstants.Category4Id, Name = "Възстановена сума", Type = CategoryType.Finance },
            new Category { Id = CategoryConstants.Category5Id, Name = "Лихва", Type = CategoryType.Finance },
            new Category { Id = CategoryConstants.Category6Id, Name = "Друг приход", Type = CategoryType.Finance },
            // Финанси – Разходи
            new Category { Id = CategoryConstants.Category7Id, Name = "Храна и напитки", Type = CategoryType.Finance },
            new Category { Id = CategoryConstants.Category8Id, Name = "Транспорт", Type = CategoryType.Finance },
            new Category { Id = CategoryConstants.Category9Id, Name = "Сметки", Type = CategoryType.Finance },
            new Category { Id = CategoryConstants.Category10Id, Name = "Забавления", Type = CategoryType.Finance },
            new Category { Id = CategoryConstants.Category11Id, Name = "Здраве", Type = CategoryType.Finance },
            new Category { Id = CategoryConstants.Category12Id, Name = "Облекло", Type = CategoryType.Finance },
            new Category { Id = CategoryConstants.Category13Id, Name = "Образование", Type = CategoryType.Finance },
            new Category { Id = CategoryConstants.Category14Id, Name = "Наем", Type = CategoryType.Finance },
            new Category { Id = CategoryConstants.Category15Id, Name = "Застраховка", Type = CategoryType.Finance },
            new Category { Id = CategoryConstants.Category16Id, Name = "Друг разход", Type = CategoryType.Finance },
            // Наличности (Inventories)
            new Category { Id = CategoryConstants.Category17Id, Name = "Храни", Type = CategoryType.Inventory },
            new Category { Id = CategoryConstants.Category18Id, Name = "Напитки", Type = CategoryType.Inventory },
            new Category { Id = CategoryConstants.Category19Id, Name = "Препарати за почистване", Type = CategoryType.Inventory },
            new Category { Id = CategoryConstants.Category20Id, Name = "Тоалетни принадлежности", Type = CategoryType.Inventory },
            new Category { Id = CategoryConstants.Category21Id, Name = "Електроника", Type = CategoryType.Inventory },
            new Category { Id = CategoryConstants.Category22Id, Name = "Мебели", Type = CategoryType.Inventory },
            new Category { Id = CategoryConstants.Category23Id, Name = "Облекло", Type = CategoryType.Inventory },
            new Category { Id = CategoryConstants.Category24Id, Name = "Инструменти", Type = CategoryType.Inventory },
            new Category { Id = CategoryConstants.Category25Id, Name = "Канцеларски материали", Type = CategoryType.Inventory },
            new Category { Id = CategoryConstants.Category26Id, Name = "Други", Type = CategoryType.Inventory },
            // Сметки (Bills)
            new Category { Id = CategoryConstants.Category27Id, Name = "Ток", Type = CategoryType.Bill },
            new Category { Id = CategoryConstants.Category28Id, Name = "Вода", Type = CategoryType.Bill },
            new Category { Id = CategoryConstants.Category29Id, Name = "Газ", Type = CategoryType.Bill },
            new Category { Id = CategoryConstants.Category30Id, Name = "Интернет", Type = CategoryType.Bill },
            new Category { Id = CategoryConstants.Category31Id, Name = "Телефон", Type = CategoryType.Bill },
            new Category { Id = CategoryConstants.Category32Id, Name = "Наем", Type = CategoryType.Bill },
            new Category { Id = CategoryConstants.Category33Id, Name = "Застраховка", Type = CategoryType.Bill },
            new Category { Id = CategoryConstants.Category34Id, Name = "Извозване на отпадъци", Type = CategoryType.Bill },
            new Category { Id = CategoryConstants.Category35Id, Name = "Телевизия", Type = CategoryType.Bill },
            new Category { Id = CategoryConstants.Category36Id, Name = "Поддръжка", Type = CategoryType.Bill }
        ]
            , cancellationToken);
    }
    
    dataExists = await context.Locations.AnyAsync(cancellationToken);
    if (!dataExists)
    {
        seedData = true;
        await context.Locations.AddRangeAsync([
            new Location { Id = LocationConstants.Location1Id, Name = "Кухня", Description = "Основна зона за готвене" },
            new Location { Id = LocationConstants.Location2Id, Name = "Хладилник", Description = "Вътре в хладилника" },
            new Location { Id = LocationConstants.Location3Id, Name = "Баня", Description = "Шкаф в банята" },
            new Location { Id = LocationConstants.Location4Id, Name = "Гараж", Description = "Рафт в гаража" },
            new Location { Id = LocationConstants.Location5Id, Name = "Склад", Description = "Помещение за съхранение на храни" },
            new Location { Id = LocationConstants.Location6Id, Name = "Всекидневна", Description = "Шкаф или чекмедже в хола" },
            new Location { Id = LocationConstants.Location7Id, Name = "Спалня", Description = "Гардероб или кутия под леглото" },
            new Location { Id = LocationConstants.Location8Id, Name = "Мазе", Description = "Помещение в мазето" },
            new Location { Id = LocationConstants.Location9Id, Name = "Таван", Description = "Кутии за съхранение на тавана" },
            new Location { Id = LocationConstants.Location10Id, Name = "Домашен офис", Description = "Чекмеджета в работното бюро" }
        ], cancellationToken);
    }

    if (seedData)
    {
        await context.SaveChangesAsync(cancellationToken);
    }
}

