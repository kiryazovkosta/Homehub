using HomeHub.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HomeHub.Api.Database.Configurations;

public sealed class LocationConfiguration : IEntityTypeConfiguration<Location>
{
    public void Configure(EntityTypeBuilder<Location> builder)
    {
        builder.HasKey(l => l.Id);
        
        builder.Property(l => l.Id).HasMaxLength(128).IsRequired();
        builder.Property(l => l.Name).HasMaxLength(128).IsRequired();
        builder.Property(l => l.Description).HasMaxLength(512);
    }
}