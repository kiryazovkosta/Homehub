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

public enum Priority
{
    Low = 1, 
    Medium = 2, 
    High = 3
}

public enum Status
{
    Active = 1,
    Completed = 2,
}