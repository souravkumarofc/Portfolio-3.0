import React, { useState, useEffect, useRef, forwardRef } from 'react';

// Only log in development
const isDev = process.env.NODE_ENV === 'development';
const devLog = (...args) => { if (isDev) console.log(...args); };

const FloatingChatButton = forwardRef(({ onClick, isOpen }, ref) => {
  const [imageError, setImageError] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const audioContextRef = useRef(null);
  const lastSoundTimeRef = useRef(0);

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

  // Play smooth, cute opening sound (gentle bell-like chime)
  const playCuteOpeningSound = () => {
    const now = Date.now();
    // Prevent overlapping sounds (minimum 100ms gap)
    if (now - lastSoundTimeRef.current < 100) return;
    lastSoundTimeRef.current = now;

    try {
      const audioContext = getAudioContext();
      if (!audioContext) return;

      // Create a smooth, pleasant ascending chime (like a notification)
      const frequencies = [523.25, 659.25]; // C5, E5 - pleasant two-tone
      const duration = 0.25;
      const baseTime = audioContext.currentTime;

      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = freq;
        oscillator.type = 'sine'; // Smooth sine wave
        
        const startTime = baseTime + (index * 0.06);
        const endTime = startTime + duration;
        
        // Smooth envelope: fade in quickly, fade out gently
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.12, startTime + 0.03); // Gentle volume
        gainNode.gain.exponentialRampToValueAtTime(0.001, endTime); // Smooth fade out
        
        oscillator.start(startTime);
        oscillator.stop(endTime);
      });
    } catch (error) {
      devLog('Audio error:', error);
    }
  };

  // Play smooth closing sound (gentle descending tone)
  const playCloseSound = () => {
    const now = Date.now();
    if (now - lastSoundTimeRef.current < 100) return;
    lastSoundTimeRef.current = now;

    try {
      const audioContext = getAudioContext();
      if (!audioContext) return;

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
      devLog('Audio error:', error);
    }
  };

  // Play subtle hover sound
  const playPopSound = (frequency = 750, duration = 0.1) => {
    const now = Date.now();
    if (now - lastSoundTimeRef.current < 150) return;
    lastSoundTimeRef.current = now;

    try {
      const audioContext = getAudioContext();
      if (!audioContext) return;

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      // Very gentle envelope for hover
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      devLog('Audio error:', error);
    }
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
      ref={ref}
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
      className={`chat-button-responsive z-50 w-14 h-14 rounded-full bg-purple-600 text-white shadow-2xl hover:bg-purple-700 transition-all duration-300 flex items-center justify-center overflow-visible focus:outline-none focus:ring-0 active:bg-purple-600 active:scale-95`}
      style={buttonStyle}
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
            draggable="false"
            className={`rounded-full object-cover logo-3d absolute transition-all duration-300 ease-out ${
              isHovering ? 'animate-hover-bounce' : 'animate-smooth-bounce'
            }`}
            style={{
              width: '110px',
              height: '110px',
              marginTop: '-10px',
              marginLeft: '-10px',
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
      </div>
    </button>
  );
});

FloatingChatButton.displayName = 'FloatingChatButton';

export default FloatingChatButton;

