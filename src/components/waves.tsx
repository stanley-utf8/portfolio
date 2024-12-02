import React, { useState, useEffect } from 'react';

const FullScreenWaves = ({ onComplete }) => {
  const [frame, setFrame] = useState('');

  const [randomColor] = useState(() => {
    const array = ['yellow', 'green', 'blue', 'red', 'purple'];
    return array[Math.floor(Math.random() * array.length)];
  });
  const CHARS = ' _abcöõö#$%123ABC';
  const WIDTH = 190; // Increased for full screen
  const HEIGHT = 50; // Increased for full screen

  const getIntensity = (row: number, col: number, time: number) => {
    let intensity = 0.0;

    intensity += 0.7 * Math.sin(0.5 * row + time / 5);
    intensity += 3 * Math.sin(1.6 * col + time / 5);
    intensity += Math.sin(
      10 * (col * Math.sin(time / 2) + row * Math.cos(time / 5)) + time / 2,
    );

    const cyclicX = row + 0.5 * Math.sin(time / 2);
    const cyclicY = col + 0.5 * Math.cos(time / 4);

    intensity +=
      0.4 *
      Math.sin(Math.sqrt(100 * cyclicX ** 2 + 100 * cyclicY ** 2 + 1) + time);
    intensity +=
      0.9 *
      Math.sin(Math.sqrt(75 * cyclicX ** 2 + 25 * cyclicY ** 2 + 1) + time);
    intensity +=
      -1.4 *
      Math.sin(Math.sqrt(256 * cyclicX ** 2 + 25 * cyclicY ** 2 + 1) + time);
    intensity += 0.3 * Math.sin(0.5 * col + row + Math.sin(time));

    return (
      17 * (0.5 + 0.499 * Math.sin(intensity)) * (0.7 + Math.sin(time) * 0.3)
    );
  };

  const generateFrame = (time: number) => {
    let text = '';
    for (let row = 1; row < HEIGHT; row++) {
      for (let col = 1; col < WIDTH; col++) {
        const intensity = getIntensity(row / HEIGHT, col / WIDTH, time);
        const charIndex = Math.max(
          Math.min(Math.floor(intensity) - 1, CHARS.length - 1),
          0,
        );
        text += CHARS[charIndex];
      }
      text += '\n';
    }
    return text;
  };

  useEffect(() => {
    let animationId: number;
    let startTime = Date.now();

    const animate = () => {
      const time = (Date.now() - startTime) * 0.001;
      setFrame(generateFrame(time));
      animationId = requestAnimationFrame(animate);
    };

    const handleKeyPress = (event) => {
      event.preventDefault();
      event.stopPropagation();
      cancelAnimationFrame(animationId);
      onComplete();
    };

    document.addEventListener('keypress', handleKeyPress);
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [onComplete]);

  return (
    <div className="crt-text fixed inset-0 bg-light-background dark:bg-dark-background z-50 flex items-center justify-center">
      <pre
        className={`whitespace-pre text-dark-${randomColor} 
        text-xs overflow-hidden `}
      >
        <div className={` -translate-y-3`}>{frame}</div>
        <div className=" absolute bottom-4 left-1/2 transform -translate-x-1/2 text-dark-gray">
          Press space to continue...
        </div>
      </pre>
    </div>
  );
};

export default FullScreenWaves;
