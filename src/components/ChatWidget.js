import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CHAT_SUGGESTED_QUESTIONS, RESUME_PDF_PATH, RESUME_DOWNLOAD_NAME } from '../data/chatPortfolio';
import { getLocalPortfolioAnswer } from '../data/chatLocalAnswers';

// Only log in development
const isDev = process.env.NODE_ENV === 'development';
const devLog = (...args) => { if (isDev) console.log(...args); };
const devError = (...args) => { if (isDev) console.error(...args); };

const PORTFOLIO_HELP_FALLBACK =
  "I can help you learn about Sourav Kumar's portfolio! Try asking about recent projects, React/Next.js experience, IIT studies, achievements, availability, or his resume.\n\nWhat would you like to know?";

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

  const appendAssistantMessage = useCallback((answer) => {
    if (!answer) return;
    const payload =
      typeof answer === 'string'
        ? { role: 'assistant', content: answer }
        : { role: 'assistant', content: answer.content, actions: answer.actions };
    setMessages((prev) => [...prev, payload]);
  }, []);

  const submitUserMessage = useCallback(
    (rawMessage) => {
      const userMessage = rawMessage.trim();
      if (!userMessage || isLoading) return;

      setShowSuggestions(false);
      setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
      setIsLoading(true);

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(async () => {
        try {
          const localAnswer = getLocalPortfolioAnswer(userMessage);
          if (localAnswer) {
            appendAssistantMessage(localAnswer);
            setIsLoading(false);
            return;
          }

          const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/ask';

          let response;
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);

            response = await fetch(apiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ question: userMessage }),
              signal: controller.signal,
            });

            clearTimeout(timeoutId);
          } catch (fetchError) {
            const fallbackAnswer = getLocalPortfolioAnswer(userMessage);
            if (fallbackAnswer) {
              appendAssistantMessage(fallbackAnswer);
            } else {
              appendAssistantMessage(PORTFOLIO_HELP_FALLBACK);
            }
            setIsLoading(false);
            return;
          }

          const data = await response.json();

          if (!response.ok) {
            if (data.fallback) {
              appendAssistantMessage(data.fallback);
            } else if (data.response) {
              appendAssistantMessage(data.response);
            } else {
              const fallbackAnswer = getLocalPortfolioAnswer(userMessage);
              if (fallbackAnswer) {
                appendAssistantMessage(fallbackAnswer);
              } else {
                throw new Error(data.error || 'Failed to get response');
              }
            }
          } else {
            appendAssistantMessage(data.response);
          }
        } catch (error) {
          devError('Chat error:', error);
          const fallbackAnswer = getLocalPortfolioAnswer(userMessage);
          if (fallbackAnswer) {
            appendAssistantMessage(fallbackAnswer);
          } else {
            appendAssistantMessage(PORTFOLIO_HELP_FALLBACK);
          }
        } finally {
          setIsLoading(false);
        }
      }, 600);
    },
    [appendAssistantMessage, isLoading]
  );

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput('');
    submitUserMessage(userMessage);
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

  const renderMessageActions = (actions) => {
    if (!actions?.length) return null;
    return (
      <div className="chat-message-actions">
        {actions.map((action, actionIndex) => {
          if (action.type === 'resume') {
            return (
              <a
                key={actionIndex}
                href={RESUME_PDF_PATH}
                download={RESUME_DOWNLOAD_NAME}
                className="chat-resume-download"
              >
                <i className="fa-solid fa-file-arrow-down" aria-hidden="true" />
                Download Resume
              </a>
            );
          }
          return null;
        })}
      </div>
    );
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
      className={`chat-widget fixed z-[60] flex flex-col overflow-hidden chat-widget-responsive ${isOpen ? 'animate-intercom-open' : isClosing ? 'animate-intercom-close' : ''
        }`}
      style={{
        transformOrigin: transformOrigin,
        willChange: isClosing ? 'transform, opacity, filter' : 'auto'
      }}
    >
      {/* Header */}
      <div className="chat-widget-header p-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3 flex-1">
          {imageError ? (
            <div className="chat-widget-avatar-fallback w-10 h-10 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-robot text-white" aria-hidden="true"></i>
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
          <h3 className="chat-widget-title font-semibold text-base">Portfolio Assistant</h3>
        </div>
        <button
          onClick={handleClose}
          type="button"
          className="chat-widget-close rounded-md p-1.5 transition-all duration-200 w-8 h-8 flex items-center justify-center"
          aria-label="Close chat"
        >
          <i className="fa-solid fa-times text-lg"></i>
        </button>
      </div>

      {/* Messages - Fixed height with scroll */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 chat-messages-container" style={{ minHeight: 0, height: 0 }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="max-w-[85%]">
                <div className="chat-message-assistant p-4">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{stripMarkdown(msg.content)}</p>
                  {renderMessageActions(msg.actions)}
                </div>
              </div>
            )}
            {msg.role === 'user' && (
              <div className="max-w-[85%]">
                <div className="chat-message-user p-4 mb-1">
                  <p className="text-sm leading-relaxed break-words">{msg.content}</p>
                </div>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex flex-col items-start">
            <div className="max-w-[85%]">
              <div className="chat-message-assistant p-4 mb-1">
                <div className="flex items-center gap-2">
                  <span className="chat-thinking-label text-sm italic">Thinking...</span>
                  <div className="flex gap-1" aria-hidden="true">
                    <span className="chat-thinking-dot w-1.5 h-1.5 rounded-full animate-bounce"></span>
                    <span className="chat-thinking-dot w-1.5 h-1.5 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                    <span className="chat-thinking-dot w-1.5 h-1.5 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Suggested Questions - No rectangle boxes, just text links */}
        {showSuggestions && messages.length === 1 && !isLoading && (
          <div className="chat-suggestions flex flex-col gap-2 mt-4">
            <p className="text-xs px-1 mb-1 chat-suggestions-label">Try asking:</p>
            <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
              {CHAT_SUGGESTED_QUESTIONS.map((question, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => submitUserMessage(question)}
                  className="chat-suggestion-link text-left text-sm px-1 transition-colors"
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
      <form onSubmit={handleSend} className="chat-widget-footer p-4 flex-shrink-0">
        <div className="flex flex-col rounded-xl px-3 py-2 chat-input chat-input-shell">
          {/* Top: Input field with text */}
          <div className="flex-1 w-full mb-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message..."
              className="chat-input-field w-full border-0 outline-none text-sm bg-transparent py-1 focus:ring-0 focus:outline-none"
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
                  className="chat-input-icon p-1.5 transition-colors"
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
                className={`p-1.5 transition-colors ${isListening ? 'chat-mic-active' : 'chat-input-icon'}`}
                aria-label="Voice input"
              >
                <i className={`fa-solid fa-microphone text-lg ${isListening ? 'animate-pulse' : ''}`}></i>
              </button>
            </div>

            {/* Right side: Send button */}
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`chat-send-button w-8 h-8 rounded-full flex items-center justify-center transition-colors ${input.trim() ? 'chat-send-button--active' : 'chat-send-button--idle'}`}
              aria-label="Send message"
            >
              <i className="fa-solid fa-arrow-up text-xs" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center gap-1 mt-2">
          <span className="chat-powered-by text-xs">Powered by Google Gemini AI</span>
        </div>
      </form>
    </div>
  );
};

export default ChatWidget;

