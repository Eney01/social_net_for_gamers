namespace SocialNetworkForGamers.Models.DatabaseModels.Tables
{
    public class Tag
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public virtual List<PostTag> PostTags { get; set; }
        public Tag()
        {
            PostTags = new List<PostTag>();
        }
    }
}
