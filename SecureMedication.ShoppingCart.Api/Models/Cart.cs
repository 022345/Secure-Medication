using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SecureMedication.ShoppingCart.Api.Models
{
    [Table("cart")]
    public class Cart
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [Column("userId")]
        public int UserId { get; set; }

        [Column("productId")]
        public string ProductId { get; set; } = string.Empty;

        [Column("quantity")]
        public int Quantity { get; set; }

        [Column("dateAdded")]
        public DateTime DateAdded { get; set; }

        public Cart() 
        {
        
        }

        public Cart(int Id, int userId, string ProductId, int Quantity, DateTime DateAdded)
        {
            this.Id = Id;
            this.UserId = UserId;
            this.ProductId = ProductId;
            this.Quantity = Quantity;
            this.DateAdded = DateAdded;
        }
    }
}
