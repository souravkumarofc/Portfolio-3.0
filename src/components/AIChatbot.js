import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import FloatingChatButton from './FloatingChatButton';

const ChatWidget = lazy(() => import('./ChatWidget'));

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [widgetMounted, setWidgetMounted] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  useEffect(() => {
    const updateButtonPosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setButtonPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    };

    updateButtonPosition();
    window.addEventListener('resize', updateButtonPosition);
    return () => window.removeEventListener('resize', updateButtonPosition);
  }, []);

  const toggleChat = () => {
    if (!isOpen) {
      setWidgetMounted(true);
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setButtonPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    }
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <FloatingChatButton ref={buttonRef} onClick={toggleChat} isOpen={isOpen} />
      {widgetMounted && (
        <Suspense fallback={null}>
          <ChatWidget
            isOpen={isOpen}
            onClose={handleClose}
            buttonPosition={buttonPosition}
          />
        </Suspense>
      )}
    </>
  );
};

export default AIChatbot;
