using HomeHub.Api.Common.Constants;
using HomeHub.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace HomeHub.Api.Database.Seeds;

internal static class Seeder
{
    public static async System.Threading.Tasks.Task SeedDataAsync(ApplicationDbContext context, CancellationToken cancellationToken)
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
            ], cancellationToken);
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

        dataExists = await context.Finances.AnyAsync(cancellationToken);
        if (!dataExists)
        {
            seedData = true;
            await context.Finances.AddRangeAsync([
                    new Finance { Id = FinanceConstants.Finance1Id,Title = "Продажба на очила",Description="Продажба на слънчеви очила за клиент през платформа за онлайн търговия",Type = FinanceType.Income,CategoryId = CategoryConstants.Category6Id,Amount = 310.00M, Date = new DateOnly(2025,8,6), CreatedAt = DateTime.UtcNow,},
                    new Finance{Id = FinanceConstants.Finance2Id,Title = "Разходи за храна",Description="Седмични разходи за хранителни продукти, плодове и зеленчуци",Type = FinanceType.Expense,CategoryId = CategoryConstants.Category7Id,Amount = 460.00M,Date = new DateOnly(2025,8,1),CreatedAt = DateTime.UtcNow.AddDays(-1)},
                    new Finance{Id = FinanceConstants.Finance3Id,Title = "Разходи за транспорт",Description="Месечни разходи за карта за градският транспорт",Type = FinanceType.Expense,CategoryId = CategoryConstants.Category8Id,Amount = 200.00M,Date = new DateOnly(2025,8,1),CreatedAt = DateTime.UtcNow.AddDays(-2)},
                    new Finance{Id = FinanceConstants.Finance4Id,Title = "Заплата за месец август",Description="Получаване на заплата за трудово-правни взаимотоношения с фирма Фирмата АД",Type = FinanceType.Income,CategoryId = CategoryConstants.Category1Id,Amount = 3150.00M,Date = new DateOnly(2025,8,4),CreatedAt = DateTime.UtcNow},
                    new Finance{Id = FinanceConstants.Finance5Id,Title = "Наем от жилище",Description="Получаване на наем от отдавано под наем жилище",Type = FinanceType.Income,CategoryId = CategoryConstants.Category6Id,Amount = 850.00M,Date = new DateOnly(2025,8,4),CreatedAt = DateTime.UtcNow},
                    new Finance{Id = FinanceConstants.Finance6Id,Title = "Такса за почивка",Description="Разходи за семейна лятна почивка",Type = FinanceType.Expense,CategoryId = CategoryConstants.Category10Id,Amount = 1400.00M,Date = new DateOnly(2025,8,10),CreatedAt = DateTime.UtcNow.AddDays(1)},
                ]
                , cancellationToken);
        }

        if (seedData)
        {
            await context.SaveChangesAsync(cancellationToken);
        }
    }
}