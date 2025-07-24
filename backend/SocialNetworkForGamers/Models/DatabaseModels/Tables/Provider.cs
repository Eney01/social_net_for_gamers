namespace SocialNetworkForGamers.Models.DatabaseModels.Tables
{
    public class Provider
    {
        public short Id { get; set; }
        public string Name { get; set; }
        public virtual List<Payment> Payments { get; set; }
        public Provider()
        {
            Payments = new List<Payment>();
        }
    }
}
