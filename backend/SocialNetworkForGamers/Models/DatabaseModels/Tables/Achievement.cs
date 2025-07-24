namespace SocialNetworkForGamers.Models.DatabaseModels.Tables
{
    public class Achievement
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string? IconUrl {  get; set; }
        public virtual List<UserAchievement> UserAchievements { get; set; }
        public Achievement()
        {
            UserAchievements = new List<UserAchievement>();
        }
    }
}
