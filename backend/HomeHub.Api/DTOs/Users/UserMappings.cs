﻿using HomeHub.Api.DTOs.Auth;
using HomeHub.Api.Entities;

namespace HomeHub.Api.DTOs.Users;

public static class UserMappings
{
    public static User ToEntity(this RegisterUserRequest request, string identityId)
    {
        return new User
        {
            Id = $"u_{Guid.CreateVersion7()}",
            Email = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName,
            FamilyRole = request.FamilyRole,
            Description = request.Description,
            ImageUrl = request.ImageUrl,
            FamilyId = request.FamilyId,
            IdentityId = identityId
        };
    }
}