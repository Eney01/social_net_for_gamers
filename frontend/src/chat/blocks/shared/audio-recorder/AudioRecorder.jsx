import React, { useState, useRef, useEffect } from 'react';
import styles from './AudioRecorder.module.css';
import AudioControls from './AudioControls';
import AudioTimer from './AudioTimer';
import microfon from '../../../assets/images/message-form/microfon.png';
import microfonSelected from '../../../assets/images/message-form/microfon-selected.png';

export default function AudioRecorder({ audioRecordingControl }) {
    const [isRecorderOpen, setIsRecorderOpen] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const mediaRecorderRef = useRef(null);
    const chunks = useRef([]);
    const [recordingTime, setRecordingTime] = useState(0);
    const [audioSrc, setAudioSrc] = useState(null);
    const [previewReady, setPreviewReady] = useState(false);
    const intervalRef = useRef(null);
    const startTimeRef = useRef(null);

    useEffect(() => {
        if (isRecording && !isPaused) {
            if (!startTimeRef.current) {
                startTimeRef.current = Date.now() - recordingTime;
            }

            intervalRef.current = setInterval(() => {
                setRecordingTime(Date.now() - startTimeRef.current);
            }, 100);
        } else {
            clearInterval(intervalRef.current);
            startTimeRef.current = null;
        }
        return () => clearInterval(intervalRef.current);
    }, [isRecording, isPaused]);

    const startRecording = async () => {
        if (!isRecorderOpen) {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            chunks.current = [];

            recorder.ondataavailable = e => {
                if (e.data && e.data.size > 0) chunks.current.push(e.data);
            };

            mediaRecorderRef.current = recorder;
            recorder.start();

            setIsRecorderOpen(true);
            setIsRecording(true);
            setIsPaused(false);
            setRecordingTime(0);
        } else {
            handleCancel();
        }
    };


    const stopRecording = () => {
        return new Promise((resolve) => {
            const recorder = mediaRecorderRef.current;
            if (recorder && recorder.state !== 'inactive') {
                const onStopHandler = () => {
                    const blob = new Blob(chunks.current.filter(c => c.size > 0), { type: 'audio/webm' });
                    const url = URL.createObjectURL(blob);
                    setAudioSrc(url);
                    setPreviewReady(true);
                    recorder.removeEventListener('stop', onStopHandler);
                    resolve();
                };
                recorder.addEventListener('stop', onStopHandler);
                recorder.requestData();
                recorder.stop();
                setIsRecording(false);
                setIsPaused(false);
            } else {
                resolve();
            }
        });
    };


    const pauseRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.pause();
            setIsPaused(true);
        }
    };

    const resumeRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
            mediaRecorderRef.current.resume();
            setIsPaused(false);
        }
    };
    const handleSend = async () => {
        await stopRecording();

        if (chunks.current.length === 0) {
            console.warn('Аудио не записано');
            return;
        }

        const blob = new Blob(chunks.current.filter(c => c.size > 0), { type: 'audio/webm' });
        const file = new File([blob], 'audio-message.webm', { type: 'audio/webm' });

        audioRecordingControl.setAudio({
            type: file.type,
            name: file.name,
            id: 'audio_' + Date.now(),
            file: file,
            size: file.size,
            src: URL.createObjectURL(blob),
        });

        chunks.current = [];
        setAudioSrc(null);
        setPreviewReady(false);
        setIsRecorderOpen(false);
        setRecordingTime(0);
    };


    const handleCancel = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        }
        chunks.current = [];
        setAudioSrc(null);
        setPreviewReady(false);
        setIsRecorderOpen(false);
        setIsRecording(false);
        setIsPaused(false);
        setRecordingTime(0);
    };

    return (
        <>
            <button type="button" onClick={startRecording}>
                {isRecorderOpen ? (
                    <img src={microfonSelected} alt="stop audio" />
                ) : (
                    <img src={microfon} alt="record audio" />
                )}
            </button>

            {isRecorderOpen && (
                <div className={styles.modal}>
                    {isRecording && !previewReady && (
                        <AudioControls
                            isPaused={isPaused}
                            pauseRecording={pauseRecording}
                            resumeRecording={resumeRecording}
                            stopRecording={stopRecording}
                            cancelRecording={handleCancel}
                            onSend={handleSend}
                        >
                            <AudioTimer isPaused={isPaused} time={recordingTime} />
                        </AudioControls>
                    )}

                    {/* {previewReady && (
                        <AudioPreview
                            audioSrc={audioSrc}
                            onCancel={handleCancel}
                            onSend={handleSend}
                        />
                    )} */}
                </div>
            )}
        </>
    );
}
