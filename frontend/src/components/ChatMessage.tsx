import React from 'react';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, timestamp }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`flex max-w-xs lg:max-w-md ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
          isUser ? 'ml-2 bg-blue-500' : 'mr-2 bg-gray-500'
        }`}>
          {isUser ? (
            <User className="w-3 h-3 text-white" />
          ) : (
            <Bot className="w-3 h-3 text-white" />
          )}
        </div>

        {/* Message Bubble */}
        <div className={`rounded-lg px-3 py-2 ${
          isUser 
            ? 'bg-blue-500 text-white rounded-br-none' 
            : 'bg-white text-gray-900 rounded-bl-none shadow-sm'
        }`}>
          <p className="text-xs whitespace-pre-wrap leading-relaxed">{message}</p>
          {timestamp && (
            <p className={`text-xs mt-1 ${
              isUser ? 'text-blue-100' : 'text-gray-400'
            }`}>
              {new Date(timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage; 