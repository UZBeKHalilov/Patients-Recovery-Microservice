using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MonitoringService.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreateMonitoringSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PatientObservations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PatientId = table.Column<int>(type: "int", nullable: false),
                    ObservationTimestamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    HeartRate = table.Column<double>(type: "float", nullable: true),
                    TemperatureCelsius = table.Column<double>(type: "float", nullable: true),
                    BloodPressure = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OxygenSaturation = table.Column<double>(type: "float", nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatientObservations", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PatientObservations");
        }
    }
}
