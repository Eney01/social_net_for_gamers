import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import MessageGroupList from '../../../message-items/message-list/components/MessageGroupList';
import styles from '../styles/Chat.module.css';
import { send, getChatById, getUserIdByToken } from '../../../../hooks/apiService';
import Header from '../../header/components/Header';
import MessageInputContainer from '../../footer/components/MessageInputContainer';
import useChatWebSocket from './useChatWebSocket';
import { useParams, useNavigate } from 'react-router-dom';
import FullWindowCall from "../../../shared/call-component/FullWindowCall";

function Chat() {
    const navigate = useNavigate();
    const token = sessionStorage["token"];

    const [currentUserId, setCurrentUserId] = useState(null);



    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const id = await getUserIdByToken(token);
                setCurrentUserId(id);
            } catch {
                setCurrentUserId(null);
            }
        };

        if (token) {
            fetchUserId();
        }
    }, [token]);

    const { chatId } = useParams();
    const [chat, setChat] = useState({
        messages: [],
        companions: [],
        isGroup: false
    });
    const [files, setFiles] = useState([]);
    const [message, setMessage] = useState('');
    const [gif, setGif] = useState('');
    const [audioChunks, setAudio] = useState(null);
    const [err, setErr] = useState("");

    const handleNewMessage = useCallback((newMsg) => {
        setChat(prev => {
            if (!prev || !prev.messages) return prev;
            return {
                ...prev,
                messages: [...prev.messages, newMsg],
            };
        });
    }, []);

    useChatWebSocket(chatId, handleNewMessage);

    // useEffect(() => {
    //     if (!currentUserId) {
    //         navigate('/auth');
    //     }
    // }, [currentUserId, navigate]);

    useEffect(() => {
        if (gif) {
            (async () => await handleOnSubmit())();
        }
    }, [gif, chatId, token]);

    useEffect(() => {
        if (audioChunks && audioChunks.file) {
            handleOnSubmit();
        }
    }, [audioChunks]);


    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await getChatById(chatId);
                setChat(data);
                setErr("");
            } catch (err) {
                console.error('Error loading data', err);
                setErr("Нема підключення");
            }
        };

        loadData();
    }, [chatId]);

    const { messages, companions } = chat;

    let companion = null;
    if (!chat.isGroup) {
        companion = companions.find(x => x.id !== currentUserId);
    }


    const selectGif = (gifSrc) => {
        setGif(gifSrc);
    };

    const handleOnSubmit = async (e) => {
        if (e) e.preventDefault();
        try {
            const response = await send(chatId, currentUserId, message, files, audioChunks, gif);
            setMessage('');
            setAudio(null);
            setFiles([]);
            setGif('');
        } catch (err) {
            console.error('Ошибка при отправке:', err);
        }
    };

    const [isInCall, setIsInCall] = useState(false);
    const [callProps, setCallProps] = useState(null);

    const mainBlock = useMemo(() => {
        if (isInCall && callProps) {
            console.log(callProps);
            return <FullWindowCall {...callProps} />;
        }

        return (
            <>
                <MessageGroupList messages={messages} currentUserId={currentUserId} />
                <MessageInputContainer
                    filesControl={{ files, setFiles }}
                    messageControl={{ message, setMessage }}
                    gifControl={{ gif, selectGif }}
                    audioRecordingControl={{ audioChunks, setAudio }}
                    onSubmit={handleOnSubmit}
                />
            </>
        );
    }, [isInCall, callProps, messages, currentUserId, files, message, gif, audioChunks]);

    const setFullWindowCall = (bool, localVideo = null, localStream = null, remoteStreams = [], peers = [], micControl = {}, camControl = {}, leaveCall = () => { }, videoStatus, smallWindowHandler, withoutWindowHandler, screenControl) => {
        if (bool) {
            setCallProps({
                localVideoRef: localVideo,
                localStreamRef: localStream,
                remoteStreams,
                peers,
                micControl,
                camControl,
                leaveCall,
                videoStatus,
                smallWindowHandler,
                withoutWindowHandler,
                screenControl
            });
        } else {
            setCallProps(null);
        }
        setIsInCall(bool);
    };


    return (
        <div className={styles.container}>
            {chat.isGroup ? (
                <Header />
            ) : (
                <Header
                    logoSrc={companion?.avatar}
                    name={companion ? companion.firstName || '' + ' ' + companion.lastName || '' : ''}
                    additional={err === "" ? (companion?.state || '') : err}
                    chatId={chatId}
                    token={token}
                    setFullCall={setFullWindowCall}
                />
            )}
            {mainBlock}
        </div>
    );
}


export default React.memo(Chat);