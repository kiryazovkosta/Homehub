using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeHub.Api.Migrations.Application
{
    /// <inheritdoc />
    public partial class UserReferenceInEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "user_id",
                schema: "home_hub",
                table: "tasks",
                type: "character varying(128)",
                maxLength: 128,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "user_id",
                schema: "home_hub",
                table: "inventories",
                type: "character varying(128)",
                maxLength: 128,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "user_id",
                schema: "home_hub",
                table: "finances",
                type: "character varying(128)",
                maxLength: 128,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "user_id",
                schema: "home_hub",
                table: "bills",
                type: "character varying(128)",
                maxLength: 128,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "ix_tasks_user_id",
                schema: "home_hub",
                table: "tasks",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ix_inventories_user_id",
                schema: "home_hub",
                table: "inventories",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ix_finances_user_id",
                schema: "home_hub",
                table: "finances",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ix_bills_user_id",
                schema: "home_hub",
                table: "bills",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "fk_bills_users_user_id",
                schema: "home_hub",
                table: "bills",
                column: "user_id",
                principalSchema: "home_hub",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_finances_users_user_id",
                schema: "home_hub",
                table: "finances",
                column: "user_id",
                principalSchema: "home_hub",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_inventories_users_user_id",
                schema: "home_hub",
                table: "inventories",
                column: "user_id",
                principalSchema: "home_hub",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_tasks_users_user_id",
                schema: "home_hub",
                table: "tasks",
                column: "user_id",
                principalSchema: "home_hub",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_bills_users_user_id",
                schema: "home_hub",
                table: "bills");

            migrationBuilder.DropForeignKey(
                name: "fk_finances_users_user_id",
                schema: "home_hub",
                table: "finances");

            migrationBuilder.DropForeignKey(
                name: "fk_inventories_users_user_id",
                schema: "home_hub",
                table: "inventories");

            migrationBuilder.DropForeignKey(
                name: "fk_tasks_users_user_id",
                schema: "home_hub",
                table: "tasks");

            migrationBuilder.DropIndex(
                name: "ix_tasks_user_id",
                schema: "home_hub",
                table: "tasks");

            migrationBuilder.DropIndex(
                name: "ix_inventories_user_id",
                schema: "home_hub",
                table: "inventories");

            migrationBuilder.DropIndex(
                name: "ix_finances_user_id",
                schema: "home_hub",
                table: "finances");

            migrationBuilder.DropIndex(
                name: "ix_bills_user_id",
                schema: "home_hub",
                table: "bills");

            migrationBuilder.DropColumn(
                name: "user_id",
                schema: "home_hub",
                table: "tasks");

            migrationBuilder.DropColumn(
                name: "user_id",
                schema: "home_hub",
                table: "inventories");

            migrationBuilder.DropColumn(
                name: "user_id",
                schema: "home_hub",
                table: "finances");

            migrationBuilder.DropColumn(
                name: "user_id",
                schema: "home_hub",
                table: "bills");
        }
    }
}
