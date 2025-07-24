import React, { useEffect, useRef } from "react";
import styles from "./SmallWindowCall.module.css";
import VideoPlayer from "./VideoPlayer";
import phoneReceiverRed from '../../../assets/images/chat-header/leave-btn.png';
import screencast from "../../../assets/images/chat-header/screen-btn.png";
import screencastActive from "../../../assets/images/chat-header/screen-btn-active.png";
import camera from "../../../assets/images/chat-header/camera-btn.png";
import cameraActive from "../../../assets/images/chat-header/cam-btn-active.png";
import microfon from "../../../assets/images/chat-header/micr-btn.png";
import microfonActive from "../../../assets/images/chat-header/micr-btn-active.png";
import chatBtn from "../../../assets/images/chat-header/chat-btn.png";
import fullWindow from "../../../assets/images/chat-header/full-window-btn.png";
import without from "../../../assets/images/chat-header/without-window-btn.png";
export default React.memo(function SmallWindowCall({
    localVideoRef,
    localStreamRef,
    remoteStreams,
    peers,
    leaveCall,
    micControl = { micOn: true, toggleMicrofon: () => { } },
    camControl = { camOn: true, toggleCamera: () => { } },
    videoStatus,
    fullWindowHandler,
    withoutWindowHandler,
    screenControl = { screenSharing: false, toggleScreenShare: () => { } }
}) {
    const { micOn, toggleMicrofon } = micControl;
    const { camOn, toggleCamera } = camControl;
    const { screenSharing, toggleScreenShare } = screenControl;
    const ctrlLineRef = useRef(null);

    const containerRef = useRef(null);
    const posRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const videoEl = localVideoRef.current;
        const stream = localStreamRef.current;
        if (!videoEl) return;
        videoEl.srcObject = camOn && stream ? stream : null;
    }, [camOn, localStreamRef]);

    useEffect(() => {
        const container = containerRef.current;
        const dragZone = ctrlLineRef.current;
        if (!container || !dragZone) return;

        const handleMouseDown = (e) => {
            e.preventDefault();
            const rect = container.getBoundingClientRect();
            posRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        };

        const handleMouseMove = (e) => {
            const left = e.clientX - posRef.current.x;
            const top = e.clientY - posRef.current.y;
            container.style.left = `${left}px`;
            container.style.top = `${top}px`;
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        dragZone.addEventListener("mousedown", handleMouseDown);
        return () => {
            dragZone.removeEventListener("mousedown", handleMouseDown);
        };
    }, []);


    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.controls}>
                <div className={styles.ctrlLine} ref={ctrlLineRef}></div>
                <div className={styles.helpBtn}>
                    <button onClick={fullWindowHandler}>
                        <img src={fullWindow} />
                    </button>
                    <button onClick={withoutWindowHandler}>
                        <img src={without} />
                    </button>
                </div>
            </div>

            <div className={styles.videos}>
                <div key={peers[0].connectionId} className={styles.video}>
                    <VideoPlayer
                        stream={remoteStreams[peers[0].connectionId]}
                        user={peers[0]}
                        videoEnabled={videoStatus[peers[0].connectionId]}
                    />
                </div>

            </div>

            <div className={styles.btnContainer}>
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
