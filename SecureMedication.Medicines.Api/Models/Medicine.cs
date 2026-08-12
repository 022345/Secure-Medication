namespace SecureMedication.Medicines.Api.Models
{
    public class Medicine
    {
        private string _medicineId { get; set; }
        private string _medicineName { get; set; }
        private string _medicineDescription { get; set; }
        private string _medicineBrand { get; set; }
        private int _medicineDailyDosage { get; set; }
        private int _medicineMilligrams { get; set; }
        private int _medicineQuantity { get; set; }
        private List<string> _medicineIndications { get; set; }
        private string _medicinePresentation { get; set; }
        private long _medicineServings_Per_Container { get; set; }
        private string _medicineImg { get; set; }
        private string _medicineBuyingLink { get; set; }

        public Medicine (string _medicineId, string _medicineName)
        {
            this._medicineId= _medicineId;
            this._medicineName= _medicineName;
        }
    }
}
