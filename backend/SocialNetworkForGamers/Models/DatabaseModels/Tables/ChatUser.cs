namespace SocialNetworkForGamers.Models.DatabaseModels.Tables
{
    public class ChatUser
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public long ChatId {  get; set; }
        public Chat Chat { get; set; }
    }
}
