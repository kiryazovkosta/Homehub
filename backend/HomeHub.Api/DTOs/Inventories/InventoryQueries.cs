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
        return inventory => new InventoryListResponse
        {
            Id = inventory.Id,
            Name = inventory.Name,
            Quantity = inventory.Quantity,
            Category = new CategoryResponse
            {
                Id = inventory.Category.Id,
                Name = inventory.Category.Name,
                Type = inventory.Category.Type,
                TypeValue = inventory.Category.Type.GetDescription()
            },
            Threshold = inventory.Threshold,
            Description = inventory.Description,
            ImageUrl = inventory.ImageUrl
        };
    }

    public static Expression<Func<Inventory, InventoryResponse>> ToResponse()
    {
        return inventory => new InventoryResponse
        {
            Id = inventory.Id,
            Name = inventory.Name,
            Quantity = inventory.Quantity,
            Category = new CategoryResponse
            {
                Id = inventory.Category.Id,
                Name = inventory.Category.Name,
                Type = inventory.Category.Type,
                TypeValue = inventory.Category.Type.GetDescription()
            },
            Location = new LocationResponse
            {
                Id = inventory.Location.Id,
                Name = inventory.Location.Name,
                Description = inventory.Location.Description
            },
            Threshold = inventory.Threshold,
            Description = inventory.Description,
            ImageUrl = inventory.ImageUrl
        };
    }
}