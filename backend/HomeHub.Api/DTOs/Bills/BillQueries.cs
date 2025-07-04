namespace HomeHub.Api.DTOs.Bills;

using Entities;
using HomeHub.Api.DTOs.Categories;
using HomeHub.Api.DTOs.Finances;
using HomeHub.Api.Extensions;
using System.Linq.Expressions;

internal sealed class BillQueries
{
    public static Expression<Func<Bill, BillListResponse>> ToListResponse()
    {
        return bill => new BillListResponse
        {
            Id = bill.Id,
            Title = bill.Title.Length <= 50 ? bill.Title : bill.Title.Substring(0, 50),
            Amount = bill.Amount,
            DueDate = bill.DueDate,
            IsPaid = bill.IsPaid
        };
    }

    public static Expression<Func<Bill, BillResponse>> ToResponse()
    {
        return bill => new BillResponse
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
}