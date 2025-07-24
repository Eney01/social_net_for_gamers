using System.Security.Principal;

namespace SocialNetworkForGamers.Models.DatabaseModels.Tables
{
    public class User
    {
        public int Id { get; set; }
        public string Email {  get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? AvatarUrl { get; set; }
        public string? Bio { get; set; }
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
        public short? UserStateId { get; set; }
        public UserState? UserState { get; set; }
        public short?  RoleId {  get; set; }
        public Role? Role { get; set; }
        public int AccountId {  get; set; }
        public Account Account { get; set; }
        public virtual List<VideoStream> VideoStreams { get; set; }
        public virtual List<Community> Communities { get; set; }
        public virtual List<Post> Posts { get; set; }
        public virtual List<Chat> Chats { get; set; }
        public virtual List<ChatUser> ChatUsers { get; set; }
        public virtual List<Message> Messages { get; set; }
        public virtual List<Order> Orders { get; set; }
        public virtual List<Item> Items { get; set; }
        public virtual List<Clip> Clips { get; set; }
        public virtual List<Report> MyReports { get; set; }
        public virtual List<Report> ReportsAgainst { get; set; }
        public virtual List<UserSetting> UserSettings { get; set; }
        public virtual List<Notification> AuthorNotifications { get; set; }
        public virtual List<Notification> ReferenceNotifications { get; set; }
        public virtual List<AuditLog> AuditLogs { get; set; }
        public virtual List<UserAchievement> UserAchievements { get; set; }
        public virtual List<Payment> Payments { get; set; }
        public virtual List<Transfer> SentTransfers { get; set; }
        public virtual List<Transfer> AcceptedTransfers { get; set; }

        public User()
        {
            UpdatedAt = DateTime.Now;
            CreatedAt = DateTime.Now;
            VideoStreams = new List<VideoStream>();
            Communities = new List<Community>();
            Posts = new List<Post>();
            Chats = new List<Chat>();
            Messages = new List<Message>();
            Items = new List<Item>();
            Clips = new List<Clip>();
            MyReports = new List<Report>();
            ReportsAgainst = new List<Report>();
            UserSettings = new List<UserSetting>();
            AuthorNotifications = new List<Notification>();
            AuditLogs = new List<AuditLog>();
            UserAchievements = new List<UserAchievement>();
            Payments = new List<Payment>();
            SentTransfers = new List<Transfer>();
            AcceptedTransfers = new List<Transfer>();
            ChatUsers = new List<ChatUser>();
        }
    }
}
