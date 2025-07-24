import React, { useEffect, useRef, useState } from 'react';
import SignalService from '../../../hooks/signalService';
import VideoPlayer from './VideoPlayer'
import phoneReceiver from '../../../assets/images/chat-header/phone-receiver.png';
import phoneReceiverRed from '../../../assets/images/chat-header/phone-receiver-red.png';
import incomingCallImg from "../../../assets/images/chat-header/incoming-call.png";
import screencast from "../../../assets/images/chat-header/screencast.png";
import camera from "../../../assets/images/chat-header/camera.png";
import cameraActive from "../../../assets/images/chat-header/cam-active.png";
import microfon from "../../../assets/images/chat-header/microfon.png";
import microfonActive from "../../../assets/images/chat-header/micr-active.png";
import screenActive from "../../../assets/images/chat-header/screencat-active.png";
import styles from "./CallComponent.module.css";
import SmallWindowCall from './SmallWindowCall';

export default function CallComponent({ chatId, token, setFullCall }) {
  const localVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const pcs = useRef({});
  const iceBuffers = useRef({});

  const [peers, setPeers] = useState([]);
  const [remoteStreams, setRemoteStreams] = useState({});
  const [callStarted, setCallStarted] = useState(false);
  const [incomingCall, setIncomingCall] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [isActiveCall, setIsActiveCall] = useState(false);
  const [signalService] = useState(() => new SignalService(token));
  const [videoStatus, setVideoStatus] = useState({});
  const [type, setType] = useState(0);
  const [screenSharing, setScreenSharing] = useState(false);
  const screenTrackRef = useRef(null);


  function stopScreenShare() {
    const videoTrack = localStreamRef.current.getVideoTracks()[0];

    const sender = Object.values(pcs.current).flatMap(pc =>
      pc.getSenders().filter(s => s.track?.kind === "video")
    );

    sender.forEach(s => s.replaceTrack(videoTrack));

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = new MediaStream([videoTrack]);
    }

    if (screenTrackRef.current) {
      screenTrackRef.current.stop();
      screenTrackRef.current = null;
    }


    setScreenSharing(false);
  }


  async function toggleScreenShare() {
    if (!screenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const screenTrack = screenStream.getVideoTracks()[0];
        screenTrackRef.current = screenTrack;

        const sender = Object.values(pcs.current).flatMap(pc =>
          pc.getSenders().filter(s => s.track?.kind === "video")
        );

        sender.forEach(s => s.replaceTrack(screenTrack));

        screenTrack.onended = () => {
          stopScreenShare();
        };

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = new MediaStream([screenTrack]);
        }

        setScreenSharing(true);
      } catch (err) {
        console.error("Ошибка при получении экрана:", err);
      }
    } else {
      stopScreenShare();
    }
  }


  function smallWindowHandler() {
    setType(1);
    setFullCall(false);
  }

  function withoutWindowHandler() {
    setType(2);
    setFullCall(false);
  }

  function fullWindowHandler() {
    setType(0);
    setFullCall(
      true,
      localVideoRef,
      localStreamRef,
      remoteStreams,
      peers,
      { micOn, toggleMicrofon },
      { camOn, toggleCamera },
      leaveCall,
      videoStatus,
      smallWindowHandler,
      withoutWindowHandler,
      { screenSharing, toggleScreenShare }
    );
  }

  function updateVideoStatus(id, isEnabled) {
    setVideoStatus(prev => ({ ...prev, [id]: isEnabled }));
  }

  useEffect(() => {
    if (!screenSharing) {
      const videoTracks = localStreamRef.current?.getVideoTracks?.();
      if (!videoTracks || videoTracks.length === 0) return;

      videoTracks.forEach(track => {
        track.enabled = camOn;
      });
    }

    if (callStarted) {
      signalService.sendVideoStatus(chatId, camOn || screenSharing);
    }

    updateVideoStatus(signalService.connection.connectionId, camOn || screenSharing);

    if (type === 0 && callStarted) {
      setFullCall(
        true,
        localVideoRef,
        localStreamRef,
        remoteStreams,
        peers,
        { micOn, toggleMicrofon },
        { camOn, toggleCamera },
        leaveCall,
        videoStatus,
        smallWindowHandler,
        withoutWindowHandler,
        { screenSharing, toggleScreenShare }
      );
    }
  }, [camOn, screenSharing]);




  function makePeer(id) {
    const existingPc = pcs.current[id];
    if (existingPc && existingPc.signalingState !== 'closed') return existingPc;
    const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
    pcs.current[id] = pc;
    localStreamRef.current.getTracks().forEach(t => pc.addTrack(t, localStreamRef.current));
    pc.onicecandidate = e => e.candidate && signalService.sendIce(id, e.candidate);
    pc.ontrack = e => {
      const [stream] = e.streams;
      setRemoteStreams(rs => ({
        ...rs,
        [id]: new MediaStream(stream.getTracks())
      }));

      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.onmute = () => updateVideoStatus(id, false);
        videoTrack.onunmute = () => updateVideoStatus(id, true);
        updateVideoStatus(id, videoTrack.enabled);
      }
    };
    pc.onconnectionstatechange = () => {
      if (['disconnected', 'failed', 'closed'].includes(pc.connectionState)) {
        setPeers(curr => curr.filter(x => x !== id));

        setRemoteStreams(rs => {
          const stream = rs[id];
          if (stream) stream.getTracks().forEach(t => t.stop());
          const copy = { ...rs };
          delete copy[id];
          return copy;
        });

        if (pcs.current[id]) {
          pcs.current[id].close();
          delete pcs.current[id];
        }
      }
    };

    return pc;
  }

  async function drainIce(id, pc) {
    const buf = iceBuffers.current[id] || [];
    for (const c of buf) {
      try { await pc.addIceCandidate(c); } catch { }
    }
    iceBuffers.current[id] = [];
  }

  async function applyAnswerWhenReady(from, sdp) {
    const pc = pcs.current[from];
    if (!pc) return;
    for (let i = 0; i < 20; i++) {
      try {
        await pc.setRemoteDescription({ type: 'answer', sdp });
        break;
      } catch {
        await new Promise(r => setTimeout(r, 100));
      }
    }
    await drainIce(from, pc);
  }

  async function initLocalStream() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStreamRef.current = stream;
    if (localVideoRef.current) localVideoRef.current.srcObject = stream;
  }

  function subscribeToSignalEvents() {
    signalService.on('ExistingPeers', list => {
      const others = list.filter(x => x.connectionId !== signalService.connection.connectionId);
      setPeers(others);
      others.forEach(async ({ connectionId }) => {
        if (pcs.current[connectionId]?.localDescription) return;
        const pc = makePeer(connectionId);
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        await signalService.sendOffer(connectionId, offer.sdp);
      });
    });


    signalService.on('video-status', ({ from, isEnabled }) => {
      updateVideoStatus(from, isEnabled);
    });


    signalService.on('CallStarted', () => {
      setIsActiveCall(true);
    });


    signalService.on('NotifyNewPeer', peerInfo =>
      setPeers(curr => curr.some(p => p.connectionId === peerInfo.connectionId)
        ? curr
        : [...curr, peerInfo])
    );
    signalService.on('PeerLeft', id => {
      setPeers(curr => curr.filter(x => x !== id));

      setRemoteStreams(rs => {
        const stream = rs[id];
        if (stream) stream.getTracks().forEach(t => t.stop());
        const copy = { ...rs };
        delete copy[id];
        return copy;
      });

      if (pcs.current[id]) {
        pcs.current[id].close();
        delete pcs.current[id];
      }
    });

    signalService.on('offer', async ({ from, sdp }) => {
      const pc = makePeer(from);

      const offerDesc = new RTCSessionDescription({ type: 'offer', sdp });

      try {
        if (!pc.remoteDescription || pc.signalingState === "have-local-offer") {
          await pc.setRemoteDescription(offerDesc);
        } else {
          console.warn('Offer received but remoteDescription already set. Ignoring.');
          return;
        }

        await drainIce(from, pc);

        const answer = await pc.createAnswer();

        if (pc.signalingState !== 'stable') {
          await pc.setLocalDescription(answer);
          await signalService.sendAnswer(from, answer.sdp);
        } else {
          console.warn("Signaling state already 'stable'; skipping setLocalDescription(answer).");
        }
      } catch (err) {
        console.error("Error handling offer from", from, err);
      }
    });
    signalService.on('answer', ({ from, sdp }) => applyAnswerWhenReady(from, sdp));
    signalService.on('ice', async ({ from, candidate }) => {
      const pc = pcs.current[from];
      const ice = new RTCIceCandidate(candidate);
      if (pc && pc.remoteDescription) {
        try { await pc.addIceCandidate(ice); } catch { }
      } else {
        iceBuffers.current[from] = [...(iceBuffers.current[from] || []), ice];
      }
    });
    signalService.on('CallEnded', () => leaveCall());
    signalService.on('incoming-call', () => setIncomingCall(true));
  }

  useEffect(() => {
    if (callStarted && localVideoRef.current && !localVideoRef.current.srcObject) {
      localVideoRef.current.srcObject = localStreamRef.current;
    }
  }, [callStarted]);

  async function sendOffers() {
    for (const id of peers) {
      if (id === signalService.connection.connectionId || pcs.current[id]?.localDescription) continue;
      const pc = makePeer(id);
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      await signalService.sendOffer(id, offer.sdp);
    }
  }


  async function startCall() {
    await signalService.ensureStarted();
    await initLocalStream();
    subscribeToSignalEvents();
    await signalService.joinGroup(chatId);
    await signalService.startPersistentCall(chatId);

    setCallStarted(true);
    setIncomingCall(false);
    setIsActiveCall(true);

    await sendOffers();
    if (type === 0) {
      setFullCall(
        true,
        localVideoRef,
        localStreamRef,
        remoteStreams,
        peers,
        { micOn, toggleMicrofon },
        { camOn, toggleCamera },
        leaveCall,
        videoStatus,
        smallWindowHandler,
        withoutWindowHandler,
        { screenSharing, toggleScreenShare }
      );
    }
  }

  async function acceptCall() {
    await signalService.ensureStarted();
    await initLocalStream();
    subscribeToSignalEvents();
    await signalService.joinGroup(chatId);

    setCallStarted(true);
    setIncomingCall(false);
    await sendOffers();
    if (type === 0) {
      setFullCall(
        true,
        localVideoRef,
        localStreamRef,
        remoteStreams,
        peers,
        { micOn, toggleMicrofon },
        { camOn, toggleCamera },
        leaveCall,
        videoStatus,
        smallWindowHandler,
        withoutWindowHandler,
        { screenSharing, toggleScreenShare }
      );
    }
  }

  async function leaveCall() {
    await signalService.leaveGroupCall(chatId);
    await signalService.leaveGroup(chatId);

    Object.values(pcs.current).forEach(pc => pc.close());
    pcs.current = {};
    iceBuffers.current = {};

    if (localStreamRef.current) localStreamRef.current.getTracks().forEach(t => t.stop());

    setRemoteStreams({});
    setPeers([]);
    setCallStarted(false);
    setIsActiveCall(false);
    setIncomingCall(false);
    setMicOn(true);
    setCamOn(true);
    setType(0);
    setFullCall(false);
  }

  useEffect(() => {
    signalService.ensureStarted()
      .then(() => signalService.isCallActive(chatId))
      .then(active => setIsActiveCall(active));
  }, [chatId]);


  useEffect(() => {
    if (callStarted) {
      if (type === 0) {
        setFullCall(
          true,
          localVideoRef,
          localStreamRef,
          remoteStreams,
          peers,
          { micOn, toggleMicrofon },
          { camOn, toggleCamera },
          leaveCall,
          videoStatus,
          smallWindowHandler,
          withoutWindowHandler,
          { screenSharing, toggleScreenShare }
        );
      }
    }
  }, [remoteStreams, peers, micOn, camOn, videoStatus]);

  function toggleCamera() {
    if (screenSharing) return;
    localStreamRef.current.getVideoTracks().forEach(t => t.enabled = !camOn);
    setCamOn(c => !c);
  }

  function toggleMicrofon() {
    localStreamRef.current.getAudioTracks().forEach(t => t.enabled = !micOn);
    setMicOn(m => !m);
  }




  return (
    <div className="flex space-x-4">
      {callStarted ? (
        <div className={styles.btnContainer}>
          <button className={styles.btn} onClick={leaveCall}>
            <img src={phoneReceiverRed} alt="leave" />
          </button>
          <button className={styles.btn} onClick={toggleScreenShare}>
            <img src={screenSharing ? screenActive : screencast} alt="screencast" />
          </button>
          <button className={styles.btn} onClick={toggleCamera}>
            <img src={camOn ? cameraActive : camera} alt="camera" />
          </button>
          <button className={styles.btn} onClick={toggleMicrofon}>
            <img src={micOn ? microfonActive : microfon} alt="camera" />
          </button>
        </div>
      ) : !isActiveCall ? (
        <button className={styles.btn} onClick={startCall}>
          <img src={phoneReceiver} alt='call' />
        </button>
      ) : (
        <button className={styles.btn} onClick={acceptCall}>
          <img src={incomingCallImg} alt='incoming-call' />
        </button>
      )}
      {type === 1 && (
        <SmallWindowCall
          localVideoRef={localVideoRef}
          localStreamRef={localStreamRef}
          remoteStreams={remoteStreams}
          peers={peers}
          leaveCall={leaveCall}
          micControl={{ micOn, toggleMicrofon }}
          camControl={{ camOn, toggleCamera }}
          videoStatus={videoStatus}
          fullWindowHandler={fullWindowHandler}
          withoutWindowHandler={withoutWindowHandler}
          screenControl={{ screenSharing, toggleScreenShare }}
        />
      )}
    </div>
  );
}