﻿// <auto-generated />
using System;
using HomeHub.Api.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HomeHub.Api.Migrations.Application
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20250702111704_AddBill")]
    partial class AddBill
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasDefaultSchema("home_hub")
                .HasAnnotation("ProductVersion", "9.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("HomeHub.Api.Entities.Bill", b =>
                {
                    b.Property<string>("Id")
                        .HasMaxLength(128)
                        .HasColumnType("character varying(128)")
                        .HasColumnName("id");

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18,2)")
                        .HasColumnName("amount");

                    b.Property<string>("CategoryId")
                        .IsRequired()
                        .HasMaxLength(128)
                        .HasColumnType("character varying(128)")
                        .HasColumnName("category_id");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(512)
                        .HasColumnType("character varying(512)")
                        .HasColumnName("description");

                    b.Property<DateOnly>("DueDate")
                        .HasColumnType("date")
                        .HasColumnName("due_date");

                    b.Property<string>("FileUrl")
                        .HasMaxLength(512)
                        .HasColumnType("character varying(512)")
                        .HasColumnName("file_url");

                    b.Property<bool>("IsPaid")
                        .HasColumnType("boolean")
                        .HasColumnName("is_paid");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)")
                        .HasColumnName("title");

                    b.HasKey("Id")
                        .HasName("pk_bills");

                    b.HasIndex("CategoryId")
                        .HasDatabaseName("ix_bills_category_id");

                    b.ToTable("bills", "home_hub");
                });

            modelBuilder.Entity("HomeHub.Api.Entities.Category", b =>
                {
                    b.Property<string>("Id")
                        .HasMaxLength(128)
                        .HasColumnType("character varying(128)")
                        .HasColumnName("id");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(128)
                        .HasColumnType("character varying(128)")
                        .HasColumnName("name");

                    b.Property<int>("Type")
                        .HasColumnType("integer")
                        .HasColumnName("type");

                    b.HasKey("Id")
                        .HasName("pk_categories");

                    b.ToTable("categories", "home_hub");
                });

            modelBuilder.Entity("HomeHub.Api.Entities.Finance", b =>
                {
                    b.Property<string>("Id")
                        .HasMaxLength(128)
                        .HasColumnType("character varying(128)")
                        .HasColumnName("id");

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18,2)")
                        .HasColumnName("amount");

                    b.Property<string>("CategoryId")
                        .IsRequired()
                        .HasMaxLength(128)
                        .HasColumnType("character varying(128)")
                        .HasColumnName("category_id");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at");

                    b.Property<DateOnly>("Date")
                        .HasColumnType("date")
                        .HasColumnName("date");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(512)
                        .HasColumnType("character varying(512)")
                        .HasColumnName("description");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)")
                        .HasColumnName("title");

                    b.Property<int>("Type")
                        .HasColumnType("integer")
                        .HasColumnName("type");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_at");

                    b.HasKey("Id")
                        .HasName("pk_finances");

                    b.HasIndex("CategoryId")
                        .HasDatabaseName("ix_finances_category_id");

                    b.ToTable("finances", "home_hub");
                });

            modelBuilder.Entity("HomeHub.Api.Entities.Inventory", b =>
                {
                    b.Property<string>("Id")
                        .HasMaxLength(128)
                        .HasColumnType("character varying(128)")
                        .HasColumnName("id");

                    b.Property<string>("CategoryId")
                        .IsRequired()
                        .HasMaxLength(128)
                        .HasColumnType("character varying(128)")
                        .HasColumnName("category_id");

                    b.Property<string>("LocationId")
                        .IsRequired()
                        .HasMaxLength(128)
                        .HasColumnType("character varying(128)")
                        .HasColumnName("location_id");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(128)
                        .HasColumnType("character varying(128)")
                        .HasColumnName("name");

                    b.Property<int>("Quantity")
                        .HasColumnType("integer")
                        .HasColumnName("quantity");

                    b.Property<int>("Threshold")
                        .HasColumnType("integer")
                        .HasColumnName("threshold");

                    b.HasKey("Id")
                        .HasName("pk_inventories");

                    b.HasIndex("CategoryId")
                        .HasDatabaseName("ix_inventories_category_id");

                    b.HasIndex("LocationId")
                        .HasDatabaseName("ix_inventories_location_id");

                    b.ToTable("inventories", "home_hub");
                });

            modelBuilder.Entity("HomeHub.Api.Entities.Location", b =>
                {
                    b.Property<string>("Id")
                        .HasMaxLength(128)
                        .HasColumnType("character varying(128)")
                        .HasColumnName("id");

                    b.Property<string>("Description")
                        .HasMaxLength(512)
                        .HasColumnType("character varying(512)")
                        .HasColumnName("description");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(128)
                        .HasColumnType("character varying(128)")
                        .HasColumnName("name");

                    b.HasKey("Id")
                        .HasName("pk_locations");

                    b.ToTable("locations", "home_hub");
                });

            modelBuilder.Entity("HomeHub.Api.Entities.Task", b =>
                {
                    b.Property<string>("Id")
                        .HasMaxLength(128)
                        .HasColumnType("character varying(128)")
                        .HasColumnName("id");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(512)
                        .HasColumnType("character varying(512)")
                        .HasColumnName("description");

                    b.Property<DateOnly>("DueDate")
                        .HasColumnType("date")
                        .HasColumnName("due_date");

                    b.Property<int>("Priority")
                        .HasColumnType("integer")
                        .HasColumnName("priority");

                    b.Property<int>("Status")
                        .HasColumnType("integer")
                        .HasColumnName("status");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)")
                        .HasColumnName("title");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_at");

                    b.HasKey("Id")
                        .HasName("pk_tasks");

                    b.ToTable("tasks", "home_hub");
                });

            modelBuilder.Entity("HomeHub.Api.Entities.Bill", b =>
                {
                    b.HasOne("HomeHub.Api.Entities.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("fk_bills_categories_category_id");

                    b.Navigation("Category");
                });

            modelBuilder.Entity("HomeHub.Api.Entities.Finance", b =>
                {
                    b.HasOne("HomeHub.Api.Entities.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("fk_finances_categories_category_id");

                    b.Navigation("Category");
                });

            modelBuilder.Entity("HomeHub.Api.Entities.Inventory", b =>
                {
                    b.HasOne("HomeHub.Api.Entities.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("fk_inventories_categories_category_id");

                    b.HasOne("HomeHub.Api.Entities.Location", "Location")
                        .WithMany()
                        .HasForeignKey("LocationId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("fk_inventories_locations_location_id");

                    b.Navigation("Category");

                    b.Navigation("Location");
                });
#pragma warning restore 612, 618
        }
    }
}
