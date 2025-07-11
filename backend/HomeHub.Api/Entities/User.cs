namespace HomeHub.Api.Entities;

public sealed class User
{
    public required string Id { get; set; }
    public required string Email { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required FamilyRole FamilyRole { get; set; }
    public required string Description { get; set; }
    public required string ImageUrl { get; set; } = "https://cao.bg/Images/News/Large/person.jpg";
    public required string FamilyId { get; set; }
    public Family Family { get; set; } = null!;
    public required string IdentityId { get; set; }
}