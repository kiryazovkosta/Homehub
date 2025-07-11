namespace HomeHub.Api.Database.Configurations;

using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class FamilyConfiguration : IEntityTypeConfiguration<Family>
{
    public void Configure(EntityTypeBuilder<Family> builder)
    {
        builder.HasKey(f => f.Id);

        builder.Property(f => f.Id).IsRequired().HasMaxLength(128);

        builder.Property(f => f.Name).HasMaxLength(64).IsRequired();

        builder.Property(u => u.Description).HasMaxLength(128).IsRequired();
    }
}