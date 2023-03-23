import { Message, Thread, ThreadId } from "./chatTypes.js";
type OperationT = "add" | "delete" | "update";
export interface WsEvent {
    dataType: "message" | "thread" | "user";
    operation: OperationT;
    context: string;
    data: any;
}
export declare class WsThreadEvent implements WsEvent {
    operation: OperationT;
    dataType: "thread";
    context: "undefined";
    data: Thread;
    constructor(operation: OperationT, thread: Thread);
}
export declare class WsMessageEvent implements WsEvent {
    operation: OperationT;
    dataType: "message";
    context: ThreadId;
    data: Message;
    constructor(operation: OperationT, threadId: ThreadId, message: Message);
}
export {};
