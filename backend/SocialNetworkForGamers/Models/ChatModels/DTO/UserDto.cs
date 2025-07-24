namespace SocialNetworkForGamers.Models.ChatModels.DTO
{
    public class UserDto : SocialNetworkForGamers.Models.ChatModels.MainChatDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string Avatar { get; set; } = "";
    }
}
