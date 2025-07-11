using HomeHub.Api.DTOs.Common;

namespace HomeHub.Api.DTOs.Tasks;

public sealed record TasksListCollectionResponse : ICollectionResponse<TaskListResponse>
{
    public required List<TaskListResponse> Items { get; init; }
}
