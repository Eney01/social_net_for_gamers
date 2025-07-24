namespace SocialNetworkForGamers.Models.DatabaseModels.Tables
{
    public class Currency
    {
        public short Id { get; set; }
        public string Name { get; set; }
        public double AmountOfOneDollar { get; set; }
        public virtual List<Item> Items { get; set; }
        public virtual List<Payment> Payments { get; set; }
        public virtual List<Transfer> Transfers { get; set; }
        public Currency()
        {
            Items = new List<Item>();
            Payments = new List<Payment>();
            Transfers = new List<Transfer>();  
        }
    }
}
