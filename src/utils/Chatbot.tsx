import { useState, useEffect, useRef } from 'react';
import { FaRobot, FaMicrophone, FaPaperPlane, FaTimes } from 'react-icons/fa';
import type { Message } from '../types/type';
import styles from '../css/Chatbot.module.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    } catch (_) {}
    setMessages([
      {
        id: 1,
        text: 'Welcome! 🌤 How can I assist you on your journey with QUANTA?',
        sender: 'bot',
        isOptions: true,
      },
    ]);
  }, []);

  useEffect(() => {
    localStorage.setItem('quanta_chat_history', JSON.stringify(messages));
  }, [messages]);

  const toggleChatbot = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    console.log('button clicked');
    setIsOpen(!isOpen);
  };

  const resetConversation = (): void => {
    const initial: Message[] = [
      {
        id: Date.now(),
        text: 'Welcome! 🌤 How can I assist you on your journey with QUANTA?',
        sender: 'bot',
        isOptions: true,
      },
    ];
    setMessages(initial);
    try {
      localStorage.setItem('quanta_chat_history', JSON.stringify(initial));
    } catch (_) {}
  };

  // Enhanced keyword matching function with adjustable weights
  const findBestMatch = (message: string): string | null => {
    const lowerMsg = message.toLowerCase();
    const words = lowerMsg.split(/\s+/);
    let bestMatch = null;
    let highestScore = 0;

    for (const mapping of keywordMappings) {
      let score = 0;

      for (const kw of mapping.keywords) {
        if (kw.term.includes(' ')) {
          // Phrase match
          if (lowerMsg.includes(kw.term)) {
            score += kw.weight;
          }
        } else {
          // Single word match
          if (words.includes(kw.term)) {
            score += kw.weight;
          }
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = mapping.response;
      }
    }

    return highestScore > 0 ? bestMatch : null;
  };

  // Define keyword mappings with weighted keywords and phrases
  const keywordMappings: {
    keywords: { term: string; weight: number }[];
    response: string;
  }[] = [
    // About QUANTA (higher weight on core terms like 'quanta')
    {
      keywords: [
        { term: 'about', weight: 1 },
        { term: 'quanta', weight: 3 },
        { term: 'what', weight: 1 },
        { term: 'company', weight: 2 },
        { term: 'mission', weight: 2 },
        { term: 'vision', weight: 2 },
        { term: 'about quanta', weight: 4 },
        { term: 'what is quanta', weight: 4 },
      ],
      response:
        "QUANTA is a pioneering AI technology company dedicated to advancing productivity, learning, and automation. We're committed to leading humanity into the next era of intelligence.",
    },
    // Products (higher weight on 'products' and phrases)
    {
      keywords: [
        { term: 'products', weight: 3 },
        { term: 'ai product', weight: 3 },
        { term: 'offerings', weight: 2 },
        { term: 'solutions', weight: 2 },
        { term: 'what do you sell', weight: 4 },
        { term: 'offer', weight: 1 },
        { term: 'tools', weight: 1 },
        { term: 'systems', weight: 1 },
        { term: 'ai products', weight: 4 },
      ],
      response:
        'Our AI products include intelligent assistants, automation tools, vision systems, and custom AI solutions tailored to business needs.',
    },
    // Team & Leadership (higher weight on names and 'leadership')
    {
      keywords: [
        { term: 'team', weight: 2 },
        { term: 'careers', weight: 2 },
        { term: 'leadership', weight: 3 },
        { term: 'enock', weight: 3 },
        { term: 'ornella', weight: 3 },
        { term: 'lewis', weight: 3 },
        { term: 'victoire', weight: 3 },
        { term: 'employees', weight: 1 },
        { term: 'staff', weight: 1 },
        { term: 'who', weight: 1 },
        { term: 'people', weight: 1 },
        { term: 'leadership team', weight: 4 },
      ],
      response:
        "At QUANTA, leadership means empathy for users, extreme ownership of outcomes, and a 100x mindset for speed, quality, and impact. Our leadership team includes Enock Kanamugire (Founder & CEO), Ornella (Chief Growth Officer), Lewis Ndatimana (Head of Business Development), and Victoire Ushindi (Lead Software Engineer). Visit our Leadership page under About to learn more.",
    },
    // Internships (higher weight on 'internship')
    {
      keywords: [
        { term: 'internship', weight: 3 },
        { term: 'intern', weight: 3 },
        { term: 'student program', weight: 2 },
        { term: 'training', weight: 2 },
        { term: 'learn', weight: 1 },
        { term: 'practice', weight: 1 },
        { term: 'internship program', weight: 4 },
      ],
      response:
        'We offer internship programs for students passionate about AI and technology. Apply through our Careers page to gain hands-on experience.',
    },
    // Contact (higher weight on 'contact' and phrases)
    {
      keywords: [
        { term: 'contact', weight: 3 },
        { term: 'demo', weight: 2 },
        { term: 'email', weight: 2 },
        { term: 'phone', weight: 2 },
        { term: 'call', weight: 1 },
        { term: 'reach', weight: 1 },
        { term: 'get in touch', weight: 4 },
        { term: 'address', weight: 1 },
        { term: 'location', weight: 1 },
        { term: 'contact us', weight: 4 },
      ],
      response:
        "You can contact us at contact@quanta.example or call +250 79 44 12 876. We're happy to schedule a demo of our solutions.",
    },
    // Client Stories (higher weight on 'client' and 'stories')
    {
      keywords: [
        { term: 'client', weight: 3 },
        { term: 'stories', weight: 3 },
        { term: 'testimonial', weight: 2 },
        { term: 'results', weight: 1 },
        { term: 'success', weight: 2 },
        { term: 'case study', weight: 2 },
        { term: 'achievement', weight: 1 },
        { term: 'client stories', weight: 4 },
        { term: 'success stories', weight: 4 },
      ],
      response:
        "Our clients have achieved remarkable results with our AI solutions. 'QUANTA transformed our workflow efficiency by 40%' - Happy Client",
    },
    // Partnerships (higher weight on 'partnership')
    {
      keywords: [
        { term: 'partnership', weight: 3 },
        { term: 'collaboration', weight: 2 },
        { term: 'partner', weight: 2 },
        { term: 'work together', weight: 4 },
        { term: 'joint', weight: 1 },
        { term: 'affiliate', weight: 1 },
      ],
      response:
        'We welcome partnerships with organizations that share our vision. Email partnerships@quanta.example to explore collaboration opportunities.',
    },
    // Getting Started (higher weight on 'get started')
    {
      keywords: [
        { term: 'get started', weight: 4 },
        { term: 'start', weight: 2 },
        { term: 'how to begin', weight: 3 },
        { term: 'onboard', weight: 2 },
        { term: 'implementation', weight: 2 },
        { term: 'process', weight: 1 },
        { term: 'getting started', weight: 4 },
      ],
      response:
        'To get started with QUANTA, contact our team for a consultation. We\'ll guide you through the implementation process step by step.',
    },
    // Research & Innovation (higher weight on 'research' and 'innovation')
    {
      keywords: [
        { term: 'research', weight: 3 },
        { term: 'innovation', weight: 3 },
        { term: 'program', weight: 1 },
        { term: 'invent', weight: 2 },
        { term: 'develop', weight: 1 },
        { term: 'prototype', weight: 2 },
        { term: 'r&d', weight: 2 },
        { term: 'research program', weight: 4 },
        { term: 'innovation program', weight: 4 },
      ],
      response:
        "Invent the future with us! Our Research & Innovation Program is QUANTA's engine, prototyping and validating AI systems for human and planetary needs. Focus areas include Advanced NLP, Human–AI collaboration, reliable systems, and ethics by design. Join small, elite teams for rapid iteration and visible results. Apply at research@quanta-ai.xyz.",
    },
    // Services (higher weight on 'services')
    {
      keywords: [
        { term: 'services', weight: 3 },
        { term: 'what can you do', weight: 4 },
        { term: 'help with', weight: 2 },
        { term: 'provide', weight: 1 },
        { term: 'assist', weight: 1 },
        { term: 'support', weight: 1 },
      ],
      response:
        "Our services include intelligent assistants, automation tools, vision systems, and custom AI solutions. Looking to invent with us? See our Research & Innovation Program.",
    },
    // Why Choose Us (higher weight on 'why' phrases)
    {
      keywords: [
        { term: 'why choose', weight: 4 },
        { term: 'why us', weight: 4 },
        { term: 'why quanta', weight: 4 },
        { term: 'advantages', weight: 2 },
        { term: 'benefits', weight: 2 },
        { term: 'difference', weight: 1 },
        { term: 'edge', weight: 1 },
        { term: 'why choose us', weight: 5 },
      ],
      response:
        'We offer innovative solutions, expert team support, ethical AI development, and proven results. Our clients choose us for quality and reliability.',
    },
    // Privacy & Security (higher weight on 'privacy' and 'security')
    {
      keywords: [
        { term: 'privacy', weight: 3 },
        { term: 'security', weight: 3 },
        { term: 'data protection', weight: 2 },
        { term: 'gdpr', weight: 2 },
        { term: 'safe', weight: 1 },
        { term: 'secure', weight: 1 },
        { term: 'confidential', weight: 1 },
        { term: 'data privacy', weight: 4 },
      ],
      response:
        'We take data privacy and security seriously. We\'re fully compliant with GDPR and industry best practices to protect your information.',
    },
  ];

  const getBotResponse = (message: string): string => {
    const lowerMsg = message.toLowerCase();
    const emotionalResponse = getEmotionalResponse(lowerMsg);
    if (emotionalResponse) return emotionalResponse;

    const bestMatch = findBestMatch(lowerMsg);
    
    if (bestMatch) {
      return bestMatch;
    }

    return 'I\'d be happy to help you with that! Could you please provide more details about what you\'re looking for?';
  };

  const getEmotionalResponse = (message: string): string | null => {
    // Exact matches for greetings
    if (message.match(/^(hi|hello|hey|greetings|yo|sup|what's up|good day)[!,. ]*$/)) {
      return 'Hello! 👋 I\'m QUANTA Assistant. How can I help you today?';
    }
    
    // Time-based greetings
    if (message.match(/(good morning|morning)/)) {
      return 'Good morning! Wishing you a productive and joyful day ahead.';
    }
    if (message.match(/(good afternoon|afternoon)/)) {
      return 'Good afternoon! Hope your day is going well.';
    }
    if (message.match(/(good evening|evening)/)) {
      return 'Good evening! How can I help you tonight?';
    }
    if (message.match(/(good night|night|sleep)/)) {
      return 'Good night! Sleep well and dream big. See you soon!';
    }
    
    // Help requests
    if (message.match(/(^help$|instruction|how to|guide|what can you do)/)) {
      return 'Here are some things you can ask me:\n\n- About QUANTA and our mission\n- Details about our services or products\n- About our Leadership Team\n- How to join our Research & Innovation Program\n- Contact information\n- Or just say hi!';
    }
    
    // Thanks
    if (message.match(/(thank|thanks|appreciate|grateful)/)) {
      return 'You\'re welcome! 😊 If you have more questions, just ask.';
    }
    
    // Affection
    if (message.match(/(love you|like you|adore)/)) {
      return 'Aww, thank you! I\'m here to help you anytime ❤️';
    }
    
    // How are you
    if (message.match(/(how are you|how do you feel|how's it going)/)) {
      return 'I\'m just code, but I\'m always happy to help you! How are you?';
    }
    
    // Goodbye
    if (message.match(/(goodbye|bye|see you|farewell)/)) {
      return 'Goodbye! Have a wonderful day. If you need anything, I\'m always here!';
    }
    
    return null;
  };

  const handleSendMessage = (): void => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: getBotResponse(inputValue),
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSendOption = (option: string) => {
    const userMessage: Message = {
      id: Date.now(),
      text: option,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: getBotResponse(option),
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const renderOptionsPanel = () => {
    const optionGroups = [
      {
        title: 'About QUANTA',
        options: [
          { icon: '🏢', label: 'About QUANTA' },
          { icon: '🤖', label: 'AI Products' },
          { icon: '🧑‍💼', label: 'Leadership Team' },
          { icon: '🎓', label: 'Internships' },
          { icon: '📞', label: 'Contact & Demo' },
        ],
      },
      {
        title: 'Client Stories',
        options: [
          { icon: '⭐', label: 'Client Stories' },
          { icon: '🤝', label: 'Partnerships' },
          { icon: '🚀', label: 'Get Started' },
          { icon: '🔬', label: 'Research & Innovation' },
          { icon: '💡', label: 'Why Choose Us?' },
        ],
      },
      {
        title: 'Privacy & Security',
        options: [{ icon: '🔒', label: 'Privacy & Security' }],
      },
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <>
      <div className={`${styles.chatbotWidget} ${isOpen ? styles.active : ''}`}>
        <div className={styles.chatbotHeader}>
          <span className={styles.chatbotHeaderIcon}>🤖</span>
          <span>
            QUANTA <span style={{ fontWeight: 400 }}>Assistant</span>
          </span>
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
          {messages.map((message) => (
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
        aria-label="Toggle chatbot"
      >
        <FaRobot />
      </button>
    </>
  );
};

export default Chatbot;