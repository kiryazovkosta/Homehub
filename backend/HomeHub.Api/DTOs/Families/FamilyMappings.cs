namespace HomeHub.Api.DTOs.Families;

using HomeHub.Api.DTOs.Tasks;
using HomeHub.Api.Entities;
using HomeHub.Api.Extensions;

public static class FamilyMappings
{
    public static Family ToEntity(this CreateFamilyRequest request)
    {
        Family family = new()
        {
            Id = $"f_{Guid.CreateVersion7()}",
            Name = request.Name,
            Description = request.Description
        };

        return family;
    }

    public static FamilyResponse ToResponse(this Family family)
    {
        return new FamilyResponse
        {
            Id = family.Id,
            Name = family.Name,
            Description = family.Description,
        };
    }
}