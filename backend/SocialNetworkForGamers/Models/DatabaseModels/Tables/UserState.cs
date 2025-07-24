namespace SocialNetworkForGamers.Models.DatabaseModels.Tables
{
    public class UserState
    {
        public short Id { get; set; }
        public string Name { get; set; }
        public virtual List<User> Users { get; set; }

        public UserState() { 
            Users = new List<User>();
            Name = string.Empty;
        }
    }
}
