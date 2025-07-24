import React, { useEffect, useRef } from "react";
import styles from "./FullWindowCall.module.css";
import VideoPlayer from "./VideoPlayer";
import phoneReceiverRed from '../../../assets/images/chat-header/leave-btn.png';
import screencast from "../../../assets/images/chat-header/screen-btn.png";
import screencastActive from "../../../assets/images/chat-header/screen-btn-active.png";
import camera from "../../../assets/images/chat-header/camera-btn.png";
import cameraActive from "../../../assets/images/chat-header/cam-btn-active.png";
import microfon from "../../../assets/images/chat-header/micr-btn.png";
import microfonActive from "../../../assets/images/chat-header/micr-btn-active.png";
import chatBtn from "../../../assets/images/chat-header/chat-btn.png";

export default React.memo(function FullWindowCall({
    localVideoRef,
    localStreamRef,
    remoteStreams,
    peers,
    leaveCall,
    micControl = { micOn: true, toggleMicrofon: () => { } },
    camControl = { camOn: true, toggleCamera: () => { } },
    videoStatus,
    smallWindowHandler,
    withoutWindowHandler,
    screenControl = { screenSharing: false, toggleScreenShare: () => { } }
}) {
    const { micOn, toggleMicrofon } = micControl;
    const { camOn, toggleCamera } = camControl;
    const { screenSharing, toggleScreenShare } = screenControl;

    const containerRef = useRef(null);
    const posRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const videoEl = localVideoRef.current;
        const stream = localStreamRef.current;
        if (!videoEl) return;
        videoEl.srcObject = camOn && stream ? stream : null;
    }, [camOn, localStreamRef]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const handleMouseDown = (e) => {
            posRef.current = {
                x: e.clientX - el.offsetLeft,
                y: e.clientY - el.offsetTop,
            };
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        };

        const handleMouseMove = (e) => {
            el.style.left = `${e.clientX - posRef.current.x}px`;
            el.style.top = `${e.clientY - posRef.current.y}px`;
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        el.addEventListener("mousedown", handleMouseDown);

        return () => {
            el.removeEventListener("mousedown", handleMouseDown);
        };
    }, []);

    return (
        <div className={styles.container}>
            {camOn &&
                <div
                    ref={containerRef}
                    className={styles.myVideo}
                >
                    <video ref={localVideoRef} autoPlay muted />
                </div>
            }
            <div className={styles.videos}>
                {peers.map(peer => (
                    <div key={peer.connectionId} className={styles.video}>
                        <VideoPlayer
                            stream={remoteStreams[peer.connectionId]}
                            user={peer}
                            videoEnabled={videoStatus[peer.connectionId]}
                            small={false}
                        />
                    </div>
                ))}
            </div>

            <div className={styles.btnContainer}>
                <button className={`${styles.btn} ${styles.chatBtn}`} onClick={smallWindowHandler}>
                    <img src={chatBtn} alt="in chat" />
                </button>
                <button className={styles.btn} onClick={toggleCamera}>
                    <img src={camOn ? cameraActive : camera} alt="camera" />
                </button>
                <button className={styles.btn} onClick={toggleMicrofon}>
                    <img src={micOn ? microfonActive : microfon} alt="microfon" />
                </button>
                <button className={styles.btn} onClick={leaveCall}>
                    <img src={phoneReceiverRed} alt="leave" />
                </button>
                <button className={styles.btn} onClick={toggleScreenShare}>
                    <img src={screenSharing ? screencastActive : screencast} alt="screencast" />
                </button>
            </div>
        </div>
    );
});
