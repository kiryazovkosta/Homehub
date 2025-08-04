namespace HomeHub.Api.DTOs.Families;

using Entities;
using Extensions;
using System.Linq.Expressions;
using Users;

public sealed class FamilyQueries
{
    public static Expression<Func<Family, FamilyWithUsersResponse>> ProjectToResponse()
    {
        return family => new FamilyWithUsersResponse
        {
            Id = family.Id,
            Name = family.Name,
            Description = family.Description,
            Users = family.Users.Select(user => new UserSimplyResponse
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                FamilyRole = user.FamilyRole,
                FamilyRoleValue = user.FamilyRole.GetDescription(),
                Description = user.Description,
                ImageUrl = user.ImageUrl
            }).ToList(),
        };
    }

    public static Expression<Func<Family, FamilyListResponse>> ToListResponse()
    {
        return family => new FamilyListResponse
        {
            Id = family.Id,
            Name = family.Name
        };
    }
}