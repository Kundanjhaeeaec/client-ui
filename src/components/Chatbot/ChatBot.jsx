import React, { useState, useEffect } from 'react';
import Chatbot from 'react-chatbot-kit';
import { MessageCircle, X, Minus, Square } from 'lucide-react';
import config from './config.jsx';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import './ChatBot.css';

const ChatBotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeChatbot = () => {
    setIsMinimized(!isMinimized);
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      // Try multiple selectors to find the message container
      const selectors = [
        '.react-chatbot-kit-chat-message-container',
        '.react-chatbot-kit-chat-container',
        '.chatbot-body .react-chatbot-kit-chatbot-container'
      ];
      
      for (const selector of selectors) {
        const chatContainer = document.querySelector(selector);
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
          console.log(`Scrolled using selector: ${selector}`);
          break;
        }
      }
    }, 200);
  };

  const saveMessages = (messages, HTMLString) => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
    setMessages(messages);
    // Simple scroll after saving messages
    scrollToBottom();
  };

  const loadMessages = () => {
    const messages = localStorage.getItem('chat_messages');
    return messages ? JSON.parse(messages) : [];
  };

  // Auto scroll when messages change
  useEffect(() => {
    if (isOpen && !isMinimized && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  // Auto scroll when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        scrollToBottom();
        // Force scroll container styles
        const messageContainer = document.querySelector('.react-chatbot-kit-chat-message-container');
        if (messageContainer) {
          messageContainer.style.height = '350px';
          messageContainer.style.overflowY = 'scroll';
          messageContainer.style.overflowX = 'hidden';
          messageContainer.style.maxHeight = '350px';
          console.log('Applied direct styles to message container');
        }
      }, 300);
    }
  }, [isOpen, isMinimized]);

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="chatbot-trigger" onClick={toggleChatbot}>
          <MessageCircle size={24} />
          <div className="chatbot-trigger-pulse"></div>
          <div className="chatbot-trigger-tooltip">
            Need help? Chat with our AI assistant! 🤖
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`chatbot-container ${isMinimized ? 'minimized' : ''}`}>
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">🤖</div>
              <div className="chatbot-header-text">
                <h4>Intellivia Assistant</h4>
                <span className="online-status">🟢 Online</span>
              </div>
            </div>
            <div className="chatbot-controls">
              <button onClick={minimizeChatbot} className="control-btn" title="Minimize">
                {isMinimized ? '□' : '−'}
              </button>
              <button onClick={toggleChatbot} className="control-btn" title="Close">
                ✕
              </button>
            </div>
          </div>
          
          {!isMinimized && (
            <div className="chatbot-body">
              <style>
                {`
                  .react-chatbot-kit-chat-message-container {
                    height: 350px !important;
                    max-height: 350px !important;
                    overflow-y: scroll !important;
                    overflow-x: hidden !important;
                    display: block !important;
                    padding-bottom: 100px !important;
                    padding-right: 8px !important;
                    background: linear-gradient(to bottom, #f0fdf4 0%, #ecfdf5 100%) !important;
                    scrollbar-gutter: stable !important;
                  }
                  .react-chatbot-kit-chat-input-container {
                    position: absolute !important;
                    bottom: 0 !important;
                    left: 0 !important;
                    right: 0 !important;
                    background: linear-gradient(to top, #ffffff 0%, #f9fafb 100%) !important;
                    box-shadow: 0 -4px 20px rgba(0,0,0,0.08) !important;
                    border-radius: 0 0 16px 16px !important;
                  }
                  .react-chatbot-kit-chat-message-container::-webkit-scrollbar {
                    width: 12px !important;
                    display: block !important;
                  }
                  .react-chatbot-kit-chat-message-container::-webkit-scrollbar-track {
                    background: rgba(220, 252, 231, 0.8) !important;
                    border-radius: 6px !important;
                    margin: 8px 2px !important;
                    border: 1px solid rgba(16, 185, 129, 0.1) !important;
                  }
                  .react-chatbot-kit-chat-message-container::-webkit-scrollbar-thumb {
                    background: linear-gradient(135deg, #10b981, #059669) !important;
                    border-radius: 6px !important;
                    border: 2px solid rgba(255, 255, 255, 0.8) !important;
                    min-height: 30px !important;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
                  }
                  .react-chatbot-kit-chat-message-container::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(135deg, #059669, #047857) !important;
                    border: 2px solid rgba(255, 255, 255, 1) !important;
                    transform: scaleX(1.1) !important;
                    box-shadow: 0 3px 8px rgba(16, 185, 129, 0.3) !important;
                  }
                `}
              </style>
              <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
                saveMessages={saveMessages}
                messageHistory={loadMessages()}
                headerText=""
                placeholderText="Type your message here..."
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBotComponent;
