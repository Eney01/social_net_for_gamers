using Microsoft.AspNetCore.SignalR;
using SocialNetworkForGamers.Models;
using SocialNetworkForGamers.Models.AuthorizationModels;
using System.Collections.Concurrent;

public class CallHub : HubService
{
    private static readonly ConcurrentDictionary<string, ConcurrentDictionary<string, (string name, string avatar)>> _groups
            = new();
    private static readonly ConcurrentDictionary<string, bool> _activeCalls = new();
    private AuthorizationService _authorizationService;

    public CallHub(AuthorizationService authorizationService) { _authorizationService = authorizationService; }


    public async Task JoinChatGroup(string groupId, string token)
    {
        var members = _groups.GetOrAdd(groupId, _ => new ConcurrentDictionary<string, (string name, string avatar)>());
        var existingIds = members.Keys.ToList();
        var (myName, myAvatar) = await GetUserInfo(token);

        members[Context.ConnectionId] = (myName, myAvatar);
        await Groups.AddToGroupAsync(Context.ConnectionId, groupId);

        var existingInfos = existingIds.Select(id => new
        {
            connectionId = id,
            name = members[id].name,
            avatarUrl = members[id].avatar
        }).ToList();

        await Clients.Caller.SendAsync("ExistingPeers", existingInfos);

        await Clients.OthersInGroup(groupId)
                     .SendAsync("NotifyNewPeer", new
                     {
                         connectionId = Context.ConnectionId,
                         name = myName,
                         avatarUrl = myAvatar
                     });
    }

    private async Task<(string Name, string AvatarUrl)> GetUserInfo(string token)
    {
        var user = await _authorizationService.GetUserByToken(token);
        if (user == null) { return ("Unknown", ""); }
        var name = user.FirstName + " " + user.LastName;
        var avatar = user.Avatar;
        return (name, avatar);
    }



    public async Task StartPersistentCall(string groupId)
    {
        _activeCalls[groupId] = true;

        await Clients.GroupExcept(groupId, Context.ConnectionId)
                     .SendAsync("IncomingCall", Context.ConnectionId);

        await Clients.Group(groupId).SendAsync("CallStarted");
    }


    public async Task EndPersistentCall(string groupId)
    {
        _activeCalls.TryRemove(groupId, out _);
        await Clients.Group(groupId).SendAsync("CallEnded");
    }


    public Task<bool> IsCallActive(string groupId)
    {
        return Task.FromResult(_activeCalls.TryGetValue(groupId, out var active) && active);
    }



    public async Task InviteGroupCall(string groupId)
    {
        await Clients.GroupExcept(groupId, Context.ConnectionId)
                     .SendAsync("IncomingCall", Context.ConnectionId);
    }

    public Task SendOffer(string targetConnectionId, string sdp)
    {
        return Clients.Client(targetConnectionId)
                      .SendAsync("ReceiveOffer", Context.ConnectionId, sdp);
    }

    public Task SendAnswer(string targetConnectionId, string sdp)
    {
        return Clients.Client(targetConnectionId)
                      .SendAsync("ReceiveAnswer", Context.ConnectionId, sdp);
    }

    public Task SendIce(string targetConnectionId, object candidate)
    {
        return Clients.Client(targetConnectionId)
                      .SendAsync("ReceiveIce", Context.ConnectionId, candidate);
    }


    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        foreach (var kv in _groups)
        {
            if (kv.Value.TryRemove(Context.ConnectionId, out _))
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, kv.Key);
                await Clients.Group(kv.Key)
                             .SendAsync("PeerLeft", Context.ConnectionId);
            }
        }

        await base.OnDisconnectedAsync(exception);
    }


    public async Task StartGroupCall(string groupId, string sdp)
    {
        await Clients.GroupExcept(groupId, Context.ConnectionId)
                     .SendAsync("ReceiveGroupOffer", Context.ConnectionId, sdp);
    }

    public async Task SendGroupAnswer(string callerConnectionId, string sdp)
    {
        await Clients.Client(callerConnectionId)
                     .SendAsync("ReceiveGroupAnswer", Context.ConnectionId, sdp);
    }


    public async Task LeaveGroupCall(string groupId)
    {
        await Clients.GroupExcept(groupId, Context.ConnectionId)
                     .SendAsync("PeerLeftCall", Context.ConnectionId);

        if (_groups.TryGetValue(groupId, out var members))
        {
            members.TryRemove(Context.ConnectionId, out _);

            if (members.Count == 0 && _activeCalls.ContainsKey(groupId))
            {
                _activeCalls.TryRemove(groupId, out _);
                await Clients.Group(groupId).SendAsync("CallEnded");
            }

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupId);
        }
    }


    public async Task LeaveChatGroup(string groupId)
    {
        if (_groups.TryGetValue(groupId, out var members) && members.TryRemove(Context.ConnectionId, out _))
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupId);
            await Clients.Group(groupId)
                         .SendAsync("PeerLeft", Context.ConnectionId);
        }
    }


    public override async Task OnConnectedAsync()
    {
        var chatId = Context.GetHttpContext()?.Request.Query["chatId"];
        if (!string.IsNullOrEmpty(chatId))
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, chatId);
            await Clients.GroupExcept(chatId, Context.ConnectionId)
                         .SendAsync("NotifyNewPeer", Context.ConnectionId);
        }
        await base.OnConnectedAsync();
    }

    public async Task BroadcastOffer(string groupId, string sdp)
    {
        await Clients.GroupExcept(groupId, Context.ConnectionId)
                     .SendAsync("ReceiveOffer", Context.ConnectionId, sdp);
    }

    public async Task SendVideoStatus(string groupId, bool isVideoEnabled)
    {
        await Clients.GroupExcept(groupId, Context.ConnectionId)
                     .SendAsync("VideoStatus", Context.ConnectionId, isVideoEnabled);
    }

}