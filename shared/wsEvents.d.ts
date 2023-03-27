import { Message, ThreadId, ThreadSummary } from "./chatTypes.js";
import { User, UserId } from "./userTypes.js";
type OperationT = "add" | "delete" | "update";
export interface WsEvent {
    dataType: "message" | "thread" | "user" | "typing";
    operation: OperationT;
    context: string;
    data: any;
}
export declare class WsThreadEvent implements WsEvent {
    operation: OperationT;
    dataType: "thread";
    context: "none";
    data: ThreadSummary;
    static isInstance(evt: WsEvent): boolean;
    constructor(operation: OperationT, threadSummary: ThreadSummary);
}
export declare class WsMessageEvent implements WsEvent {
    operation: OperationT;
    dataType: "message";
    context: ThreadId;
    data: Message;
    static isInstance(evt: WsEvent): boolean;
    constructor(operation: OperationT, threadId: ThreadId, message: Message);
}
export declare class WsTypingEvent implements WsEvent {
    operation: "add";
    dataType: "typing";
    context: ThreadId;
    data: UserId;
    static isInstance(evt: WsEvent): boolean;
    constructor(threadId: ThreadId, userId: UserId);
}
export declare class WsUserEvent implements WsEvent {
    operation: OperationT;
    dataType: "user";
    context: "";
    data: User;
    static isInstance(evt: WsEvent): boolean;
    constructor(operation: OperationT, user: User);
}
export {};
