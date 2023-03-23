export class WsThreadEvent {
    constructor(operation, thread) {
        this.dataType = "thread";
        this.context = "undefined";
        this.operation = operation;
        this.data = thread;
    }
}
export class WsMessageEvent {
    constructor(operation, threadId, message) {
        this.dataType = "message";
        this.operation = operation;
        this.context = threadId;
        this.data = message;
    }
}
