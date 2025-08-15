import { useState, useEffect, useRef } from 'react';
import { FaRobot, FaMicrophone, FaPaperPlane, FaTimes } from 'react-icons/fa';
// import { Message } from '../types';
import type { Message } from '../types/type';
import styles from '../css/Chatbot.module.css'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChatbot = (): void => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (): void => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: getBotResponse(inputValue),
        sender: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotResponse = (message: string): string => {
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
      return "Hello! How can I help you today?";
    } else if (lowerMsg.includes('product') || lowerMsg.includes('service')) {
      return "We offer various AI-powered products and services. You can explore them in our Products and Services sections.";
    } else if (lowerMsg.includes('internship') || lowerMsg.includes('job')) {
      return "We have an exciting internship program. You can apply through the link in our Internship section.";
    } else {
      return "Thanks for your message! Our team will get back to you soon.";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    // Initial bot message
    setMessages([{
      id: 1,
      text: "Hello! I'm QUANTA Assistant. How can I help you today?",
      sender: 'bot'
    }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <>
      <div className={`${styles.chatbotWidget} ${isOpen ? styles.active : ''}`}>
        <div className={styles.chatbotHeader}>
          <span className={styles.chatbotHeaderIcon}>🤖</span>
          <span>QUANTA <span style={{fontWeight:400}}>Assistant</span></span>
          <button 
            className={styles.chatbotClose} 
            onClick={toggleChatbot}
            aria-label="Close chatbot"
          >
            <FaTimes />
          </button>
        </div>
        <div className={styles.chatbotMessages}>
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`${styles.chatbotMessage} ${
                message.sender === 'bot' ? styles.botMessage : styles.userMessage
              }`}
            >
              {message.text}
            </div>
          ))}
          {isTyping && (
            <div className={styles.typingIndicator}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className={styles.chatbotInput}>
          <input 
            type="text" 
            placeholder="Type your message..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            aria-label="Chat input"
          />
          <button 
            type="button" 
            aria-label="Speak"
            className={styles.chatbotMic}
          >
            <FaMicrophone />
          </button>
          <button 
            onClick={handleSendMessage}
            aria-label="Send message"
            className={styles.chatbotSend}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
      <button 
        className={styles.chatbotToggle} 
        onClick={toggleChatbot}
        aria-label="Open chatbot"
      >
        <FaRobot />
      </button>
    </>
  );
};

export default Chatbot;