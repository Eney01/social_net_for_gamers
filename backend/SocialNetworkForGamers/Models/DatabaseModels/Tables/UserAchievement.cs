namespace SocialNetworkForGamers.Models.DatabaseModels.Tables
{
    public class UserAchievement
    {
        public int Id { get; set; }
        public DateTime AchievedAt { get; set; }
        public int UserId {  get; set; }
        public User User { get; set; }
        public int AchievementId {  get; set; }
        public Achievement Achievement { get; set; }
    }
}
