namespace SocialNetworkForGamers.Models.ChatModels.DTO
{
    public class MediumDto : SocialNetworkForGamers.Models.ChatModels.MainChatDto
    {
        public long Id { get; set; }
        public string Type { get; set; }
        public string Src { get; set; }
        public string Name { get; set; }
        public IFormFile File { get; set; }
        public bool IsBloored { get; set; }
        public double Size { get; set; }
    }
}
