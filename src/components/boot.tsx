import React, { useState, useEffect } from 'react';

//const spinnerFrames = ['▖', '▘', '▝', '▗'];
const spinnerFrames = ['|', '/', '─', '\\', '|', '/', '─', '\\'];
const chineseCharsArray = '永和徐会尚志宏伟财富宝康乐家园'.split('');
const fullText = "Loading Stanley's Portfolio...";
const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?`~©®₿¥€£¢₹§¶∆×÷¿¡';

const bootSequence = [
  { text: "BIOS Version 2.0.1", delay: 500 },
  { text: "CPU: Quantum Core i9 @ 4.20GHz", delay: 300 },
  { text: "Cache Memory     : 1048576K", delay: 200 },
  { text: "Memory Installed : 1024M DRAM   [ OK ]", delay: 200 },
  { text: "16384K Cache Test: OK", delay: 150 },
  { text: "Initializing Neural Interface ...", delay: 400 },
  { text: "Loading Quantum OS v3.14 ...", delay: 600 },
  { text: "Mounting /dev/stanley", delay: 300 },
  { text: "PCI Device Listing ...", delay: 400 },
  { text: "Bus\u00A0\u00A0Device\u00A0\u00A0ID\u00A0\u00A0\u00A0\u00A0Device Class", delay: 200 },
  { text: "───\u00A0\u00A0──────\u00A0\u00A0────\u00A0\u00A0───────────────────────", delay: 100 },
  { text: `0${'\u00A0'.repeat(4)}37${'\u00A0'.repeat(6)}24C2${'\u00A0'.repeat(2)}体制  Neural Network  界面`, delay: 150 },
  { text: `0${'\u00A0'.repeat(4)}23${'\u00A0'.repeat(6)}24C4${'\u00A0'.repeat(2)}ネットワーク  Controller`, delay: 150 },
  { text: `1${'\u00A0'.repeat(4)}08${'\u00A0'.repeat(6)}5F33${'\u00A0'.repeat(2)}System Peripherals`, delay: 150 },
  { text: `1${'\u00A0'.repeat(4)}04${'\u00A0'.repeat(6)}4F34${'\u00A0'.repeat(2)}特異点`, delay: 150 },
  { text: "", delay: 300 },
  { text: "System Ready. Press any key to continue...", delay: 500 },
  { text: "", delay: 500 },
];

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [charStates, setCharStates] = useState<{ char: string | null; isGlitching: boolean }[]>(() =>
    Array(fullText.length).fill({ char: null, isGlitching: false }),
  );
  const [showCursor, setShowCursor] = useState(true);
  const [frame, setFrame] = useState(0);

  const [bootStage, setBootStage] = useState<number>(0);
  const [bootLines, setBootLines] = useState<string[]>([]);

  useEffect(() => {
    if (bootStage < bootSequence.length) {
      const timer = setTimeout(() => {
        setBootLines(prev => [...prev, bootSequence[bootStage].text]);
        setBootStage(prev => prev + 1);
      }, bootSequence[bootStage].delay);
      return () => clearTimeout(timer);
    }
  }, [bootStage]);

  const getRandomGlitchChar = () => glitchChars[Math.floor(Math.random() * glitchChars.length)];

  // Glitch animation effect for a single character
  const startGlitchAnimation = (index: number, finalChar: string) => {
    let glitchCount = 0;
    const maxGlitches = 8; // Number of glitch characters to show before settling
    const glitchInterval = 20; // Time between glitch characters

    const glitchTimer = setInterval(() => {
      if (glitchCount < maxGlitches) {
        setCharStates(prev => {
          const newStates = [...prev];
          newStates[index] = { char: getRandomGlitchChar(), isGlitching: true };
          return newStates;
        });
        glitchCount++;
      } else {
        setCharStates(prev => {
          const newStates = [...prev];
          newStates[index] = { char: finalChar, isGlitching: false };
          return newStates;
        });
        clearInterval(glitchTimer);
      }
    }, glitchInterval);

    return glitchTimer;
  };

  const isTyping = charStates.some((state) => state.char === null);

  useEffect(() => {
    if (bootStage < bootSequence.length) return; // Wait for boot sequence to complete
    const typingDelay = 60; // milliseconds between typing each character
    const translationDelay = 3000; // milliseconds before translating to English
    const glitchTimers: NodeJS.Timeout[] = [];
    const timeouts: NodeJS.Timeout[] = [];

    for (let i = 0; i < fullText.length; i++) {
      if (i < chineseCharsArray.length) {
        // Schedule to display Chinese character at time i * typingDelay
        const chineseTimeout = setTimeout(() => {
          setCharStates((prev) => {
            const newStates = [...prev];
            newStates[i] = { char: chineseCharsArray[i], isGlitching: false };
            return newStates;
          });
        }, i * typingDelay);

        timeouts.push(chineseTimeout);

        // Schedule to translate to English character after translationDelay
        const englishTimeout = setTimeout(() => {
          const timer = startGlitchAnimation(i, fullText[i]);
          glitchTimers.push(timer);
        }, i * typingDelay + translationDelay);

        timeouts.push(englishTimeout);
      } else {
        // For positions beyond the Chinese characters, display English characters after all Chinese have translated
        const extraDelay =
          chineseCharsArray.length * typingDelay + translationDelay;
        const englishTimeout = setTimeout(() => {
          const timer = startGlitchAnimation(i, fullText[i]);
          glitchTimers.push(timer);
        }, extraDelay + (i - chineseCharsArray.length) * typingDelay);

        timeouts.push(englishTimeout);
      }
    }

    // Cleanup on unmount
    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
      glitchTimers.forEach(clearInterval);
    };
  }, [bootStage]);

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
    if (!isTyping && bootStage >= bootSequence.length) {
      const spinnerInterval = setInterval(() => {
        setFrame((f) => (f + 1) % spinnerFrames.length);
      }, 200);
      return () => clearInterval(spinnerInterval);
    }
  }, [isTyping, bootStage]);

  // Call onComplete after typing and spinner animation is done
  useEffect(() => {
    if (!isTyping && bootStage >= bootSequence.length) {
      const completeTimeout = setTimeout(() => {
        onComplete();
      }, 2000);
      return () => clearTimeout(completeTimeout);
    }
  }, [isTyping, bootStage, onComplete]);

  const displayText = charStates.map((state) => state.char || '').join('');

  return (
    <div className="font-mono text-dark-green">
      {bootLines.map((line, index) => (
        <div key={index} className="font-mono opacity-90">
          {line}
        </div>
      ))}
      {bootStage >= bootSequence.length && (
        <div className="flex items-center mt-4">
          <span>{displayText}</span>
          <span className="mx-1">
            {isTyping ? (
              <span className={showCursor ? 'opacity-100' : 'opacity-0'}>█</span>
            ) : (
              spinnerFrames[frame]
            )}
          </span>
        </div>
      )}
    </div>
  );
};

export default BootSequence;
