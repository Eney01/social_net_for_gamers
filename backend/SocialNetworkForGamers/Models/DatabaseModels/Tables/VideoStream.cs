namespace SocialNetworkForGamers.Models.DatabaseModels.Tables
{
    public class VideoStream
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime StartedAt { get; set; }
        public DateTime? EndedAt { get; set; }
        public bool IsLive {  get; set; }
        public string? PreviewUrl { get; set; }
        public int StreamerId { get; set; }
        public User Streamer { get; set; }
        public virtual List<Clip> Clips { get; set; }

        public VideoStream()
        {
            IsLive = false;
            Clips = new List<Clip>();
        }
    }
}
