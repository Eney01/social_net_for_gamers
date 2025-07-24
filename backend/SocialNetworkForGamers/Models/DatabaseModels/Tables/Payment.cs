namespace SocialNetworkForGamers.Models.DatabaseModels.Tables
{
    public class Payment
    {
        public int Id { get; set; }
        public double Amount { get; set; }
        public DateTime CreatedAt { get; set; }
        public short CurrencyId { get; set; }
        public Currency Currency { get; set; }
        public short StatusId { get; set; }
        public PaymentStatus Status { get; set; }
        public short ProviderId { get; set; }
        public Provider Provider { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public Payment()
        {
            CreatedAt = DateTime.Now;
        }
    }
}
