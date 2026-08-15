using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SecureMedication.Medicines.Api.Models
{
    [Table("medicines")] // EF Core reads this annotation and maps this class into a table in the DB
    public class Medicine
    {
        // All the fields MUST be public with their { get; set; } so EF Core and JSON serializers can read/write them

        [Key] // Primary Key
        [Column("id")]
        public string Id { get; set; }

        [Required] // Sets column as NOT NULL
        [MaxLength(50)] // Defines maximum string length (VARCHAR(25))
        [Column("name")]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(225)]
        [Column("description")]
        public string Description { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        [Column("brand")]
        public string Brand { get; set; } = string.Empty;

        [Column("dailydosage")]
        public int DailyDosage { get; set; }

        [Column("milligrams")]
        public int Milligrams { get; set; }

        [Column("quantity")]
        public int Quantity { get; set; }

        [Required]
        [MaxLength(150)]
        [Column("presentation")]
        public string Presentation { get; set; } = string.Empty;

        [Column("servingspercontainer")]
        public long ServingsPerContainer { get; set; }

        // The '?' operator allows the property to be NULLABLE in SQL without throwing C# compiler warnings
        [Column("imageurl")]
        public string? ImageUrl { get; set; }

        [Column("buyinglink")]
        public string? BuyingLink { get; set; }

        // EF Core requires a parameterless constructor to instantiate the model when querying the DB
        public Medicine()
        {

        }

        public Medicine(string Id, string Name, string Description, string Brand,
            int DailyDosage, int Milligrams, int Quantity, string Presentation,
            long ServingsPerContainer, string? ImageUrl, string? BuyingLink)
        {
            Id = Id;
            Name = Name;
            Description = Description;
            Brand = Brand;
            DailyDosage = DailyDosage;
            Milligrams = Milligrams;
            Quantity = Quantity;
            Presentation = Presentation;
            ServingsPerContainer = ServingsPerContainer;
            ImageUrl = ImageUrl;
            BuyingLink = BuyingLink;
        }
    }
}