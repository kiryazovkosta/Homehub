using HomeHub.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HomeHub.Api.Database.Configurations;

public sealed class FinanceConfiguration : IEntityTypeConfiguration<Finance>
{
    public void Configure(EntityTypeBuilder<Finance> builder)
    {
        builder.HasKey(f => f.Id);

        builder.Property(f => f.Id).IsRequired().HasMaxLength(128);

        builder.Property(t => t.Title).HasMaxLength(256).IsRequired();
        
        builder.Property(t => t.Description).HasMaxLength(512).IsRequired();

        builder.Property(f => f.Type).IsRequired().HasConversion<int>();

        builder.Property(f => f.CategoryId).IsRequired();

        builder.Property(f => f.Amount).IsRequired().HasColumnType("decimal(18,2)");

        builder.HasOne(f => f.Category)
            .WithMany()
            .HasForeignKey(f => f.CategoryId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Restrict);
    }
}