using HomeHub.Api.DTOs.Categories;
using HomeHub.Api.Entities;
using HomeHub.Api.Extensions;

namespace HomeHub.Api.DTOs.Finances;

internal static class FinanceMappings
{
    public static Finance ToEntity(this CreateFinanceRequest request, Category category)
    {
        return new Finance
        {
            Id = $"f_{Guid.CreateVersion7()}",
            Title = request.Title,
            Description = request.Description,
            Type = request.Type,
            CategoryId = category.Id,
            Category = category,
            Amount = request.Amount,
            Date = request.Date,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = null
        };
    }

    public static FinanceResponse ToResponse(this Finance finance)
    {
        return new FinanceResponse
        {
            Id = finance.Id,
            Title = finance.Title,
            Description = finance.Description,
            Type = finance.Type,
            TypeValue = finance.Type.GetDescription(),
            Category = new CategoryResponse
            {
                Id = finance.Category.Id,
                Name = finance.Category.Name,
                Type = finance.Category.Type,
                TypeValue = finance.Category.Type.ToString()
            },
            Amount = finance.Amount,
            Date = finance.Date,
            CreatedAt = finance.CreatedAt,
            UpdatedAt = finance.UpdatedAt
        };
    }

    public static void UpdateFromRequest(this Finance finance, UpdateFinanceRequest request)
    {
        finance.Title = request.Title;
        finance.Description = request.Description;
        finance.Type = request.Type;
        finance.CategoryId = request.CategoryId;
        finance.Amount = request.Amount;
        finance.Date = request.Date;

        finance.UpdatedAt = DateTime.UtcNow;
    }
}