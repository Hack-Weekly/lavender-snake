export const genThreadSummary = (thread) => {
    const res = {
        id: thread.id,
        lastMessage: Object.assign({}, thread.messages[thread.messages.length - 1]),
        participants: [...thread.participants],
    };
    if (res.lastMessage.message.length > 23) {
        res.lastMessage.message = `${res.lastMessage.message.substring(0, 20)}...`;
    }
    return res;
};
