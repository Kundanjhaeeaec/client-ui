import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';

const config = {
  initialMessages: [
    createChatBotMessage(
      "👋 Hi there! I'm Intellivia Assistant. I'm here to help you find the perfect course and get you started on your tech journey. What would you like to know about our courses?",
      {
        withAvatar: true,
        delay: 500,
      }
    ),
  ],
  botName: "Intellivia Assistant",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#10b981",
    },
    chatButton: {
      backgroundColor: "#10b981",
    },
    chatContainer: {
      height: "100%",
      overflow: "hidden"
    },
    messageContainer: {
      height: "350px",
      overflowY: "scroll",
      overflowX: "hidden",
      display: "block"
    }
  },
  customComponents: {
    header: () => (
      <div
        style={{
          backgroundColor: "#10b981",
          padding: "5px",
          borderRadius: "3px",
          color: "white",
          fontWeight: "bold",
          fontSize: "14px",
          textAlign: "center",
        }}
      >
        Intellivia Assistant 🤖
      </div>
    ),
  },
  actionProvider: ActionProvider,
  messageParser: MessageParser,
  state: {
    userInfo: {
      name: '',
      email: '',
      phone: '',
      course: '',
      experience: '',
      goal: '',
      currentStep: 'greeting'
    },
    conversationStage: 'greeting',
    formSubmitted: false,
    collectingUserInfo: false
  },
};

export default config;
