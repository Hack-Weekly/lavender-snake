import { Message, Thread, ThreadId, ThreadSummary } from "./chatTypes.js";
import { UserId } from "./userTypes.js";

type OperationT = "add" | "delete" | "update";

export interface WsEvent {
  dataType: "message" | "thread" | "user" | "typing";
  operation: OperationT;
  context: string;
  data: any;
}

export class WsThreadEvent implements WsEvent {
  operation: OperationT;
  dataType: "thread";
  context: "none";
  data: ThreadSummary;

  static isInstance(evt: WsEvent) {
    return evt.dataType === "thread";
  }

  constructor(operation: OperationT, threadSummary: ThreadSummary) {
    this.dataType = "thread";
    this.context = "none";
    this.operation = operation;
    this.data = threadSummary;
  }
}

export class WsMessageEvent implements WsEvent {
  operation: OperationT;
  dataType: "message";
  context: ThreadId;
  data: Message;

  static isInstance(evt: WsEvent) {
    return evt.dataType === "message";
  }

  constructor(operation: OperationT, threadId: ThreadId, message: Message) {
    this.dataType = "message";
    this.operation = operation;
    this.context = threadId;
    this.data = message;
  }
}

export class WsTypingEvent implements WsEvent {
  operation: "add";
  dataType: "typing";
  context: ThreadId;
  data: UserId;

  static isInstance(evt: WsEvent) {
    return evt.dataType === "typing";
  }

  constructor(threadId: ThreadId, userId: UserId) {
    this.dataType = "typing";
    this.context = threadId;
    this.operation = "add";
    this.data = userId;
  }
}
