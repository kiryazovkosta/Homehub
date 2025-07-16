namespace HomeHub.Api.DTOs.Users;

using System.Linq.Expressions;
using Families;
using Entities;
using Extensions;

public static class UserQueries
{
    public static Expression<Func<User, UserResponse>> ProjectToResponse()
    {
        return user => new UserResponse
        {
            Id = user.Id,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            FamilyRole = user.FamilyRole,
            FamilyRoleValue = user.FamilyRole.GetDescription(),
            Description = user.Description,
            ImageUrl = user.ImageUrl,
            Family = new FamilyResponse()
            {
                Id = user.Family.Id,
                Name = user.Family.Name,
                Description = user.Family.Description
            }
        };
    }

    public static Expression<Func<User, UserSimplyResponse>> ProjectToListResponse()
    {
        return user => new UserSimplyResponse
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            FamilyRoleValue = user.FamilyRole.GetDescription(),
            Description = user.Description,
            ImageUrl = user.ImageUrl
        };
    }
}