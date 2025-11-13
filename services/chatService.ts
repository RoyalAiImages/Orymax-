import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

class ChatService {
  private ai: GoogleGenAI;
  private chat: Chat | null = null;

  constructor() {
    // Per guidelines, initialize with a named apiKey parameter from process.env.
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
  }

  private initializeChat() {
    if (!this.chat) {
      this.chat = this.ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: 'You are Orymax, a helpful and creative assistant.',
        },
      });
    }
  }

  public async sendMessage(
    message: string,
    onStream: (chunk: GenerateContentResponse) => void
  ): Promise<void> {
    this.initializeChat();
    
    if (!this.chat) {
        throw new Error("Chat not initialized");
    }

    try {
      const result = await this.chat.sendMessageStream({ message });
      for await (const chunk of result) {
        onStream(chunk);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Re-throw to be handled by the component
      throw error;
    }
  }
}

// Export a singleton instance of the service
export const chatService = new ChatService();