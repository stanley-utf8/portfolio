import React, { useState, useEffect } from 'react';

const GlitchTag = ({
  text,
  color = 'text-light-yellow dark:text-dark-yellow',
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?`~©®₿¥€£¢₹§¶∆×÷¿¡';

  const getRandomGlitchChar = () =>
    glitchChars[Math.floor(Math.random() * glitchChars.length)];

  const startGlitchAnimation = () => {
    if (isGlitching) return;

    setIsGlitching(true);
    let glitchCount = 0;
    const maxGlitches = 8;
    const glitchInterval = 20;

    const glitchTimer = setInterval(() => {
      if (glitchCount < maxGlitches) {
        const glitchedText = text
          .split('')
          .map((char) => (Math.random() < 0.5 ? getRandomGlitchChar() : char))
          .join('');
        setDisplayText(glitchedText);
        glitchCount++;
      } else {
        setDisplayText(text);
        setIsGlitching(false);
        clearInterval(glitchTimer);
      }
    }, glitchInterval);
  };

  return (
    <span
      className={`inline-block ${color} cursor-pointer`}
      onMouseEnter={startGlitchAnimation}
      onMouseLeave={() => setDisplayText(text)}
    >
      {displayText}
    </span>
  );
};

export default GlitchTag;
