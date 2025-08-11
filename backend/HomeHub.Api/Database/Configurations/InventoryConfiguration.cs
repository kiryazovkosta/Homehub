using HomeHub.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HomeHub.Api.Database.Configurations;

public sealed class InventoryConfiguration : IEntityTypeConfiguration<Inventory>
{
    public void Configure(EntityTypeBuilder<Inventory> builder)
    {
        builder.HasKey(i => i.Id);

        builder.Property(i => i.Id).IsRequired().HasMaxLength(128);

        builder.Property(t => t.Name).HasMaxLength(128).IsRequired();

        builder.Property(i => i.CategoryId).IsRequired().HasMaxLength(128);

        builder.Property(i => i.LocationId).IsRequired().HasMaxLength(128);
        
        builder.Property(i => i.Quantity).IsRequired();

        builder.Property(i => i.Threshold).IsRequired();

        builder.Property(i => i.Description).IsRequired().HasMaxLength(200);

        builder.Property(i => i.ImageUrl).IsRequired().HasMaxLength(200);

        builder.HasOne(i => i.Category)
            .WithMany()
            .HasForeignKey(i => i.CategoryId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Restrict);
            
        builder.HasOne(i => i.Location)
            .WithMany()
            .HasForeignKey(i => i.LocationId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Restrict);


        builder.Property(i => i.UserId).HasMaxLength(128);

        builder.HasOne(i => i.User)
            .WithMany(u => u.Inventories)
            .HasForeignKey(i => i.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}