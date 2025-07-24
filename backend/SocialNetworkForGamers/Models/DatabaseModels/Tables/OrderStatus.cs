namespace SocialNetworkForGamers.Models.DatabaseModels.Tables
{
    public class OrderStatus
    {
        public short Id { get; set; }
        public string Name { get; set; }
        public virtual List<Order> Orders { get; set; }
        public OrderStatus()
        {
            Orders = new List<Order>();
        }
    }
}
