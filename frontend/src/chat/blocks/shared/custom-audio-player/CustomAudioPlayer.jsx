import React, { useRef, useState, useEffect, useCallback, memo, useMemo } from 'react';
import pause from "../../../assets/images/custom-audio-player/pause.png";
import pauseHovered from "../../../assets/images/custom-audio-player/pause-hovered.png";
import play from "../../../assets/images/custom-audio-player/play.png";
import playHovered from "../../../assets/images/custom-audio-player/play-hovered.png";

import styles from "./CustomAudioPlayer.module.css";
import AudioTimer from '../audio-recorder/AudioTimer';

const AudioPlayer = ({
    src,
    barCount = 80,
    barWidth = 2,
    barGap = 2,
    playedColor = '#1AAAF5',
    unplayedColor = '#BBBBBE',
    sliderColor = '#1AAAF5',
    sliderWidth = 3,
    canvasHeight = 25,
    isLeft = false
}) => {
    const audioRef = useRef(null);
    const canvasRef = useRef(null);
    const [peaks, setPeaks] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPeakIndex, setCurrentPeakIndex] = useState(0);

    const [isButtonHovered, setIsButtonHovered] = useState(false);

    useEffect(() => {
        if (!src) return;
        const fetchAndDecode = async () => {
            const resp = await fetch(src);
            const arrayBuffer = await resp.arrayBuffer();
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const buffer = await audioCtx.decodeAudioData(arrayBuffer);
            const rawData = buffer.getChannelData(0);
            const blockSize = Math.floor(rawData.length / barCount);
            const filtered = new Float32Array(barCount);

            for (let i = 0; i < barCount; i++) {
                let sum = 0;
                for (let j = 0; j < blockSize; j++) {
                    sum += Math.abs(rawData[i * blockSize + j]);
                }
                filtered[i] = sum / blockSize;
            }
            const maxVal = Math.max(...filtered);
            const normalized = maxVal > 0 ? filtered.map(v => v / maxVal) : filtered;
            setPeaks(normalized);
        };
        fetchAndDecode();
    }, [src, barCount]);

    const onTimeUpdate = useCallback(() => {
        const audio = audioRef.current;
        if (!audio || peaks.length === 0) return;

        let idx = 0;
        if (!isNaN(audio.duration) && audio.duration !== Infinity) {
            idx = Math.floor((audio.currentTime / audio.duration) * peaks.length);
            setCurrentPeakIndex(idx);
        } else {
            audio.currentTime = 1e101;
            audio.ontimeupdate = function () {
                audio.ontimeupdate = null;
                audio.currentTime = 0;
                if (!isNaN(audio.duration) && audio.duration !== Infinity) {
                    idx = Math.floor((audio.currentTime / audio.duration) * peaks.length);
                    setCurrentPeakIndex(idx);
                }
            };
        }

    }, [peaks.length]);

    const handleCanvasClick = (e) => {
        const canvas = canvasRef.current;
        const audio = audioRef.current;
        if (!canvas || !audio || !peaks.length || isNaN(audio.duration)) return;

        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickRatio = clickX / canvas.width;

        if (!isNaN(audio.duration) && audio.duration !== Infinity) {
            audio.currentTime = clickRatio * audio.duration;
        } else {
            audio.currentTime = 1e101;
            audio.ontimeupdate = function () {
                audio.ontimeupdate = null;
                audio.currentTime = 0;
                if (!isNaN(audio.duration) && audio.duration !== Infinity) {
                    audio.currentTime = clickRatio * audio.duration;
                }
            };
        }

        if (!isPlaying) {
            audio.play();
            setIsPlaying(true);
        }
    };

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    function drawRoundedRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();
    }


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const height = canvas.height;
        ctx.clearRect(0, 0, canvas.width, height);

        peaks.forEach((val, i) => {
            const barHeight = val * height;
            const x = i * (barWidth + barGap);
            ctx.fillStyle = i <= currentPeakIndex ? playedColor : unplayedColor;
            ctx.fillRect(x, (height - barHeight) / 2, barWidth, barHeight);
        });

        const sliderX = currentPeakIndex * (barWidth + barGap) + barWidth / 2;
        ctx.fillStyle = sliderColor;
        drawRoundedRect(ctx, sliderX, 0, sliderWidth, height, 2)
    }, [peaks, currentPeakIndex, barWidth, barGap, playedColor, unplayedColor, sliderColor, sliderWidth]);


    const displayTime = useMemo(() => {
        const audio = audioRef.current;
        if (!audio || isNaN(audio.duration)) return 0;

        const current = audio.currentTime;
        let duration = 0;

        if (!isNaN(audio.duration) && audio.duration !== Infinity) {
            duration = audio.duration;
        } else {
            audio.currentTime = 1e101;
            audio.ontimeupdate = function () {
                audio.ontimeupdate = null;
                audio.currentTime = 0;
                if (!isNaN(audio.duration) && audio.duration !== Infinity) {
                    duration = audio.duration;
                }
            };
        }


        return current > 0 ? current * 1000 : duration * 1000;
    }, [audioRef.current?.currentTime, isPlaying]);


    return (
        <div className={`${styles.container} ${isLeft && styles.leftContainer}`}>
            <button
                onClick={togglePlay}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                className={styles.btn}
            >
                {
                    isPlaying ? (isButtonHovered ? <img src={pauseHovered} alt="pause" /> : <img src={pause} alt="pause" />)
                        : (isButtonHovered ? <img src={playHovered} alt='play' /> : <img src={play} alt='play' />)
                }
            </button>
            <div className={styles.canvasContainer}>
                <canvas
                    ref={canvasRef}
                    width={(barWidth + barGap) * barCount}
                    height={canvasHeight}
                    className={styles.canvas}
                    onClick={handleCanvasClick}
                />
                <AudioTimer
                    isPaused={!isPlaying}
                    time={displayTime}
                    withDot={false}
                    isLeft={isLeft}
                />

            </div>
            <audio
                ref={audioRef}
                src={src}
                onTimeUpdate={onTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                style={{ display: 'none' }}
            />

        </div>
    );
};

export default memo(AudioPlayer);
