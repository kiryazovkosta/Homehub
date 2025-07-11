using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeHub.Api.Migrations.Application
{
    /// <inheritdoc />
    public partial class UpdateUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_user_family_family_id",
                schema: "home_hub",
                table: "user");

            migrationBuilder.DropPrimaryKey(
                name: "pk_user",
                schema: "home_hub",
                table: "user");

            migrationBuilder.DropPrimaryKey(
                name: "pk_family",
                schema: "home_hub",
                table: "family");

            migrationBuilder.RenameTable(
                name: "user",
                schema: "home_hub",
                newName: "users",
                newSchema: "home_hub");

            migrationBuilder.RenameTable(
                name: "family",
                schema: "home_hub",
                newName: "families",
                newSchema: "home_hub");

            migrationBuilder.RenameIndex(
                name: "ix_user_family_id",
                schema: "home_hub",
                table: "users",
                newName: "ix_users_family_id");

            migrationBuilder.AddColumn<string>(
                name: "email",
                schema: "home_hub",
                table: "users",
                type: "character varying(128)",
                maxLength: 128,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "identity_id",
                schema: "home_hub",
                table: "users",
                type: "character varying(128)",
                maxLength: 128,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "image_url",
                schema: "home_hub",
                table: "users",
                type: "character varying(512)",
                maxLength: 512,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "pk_users",
                schema: "home_hub",
                table: "users",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_families",
                schema: "home_hub",
                table: "families",
                column: "id");

            migrationBuilder.CreateIndex(
                name: "ix_users_email",
                schema: "home_hub",
                table: "users",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_users_identity_id",
                schema: "home_hub",
                table: "users",
                column: "identity_id",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "fk_users_families_family_id",
                schema: "home_hub",
                table: "users",
                column: "family_id",
                principalSchema: "home_hub",
                principalTable: "families",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_users_families_family_id",
                schema: "home_hub",
                table: "users");

            migrationBuilder.DropPrimaryKey(
                name: "pk_users",
                schema: "home_hub",
                table: "users");

            migrationBuilder.DropIndex(
                name: "ix_users_email",
                schema: "home_hub",
                table: "users");

            migrationBuilder.DropIndex(
                name: "ix_users_identity_id",
                schema: "home_hub",
                table: "users");

            migrationBuilder.DropPrimaryKey(
                name: "pk_families",
                schema: "home_hub",
                table: "families");

            migrationBuilder.DropColumn(
                name: "email",
                schema: "home_hub",
                table: "users");

            migrationBuilder.DropColumn(
                name: "identity_id",
                schema: "home_hub",
                table: "users");

            migrationBuilder.DropColumn(
                name: "image_url",
                schema: "home_hub",
                table: "users");

            migrationBuilder.RenameTable(
                name: "users",
                schema: "home_hub",
                newName: "user",
                newSchema: "home_hub");

            migrationBuilder.RenameTable(
                name: "families",
                schema: "home_hub",
                newName: "family",
                newSchema: "home_hub");

            migrationBuilder.RenameIndex(
                name: "ix_users_family_id",
                schema: "home_hub",
                table: "user",
                newName: "ix_user_family_id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_user",
                schema: "home_hub",
                table: "user",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_family",
                schema: "home_hub",
                table: "family",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_user_family_family_id",
                schema: "home_hub",
                table: "user",
                column: "family_id",
                principalSchema: "home_hub",
                principalTable: "family",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
