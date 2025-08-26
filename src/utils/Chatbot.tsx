import { useState, useEffect, useRef } from 'react';
import { FaRobot, FaMicrophone, FaPaperPlane, FaTimes } from 'react-icons/fa';
import type { Message } from '../types/type';
// import styles from './Chatbot.module.css';
import styles from '../css/Chatbot.module.css'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages from localStorage on component mount with guards
  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem('quanta_chat_history');
      if (savedMessages) {
        const parsed = JSON.parse(savedMessages);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      }
    } catch (_) {
      // If JSON parse fails, fall back to initial message
    }
    setMessages([{
      id: 1,
      text: "Welcome! 🌤 How can I assist you on your journey with QUANTA?",
      sender: 'bot',
      isOptions: true
    }]);
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('quanta_chat_history', JSON.stringify(messages));
  }, [messages]);

  const toggleChatbot = (): void => {
    setIsOpen(!isOpen);
  };

  const resetConversation = (): void => {
    const initial = [{
      id: Date.now(),
      text: "Welcome! 🌤 How can I assist you on your journey with QUANTA?",
      sender: 'bot',
      isOptions: true
    } as Message];
    setMessages(initial);
    try {
      localStorage.setItem('quanta_chat_history', JSON.stringify(initial));
    } catch (_) {}
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
    
    // Specific responses based on user query
    if (lowerMsg.includes('about quanta') || lowerMsg.includes('what is quanta')) {
      return "QUANTA is a pioneering AI technology company dedicated to advancing productivity, learning, and automation. We're committed to leading humanity into the next era of intelligence.";
    } else if (lowerMsg.includes('ai products') || lowerMsg.includes('products')) {
      return "Our AI products include intelligent assistants, automation tools, vision systems, and custom AI solutions tailored to business needs.";
    } else if (lowerMsg.includes('team') || lowerMsg.includes('careers')) {
      return "Our team consists of world-class professionals passionate about advancing technology. Visit our Careers page to learn about opportunities.";
    } else if (lowerMsg.includes('internship')) {
      return "We offer internship programs for students passionate about AI and technology. Apply through our Careers page to gain hands-on experience.";
    } else if (lowerMsg.includes('contact') || lowerMsg.includes('demo')) {
      return "You can contact us at contact@quanta.example or call +250 79 44 12 876. We're happy to schedule a demo of our solutions.";
    } else if (lowerMsg.includes('client') || lowerMsg.includes('stories')) {
      return "Our clients have achieved remarkable results with our AI solutions. 'QUANTA transformed our workflow efficiency by 40%' - Happy Client";
    } else if (lowerMsg.includes('partnership')) {
      return "We welcome partnerships with organizations that share our vision. Email partnerships@quanta.example to explore collaboration opportunities.";
    } else if (lowerMsg.includes('get started')) {
      return "To get started with QUANTA, contact our team for a consultation. We'll guide you through the implementation process step by step.";
    } else if (lowerMsg.includes('course')) {
      return "We offer training programs in AI, web development, and related fields. Check our Courses section for available programs.";
    } else if (lowerMsg.includes('why choose') || lowerMsg.includes('why us')) {
      return "We offer innovative solutions, expert team support, ethical AI development, and proven results. Our clients choose us for quality and reliability.";
    } else if (lowerMsg.includes('privacy') || lowerMsg.includes('security')) {
      return "We take data privacy and security seriously. We're fully compliant with GDPR and industry best practices to protect your information.";
    } else {
      return "I'd be happy to help you with that! Could you please provide more details about what you're looking for?";
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

  const renderOptionsPanel = () => {
    const optionGroups = [
      {
        title: "About QUANTA",
        options: [
          { icon: '🏢', label: 'About QUANTA' },
          { icon: '🤖', label: 'AI Products' },
          { icon: '🧑‍💼', label: 'Team & Careers' },
          { icon: '🎓', label: 'Internships' },
          { icon: '📞', label: 'Contact & Demo' }
        ]
      },
      {
        title: "Client Stories",
        options: [
          { icon: '⭐', label: 'Client Stories' },
          { icon: '🤝', label: 'Partnerships' },
          { icon: '🚀', label: 'Get Started' },
          { icon: '📚', label: 'Courses' },
          { icon: '💡', label: 'Why Choose Us?' }
        ]
      },
      {
        title: "Privacy & Security",
        options: [
          { icon: '🔒', label: 'Privacy & Security' }
        ]
      }
    ];

    return (
      <div className={styles.chatbotOptionsPanel}>
        <div className={styles.optionsHeader}>
          <span>✨ Explore QUANTA:</span>
        </div>
        
        <div className={styles.optionsColumns}>
          {optionGroups.map((group, groupIndex) => (
            <div key={groupIndex} className={styles.optionColumn}>
              <h4 className={styles.columnTitle}>{group.title}</h4>
              <div className={styles.columnOptions}>
                {group.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    className={styles.optionButton}
                    onClick={() => handleSendOption(option.label)}
                  >
                    <span className={styles.optionIcon}>{option.icon}</span>
                    <span className={styles.optionLabel}>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleSendOption = (option: string) => {
    const userMessage: Message = {
      id: Date.now(),
      text: option,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: getBotResponse(option),
        sender: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
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
          <div>
            <button
              className={styles.chatbotReset}
              onClick={resetConversation}
              aria-label="Reset conversation"
            >
              Reset
            </button>
          <button 
            className={styles.chatbotClose} 
            onClick={toggleChatbot}
            aria-label="Close chatbot"
          >
            <FaTimes />
          </button>
          </div>
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
              {message.isOptions && renderOptionsPanel()}
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