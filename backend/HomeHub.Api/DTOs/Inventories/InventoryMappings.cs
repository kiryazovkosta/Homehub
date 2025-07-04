using HomeHub.Api.DTOs.Categories;
using HomeHub.Api.DTOs.Locations;
using HomeHub.Api.Entities;
using HomeHub.Api.Extensions;

namespace HomeHub.Api.DTOs.Inventories;

internal static class InventoryMappings
{
    public static Inventory ToEntity(this CreateInventoryRequest request, Category category, Location location)
    {
        return new Inventory()
        {
            Id = $"i_{Guid.CreateVersion7()}",
            Name = request.Name,
            Quantity = request.Quantity,
            CategoryId = category.Id,
            Category = category,
            LocationId = location.Id,
            Location = location,
            Threshold = request.Threshold
        };
    }

    public static InventoryResponse ToResponse(this Inventory inventory)
    {
        return new InventoryResponse
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
            Threshold = inventory.Threshold
        };
    }

    public static void UpdateFromRequest(this Inventory inventory, UpdateInventoryRequest request)
    {
        inventory.Name = request.Name;
        inventory.Quantity = request.Quantity;
        inventory.CategoryId = request.CategoryId;
        inventory.LocationId = request.LocationId;
        inventory.Threshold = request.Threshold;
    }
}