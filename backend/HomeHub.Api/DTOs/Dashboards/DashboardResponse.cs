public sealed record DashboardResponse
{
    public int Families { get; init; }
    public int Users { get; init; }
    public int ActiveSessions { get; init; }
    public int Finances { get; init; }
    public int Bills { get; init; }
    public int Inventories { get; init; }
}