namespace SocialNetworkForGamers.Models.DatabaseModels.Tables;

public class PostMedia
{
    public long Id { get; set; }
    public long PostId { get; set; }
    public string Url { get; set; } = string.Empty;
    public string Type { get; set; }
    public double Size { get; set; }
    public Post Post { get; set; } = null!;
}
