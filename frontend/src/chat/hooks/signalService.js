import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

class SignalService {
  token = "";
  constructor(_token) {
    this.token = _token;
    this.connection = new HubConnectionBuilder()
      .withUrl(`${process.env.REACT_APP_API_URL}/callHub`, {
        accessTokenFactory: () => this.token
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    this.handlers = {};

    this.connection.on('ExistingPeers', list => this._emit('ExistingPeers', list));
    this.connection.on('NotifyNewPeer', id => this._emit('NotifyNewPeer', id));
    this.connection.on('PeerLeft', id => this._emit('PeerLeft', id));
    this.connection.on('IncomingCall', from => this._emit('incoming-call', from));

    this.connection.on('ReceiveOffer', (from, sdp) => this._emit('offer', { from, sdp }));
    this.connection.on('ReceiveAnswer', (from, sdp) => this._emit('answer', { from, sdp }));
    this.connection.on('CallStarted', () => this._emit('CallStarted'));
    this.connection.on('ReceiveIce', (from, candidate) =>
      this._emit('ice', { from, candidate })
    );
    this.connection.on('VideoStatus', (from, isEnabled) =>
      this._emit('video-status', { from, isEnabled })
    );

  }

  sendVideoStatus(groupId, isEnabled) {
    return this.connection.invoke('SendVideoStatus', groupId, isEnabled);
  }


  async ensureStarted() {
    if (this.connection.state === 'Disconnected') {
      await this.connection.start();
      console.info('[SignalR] connected, id=', this.connection.connectionId);
    }
    while (this.connection.state !== 'Connected') {
      await new Promise(r => setTimeout(r, 50));
    }
  }

  startPersistentCall(groupId) {
    return this.connection.invoke('StartPersistentCall', groupId);
  }

  isCallActive(groupId) {
    return this.connection.invoke('IsCallActive', groupId);
  }

  endPersistentCall(groupId) {
    return this.connection.invoke('EndPersistentCall', groupId);
  }

  joinGroup(groupId) {
    return this.connection.invoke('JoinChatGroup', groupId, this.token);
  }

  leaveGroup(groupId) {
    return this.connection.invoke('LeaveChatGroup', groupId);
  }

  leaveGroupCall(groupId) {
    return this.connection.invoke('LeaveGroupCall', groupId);
  }

  sendOffer(to, sdp) {
    return this.connection.invoke('SendOffer', to, sdp);
  }

  sendAnswer(to, sdp) {
    return this.connection.invoke('SendAnswer', to, sdp);
  }

  sendIce(to, candidate) {
    return this.connection.invoke('SendIce', to, candidate);
  }

  on(event, cb) {
    this.handlers[event] = [...(this.handlers[event] || []), cb];
  }

  _emit(event, payload) {
    (this.handlers[event] || []).forEach(cb => cb(payload));
  }
}

export default SignalService;
