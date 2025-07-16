namespace HomeHub.Api.Services;

using Database;
using Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

public sealed class UserContext(
    IHttpContextAccessor httpContextAccessor,
    ApplicationDbContext dbContext,
    IMemoryCache memoryCache)
{
    private const string CacheKeyPrefixUserId = "users:id";
    private static readonly TimeSpan CacheDuration = TimeSpan.FromMinutes(30);

    private const string CacheKeyPrefixFamilyId = "users:family:id";

    public async Task<string?> GetUserIdAsync(CancellationToken cancellationToken = default)
    {
        string? identityId = httpContextAccessor.HttpContext?.User.GetIdentityId();
        if (identityId is null)
        {
            return null;
        }

        string cacheKey = $"{CacheKeyPrefixUserId}{identityId}";

        string? userId = await memoryCache.GetOrCreateAsync(cacheKey, async entry =>
        {
            entry.SetSlidingExpiration(CacheDuration);

            string? userId = await dbContext.Users
                .Where(u => u.IdentityId == identityId)
                .Select(u => u.Id)
                .FirstOrDefaultAsync(cancellationToken);

            return userId;
        });

        return userId;
    }

    public async Task<string?> GetFamilyIdAsync(CancellationToken cancellationToken = default)
    {
        string? identityId = httpContextAccessor.HttpContext?.User.GetIdentityId();
        if (identityId is null)
        {
            return null;
        }

        string cacheKey = $"{CacheKeyPrefixFamilyId}{identityId}";

        string? familyId = await memoryCache.GetOrCreateAsync(cacheKey, async entry =>
        {
            entry.SetSlidingExpiration(CacheDuration);

            string? familyId = await dbContext.Users
                .Where(u => u.IdentityId == identityId)
                .Select(u => u.FamilyId)
                .FirstOrDefaultAsync(cancellationToken);

            return familyId;
        });

        return familyId;
    }
}