"use client";

import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi! I'm here to help you with scheduling appointments, pricing information, and answering any questions. How can I assist you today?", 
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickActions = [
    'Schedule Appointment',
    'View Pricing',
    'Customer Support',
    'Learn More'
  ];

  const handleQuickAction = (action) => {
    addMessage(action, 'user');
    
    setTimeout(() => {
      let response = '';
      switch(action) {
        case 'Schedule Appointment':
          response = "Great! I'd love to help you schedule an appointment. What's the best email to reach you at?";
          break;
        case 'View Pricing':
          response = "Here are our pricing plans:\n\n💼 Starter: $49/month\n- 1 chatbot\n- 1,000 conversations\n- Basic analytics\n\n🚀 Professional: $149/month\n- 5 chatbots\n- 10,000 conversations\n- Advanced analytics\n\n⭐ Enterprise: $399/month\n- Unlimited chatbots\n- 100,000 conversations\n- White-label option\n\nWhich plan interests you most?";
          break;
        case 'Customer Support':
          response = "I'm here to help! What specific question can I answer for you today?";
          break;
        case 'Learn More':
          response = "Our AI chatbot helps businesses capture leads 24/7. It can schedule appointments, answer questions, and integrate with your existing tools. Would you like to see a demo?";
          break;
        default:
          response = "How can I help you today?";
      }
      addMessage(response, 'bot');
    }, 1000);
  };

  const addMessage = (text, sender) => {
    const newMessage = {
      id: Date.now(),
      text,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    
    addMessage(input, 'user');
    const currentInput = input;
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      const lowerInput = currentInput.toLowerCase();
      let response = '';
      
      if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('pricing')) {
        response = "I'd be happy to share our pricing! We have three main plans starting at $49/month. Would you like me to break down what's included in each plan?";
      } else if (lowerInput.includes('schedule') || lowerInput.includes('appointment') || lowerInput.includes('meeting')) {
        response = "Perfect! I can help you schedule an appointment. What's your preferred date and time? Also, what's the best email to send confirmation details?";
      } else if (lowerInput.includes('demo') || lowerInput.includes('try')) {
        response = "Great! You're actually using a demo right now. This chatbot can be customized for any business. Would you like to schedule a call to discuss how this could work for your company?";
      } else {
        response = `I understand you're asking about "${currentInput}". I'm here to help with appointments, pricing, and general questions. Is there something specific I can assist you with?`;
      }
      
      addMessage(response, 'bot');
    }, 1500);
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-lg">AI Assistant</h3>
            <p className="text-xs text-blue-100">Always here to help</p>
          </div>
          <div className="ml-auto">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="flex items-end gap-2 max-w-xs">
              {message.sender === 'bot' && (
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot size={12} className="text-white" />
                </div>
              )}
              <div className={`px-4 py-3 rounded-2xl ${
                message.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-sm' 
                  : 'bg-white text-gray-800 shadow-sm border rounded-bl-sm'
              }`}>
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
              {message.sender === 'user' && (
                <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <User size={12} className="text-white" />
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-end gap-2 max-w-xs">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot size={12} className="text-white" />
              </div>
              <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-2 bg-white border-t border-gray-100">
        <div className="flex gap-2 overflow-x-auto">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action)}
              className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs whitespace-nowrap hover:bg-blue-100 transition-colors"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}