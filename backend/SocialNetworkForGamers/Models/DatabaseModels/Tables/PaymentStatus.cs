namespace SocialNetworkForGamers.Models.DatabaseModels.Tables
{
    public class PaymentStatus
    {
        public short Id { get; set; }
        public string Name { get; set; }
        public virtual List<Payment> Payments { get; set; }
        public PaymentStatus() 
        {
            Payments = new List<Payment>();
        }
    }
}
