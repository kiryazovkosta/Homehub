using HomeHub.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HomeHub.Api.Database.Configurations;

public sealed class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.HasKey(c => c.Id);
        
        builder.Property(c => c.Id).HasMaxLength(128).IsRequired();
        builder.Property(c => c.Name).HasMaxLength(128).IsRequired();

        builder.Property(c => c.Type).IsRequired().HasConversion<int>();
    }
}