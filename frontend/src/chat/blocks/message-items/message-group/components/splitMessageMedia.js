function splitMessageMedia(msg, chunkSize = 5) {
    if (!msg.media || msg.media.length <= chunkSize) {
        return [msg];
    }

    const chunks = [];
    for (let i = 0; i < msg.media.length; i += chunkSize) {
        const mediaChunk = msg.media.slice(i, i + chunkSize);
        chunks.push({
            ...msg,
            id: `${msg.id}_part_${Math.floor(i / chunkSize)}`,
            media: mediaChunk,
            content: i === 0 ? msg.content : '',
        });
    }
    return chunks;
}

export default splitMessageMedia;
