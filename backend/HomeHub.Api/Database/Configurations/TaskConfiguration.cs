using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Task = HomeHub.Api.Entities.Task;

namespace HomeHub.Api.Database.Configurations;

public sealed class TaskConfiguration : IEntityTypeConfiguration<Task>
{
    public void Configure(EntityTypeBuilder<Task> builder)
    {
        builder.HasKey(t => t.Id);
        
        builder.Property(t => t.Id).HasMaxLength(128).IsRequired();
        builder.Property(t => t.Title).HasMaxLength(256).IsRequired();
        builder.Property(t => t.Description).HasMaxLength(512).IsRequired();
    }
}