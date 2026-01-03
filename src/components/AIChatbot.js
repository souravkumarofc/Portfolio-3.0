import React, { useState, useRef, useEffect } from 'react';
import FloatingChatButton from './FloatingChatButton';
import ChatWidget from './ChatWidget';

/**
 * AIChatbot Component
 * 
 * QUOTA SAFETY FEATURES:
 * - No auto-calls on page load (only shows static welcome message)
 * - Debounced API calls (600ms) to prevent rapid requests
 * - Local data answers common questions (skills, experience, projects)
 * - Only calls Gemini for unique/analytical questions
 * - Graceful fallback when quota is exceeded
 */
const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  useEffect(() => {
    // Get button position for macOS-style animation
    const updateButtonPosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setButtonPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
      }
    };

    updateButtonPosition();
    window.addEventListener('resize', updateButtonPosition);
    return () => window.removeEventListener('resize', updateButtonPosition);
  }, []);

  const toggleChat = () => {
    if (!isOpen && buttonRef.current) {
      // Update position right before opening
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    }
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <FloatingChatButton 
        ref={buttonRef}
        onClick={toggleChat} 
        isOpen={isOpen} 
      />
      <ChatWidget 
        isOpen={isOpen} 
        onClose={handleClose}
        buttonPosition={buttonPosition}
      />
    </>
  );
};

export default AIChatbot;

