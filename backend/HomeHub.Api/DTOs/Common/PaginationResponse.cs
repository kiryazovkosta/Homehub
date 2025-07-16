using Microsoft.EntityFrameworkCore;

namespace HomeHub.Api.DTOs.Common;

public sealed record PaginationResponse<T> : ICollectionResponse<T>
{
    public required List<T> Items { get; init; }
    public int Page { get; init; }
    public int PageSize { get; init; }
    public int TotalCount { get; init; }
    public int TotalPages => (int)Math.Ceiling(TotalCount / (double)PageSize);
    public bool HasPreviousPage => Page > 1;
    public bool HasNextPage => Page < TotalPages;

    public static async Task<PaginationResponse<T>> CreateAsync(
        IQueryable<T> queryable,
        int page, int
        pageSize)
    {
        int totalCount = await queryable.CountAsync();
        List<T> items = await queryable
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
        return new PaginationResponse<T>
        {
            Items = items,
            Page = page,
            PageSize = pageSize,
            TotalCount = totalCount
        };
    }
}
