import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, MessageCircle, Smartphone } from 'lucide-react';
import { chatAPI, contactAPI } from '../api';
import ChatMessage from './ChatMessage';
import CellPhoneCard from './CellPhoneCard';
import ContactForm from './ContactForm';
import { CellPhone, ContactInfo } from '../types';

interface ChatInterfaceProps {
  userId: number;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ userId }) => {
  const [messages, setMessages] = useState<Array<{
    id: string;
    message: string;
    isUser: boolean;
    timestamp: string;
    recommendations?: CellPhone[];
  }>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState<CellPhone | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // Add user message to chat
    const userMessageObj = {
      id: Date.now().toString(),
      message: userMessage,
      isUser: true,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMessageObj]);

    try {
      // Send message to backend
      const response = await chatAPI.sendMessage({
        user_id: userId,
        message: userMessage,
      });

      // Add bot response to chat
      const botMessageObj = {
        id: (Date.now() + 1).toString(),
        message: response.response,
        isUser: false,
        timestamp: new Date().toISOString(),
        recommendations: response.recommendations,
      };
      setMessages(prev => [...prev, botMessageObj]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      const errorMessageObj = {
        id: (Date.now() + 1).toString(),
        message: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessageObj]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCellPhoneSelect = (cellphone: CellPhone) => {
    setSelectedPhone(cellphone);
    setShowContactForm(true);
  };

  const handleContactFormSubmit = async (contactInfo: ContactInfo) => {
    if (!selectedPhone) return;

    try {
      // Submit contact info to backend
      const contactData = {
        ...contactInfo,
        cellphone_id: selectedPhone.id,
        user_id: userId
      };
      
      await contactAPI.submitContactInfo(contactData);

      // Add a message to the chat showing the contact form was submitted
      const contactMessage = `I've submitted my contact information for the ${selectedPhone.brand} ${selectedPhone.model}. My details: ${contactInfo.name}, ${contactInfo.email}, ${contactInfo.phone}`;
      
      const userMessageObj = {
        id: Date.now().toString(),
        message: contactMessage,
        isUser: true,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, userMessageObj]);

      // Add bot confirmation message
      const botMessageObj = {
        id: (Date.now() + 1).toString(),
        message: `Perfect! Thank you ${contactInfo.name} for your interest in the ${selectedPhone.brand} ${selectedPhone.model}. We've received your contact information and will call you at ${contactInfo.phone} within 24 hours to confirm your purchase and arrange delivery or pickup. You'll also receive a confirmation email at ${contactInfo.email}.`,
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, botMessageObj]);

    } catch (error) {
      console.error('Error submitting contact form:', error);
      // Add error message to chat
      const errorMessageObj = {
        id: Date.now().toString(),
        message: 'Sorry, there was an error submitting your contact information. Please try again.',
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessageObj]);
    } finally {
      // Reset the form state
      setShowContactForm(false);
      setSelectedPhone(null);
    }
  };

  const handleContactFormCancel = () => {
    setShowContactForm(false);
    setSelectedPhone(null);
  };

  // If contact form is showing, display it instead of the chat
  if (showContactForm && selectedPhone) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
          <div className="flex items-center space-x-2">
            <Smartphone className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">Please provide your details so we can contact you about your selected phone</p>
        </div>

        {/* Contact Form */}
        <div className="flex-1 overflow-y-auto p-4">
          <ContactForm
            selectedPhone={selectedPhone}
            onSubmit={handleContactFormSubmit}
            onCancel={handleContactFormCancel}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="flex items-center space-x-2">
          <Smartphone className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">CellPhone Assistant</h2>
        </div>
        <p className="text-xs text-gray-500 mt-1">Ask me about cellphones and I'll help you find the perfect one!</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <MessageCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm">Start a conversation to get cellphone recommendations!</p>
          </div>
        )}
        
        {messages.map((msg) => (
          <div key={msg.id}>
            <ChatMessage
              message={msg.message}
              isUser={msg.isUser}
              timestamp={msg.timestamp}
            />
            
            {/* Show recommendations if available */}
            {msg.recommendations && msg.recommendations.length > 0 && (
              <div className="mt-3 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Smartphone className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-medium text-gray-700">Recommended Phones:</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {msg.recommendations.map((cellphone) => (
                    <CellPhoneCard
                      key={cellphone.id}
                      cellphone={cellphone}
                      onSelect={handleCellPhoneSelect}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start mb-3">
            <div className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 shadow-sm">
              <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
              <span className="text-xs text-gray-600">Assistant is typing...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-3">
        <div className="flex space-x-3">
          <div className="flex-1">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about cellphones, budget, or preferences..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
              rows={1}
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-1"
          >
            <Send className="w-4 h-4" />
            <span className="text-sm">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface; 