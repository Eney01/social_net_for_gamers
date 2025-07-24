namespace SocialNetworkForGamers.Models.MainPageModels
{

    public class CreatePostDto
    {
        public string Content { get; set; } = string.Empty;
        public int UserId { get; set; }

        public List<MediaDto> Media { get; set; } = new();
    }

    public class MediaDto
    {
        public string Url { get; set; } = string.Empty;
        public string Type { get; set; } = "image";
        public double Size { get; set; }
    }

}