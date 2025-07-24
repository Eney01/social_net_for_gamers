import { useEffect, useRef } from 'react';
import styles from "./VideoPlayer.module.css";
import defaultAvatar from "../../../assets/images/different/default-avatar.png";

export default function VideoPlayer({ stream, user, videoEnabled, small = true }) {
    const videoRef = useRef();

    useEffect(() => {
        if (!videoRef.current) return;

        if (stream && videoEnabled) {
            const tracks = stream.getVideoTracks().filter(t => t.readyState === "live");
            const mediaStream = new MediaStream(tracks);
            videoRef.current.srcObject = mediaStream;
        } else {
            videoRef.current.srcObject = null;
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
        };
    }, [stream, videoEnabled]);


    return (
        <div className={styles.container}>
            {videoEnabled && stream ? (
                <div className={styles.video}>
                    <video ref={videoRef} autoPlay playsInline />
                    <div className={styles.userDataWithVideo}>{user.name}</div>
                </div>
            ) : (
                <div style={small ? { fontSize: "40px" } : undefined} className={styles.withoutImage}>
                    <div className={styles.image}><img src={user.avatarUrl || defaultAvatar} alt="avatar" className={styles.avatar} /></div>
                    <div className={styles.userData}>{user.name}</div>
                </div>
            )}
        </div>
    );
}
