import React, { useState, useEffect } from 'react';

// Only log in development
const isDev = process.env.NODE_ENV === 'development';
const devLog = (...args) => { if (isDev) console.log(...args); };

const FloatingChatButton = ({ onClick, isOpen }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Play cute pop sound
  const playPopSound = (frequency = 800, duration = 0.15) => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      devLog('Audio not supported');
    }
  };

  // Play cute opening sound (like a chime/bell)
  const playCuteOpeningSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create a pleasant chime with multiple tones
      const frequencies = [523.25, 659.25, 783.99]; // C, E, G (C major chord)
      const duration = 0.3;
      
      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = freq;
        oscillator.type = 'sine';
        
        const startTime = audioContext.currentTime + (index * 0.05);
        const endTime = startTime + duration;
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, endTime);
        
        oscillator.start(startTime);
        oscillator.stop(endTime);
      });
    } catch (error) {
      devLog('Audio not supported');
    }
  };

  // Play close sound (lower pitch)
  const playCloseSound = () => {
    playPopSound(600, 0.12);
  };


  // Reset hover state when chat closes
  useEffect(() => {
    if (!isOpen) {
      setIsHovering(false);
    }
  }, [isOpen]);

  const handleClick = () => {
    if (!isOpen) {
      // Play cute opening sound
      playCuteOpeningSound();
    } else {
      // Play closing sound
      playCloseSound();
      // Reset hover state when closing
      setIsHovering(false);
    }
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => {
        if (!isOpen) {
          setIsHovering(true);
          playPopSound(750, 0.1); // Subtle hover sound
        }
      }}
      onMouseLeave={() => {
        if (!isOpen) {
          setIsHovering(false);
        }
      }}
      className={`fixed right-4 sm:right-6 md:right-10 z-50 w-14 h-14 rounded-full bg-purple-600 text-white shadow-2xl hover:bg-purple-700 transition-all duration-300 flex items-center justify-center overflow-visible chat-button-responsive focus:outline-none focus:ring-0 active:bg-purple-600 active:scale-95`}
      aria-label={isOpen ? 'Close chat' : 'Open AI chat assistant'}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {isOpen ? (
          <i className="fa-solid fa-chevron-down text-xl text-white absolute transition-all duration-300 ease-out"></i>
        ) : imageError ? (
          <i className={`fa-solid fa-robot text-2xl text-white absolute transition-all duration-300 ease-out ${
            isHovering ? 'animate-hover-bounce' : 'animate-smooth-bounce'
          }`}></i>
        ) : (
          <img 
            src="/images/chatbot.png" 
            alt="Chat" 
            className={`rounded-full object-cover logo-3d absolute transition-all duration-300 ease-out ${
              isHovering ? 'animate-hover-bounce' : 'animate-smooth-bounce'
            }`}
            style={{
              width: '88px',
              height: '88px',
              marginTop: '-6px',
              marginLeft: '-6px'
            }}
            onError={() => setImageError(true)}
          />
        )}
      </div>
    </button>
  );
};

export default FloatingChatButton;

