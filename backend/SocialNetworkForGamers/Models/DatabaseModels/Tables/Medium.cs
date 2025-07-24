namespace SocialNetworkForGamers.Models.DatabaseModels.Tables
{
    public class Medium
    {
        public long Id { get; set; }
        public required string Url { get; set; }
        public required string Name { get; set; }
        public bool IsBloored { get; set; } = false;
        public string Type { get; set; }
        public long MessageId {  get; set; }
        public double Size { get; set; }
        public Message Message { get; set; }
    }
}
