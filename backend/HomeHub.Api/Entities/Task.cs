namespace HomeHub.Api.Entities;

public sealed class Task
{
    public required string Id { get; set; }
    public required string Title{ get; set; }
    public required string Description{ get; set; }
    public Priority Priority{ get; set; }
    public DateOnly DueDate{ get; set; }
    public Status Status{ get; set; }
    public DateTime CreatedAt{ get; set; }
    public DateTime? UpdatedAt{ get; set; }
}
