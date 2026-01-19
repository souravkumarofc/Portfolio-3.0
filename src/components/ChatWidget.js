import React, { useState, useRef, useEffect, useCallback } from 'react';

// Only log in development
const isDev = process.env.NODE_ENV === 'development';
const devLog = (...args) => { if (isDev) console.log(...args); };
const devError = (...args) => { if (isDev) console.error(...args); };

const ChatWidget = ({ isOpen, onClose, buttonPosition = { x: 0, y: 0 } }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm here to help you learn about Sourav Kumar's portfolio. What would you like to know?"
    }
  ]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const debounceTimerRef = useRef(null);
  const widgetRef = useRef(null);
  const recognitionRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const previousMessagesLengthRef = useRef(1); // Start with 1 for initial message
  const audioContextRef = useRef(null);
  const lastReplySoundTimeRef = useRef(0);
  const [transformOrigin, setTransformOrigin] = useState('center center');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Get or create shared AudioContext
  const getAudioContext = () => {
    if (!audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      } catch (error) {
        devLog('Audio not supported');
        return null;
      }
    }
    // Resume context if suspended (required by some browsers)
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  };

  // Play cute, smooth notification sound for chatbot replies
  const playReplySound = useCallback(() => {
    const now = Date.now();
    // Prevent overlapping sounds (minimum 200ms gap for replies)
    if (now - lastReplySoundTimeRef.current < 200) return;
    lastReplySoundTimeRef.current = now;

    try {
      const audioContext = getAudioContext();
      if (!audioContext) return;

      // Create a cute, pleasant single-tone notification (like a gentle bell)
      // Using a sweet, pleasant frequency
      const frequency = 880; // A5 - pleasant and not harsh
      const duration = 0.18;
      const baseTime = audioContext.currentTime;

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine'; // Smooth sine wave

      // Very smooth envelope: quick gentle rise, smooth fade out
      gainNode.gain.setValueAtTime(0, baseTime);
      gainNode.gain.linearRampToValueAtTime(0.1, baseTime + 0.02); // Gentle volume
      gainNode.gain.exponentialRampToValueAtTime(0.001, baseTime + duration); // Smooth fade out

      oscillator.start(baseTime);
      oscillator.stop(baseTime + duration);
    } catch (error) {
      devLog('Audio error:', error);
    }
  }, []); // Empty deps - function doesn't depend on any props/state

  // Play smooth close sound (gentle descending tone)
  const playCloseSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();

      // Resume if suspended
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Gentle descending tone
      oscillator.frequency.setValueAtTime(550, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.15);
      oscillator.type = 'sine';

      // Smooth envelope
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.15);
    } catch (error) {
      devLog('Audio not supported');
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Focus input when chat opens
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, messages]);

  // Play sound when new assistant message arrives
  useEffect(() => {
    if (isOpen && messages.length > previousMessagesLengthRef.current) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        // Small delay to sync with message appearance
        setTimeout(() => {
          playReplySound();
        }, 100);
      }
      previousMessagesLengthRef.current = messages.length;
    }
  }, [messages, isOpen, playReplySound]);

  const handleClose = () => {
    playCloseSound();
    onClose();
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setShowSuggestions(false);
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // QUOTA SAFETY: Debounce API calls (500-800ms)
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(async () => {
      try {
        // FIRST: Try local data (works offline, no server needed)
        const localAnswer = getLocalAnswer(userMessage);
        if (localAnswer) {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: localAnswer
          }]);
          setIsLoading(false);
          return;
        }

        // SECOND: Try server API (for unique questions or Gemini)
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/ask';

        let response;
        try {
          // Create timeout controller
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

          response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: userMessage }),
            signal: controller.signal
          });

          clearTimeout(timeoutId);
        } catch (fetchError) {
          // Network error - try local data as fallback
          const fallbackAnswer = getLocalAnswer(userMessage);
          if (fallbackAnswer) {
            setMessages(prev => [...prev, {
              role: 'assistant',
              content: fallbackAnswer
            }]);
          } else {
            // If no local match, provide helpful response
            setMessages(prev => [...prev, {
              role: 'assistant',
              content: "I can help you learn about Sourav Kumar's portfolio! You can ask me about:\n- Skills and technologies\n- Projects\n- Work experience\n- Education\n- Resume download\n\nWhat would you like to know?"
            }]);
          }
          setIsLoading(false);
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          // Handle quota exceeded or other errors gracefully
          if (data.fallback) {
            setMessages(prev => [...prev, {
              role: 'assistant',
              content: data.fallback
            }]);
          } else if (data.response) {
            // Sometimes error responses still have a response field
            setMessages(prev => [...prev, {
              role: 'assistant',
              content: data.response
            }]);
          } else {
            // Try local data as fallback
            const fallbackAnswer = getLocalAnswer(userMessage);
            if (fallbackAnswer) {
              setMessages(prev => [...prev, {
                role: 'assistant',
                content: fallbackAnswer
              }]);
            } else {
              throw new Error(data.error || 'Failed to get response');
            }
          }
        } else {
          // Success - add response (works for both local and Gemini responses)
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: data.response
          }]);
        }
      } catch (error) {
        devError('Chat error:', error);
        // Try local data as final fallback
        const fallbackAnswer = getLocalAnswer(userMessage);
        if (fallbackAnswer) {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: fallbackAnswer
          }]);
        } else {
          // If no local match, provide helpful response
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: "I can help you learn about Sourav Kumar's portfolio! You can ask me about:\n- Skills and technologies\n- Projects\n- Work experience\n- Education\n- Resume download\n\nWhat would you like to know?"
          }]);
        }
      } finally {
        setIsLoading(false);
      }
    }, 600); // 600ms debounce (between 500-800ms as requested)
  };

  // Cleanup debounce timer and recognition on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors when stopping
        }
        recognitionRef.current = null;
      }
    };
  }, []);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  // Helper function to strip markdown formatting
  const stripMarkdown = (text) => {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold **text**
      .replace(/\*(.*?)\*/g, '$1')     // Remove italic *text*
      .replace(/`(.*?)`/g, '$1')       // Remove code `text`
      .trim();
  };

  // Client-side local data for offline/fallback responses
  const getLocalAnswer = (question) => {
    const lowerQuestion = question.toLowerCase().trim();
    devLog('🔍 Checking local answer for:', question, '→', lowerQuestion);

    // Greetings - but skip if question contains portfolio keywords
    const greetingKeywords = ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'];
    const portfolioKeywords = ['skill', 'project', 'experience', 'education', 'resume', 'sourav', 'portfolio', 'frontend', 'work', 'job'];
    const hasPortfolioKeyword = portfolioKeywords.some(word => lowerQuestion.includes(word));

    if (greetingKeywords.some(keyword => lowerQuestion.includes(keyword)) && !hasPortfolioKeyword) {
      devLog('✅ Matched greeting');
      return "Hello! I'm here to help you learn about Sourav Kumar's portfolio. You can ask me about:\n- His technical skills\n- His projects\n- His work experience\n- His frontend development expertise\n\nWhat would you like to know?";
    }

    // Skills
    if (lowerQuestion.includes('skill') || lowerQuestion.includes('technolog') || lowerQuestion.includes('tech stack')) {
      return `Sourav's technical skills include:

Frontend Technologies:
- TypeScript, JavaScript, HTML5, CSS3
- React.js, Next.js
- Redux, React Bootstrap

Backend & Databases:
- Node.js, Express.js
- MongoDB, PostgreSQL

Languages:
- Java, Python

Tools & Platforms:
- GitHub, Git, Bitbucket
- JSON, npm, Postman, Jira
- Firebase, FastAPI, ServiceNow`;
    }

    // Projects
    if (lowerQuestion.includes('project') || lowerQuestion.includes('built') || lowerQuestion.includes('created')) {
      return `Sourav's featured projects:

1. Chef Claude — AI-Powered Recipe Generator
- Generates custom recipes based on ingredients using OpenRouter AI API
- Technologies: React, OpenRouter API, Netlify
- Demo: https://ai-chefclaude.netlify.app/

2. Meme Generator — Web App
- Dynamic meme generator with real-time templates
- Technologies: React, JavaScript, Netlify
- Demo: https://generate-trendingmemes.netlify.app/

3. Roll Dice Tenzies — Interactive Game
- Interactive dice game with React Hooks and accessibility features
- Technologies: React.js, JavaScript
- Demo: https://rolldice-tenzies.netlify.app/

4. Inventos — Inventory Management Software
- Full-stack inventory management for manufacturing industry
- Technologies: HTML5, CSS3, JavaScript, Python, Django
- Demo: https://inventos.netlify.app/

5. My Travel Journey — Travel Project
- React-based travel destination showcase
- Technologies: React, JavaScript, Netlify
- Demo: https://travel-with-myjourney.netlify.app/

6. Covid-19 — Data Tracker
- Real-time COVID-19 data tracking for India
- Technologies: HTML, CSS, JavaScript, API Integration
- Demo: https://covid19-cowin.netlify.app/`;
    }

    // Experience - improved pattern matching
    const experiencePatterns = [
      'experience', 'work experience', 'job', 'employment', 'career',
      'where does he work', 'where working', 'which company', 'current company',
      'tell me about experience', 'work history', 'employment history',
      'his experience', 'his work', 'professional experience',
      'frontend experience', 'frontend work', 'react experience', 'development experience',
      'what\'s his experience', 'what is his experience', 'tell me his experience'
    ];
    const matchedExperiencePattern = experiencePatterns.find(pattern => lowerQuestion.includes(pattern));
    if (matchedExperiencePattern) {
      devLog('✅ Matched experience pattern:', matchedExperiencePattern);
      return `Sourav's work experience:

Software Developer — Aimleap (Oct 2025 – Present)
- Developing production-ready frontend features using React.js and modern JavaScript
- Building clean, reusable, and scalable UI components
- Collaborating with product managers, designers, and backend engineers

Analyst — Capgemini (Dec 2022 – Oct 2025)
- Developed customer service chatbot and AI-powered ticketing system
- Worked on NLU-based classification for automated ticket generation
- Winner — ServiceNow Gen AI Hackathon 2024

Full Stack Developer — Worksbot (Jan 2022 – Mar 2022)
- Built full-stack features for internal tools using React and backend APIs
- Implemented authentication flows and data synchronization

Frontend Developer — Lyearn (Jun 2020 – Mar 2021)
- Developed responsive and accessible UI components
- Converted Figma designs into production-ready React components`;
    }

    // Education
    if (lowerQuestion.includes('education') || lowerQuestion.includes('degree') || lowerQuestion.includes('college') || lowerQuestion.includes('university')) {
      return `Sourav Kumar's education:

B.Tech — Computer Science & Engineering
- Institution: Gandhi Engineering College (BPUT), Bhubaneswar
- Duration: 2018 — 2022
- CGPA: 8.79

Key highlights:
- Strong foundation in algorithms, data structures, and software engineering
- Worked on multiple web projects during studies`;
    }

    // Resume
    if (lowerQuestion.includes('resume') || lowerQuestion.includes('cv')) {
      return `You can download Sourav Kumar's resume (CV) directly from the portfolio website. Look for the "Resume" button in the navigation menu at the top of the page. The resume is available as a PDF file named "Sourav Kumar.pdf" and can be downloaded by clicking the Resume button.`;
    }

    // Count questions
    if (lowerQuestion.includes('how many')) {
      if (lowerQuestion.includes('skill') || lowerQuestion.includes('technolog')) {
        return `Sourav has 24 technical skills:
- 7 Frontend Technologies (TypeScript, JavaScript, HTML5, CSS3, React.js, Next.js, Redux, React Bootstrap)
- 4 Backend & Database (Node.js, Express.js, MongoDB, PostgreSQL)
- 2 Programming Languages (Java, Python)
- 11 Tools & Platforms (GitHub, Git, Bitbucket, JSON, npm, Postman, Jira, Firebase, FastAPI, ServiceNow)`;
      }
      if (lowerQuestion.includes('project')) {
        return `Sourav has 6 featured projects:
1. Chef Claude — AI-Powered Recipe Generator
2. Meme Generator — Web App
3. Roll Dice Tenzies — Interactive Game
4. Inventos — Inventory Management Software
5. My Travel Journey — Travel Project
6. Covid-19 — Data Tracker`;
      }
      if (lowerQuestion.includes('language')) {
        return `Sourav knows 2 programming languages: Java and Python. He also works extensively with JavaScript and TypeScript for frontend development.`;
      }
    }

    // Experience years
    if (lowerQuestion.includes('year') && lowerQuestion.includes('experience')) {
      const startDate = new Date('2020-06-01');
      const years = Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24 * 365.25));
      return `Sourav has over ${years} years of professional experience (since June 2020). He is currently working as a Software Developer at Aimleap (Oct 2025-Present). Previously, he worked at Capgemini as an Analyst (Dec 2022-Oct 2025), Worksbot as Full Stack Developer (Jan 2022-Mar 2022), and Lyearn as Frontend Developer (Jun 2020-Mar 2021).`;
    }

    devLog('❌ No local match found for:', question);
    return null; // No local match found
  };

  // Calculate transform origin for bottom-right animation (from logo)
  useEffect(() => {
    if (widgetRef.current) {
      // Set transform origin to bottom-right corner (where the button is)
      setTransformOrigin('100% 100%');
    }
  }, []);

  // Handle closing animation (macOS-style minimize)
  useEffect(() => {
    if (!isOpen && widgetRef.current) {
      setIsClosing(true);
      // Wait for animation to complete before hiding
      const timer = setTimeout(() => {
        setIsClosing(false);
      }, 400); // Match animation duration
      return () => clearTimeout(timer);
    } else {
      setIsClosing(false);
    }
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return (
    <div
      ref={widgetRef}
      className={`fixed z-[60] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden chat-widget-responsive transition-colors duration-300 ${isOpen ? 'animate-intercom-open' : isClosing ? 'animate-intercom-close' : ''
        }`}
      style={{
        transformOrigin: transformOrigin,
        willChange: isClosing ? 'transform, opacity, filter' : 'auto'
      }}
    >
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between flex-shrink-0 transition-colors duration-300">
        <div className="flex items-center gap-3 flex-1">
          {imageError ? (
            <div className="w-10 h-10 rounded-full bg-purple-600 dark:bg-purple-700 flex items-center justify-center">
              <i className="fa-solid fa-robot text-white"></i>
            </div>
          ) : (
            <img
              src="/images/chatbot.png"
              alt="AI Assistant"
              draggable="false"
              className="w-10 h-10 rounded-full object-cover"
              style={{
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                pointerEvents: 'none'
              }}
              onError={() => setImageError(true)}
              onDragStart={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              loading="eager"
            />
          )}
          <h3 className="font-semibold text-gray-900 dark:text-white text-base">Portfolio Assistant</h3>
        </div>
        <button
          onClick={handleClose}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md p-1.5 transition-all duration-200 w-8 h-8 flex items-center justify-center"
          aria-label="Close chat"
        >
          <i className="fa-solid fa-times text-lg"></i>
        </button>
      </div>

      {/* Messages - Fixed height with scroll */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-white dark:bg-gray-800 chat-messages-container transition-colors duration-300" style={{ minHeight: 0, height: 0 }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="max-w-[85%]">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-sm p-4">
                  <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">{stripMarkdown(msg.content)}</p>
                </div>
              </div>
            )}
            {msg.role === 'user' && (
              <div className="max-w-[85%]">
                <div className="bg-purple-600 dark:bg-purple-700 rounded-2xl rounded-tr-sm p-4 mb-1">
                  <p className="text-sm leading-relaxed text-white break-words">{msg.content}</p>
                </div>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex flex-col items-start">
            <div className="max-w-[85%]">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-sm p-4 mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 dark:text-gray-400 text-sm italic">Thinking...</span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Suggested Questions - No rectangle boxes, just text links */}
        {showSuggestions && messages.length === 1 && !isLoading && (
          <div className="flex flex-col gap-2 mt-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 px-1 mb-1">Try asking:</p>
            <div className="flex flex-col gap-1.5">
              {['What are Sourav\'s skills?', 'Tell me about his projects', 'What\'s his frontend experience?'].map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInput(question);
                    setShowSuggestions(false);
                    inputRef.current?.focus();
                  }}
                  className="text-left text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:underline px-1 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0 transition-colors duration-300">
        <div className="flex flex-col bg-white dark:bg-gray-700 border-2 border-purple-500 dark:border-purple-600 rounded-xl px-3 py-2 chat-input">
          {/* Top: Input field with text */}
          <div className="flex-1 w-full mb-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message..."
              className="w-full border-0 outline-none text-sm bg-transparent placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white py-1 focus:ring-0 focus:outline-none"
              disabled={isLoading}
              onFocus={(e) => {
                // Remove any focus outline
                e.target.style.outline = 'none';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Bottom: Icons row */}
          <div className="flex items-center justify-between">
            {/* Left side: Emoji and Mic buttons */}
            <div className="flex items-center gap-1">
              <div className="relative emoji-picker-container" ref={emojiPickerRef}>
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-1.5 transition-colors"
                  aria-label="Emoji"
                >
                  <i className="fa-regular fa-face-smile text-lg"></i>
                </button>
                {showEmojiPicker && (
                  <div className="emoji-picker-popup">
                    <div className="emoji-grid">
                      {['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾', '🤖', '🎃'].map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => {
                            setInput(prev => prev + emoji);
                            setShowEmojiPicker(false);
                            inputRef.current?.focus();
                          }}
                          className="emoji-button"
                          aria-label={`Select ${emoji}`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  // Voice input functionality
                  if (isListening && recognitionRef.current) {
                    // Stop listening if already listening
                    recognitionRef.current.stop();
                    setIsListening(false);
                    return;
                  }

                  // Check for Speech Recognition API
                  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

                  if (!SpeechRecognition) {
                    devLog('Speech recognition not supported in this browser');
                    return;
                  }

                  try {
                    const recognition = new SpeechRecognition();
                    recognitionRef.current = recognition;

                    recognition.continuous = false; // Stop after speech ends
                    recognition.interimResults = true; // Show live results
                    recognition.lang = 'en-US';
                    recognition.maxAlternatives = 1; // Only get best result

                    let accumulatedFinalText = '';

                    recognition.onstart = () => {
                      setIsListening(true);
                      accumulatedFinalText = '';
                      devLog('Voice recognition started');
                    };

                    recognition.onresult = (event) => {
                      let interimText = '';
                      let finalText = '';

                      // Process only new results (from resultIndex) to avoid duplicates
                      for (let i = event.resultIndex; i < event.results.length; i++) {
                        const transcript = event.results[i][0].transcript.trim();
                        if (event.results[i].isFinal) {
                          // Only add if not already in accumulated text
                          if (transcript && !accumulatedFinalText.includes(transcript)) {
                            finalText += transcript + ' ';
                          }
                        } else {
                          interimText += transcript;
                        }
                      }

                      // Accumulate final text (avoid duplicates)
                      if (finalText) {
                        accumulatedFinalText += finalText;
                      }

                      // Update input: accumulated final + current interim (no base text manipulation)
                      setInput(() => {
                        const combined = (accumulatedFinalText.trim() + ' ' + interimText).trim();
                        return combined;
                      });

                      // Focus and move cursor to end
                      setTimeout(() => {
                        if (inputRef.current) {
                          inputRef.current.focus();
                          const length = inputRef.current.value.length;
                          inputRef.current.setSelectionRange(length, length);
                        }
                      }, 50);
                    };

                    recognition.onerror = (event) => {
                      devLog('Voice recognition error:', event.error);
                      setIsListening(false);
                      recognitionRef.current = null;

                      // Handle specific errors
                      if (event.error === 'not-allowed') {
                        devLog('Microphone permission denied');
                      } else if (event.error === 'no-speech') {
                        devLog('No speech detected');
                        // Don't show error for no-speech, just stop
                      } else if (event.error !== 'aborted') {
                        // Only log non-aborted errors
                        devLog('Voice recognition error:', event.error);
                      }
                    };

                    recognition.onend = () => {
                      setIsListening(false);
                      recognitionRef.current = null;
                    };

                    // Start recognition
                    recognition.start();
                  } catch (error) {
                    devError('Error starting voice recognition:', error);
                    setIsListening(false);
                    recognitionRef.current = null;
                  }
                }}
                className={`p-1.5 transition-colors ${isListening
                  ? 'text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                aria-label="Voice input"
              >
                <i className={`fa-solid fa-microphone text-lg ${isListening ? 'animate-pulse' : ''}`}></i>
              </button>
            </div>

            {/* Right side: Send button */}
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${input.trim()
                ? 'bg-purple-600 dark:bg-purple-700 hover:bg-purple-700 dark:hover:bg-purple-800 text-white'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              aria-label="Send message"
            >
              <i className={`fa-solid fa-arrow-up text-xs ${input.trim() ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}></i>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center gap-1 mt-2">
          <span className="text-xs text-gray-400 dark:text-gray-500">Powered by Google Gemini AI</span>
        </div>
      </form>
    </div>
  );
};

export default ChatWidget;

