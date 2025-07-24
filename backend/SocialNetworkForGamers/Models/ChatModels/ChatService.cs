using SocialNetworkForGamers.Models.DatabaseModels.Data;
using SocialNetworkForGamers.Models.DatabaseModels.Tables;
using SocialNetworkForGamers.Models.ChatModels.DTO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.AspNetCore.SignalR;

namespace SocialNetworkForGamers.Models.ChatModels
{
    public class ChatService : IChatService
    {
        private readonly AppDbContext _context;
        private readonly IHubContext<ChatHub> _hubContext;
        public ChatService(AppDbContext context, IHubContext<ChatHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        private async Task<Chat?> GetChatById(long id)
        {
            return await _context.Chats
                .AsSplitQuery()
                .Include(c => c.Messages)
                    .ThenInclude(x => x.Media)
                .Include(c => c.Messages)
                    .ThenInclude(x => x.Sender)
                .Include(c => c.ChatUsers)
                    .ThenInclude(x => x.User)
                        .ThenInclude(x => x.UserState)
                .Include(c => c.ChatUsers)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        private async Task<List<Chat>> GetChatsByUserId(int userId)
        {
            return await _context.Chats
                .Include(c => c.ChatUsers)
                .Where(chat => chat.ChatUsers.Any(cu => cu.UserId == userId))
                .ToListAsync();
        }

        public async Task<List<ChatDto>> GetChats(int userId)
        {
            List<ChatDto> chatDtos = new List<ChatDto>();
            List<Chat> chats = await GetChatsByUserId(userId);
            foreach (Chat chat in chats)
            {
                chatDtos.Add(new ChatDto()
                {
                    Id = chat.Id,
                    AvatarUrl = chat.AvatarUrl,
                    Name = chat.Name
                });
            }
            return chatDtos;
        }

        public async Task SaveMessage(string content, int chatId, int userId, List<MediumDto> mediaDtos)
        {
            try
            {
                var message = new Message
                {
                    ChatId = chatId,
                    Content = content,
                    IsDeleted = false,
                    IsRead = false,
                    IsEdited = false,
                    SenderId = userId,
                    SentAt = DateTime.UtcNow
                };

                _context.Messages.Add(message);
                await _context.SaveChangesAsync();

                long messageId = message.Id;
                if (mediaDtos.Count > 0)
                {
                    var mediaEntities = mediaDtos.Select(m => new Medium
                    {
                        MessageId = messageId,
                        Name = m.Name,
                        Type = m.Type,
                        Url = m.Src,
                        IsBloored = m.IsBloored,
                        Size = m.Size
                    }).ToList();

                    Console.WriteLine(mediaDtos.Count);
                    Console.WriteLine(mediaDtos[0].Src);

                    _context.Media.AddRange(mediaEntities);
                    await _context.SaveChangesAsync();
                }

                User userTmp = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);

                UserDto user = new UserDto()
                {
                    Id = userId,
                    Avatar = userTmp.AvatarUrl,
                    FirstName = userTmp.Firstname,
                    LastName = userTmp.Lastname
                };

                MessageDto msg = new MessageDto()
                {
                    Id = messageId,
                    Content = content,
                    IsEdited = false,
                    Media = mediaDtos,
                    SentAt = DateTime.UtcNow,
                    User = user
                };

                await _hubContext.Clients.Group(chatId.ToString()).SendAsync("ReceiveMessage", msg);
            }
            catch (Exception ex)
            {
                throw new Exception("Ошибка при сохранении сообщения с медиа", ex);
            }
        }


        public async Task<ChatDto?> ChatToSend(long chatId)
        {

            Chat? chat = await GetChatById(chatId);

            if (chat == null) { return null; }

            ChatDto chatDto = new ChatDto();

            chatDto.AvatarUrl = chat.AvatarUrl;
            chatDto.Name = chat.Name;
            chatDto.IsGroup = chat.IsGroup;
            chatDto.Id = chat.Id;

            chatDto.Companions = await _context.Users
                .Where(u => u.ChatUsers.Any(cu => cu.ChatId == chat.Id))
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    FirstName = u.Firstname,
                    LastName = u.Lastname,
                    Avatar = u.AvatarUrl
                })
                .ToListAsync();



            foreach (var msg in chat.Messages)
            {
                List<MediumDto> media = new List<MediumDto>();
                foreach (var medium in msg.Media)
                {
                    media.Add(new MediumDto() { Id = medium.Id, IsBloored = medium.IsBloored, Name = medium.Name, Src = medium.Url, Type = medium.Type, Size = medium.Size });
                }
                chatDto.Messages.Add(new MessageDto()
                {
                    Id = msg.Id,
                    Content = msg.Content,
                    IsEdited = msg.IsEdited,
                    Media = media,
                    SentAt = msg.SentAt,
                    User = new UserDto()
                    {
                        Id = msg.SenderId,
                        Avatar = msg.Sender.AvatarUrl,
                        FirstName = msg.Sender.Firstname,
                        LastName = msg.Sender.Lastname
                    }
                });
            }

            return chatDto;
        }
    }
}
