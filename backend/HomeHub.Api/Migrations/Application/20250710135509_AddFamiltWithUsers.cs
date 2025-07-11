using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeHub.Api.Migrations.Application
{
    /// <inheritdoc />
    public partial class AddFamiltWithUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "family",
                schema: "home_hub",
                columns: table => new
                {
                    id = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    name = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    description = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_family", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "user",
                schema: "home_hub",
                columns: table => new
                {
                    id = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    first_name = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    last_name = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    family_role = table.Column<int>(type: "integer", nullable: false),
                    description = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    family_id = table.Column<string>(type: "character varying(128)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_user", x => x.id);
                    table.ForeignKey(
                        name: "fk_user_family_family_id",
                        column: x => x.family_id,
                        principalSchema: "home_hub",
                        principalTable: "family",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_user_family_id",
                schema: "home_hub",
                table: "user",
                column: "family_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "user",
                schema: "home_hub");

            migrationBuilder.DropTable(
                name: "family",
                schema: "home_hub");
        }
    }
}
