namespace HomeHub.Api.Database.Configurations;

using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(u => u.Id);

        builder.Property(user => user.Id).IsRequired().HasMaxLength(128);
        builder.Property(user => user.Email).HasMaxLength(128).IsRequired();
        builder.Property(user => user.FirstName).HasMaxLength(64).IsRequired();
        builder.Property(user => user.LastName).HasMaxLength(64).IsRequired();
        builder.Property(user => user.Description).HasMaxLength(128).IsRequired();
        builder.Property(user => user.FamilyRole).IsRequired();
        builder.Property(user => user.ImageUrl).HasMaxLength(512).IsRequired();
        builder.Property(user => user.FamilyId).HasMaxLength(128);
        builder.Property(user => user.IdentityId).IsRequired().HasMaxLength(128);

        builder.HasIndex(user => user.Email).IsUnique();
        builder.HasIndex(user => user.IdentityId).IsUnique();
    }
}