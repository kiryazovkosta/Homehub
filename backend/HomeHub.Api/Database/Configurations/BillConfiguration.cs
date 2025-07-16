namespace HomeHub.Api.Database.Configurations;

using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class BillConfiguration : IEntityTypeConfiguration<Bill>
{
    public void Configure(EntityTypeBuilder<Bill> builder)
    {
        builder.HasKey(b => b.Id);

        builder.Property(b => b.Id).IsRequired().HasMaxLength(128);

        builder.Property(b => b.Title).HasMaxLength(256).IsRequired();

        builder.Property(b => b.Description).HasMaxLength(512).IsRequired();

        builder.Property(b => b.Amount).IsRequired().HasColumnType("decimal(18,2)");

        builder.Property(b => b.DueDate).IsRequired();

        builder.Property(b => b.IsPaid).IsRequired();

        builder.Property(b => b.FileUrl).HasMaxLength(512);

        builder.Property(b => b.CategoryId).IsRequired().HasMaxLength(128); ;

        builder.HasOne(b => b.Category)
            .WithMany()
            .HasForeignKey(b => b.CategoryId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Restrict);

        builder.Property(b => b.UserId).HasMaxLength(128);

        builder.HasOne(b => b.User)
            .WithMany(u => u.Bills)
            .HasForeignKey(b => b.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}