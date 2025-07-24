namespace SocialNetworkForGamers.Models.DatabaseModels.Tables
{
    public class NotificationType
    {
        public short Id { get; set; }
        public string Name { get; set; }
        public virtual List<Notification> Notifications { get; set; }
        public NotificationType()
        {
            Notifications = new List<Notification>();
        }
    }
}
