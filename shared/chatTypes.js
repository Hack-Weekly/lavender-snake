export const genThreadSummary = (thread) => {
    const res = {
        id: thread.id,
        lastMessage: thread.messages[thread.messages.length - 1],
        participants: [...thread.participants],
    };
    return res;
};
