import { Injectable } from "@angular/core";
import { ChatBotClient, ChatBotClientConfig, ChatBotAgentQnA, ChatBotAgentCategory } from 'innobot-chat-api';

@Injectable()
export class FAQService {
 
    constructor() {


    }

    public config(): ChatBotClientConfig {

        const config = new ChatBotClientConfig();
        config.innobotUri = "http://dev.app.innobot.internal.epeinnovations.com";

        return config;

    }

    public getChatBotInstance(): ChatBotClient  {

        const chatbot = new ChatBotClient(this.config());
        return chatbot;
    
    }
    
    public getChatBotAgentQnAInstance() : ChatBotAgentQnA {
    
        const chatbotAgentQnA = new ChatBotAgentQnA(this.config());
        return chatbotAgentQnA;
    
    }
    
    public getChatBotAgentCategory() : ChatBotAgentCategory {
    
        const chatbot = new ChatBotAgentCategory(this.config());
        return chatbot;
    
    }

}



