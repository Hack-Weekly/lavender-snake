export class WsThreadEvent {
    static isInstance(evt) {
        return evt.dataType === "thread";
    }
    constructor(operation, threadSummary) {
        this.dataType = "thread";
        this.context = "none";
        this.operation = operation;
        this.data = threadSummary;
    }
}
export class WsMessageEvent {
    static isInstance(evt) {
        return evt.dataType === "message";
    }
    constructor(operation, threadId, message) {
        this.dataType = "message";
        this.operation = operation;
        this.context = threadId;
        this.data = message;
    }
}
export class WsTypingEvent {
    static isInstance(evt) {
        return evt.dataType === "typing";
    }
    constructor(threadId, userId) {
        this.dataType = "typing";
        this.context = threadId;
        this.operation = "add";
        this.data = userId;
    }
}
export class WsUserEvent {
    static isInstance(evt) {
        return evt.dataType === "user";
    }
    constructor(operation, user) {
        this.dataType = "user";
        this.context = "";
        this.operation = operation;
        this.data = user;
    }
}
