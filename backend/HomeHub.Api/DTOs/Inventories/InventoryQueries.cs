using System.Linq.Expressions;
using HomeHub.Api.DTOs.Categories;
using HomeHub.Api.DTOs.Locations;
using HomeHub.Api.Entities;
using HomeHub.Api.Extensions;

namespace HomeHub.Api.DTOs.Inventories;

public static class InventoryQueries
{
    public static Expression<Func<Inventory, InventoryListResponse>> ToListResponse()
    {
        return i => new InventoryListResponse
        {
            Id = i.Id,
            Name = i.Name,
            Quantity = i.Quantity,
            Category = new CategoryResponse
            {
                Id = i.Category.Id,
                Name = i.Category.Name,
                Type = i.Category.Type,
                TypeValue = i.Category.Type.GetDescription()
            },
            Threshold = i.Threshold
        };
    }

    public static Expression<Func<Inventory, InventoryResponse>> ToResponse()
    {
        return i => new InventoryResponse
        {
            Id = i.Id,
            Name = i.Name,
            Quantity = i.Quantity,
            Category = new CategoryResponse
            {
                Id = i.Category.Id,
                Name = i.Category.Name,
                Type = i.Category.Type,
                TypeValue = i.Category.Type.GetDescription()
            },
            Location = new LocationResponse
            {
                Id = i.Location.Id,
                Name = i.Location.Name,
                Description = i.Location.Description
            },
            Threshold = i.Threshold
        };
    }
}