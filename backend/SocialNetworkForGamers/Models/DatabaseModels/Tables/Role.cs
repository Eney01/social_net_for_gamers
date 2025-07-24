namespace SocialNetworkForGamers.Models.DatabaseModels.Tables
{
    public class Role
    {
        public short Id { get; set; }
        public string Name { get; set; }
        public virtual List<User> Users { get; set; }
        public Role()
        {
            Users = new List<User>();
        }
    }
}
