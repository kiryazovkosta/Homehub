using HomeHub.Api.DTOs.Categories;
using HomeHub.Api.DTOs.Finances;
using HomeHub.Api.Entities;
using HomeHub.Api.Extensions;

namespace HomeHub.Api.DTOs.Bills;

internal static class BillMappings
{
    public static Bill ToEntity(this CreateBillRequest request, Category category)
    {
        return new Bill
        {
            Id = $"b_{Guid.CreateVersion7()}",
            Title = request.Title,
            Description = request.Description,
            Amount = request.Amount,
            DueDate = request.DueDate,
            IsPaid = false,
            FileUrl = null,
            CategoryId = category.Id,
            Category = category,
        };
    }

    public static BillResponse ToResponse(this Bill bill)
    {
        return new BillResponse
        {
            Id = bill.Id,
            Title = bill.Title,
            Description = bill.Description,
            Amount = bill.Amount,
            DueDate = bill.DueDate,
            IsPaid = bill.IsPaid,
            FileUrl = bill.FileUrl,
            Category = new CategoryResponse()
            {
                Id = bill.Category.Id,
                Name = bill.Category.Name,
                Type = bill.Category.Type,
                TypeValue = bill.Category.Type.GetDescription()
            }
        };
    }

    public static void UpdateFromRequest(this Bill bill, UpdateBillRequest request)
    {
        if (bill.IsPaid)
        {
            return;
        }
        
        bill.Title = request.Title;
        bill.Description = request.Description;
        bill.Amount = request.Amount;
        bill.DueDate = request.DueDate;
        bill.CategoryId = request.CategoryId;
    }
}