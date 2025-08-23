import { useState, useEffect, useRef } from 'react';
import { FaRobot, FaMicrophone, FaPaperPlane, FaTimes } from 'react-icons/fa';
import type { Message } from '../types/type';
import styles from '../css/Chatbot.module.css'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('quanta_chat_history');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Initial bot message
      setMessages([{
        id: 1,
        text: "Hello! I'm QUANTA Assistant. How can I help you today?",
        sender: 'bot'
      }]);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('quanta_chat_history', JSON.stringify(messages));
  }, [messages]);

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
    
    // Emotional responses first
    const emotionalResponse = getEmotionalResponse(lowerMsg);
    if (emotionalResponse) return emotionalResponse;
    
    // Training Q&A from the PDF
    if (lowerMsg.includes('what is quanta') || lowerMsg.includes('about quanta')) {
      return "QUANTA builds AI systems with a 100x mindset—fast, precise, and useful. We focus on real problems and ship improvements relentlessly.";
    } else if (lowerMsg.includes('core values')) {
      return "Empathy, Focus, Impute, Extreme Ownership, Future Obsession, Sacrificial Dedication, 100x Mindset, Intelligent Unity, Uncompromised Integrity, Built for Earth & Beyond.";
    } else if (lowerMsg.includes('bill of company')) {
      return "Here's the page: [Link to current Bill of Company]. (Content unchanged.)";
    } else if (lowerMsg.includes('who leads') || lowerMsg.includes('leadership')) {
      return "Meet our leadership team here: [Link to Leadership].";
    } else if (lowerMsg.includes('online courses') || lowerMsg.includes('courses')) {
      return "No. We don't offer courses. If you want to build and research with us, see our Research & Innovation Program: [Link].";
    } else if (lowerMsg.includes('join') && lowerMsg.includes('research')) {
      return "Email research@quanta-ai.xyz with your profile and a short proposal, or apply on the program page: [Link].";
    } else if (lowerMsg.includes('internship') || lowerMsg.includes('apply for internship')) {
      return "Yes, but internships are limited and secondary to research priorities. See details here: [Link to Internship/Opportunities].";
    } else if (lowerMsg.includes('services')) {
      return "[Keep your existing list, minus Online Courses]. For research collaboration, visit the Research & Innovation page.";
    } else if (lowerMsg.includes('work so fast')) {
      return "We move fast, break, learn, and fix—while holding high standards. Speed first; perfection iterates.";
    } else if (lowerMsg.includes('partners') || lowerMsg.includes('contact')) {
      return "partnerships@quanta-ai.xyz or the Contact page: [Link].";
    } else if (lowerMsg.includes('press') || lowerMsg.includes('speaking')) {
      return "press@quanta-ai.xyz.";
    } else if (lowerMsg.includes('general') || lowerMsg.includes('inquiries')) {
      return "info@quanta-ai.xyz.";
    } else {
      return "Thanks for your message! Our team will get back to you soon.";
    }
  };

  const getEmotionalResponse = (message: string): string | null => {
    // Greetings
    if (message.match(/^(hi|hello|hey|greetings|yo|sup|what's up|good day)[!,. ]*$/)) {
      return "Hello! 👋 I'm QUANTA Assistant. How can I help you today?";
    }
    if (message.includes('good morning')) {
      return "Good morning! Wishing you a productive and joyful day ahead.";
    }
    if (message.includes('good afternoon')) {
      return "Good afternoon! Hope your day is going well.";
    }
    if (message.includes('good evening')) {
      return "Good evening! How can I help you tonight?";
    }
    if (message.includes('good night')) {
      return "Good night! Sleep well and dream big. See you soon!";
    }
    // Instructions/help
    if (message.includes('help') || message.includes('instruction') || message.includes('how to') || message.includes('guide')) {
      return "Here are some things you can ask me:\n\n- About QUANTA and our mission\n- Details about our services or products\n- How to apply for internships\n- Contact information\n- Or just say hi!";
    }
    // Emotional
    if (message.includes('thank you') || message.includes('thanks')) {
      return "You're welcome! 😊 If you have more questions, just ask.";
    }
    if (message.includes('love you')) {
      return "Aww, thank you! I'm here to help you anytime ❤️";
    }
    if (message.includes('how are you')) {
      return "I'm just code, but I'm always happy to help you! How are you?";
    }
    if (message.includes('goodbye') || message.includes('bye')) {
      return "Goodbye! Have a wonderful day. If you need anything, I'm always here!";
    }
    return null;
  };

  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

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