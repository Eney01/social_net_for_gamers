namespace SocialNetworkForGamers.Models.DatabaseModels.Tables
{
    public class Notification
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsRead {  get; set; }
        public short TypeId {  get; set; }
        public NotificationType Type { get; set; }
        public int AuthorId {  get; set; }
        public User Author {  get; set; }
        public int? ReferenceCommunityId { get; set; }
        public Community? ReferenceCommunity { get; set; }
        public int? ReferenceUserId {  get; set; }
        public User? ReferenceUser { get; set; }
        public Notification()
        {
            CreatedAt = DateTime.Now;
            IsRead = false;
        }
    }
}
