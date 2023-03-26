export const genThreadSummary = (thread) => {
    const res = {
        id: thread.id,
        lastMessage: thread.messages.length > 0
            ? Object.assign({}, thread.messages[thread.messages.length - 1]) : undefined,
        participants: [...thread.participants],
    };
    if (res.lastMessage && res.lastMessage.message.length > 23) {
        res.lastMessage.message = `${res.lastMessage.message.substring(0, 20)}...`;
    }
    return res;
};
