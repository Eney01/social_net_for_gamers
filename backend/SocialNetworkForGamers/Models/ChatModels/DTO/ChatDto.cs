using SocialNetworkForGamers.Models.DatabaseModels.Tables;

namespace SocialNetworkForGamers.Models.ChatModels.DTO
{
    public class ChatDto : SocialNetworkForGamers.Models.ChatModels.MainChatDto
    {
        public long Id { get; set; }
        public List<MessageDto> Messages { get; set; }
        public List<UserDto> Companions { get; set; }
        public bool IsGroup { get; set; }
        public string? Name { get; set; }
        public string? AvatarUrl { get; set; }
        public ChatDto()
        {
            Messages = new List<MessageDto>();
            Companions = new List<UserDto>();
        }
    }
}
