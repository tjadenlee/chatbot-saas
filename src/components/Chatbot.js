"use client";

import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi! I'm an AI assistant here to help you learn about our lead capture chatbot service. I can answer questions about pricing, features, and help you get started. What would you like to know?", 
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickActions = [
  'What makes your chatbots different?',
  'Show me pricing and ROI',
  'Schedule a demo',
  'How quickly can I get started?'
];

  const handleQuickAction = async (action) => {
    addMessage(action, 'user');
    await getAIResponse(action);
  };

  const addMessage = (text, sender) => {
    const newMessage = {
      id: Date.now() + Math.random(),
      text,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getAIResponse = async (message) => {
    setIsTyping(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: message,
          businessInfo: {} // Can be expanded later
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      setIsTyping(false);
      addMessage(data.response, 'bot');
    } catch (error) {
      setIsTyping(false);
      addMessage('Sorry, I encountered an error. Please try again.', 'bot');
      console.error('Error:', error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = input;
    addMessage(userMessage, 'user');
    setInput('');
    
    await getAIResponse(userMessage);
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
            <p className="text-xs text-blue-100">Powered by OpenAI</p>
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
            disabled={!input.trim() || isTyping}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}