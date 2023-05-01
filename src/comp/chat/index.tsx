import { ChatCompletionRequestMessage } from "openai";
import ChatDisplay from "./display";

export interface ChatMessage{
    message: ChatCompletionRequestMessage,
    timestamp: Date,
    index: number
}

export { ChatDisplay }