using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SecureMedication.Users.Api.Models
{
    //Is a good practice to use lowercase names for DB
    [Table("users")] // EF Core will map this class into the "users" table
    public class Users
    {
        [Key] // Primary Key definition
        public int Id { get; set; }

        [Required]
        [MaxLength(25)]
        public string UserName { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)] // A long length is useful to store password hashes (BCrypt/Argon2) instead of plain text
        public string PasswordHash { get; set; } = string.Empty;

        // In microservices, do NOT use navigation properties ([ForeignKey] / virtual Medicine) across different databases.
        // Store only the remote reference ID as a plain string (matching the Medicine.Id field in the Medicine table.
        public string? MedicineId { get; set; }
    }
}