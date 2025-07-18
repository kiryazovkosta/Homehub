using HomeHub.Api.Common.Constants;
using HomeHub.Api.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace HomeHub.Api.Database.Seeds;

internal static class Seeder
{
    public static async Task<bool> SeedDataAsync(
        ApplicationDbContext context,
        UserManager<IdentityUser> userManager,
        CancellationToken cancellationToken)
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

        dataExists = await context.Families.AnyAsync(cancellationToken);
        if (!dataExists)
        {
            seedData = true;
            await context.Families.AddRangeAsync(
            [
                new Family
                {
                    Id = "f_0197ca11-662a-7c77-9e37-a08c6f34a00a", Name = "Иванови", Description = "Семейство Иванови, живеещо в град София"
                },
                new Family
                {
                    Id = "f_0197f98e-75e6-722c-b3b4-1550c5fe689b", Name = "Владимирови", Description = "Сплотено семейство от китният българск иград Царево"
                },
                new Family
                {
                    Id = "f_01980d61-e3fb-70ed-bd52-283d372cb881", Name = "Администратори", Description = "Администратори"
                },
            ], cancellationToken);
        }

        dataExists = await context.Users.AnyAsync(cancellationToken);
        if (!dataExists)
        {
            seedData = true;

            await userManager.CreateAsync(new IdentityUser() { Id = "01980d39-f055-742a-bef5-e54990be9f56", Email = "vlado@example.com", UserName = "vlado@example.com" }, "Test@123");
            await userManager.CreateAsync(new IdentityUser() { Id = "01980d39-f055-742a-bef5-eb95eeeee9d8", Email = "maria@example.com", UserName = "maria@example.com" }, "Test@123");
            await userManager.CreateAsync(new IdentityUser() { Id = "01980d39-f055-742a-bef5-efadeedbfca5", Email = "atanas@example.com", UserName = "atanas@example.com" }, "Test@123");
            await userManager.CreateAsync(new IdentityUser() { Id = "01980d39-f055-742a-bef5-f23a2c727526", Email = "elena@example.com", UserName = "elena@example.com" }, "Test@123");
            await userManager.CreateAsync(new IdentityUser() { Id = "01980d39-f055-742a-bef5-f513cbe5f2bf", Email = "peter@example.com", UserName = "peter@example.com" }, "Test@123");
            await userManager.CreateAsync(new IdentityUser() { Id = "01980d39-f055-742a-bef5-f91631b10db3", Email = "yana@example.com", UserName = "yana@example.com" }, "Test@123");
            await userManager.CreateAsync(new IdentityUser() { Id = "01980d39-f055-742a-bef5-fe9900d86795", Email = "admin@example.com", UserName = "admin@example.com" }, "Test@123");

            await context.Users.AddRangeAsync(
            [
                new User
                {
                    Id = "u_01980d39-f055-742a-bef5-e54990be9f56",
                    Email = "vlado@example.com",
                    FirstName = "Владимир",
                    LastName = "Владимиров",
                    FamilyRole = FamilyRole.Father,
                    Description = "Баща и глава на семейството.",
                    ImageUrl = "https://cao.bg/Images/News/Large/person.jpg",
                    FamilyId = "f_0197f98e-75e6-722c-b3b4-1550c5fe689b",
                    IdentityId = "01980d39-f055-742a-bef5-e54990be9f56"
                },
                new User
                {
                    Id = "u_01980d39-f055-742a-bef5-eb95eeeee9d8",
                    Email = "maria@example.com",
                    FirstName = "Мария",
                    LastName = "Владимирова",
                    FamilyRole = FamilyRole.Mother,
                    Description = "Грижовна майка и домакиня.",
                    ImageUrl = "https://cao.bg/Images/News/Large/person.jpg",
                    FamilyId = "f_0197f98e-75e6-722c-b3b4-1550c5fe689b",
                    IdentityId = "01980d39-f055-742a-bef5-eb95eeeee9d8"
                },
                new User
                {
                    Id = "u_01980d39-f055-742a-bef5-efadeedbfca5",
                    Email = "atanas@example.com",
                    FirstName = "Атанас",
                    LastName = "Владимиров",
                    FamilyRole = FamilyRole.Son,
                    Description = "Тийнейджър, ученик в гимназия.",
                    ImageUrl = "https://cao.bg/Images/News/Large/person.jpg",
                    FamilyId = "f_0197f98e-75e6-722c-b3b4-1550c5fe689b",
                    IdentityId = "01980d39-f055-742a-bef5-efadeedbfca5"
                },
                new User
                {
                    Id = "u_01980d39-f055-742a-bef5-f23a2c727526",
                    Email = "elena@example.com",
                    FirstName = "Елена",
                    LastName = "Владимирова",
                    FamilyRole = FamilyRole.Daughter,
                    Description = "Малка дъщеря, обича да рисува.",
                    ImageUrl = "https://cao.bg/Images/News/Large/person.jpg",
                    FamilyId = "f_0197f98e-75e6-722c-b3b4-1550c5fe689b",
                    IdentityId = "01980d39-f055-742a-bef5-f23a2c727526"
                },
                new User
                {
                    Id = "u_01980d39-f055-742a-bef5-f513cbe5f2bf",
                    Email = "peter@example.com",
                    FirstName = "Петър",
                    LastName = "Иванов",
                    FamilyRole = FamilyRole.Father,
                    Description = "Съпруг, глава на семейството, работи като инженер.",
                    ImageUrl = "https://cao.bg/Images/News/Large/person.jpg",
                    FamilyId = "f_0197ca11-662a-7c77-9e37-a08c6f34a00a",
                    IdentityId = "01980d39-f055-742a-bef5-f513cbe5f2bf"
                },
                new User
                {
                    Id = "u_01980d39-f055-742a-bef5-f91631b10db3",
                    Email = "yana@example.com",
                    FirstName = "Яна",
                    LastName = "Колева-Иванова",
                    FamilyRole = FamilyRole.Mother,
                    Description = "Съпруга и стожер на семейството",
                    ImageUrl = "https://cao.bg/Images/News/Large/person.jpg",
                    FamilyId = "f_0197ca11-662a-7c77-9e37-a08c6f34a00a",
                    IdentityId = "01980d39-f055-742a-bef5-f91631b10db3"
                },
                new User
                {
                    Id = "u_01980d39-f055-742a-bef5-fe9900d86795",
                    Email = "admin@example.com",
                    FirstName = "Петър",
                    LastName = "Иванов",
                    FamilyRole = FamilyRole.Other,
                    Description = "Администратор на системата.",
                    ImageUrl = "https://cao.bg/Images/News/Large/person.jpg",
                    FamilyId = "f_01980d61-e3fb-70ed-bd52-283d372cb881",
                    IdentityId = "01980d39-f055-742a-bef5-fe9900d86795"
                }
            ], cancellationToken);
        }

        dataExists = await context.Finances.AnyAsync(cancellationToken);
        if (!dataExists)
        {
            seedData = true;
            await context.Finances.AddRangeAsync([
                    new Finance { Id = FinanceConstants.Finance1Id, Title = "Продажба на очила онлайн", Description = "Продажба на слънчеви очила за клиент през платформа за онлайн търговия", Type = FinanceType.Income, CategoryId = CategoryConstants.Category6Id, Amount = 310.00M, Date = new DateOnly(2025, 8, 6), CreatedAt = DateTime.UtcNow, UserId = "u_01980d39-f055-742a-bef5-e54990be9f56" },
                    new Finance { Id = FinanceConstants.Finance2Id, Title = "Заплата за август 2025", Description = "Месечно възнаграждение от основната работа, получено по банков път", Type = FinanceType.Income, CategoryId = CategoryConstants.Category1Id, Amount = 2450.00M, Date = new DateOnly(2025, 8, 1), CreatedAt = DateTime.UtcNow, UserId = "u_01980d39-f055-742a-bef5-eb95eeeee9d8" },
                    new Finance { Id = FinanceConstants.Finance3Id, Title = "Покупка на хранителни продукти", Description = "Пазаруване в супермаркет за седмични хранителни нужди", Type = FinanceType.Expense, CategoryId = CategoryConstants.Category7Id, Amount = 96.40M, Date = new DateOnly(2025, 8, 3), CreatedAt = DateTime.UtcNow, UserId = "u_01980d39-f055-742a-bef5-e54990be9f56" },
                    new Finance { Id = FinanceConstants.Finance4Id, Title = "Подарък за рожден ден", Description = "Получен паричен подарък от роднина по случай рожден ден", Type = FinanceType.Income, CategoryId = CategoryConstants.Category3Id, Amount = 150.00M, Date = new DateOnly(2025, 8, 10), CreatedAt = DateTime.UtcNow, UserId = "u_01980d39-f055-742a-bef5-e54990be9f56" },
                    new Finance { Id = FinanceConstants.Finance5Id, Title = "Плащане на наем", Description = "Месечен наем за апартамент в центъра на града", Type = FinanceType.Expense, CategoryId = CategoryConstants.Category14Id, Amount = 600.00M, Date = new DateOnly(2025, 8, 5), CreatedAt = DateTime.UtcNow, UserId = "u_01980d39-f055-742a-bef5-efadeedbfca5" },
                    new Finance { Id = FinanceConstants.Finance6Id, Title = "Бонус за постигнати цели", Description = "Финансов бонус от работодателя за успешно завършен проект", Type = FinanceType.Income, CategoryId = CategoryConstants.Category2Id, Amount = 500.00M, Date = new DateOnly(2025, 8, 8), CreatedAt = DateTime.UtcNow, UserId = "u_01980d39-f055-742a-bef5-eb95eeeee9d8" },
                    new Finance { Id = FinanceConstants.Finance7Id, Title = "Покупка на дрехи", Description = "Пазаруване на летни дрехи от търговски център", Type = FinanceType.Expense, CategoryId = CategoryConstants.Category12Id, Amount = 120.00M, Date = new DateOnly(2025, 8, 9), CreatedAt = DateTime.UtcNow, UserId = "u_01980d39-f055-742a-bef5-f23a2c727526" },
                    new Finance { Id = FinanceConstants.Finance8Id, Title = "Плащане на интернет и ток", Description = "Месечни сметки за интернет и електричество", Type = FinanceType.Expense, CategoryId = CategoryConstants.Category9Id, Amount = 85.75M, Date = new DateOnly(2025, 8, 4), CreatedAt = DateTime.UtcNow, UserId = "u_01980d39-f055-742a-bef5-e54990be9f56" },
                    new Finance { Id = FinanceConstants.Finance9Id, Title = "Доход от лихва по депозит", Description = "Получена лихва от срочен депозит в банка", Type = FinanceType.Income, CategoryId = CategoryConstants.Category5Id, Amount = 42.30M, Date = new DateOnly(2025, 8, 15), CreatedAt = DateTime.UtcNow, UserId = "u_01980d39-f055-742a-bef5-e54990be9f56" },
                    new Finance { Id = FinanceConstants.Finance10Id, Title = "Пътуване с автобус", Description = "Разход за междуградски автобусен билет", Type = FinanceType.Expense, CategoryId = CategoryConstants.Category8Id, Amount = 18.00M, Date = new DateOnly(2025, 8, 7), CreatedAt = DateTime.UtcNow, UserId = "u_01980d39-f055-742a-bef5-eb95eeeee9d8" },
                    new Finance { Id = FinanceConstants.Finance11Id, Title = "Покупка на учебници", Description = "Разход за учебници и материали за новия семестър", Type = FinanceType.Expense, CategoryId = CategoryConstants.Category13Id, Amount = 75.00M, Date = new DateOnly(2025, 8, 20), CreatedAt = DateTime.UtcNow, UserId = "u_01980d39-f055-742a-bef5-e54990be9f56" },
                    new Finance { Id = FinanceConstants.Finance12Id, Title = "Застраховка на автомобила", Description = "Годишна застраховка гражданска отговорност", Type = FinanceType.Expense, CategoryId = CategoryConstants.Category15Id, Amount = 220.00M, Date = new DateOnly(2025, 8, 12), CreatedAt = DateTime.UtcNow, UserId = "u_01980d39-f055-742a-bef5-f23a2c727526" },
                    new Finance { Id = FinanceConstants.Finance13Id, Title = "Възстановена сума от магазин", Description = "Възстановена сума след връщане на дефектна стока", Type = FinanceType.Income, CategoryId = CategoryConstants.Category4Id, Amount = 65.00M, Date = new DateOnly(2025, 8, 13), CreatedAt = DateTime.UtcNow, UserId = "u_01980d39-f055-742a-bef5-e54990be9f56" },
                    new Finance { Id = FinanceConstants.Finance14Id, Title = "Кино вечер с приятели", Description = "Разход за билети и напитки в кино салон", Type = FinanceType.Expense, CategoryId = CategoryConstants.Category10Id, Amount = 32.50M, Date = new DateOnly(2025, 8, 14), CreatedAt = DateTime.UtcNow, UserId = "u_01980d39-f055-742a-bef5-efadeedbfca5" },
                    new Finance { Id = FinanceConstants.Finance15Id, Title = "Медицински преглед", Description = "Разход за профилактичен преглед при личен лекар", Type = FinanceType.Expense, CategoryId = CategoryConstants.Category11Id, Amount = 40.00M, Date = new DateOnly(2025, 8, 11), CreatedAt = DateTime.UtcNow, UserId = "u_01980d39-f055-742a-bef5-eb95eeeee9d8" },
                    new Finance { Id = FinanceConstants.Finance16Id, Title = "Допълнителен доход от фрийланс", Description = "Заплащане за изработка на уебсайт за клиент", Type = FinanceType.Income, CategoryId = CategoryConstants.Category6Id, Amount = 800.00M, Date = new DateOnly(2025, 8, 17), CreatedAt = DateTime.UtcNow, UserId = "u_01980d39-f055-742a-bef5-e54990be9f56" },
                    new Finance { Id = FinanceConstants.Finance17Id, Title = "Покупка на кафе и закуска", Description = "Сутрешно кафе и кроасан от близкото кафене", Type = FinanceType.Expense, CategoryId = CategoryConstants.Category7Id, Amount = 6.20M, Date = new DateOnly(2025, 8, 2), CreatedAt = DateTime.UtcNow, UserId = "u_01980d39-f055-742a-bef5-efadeedbfca5" },
                    new Finance { Id = FinanceConstants.Finance18Id, Title = "Подарък за годишнина", Description = "Паричен подарък за близък по случай годишнина", Type = FinanceType.Expense, CategoryId = CategoryConstants.Category13Id, Amount = 100.00M, Date = new DateOnly(2025, 8, 18), CreatedAt = DateTime.UtcNow, UserId = "u_01980d39-f055-742a-bef5-e54990be9f56" },
                    new Finance { Id = FinanceConstants.Finance19Id, Title = "Покупка на книги", Description = "Разход за художествена литература от книжарница", Type = FinanceType.Expense, CategoryId = CategoryConstants.Category13Id, Amount = 48.90M, Date = new DateOnly(2025, 8, 19), CreatedAt = DateTime.UtcNow, UserId = "u_01980d39-f055-742a-bef5-f513cbe5f2bf" },
                    new Finance { Id = FinanceConstants.Finance20Id, Title = "Печалба от онлайн търг", Description = "Продажба на колекционерска вещ чрез онлайн платформа", Type = FinanceType.Income, CategoryId = CategoryConstants.Category6Id, Amount = 275.00M, Date = new DateOnly(2025, 8, 21), CreatedAt = DateTime.UtcNow, UserId = "u_01980d39-f055-742a-bef5-f91631b10db3" },
                    new Finance { Id = FinanceConstants.Finance21Id, Title = "Плащане на мобилен план", Description = "Месечна такса за мобилни услуги", Type = FinanceType.Expense, CategoryId = CategoryConstants.Category9Id, Amount = 25.00M, Date = new DateOnly(2025, 8, 22), CreatedAt = DateTime.UtcNow, UserId = "u_01980d39-f055-742a-bef5-f513cbe5f2bf" },
                    new Finance { Id = FinanceConstants.Finance22Id, Title = "Покупка на обувки", Description = "Разход за нови спортни обувки", Type = FinanceType.Expense, CategoryId = CategoryConstants.Category12Id, Amount = 89.99M, Date = new DateOnly(2025, 8, 23), CreatedAt = DateTime.UtcNow, UserId = "u_01980d39-f055-742a-bef5-f91631b10db3" }
                ]
                , cancellationToken);
        }

        if (seedData)
        {
            await context.SaveChangesAsync(cancellationToken);
        }

        return seedData;
    }

    public static async System.Threading.Tasks.Task SeedInitialDataAsync(this WebApplication app)
    {
        await using AsyncServiceScope scope = app.Services.CreateAsyncScope();
        RoleManager<IdentityRole> roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        UserManager<IdentityUser> userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();

        try
        {
            if (!await roleManager.RoleExistsAsync(Roles.Member))
            {
                await roleManager.CreateAsync(new IdentityRole(Roles.Member));
            }

            if (!await roleManager.RoleExistsAsync(Roles.Administrator))
            {
                await roleManager.CreateAsync(new IdentityRole(Roles.Administrator));
                
                var adminUser = await userManager.FindByEmailAsync("admin@example.com");
                if (adminUser is not null)
                {
                    await userManager.AddToRoleAsync(adminUser, Roles.Administrator);
                }
            }
        }
        catch (Exception exception)
        {
            app.Logger.LogError(exception, "Възникна проблем при инициализирането на ролите.");
            throw;
        }
    }
}