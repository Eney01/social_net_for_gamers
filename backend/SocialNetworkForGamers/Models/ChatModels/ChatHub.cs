using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace SocialNetworkForGamers.Models.ChatModels
{
    public class ChatHub : HubService
    {
        private static readonly ConcurrentDictionary<string, ConcurrentDictionary<string, bool>> _groups
                = new();

        public async Task JoinChatGroup(string groupId)
        {
            var members = _groups.GetOrAdd(groupId, _ => new ConcurrentDictionary<string, bool>());
            var existing = members.Keys.ToList();

            members[Context.ConnectionId] = true;
            await Groups.AddToGroupAsync(Context.ConnectionId, groupId);
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            foreach (var kv in _groups)
            {
                if (kv.Value.TryRemove(Context.ConnectionId, out _))
                {
                    await Groups.RemoveFromGroupAsync(Context.ConnectionId, kv.Key);
                }
            }

            await base.OnDisconnectedAsync(exception);
        }


        public async Task SendMessageToChat(string chatId, object message)
        {
            await Clients.Group(chatId).SendAsync("ReceiveMessage", message);
        }



        public override async Task OnConnectedAsync()
        {
            var chatId = Context.GetHttpContext()?.Request.Query["chatId"];
            if (!string.IsNullOrEmpty(chatId))
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, chatId);
            }
            await base.OnConnectedAsync();
        }
    }
}