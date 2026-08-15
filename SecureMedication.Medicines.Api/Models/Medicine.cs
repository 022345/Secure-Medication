using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SecureMedication.Medicines.Api.Models
{
    [Table("medicines")] // EF Core reads this annotation and maps this class into a table in the DB
    public class Medicine
    {
        // All the fields MUST be public with their { get; set; } so EF Core and JSON serializers can read/write them

        [Key] // Primary Key
        [Column("Id")]
        public string Id { get; set; }

        [Required] // Sets column as NOT NULL
        [MaxLength(50)] // Defines maximum string length (VARCHAR(25))
        [Column("Name")]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(225)]
        [Column("Description")]
        public string Description { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        [Column("Brand")]
        public string Brand { get; set; } = string.Empty;

        [Column("DailyDosage")]
        public int DailyDosage { get; set; }

        [Column("Milligrams")]
        public int Milligrams { get; set; }

        [Column("Quantity")]
        public int Quantity { get; set; }

        [Required]
        [MaxLength(150)]
        [Column("Presentation")]
        public string Presentation { get; set; } = string.Empty;

        [Column("ServingsPerContainer")]
        public long ServingsPerContainer { get; set; }

        // The '?' operator allows the property to be NULLABLE in SQL without throwing C# compiler warnings
        [Column("ImageUrl")]
        public string? ImageUrl { get; set; }

        [Column("BuyingLink")]
        public string? BuyingLink { get; set; }

        // EF Core requires a parameterless constructor to instantiate the model when querying the DB
        public Medicine()
        {

        }

        public Medicine(string id, string name, string description, string brand,
            int dailyDosage, int milligrams, int quantity, string presentation,
            long servingsPerContainer, string? imageUrl, string? buyingLink)
        {
            Id = id;
            Name = name;
            Description = description;
            Brand = brand;
            DailyDosage = dailyDosage;
            Milligrams = milligrams;
            Quantity = quantity;
            Presentation = presentation;
            ServingsPerContainer = servingsPerContainer;
            ImageUrl = imageUrl;
            BuyingLink = buyingLink;
        }
    }
}