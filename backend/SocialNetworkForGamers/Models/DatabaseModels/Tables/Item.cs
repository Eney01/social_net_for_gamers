namespace SocialNetworkForGamers.Models.DatabaseModels.Tables
{
    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string? MediumUrl {  get; set; }
        public double Price { get; set; }
        public bool IsListed {  get; set; }
        public DateTime CreatedAt { get; set; }
        public short CurrencyId {  get; set; }
        public Currency Currency { get; set; }
        public int OwnerId {  get; set; }
        public User Owner {  get; set; }
        public virtual List<Order> Orders { get; set; }
        public Item()
        {
            CreatedAt = DateTime.Now;
            IsListed = false;
            Orders = new List<Order>();
        }
    }
}
