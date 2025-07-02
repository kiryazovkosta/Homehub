using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeHub.Api.Migrations.Application
{
    /// <inheritdoc />
    public partial class AddBill : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "bills",
                schema: "home_hub",
                columns: table => new
                {
                    id = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    title = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    description = table.Column<string>(type: "character varying(512)", maxLength: 512, nullable: false),
                    amount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    due_date = table.Column<DateOnly>(type: "date", nullable: false),
                    is_paid = table.Column<bool>(type: "boolean", nullable: false),
                    file_url = table.Column<string>(type: "character varying(512)", maxLength: 512, nullable: true),
                    category_id = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_bills", x => x.id);
                    table.ForeignKey(
                        name: "fk_bills_categories_category_id",
                        column: x => x.category_id,
                        principalSchema: "home_hub",
                        principalTable: "categories",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "ix_bills_category_id",
                schema: "home_hub",
                table: "bills",
                column: "category_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "bills",
                schema: "home_hub");
        }
    }
}
