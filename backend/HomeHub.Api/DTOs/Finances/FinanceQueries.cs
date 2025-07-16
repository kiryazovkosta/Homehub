using System.Linq.Expressions;
using HomeHub.Api.DTOs.Categories;
using HomeHub.Api.Entities;
using HomeHub.Api.Extensions;

namespace HomeHub.Api.DTOs.Finances;

internal static class FinanceQueries
{
    public static Expression<Func<Finance, FinanceListResponse>> ToListResponse()
    {
        return f => new FinanceListResponse
        {
            Id = f.Id,
            Title = f.Title.Length <= 50 ? f.Title : f.Title.Substring(0, 50),
            Description = f.Description.Length <= 100 ? f.Description : f.Description.Substring(0, 100),
            Type = f.Type,
            TypeValue = f.Type.GetDescription(),
            Amount = f.Amount,
            UserId = f.UserId,
        };
    }

    public static Expression<Func<Finance, FinanceResponse>> ToResponse()
    {
        return f => new FinanceResponse
        {
            Id = f.Id,
            Title = f.Title,
            Description = f.Description,
            Type = f.Type,
            TypeValue = f.Type.GetDescription(),
            Category = new CategoryResponse()
            {
                Id = f.Category.Id,
                Name = f.Category.Name,
                Type = f.Category.Type,
                TypeValue = f.Category.Type.GetDescription()
            },
            Amount = f.Amount,
            Date = f.Date,
            CreatedAt = f.CreatedAt,
            UpdatedAt = f.UpdatedAt,
            UserId = f.UserId,
        };
    }
}