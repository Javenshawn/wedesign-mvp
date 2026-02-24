'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Clock, Check, CheckCheck } from 'lucide-react'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  read?: boolean
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: 'Hi there! 👋 I\'m your design assistant. How can I help you today?',
    sender: 'bot',
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    read: true
  },
  {
    id: 2,
    text: 'You can ask me about our design services, pricing, or process. I\'m here to help!',
    sender: 'bot',
    timestamp: new Date(Date.now() - 290000), // 4:50 ago
    read: true
  }
]

const quickReplies = [
  'Tell me about your design services',
  'What are your pricing plans?',
  'How long does a project take?',
  'Can I see some examples?',
  'Do you offer revisions?'
]

const botResponses = [
  'We offer professional design services including logo design, branding, website design, and marketing materials. Our team has 10+ years of experience.',
  'We have three pricing plans: Basic ($299), Professional ($599), and Premium ($999). All plans include unlimited revisions and 100% money-back guarantee.',
  'Most projects are completed within 3-7 business days, depending on complexity. We provide a detailed timeline during the discovery phase.',
  'Absolutely! You can view our portfolio at wedesign.design/cases. We have over 200 successful projects across various industries.',
  'Yes! All our plans include unlimited revisions until you\'re 100% satisfied. We want to make sure you love the final design.',
  'Our design process includes 6 steps: Brief & Discovery, Strategy & Concept, Design & Creation, Review & Refine, Delivery & Launch, and Ongoing Support.',
  'We accept all major credit cards via Stripe. The payment is secure and you\'ll receive a receipt immediately after purchase.',
  'You\'ll receive all source files (AI, PSD, PDF, etc.) and export formats (PNG, JPG, SVG) based on your needs. Commercial usage rights are included.',
  'Yes! We offer a 100% money-back guarantee. If you\'re not satisfied with our work, we\'ll refund your payment, no questions asked.',
  'You can schedule a free consultation by emailing contact@wedesign.design or clicking the "Free Consultation" button on our website.'
]

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      read: true
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate bot response after delay
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]
      const botMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date(),
        read: true
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleQuickReply = (reply: string) => {
    setInputText(reply)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center"
        aria-label="Open chat"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden z-50 animate-fade-in">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold">Design Assistant</div>
                  <div className="text-sm text-blue-100">Online • Ready to help</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-neutral-50 h-[calc(100%-180px)]">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-none'
                        : 'bg-white border border-neutral-200 text-neutral-800 rounded-bl-none'
                    }`}
                  >
                    <div className="text-sm mb-1">{message.text}</div>
                    <div className={`text-xs flex items-center gap-1 ${
                      message.sender === 'user' ? 'text-blue-200' : 'text-neutral-500'
                    }`}>
                      <Clock className="h-3 w-3" />
                      {formatTime(message.timestamp)}
                      {message.sender === 'user' && (
                        <>
                          {message.read ? (
                            <CheckCheck className="h-3 w-3 ml-1" />
                          ) : (
                            <Check className="h-3 w-3 ml-1" />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-neutral-200 rounded-2xl rounded-bl-none p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-pulse delay-150"></div>
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-pulse delay-300"></div>
                      <span className="text-sm text-neutral-500 ml-2">Design Assistant is typing...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Replies */}
          <div className="p-4 border-t border-neutral-200 bg-white">
            <div className="mb-3">
              <div className="text-xs text-neutral-500 mb-2">Quick replies:</div>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs rounded-full transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="flex-1 px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}