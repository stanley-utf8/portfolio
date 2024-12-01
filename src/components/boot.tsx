import React, { useState, useEffect } from 'react';

const spinnerFrames = ['▖', '▘', '▝', '▗'];
const chineseCharsArray = '永和徐会尚志宏伟财富宝康乐家园'.split('');
const fullText = "Loading Stanley's Portfolio...";

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [charStates, setCharStates] = useState<{ char: string | null }[]>(() =>
    Array(fullText.length).fill({ char: null }),
  );
  const [showCursor, setShowCursor] = useState(true);
  const [frame, setFrame] = useState(0);

  const isTyping = charStates.some((state) => state.char === null);

  useEffect(() => {
    const typingDelay = 60; // milliseconds between typing each character
    const translationDelay = 1200; // milliseconds before translating to English

    const timeouts: NodeJS.Timeout[] = [];

    for (let i = 0; i < fullText.length; i++) {
      if (i < chineseCharsArray.length) {
        // Schedule to display Chinese character at time i * typingDelay
        const chineseTimeout = setTimeout(() => {
          setCharStates((prev) => {
            const newStates = [...prev];
            newStates[i] = { char: chineseCharsArray[i] };
            return newStates;
          });
        }, i * typingDelay);

        timeouts.push(chineseTimeout);

        // Schedule to translate to English character after translationDelay
        const englishTimeout = setTimeout(() => {
          setCharStates((prev) => {
            const newStates = [...prev];
            newStates[i] = { char: fullText[i] };
            return newStates;
          });
        }, i * typingDelay + translationDelay);

        timeouts.push(englishTimeout);
      } else {
        // For positions beyond the Chinese characters, display English characters after all Chinese have translated
        const extraDelay =
          chineseCharsArray.length * typingDelay + translationDelay;
        const englishTimeout = setTimeout(() => {
          setCharStates((prev) => {
            const newStates = [...prev];
            newStates[i] = { char: fullText[i] };
            return newStates;
          });
        }, extraDelay + (i - chineseCharsArray.length) * typingDelay);

        timeouts.push(englishTimeout);
      }
    }

    // Cleanup on unmount
    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = () => onComplete();
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [onComplete]);

  // Cursor blink effect
  useEffect(() => {
    if (isTyping) {
      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 530);
      return () => clearInterval(cursorInterval);
    } else {
      setShowCursor(false);
    }
  }, [isTyping]);

  // Spinner animation after typing is complete
  useEffect(() => {
    if (!isTyping) {
      const spinnerInterval = setInterval(() => {
        setFrame((f) => (f + 1) % spinnerFrames.length);
      }, 200);
      return () => clearInterval(spinnerInterval);
    }
  }, [isTyping]);

  // Call onComplete after typing and spinner animation is done
  useEffect(() => {
    if (!isTyping) {
      const completeTimeout = setTimeout(() => {
        onComplete();
      }, 1000); // Adjust delay before calling onComplete
      return () => clearTimeout(completeTimeout);
    }
  }, [isTyping, onComplete]);

  const displayText = charStates.map((state) => state.char || '').join('');

  return (
    <div className="font-mono text-dark-green">
      <div className="flex items-center">
        <span>{displayText}</span>
        <span className="mx-1">
          {isTyping ? (
            <span className={showCursor ? 'opacity-100' : 'opacity-0'}>█</span>
          ) : (
            spinnerFrames[frame]
          )}
        </span>
      </div>
    </div>
  );
};

export default BootSequence;
