# Система за управление на дома с Angular фронтенд и .NET Core бекенд.

## 📝 Техническо задание
Проект: Домашна система за управление
Фронтенд: Angular 17+
Бекенд: ASP.NET Core 8 (REST API)
База данни: PostgreSQL / SQL Server
Архитектура: Клиент-сървър (SPA + RESTful API)

## 🎯 Цел на системата
Разработка на уеб приложение за управление на дома, включващо модули за:

Финанси (доходи/разходи)

Наличности (храна, домакински вещи и др.)

Потребители (множество роли и достъпи)

## 🔧 Основни функционалности
### 1. Аутентикация и авторизация
Регистрация / вход / възстановяване на парола

JWT токени

Роли: Admin, User, Guest

Управление на потребителски профили

### 2. Модул: Финанси
Въвеждане на приходи и разходи

Категории (храна, транспорт, сметки, др.)

Месечни отчети

Баланс в реално време

Графики с обобщена статистика

### 3. Модул: Наличности
Въвеждане на артикули (име, категория, брой, място на съхранение)

Известия при изчерпване

Списъци за пазаруване

История на наличности

### 6. Административен панел
Управление на потребители

Управление на категории, роли

Преглед на цялостна активност в системата

## 🛠️ Технологични изисквания
### Фронтенд (Angular) (задължително)
Angular 17+

Angular Material

RxJS за реактивност

Angular Router

NgRx (по избор) за state management

Lazy loading на модули

Интерсептори за HTTP заявки

Form validation + reactive forms

### Бекенд (.NET Core) ( без отношение към изпита )
ASP.NET Core Web API

Entity Framework Core

AutoMapper

Fluent Validation

JWT Authentication

Dependency Injection

Logging (Serilog / built-in)

Middleware за глобално обработване на грешки

### База Данни ( без отношение към изпита )
PostgreSQL или SQL Server

Code-First подход (Entity Framework Migrations)

Модели с релации (One-to-Many, Many-to-Many)

Seed данни за начално тестване

## 📱 UX/UI изисквания
Респонсив дизайн за мобилни устройства

Интуитивна навигация

Dashboard с обобщена информация след логин

Потвърждения при триене / критични действия

## 📦 Архитектура на проекта
### Фронтенд структура (Angular)
bash
Copy
Edit
/src  
  /app  
    /core  
    /shared  
    /auth  
    /dashboard  
    /tasks  
    /finances  
    /inventories  
    /bills  
    /admin  
### Бекенд структура (.NET Core)
Copy
Edit
/Controllers  
/Services  
/Repositories  
/DTOs  
/Models  
/Data (DbContext, Migrations)  
/Middleware  

