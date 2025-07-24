namespace SocialNetworkForGamers.Models.DatabaseModels.Tables
{
    public class Clip
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public string VideoUrl {  get; set; }
        public int StreamId {  get; set; }
        public VideoStream Stream { get; set; }
        public int CreatorId { get; set; }
        public User Creator { get; set; }
        public Clip()
        {
            CreatedAt = DateTime.Now;
        }
    }
}
