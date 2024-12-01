import React, { useState, useEffect } from 'react';

const spinnerFrames = ['|', '/', '─', '\\', '|', '/', '─', '\\'];
const chineseCharsArray = '永和徐会尚志宏伟财富宝康乐家园'.split('');
const fullText = "Loading Stanley's Portfolio...";
const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?`~©®₿¥€£¢₹§¶∆×÷¿¡';

const bootSequence = [
  { text: "BIOS Version 2.0.1", delay: 100 },
  { text: "CPU: Quantum Core i9 @ 4.20GHz", delay: 150 },
  { text: "Cache Memory     : 1048576K", delay: 50 },
  { text: "Memory Installed : 1024M DRAM   [ OK ]", delay: 50 },
  { text: "16384K Cache Test: OK", delay: 50 },
  { text: "Loading OS v3.14 ...", delay: 500 },
  { text: "Mounting /dev/stanley\u000A", delay: 600 },
  { text: "\u000APCI Device Listing ...", delay: 400 },
  { text: "Bus\u00A0\u00A0Device\u00A0\u00A0ID\u00A0\u00A0\u00A0\u00A0Device Class", delay: 400 },
  { text: "───\u00A0\u00A0──────\u00A0\u00A0────\u00A0\u00A0───────────────────────", delay: 0 },
  { text: `0${'\u00A0'.repeat(4)}37${'\u00A0'.repeat(6)}24C2${'\u00A0'.repeat(2)}体制  Neural Network  界面`, delay: 50 },
  { text: `0${'\u00A0'.repeat(4)}23${'\u00A0'.repeat(6)}24C4${'\u00A0'.repeat(2)}ネットワーク  Controller`, delay: 50 },
  { text: `1${'\u00A0'.repeat(4)}08${'\u00A0'.repeat(6)}5F33${'\u00A0'.repeat(2)}System Peripherals`, delay: 50 },
  { text: `1${'\u00A0'.repeat(4)}04${'\u00A0'.repeat(6)}4F34${'\u00A0'.repeat(2)}特異点`, delay: 50 },
  { text: "\u000A", delay: 100 },
  { text: "System Ready. Press any key to continue...", delay: 500 },
  { text: "", delay: 500 },
];

const startupCodeSequence = [
  "[ 0.000000] Linux version 5.15.0-quantum (stanley@dev) (gcc version 11.2.0)",
  "[ 0.000023] Command line: BOOT_IMAGE=/boot/neural-core root=UUID=42c",
  "[ 0.000145] x86/CPU: Initialized neural registers",
  "[ 0.000167] x86/memory: Memory probe started",
  "[ 0.000234] Machine check injector initialized",
  "[ 0.000512] BIOS-provided physical RAM map:",
  "[ 0.000789] ACPI: Early table checksum verification disabled",
  "[ 0.000823] ACPI: RSDP 0x00000000000F0490 000024 (v02 INTEL )",
  "[ 0.000901] Memory: 1024M/16384M available (12288K kernel code)",
  "[ 0.001023] Calibrating delay loop (skipped)... 3.50 BogoMIPS",
  "[ 0.001245] pid_max: default: 32768 minimum: 301",
  "[ 0.001567] Security Framework initialized",
  "[ 0.001789] Neural subsystem initialized",
  "[ 0.002012] Quantum accelerator detected"
];

const bootCodeSnippets = [
  "void init_cpu() {",
  "  uint32_t cr0;",
  "  __asm__ __volatile__(",
  "    \"movl %%cr0, %0\\n\"",
  "    : \"=r\"(cr0)",
  "  );",
  "  cr0 |= (1 << 0);  // Enable Protected Mode",
  "  __asm__ __volatile__(",
  "    \"movl %0, %%cr0\\n\"",
  "    :: \"r\"(cr0)",
  "  );",
  "}",
  "struct gdt_ptr {",
  "    uint16_t limit;",
  "    uint32_t base;",
  "} __attribute__((packed));",
  "",
  "void load_gdt() {",
  "    gdt_ptr.limit = (sizeof(gdt_entry_t) * 5) - 1;",
  "    gdt_ptr.base = (uint32_t)&gdt_entries;",
  "    gdt_flush((uint32_t)&gdt_ptr);",
  "}",
  "extern void memory_init() {",
  "    page_directory = (page_dir_t*)0x9C000;",
  "    uint32_t phys;",
  "    for (int i = 0; i < 1024; i++) {",
  "        pages[i].present = 1;",
  "        pages[i].rw = 1;",
  "        pages[i].phys_addr = phys;",
  "        phys += 0x1000;",
  "    }",
  "}"
];

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [charStates, setCharStates] = useState<{ char: string | null; isGlitching: boolean }[]>(() =>
    Array(fullText.length).fill({ char: null, isGlitching: false })
  );
  const [showCursor, setShowCursor] = useState(true);
  const [frame, setFrame] = useState(0);

  // Sequence state management
  const [phase, setPhase] = useState<'bootCode' | 'startup' | 'boot'>('bootCode');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayLines, setDisplayLines] = useState<string[]>([]);

  // Boot code phase
  useEffect(() => {
    if (phase === 'bootCode' && currentLineIndex < bootCodeSnippets.length) {
      const timer = setTimeout(() => {
        setDisplayLines(prev => [...prev, bootCodeSnippets[currentLineIndex]]);
        setCurrentLineIndex(prev => prev + 1);
      }, 25);

      return () => clearTimeout(timer);
    } else if (phase === 'bootCode' && currentLineIndex >= bootCodeSnippets.length) {
      const transitionTimer = setTimeout(() => {
        setDisplayLines([]);
        setCurrentLineIndex(0);
        setPhase('startup');
      }, 250);

      return () => clearTimeout(transitionTimer);
    }
  }, [phase, currentLineIndex]);

  // Startup code phase
  useEffect(() => {
    if (phase === 'startup' && currentLineIndex < startupCodeSequence.length) {
      const timer = setTimeout(() => {
        setDisplayLines(prev => [...prev, startupCodeSequence[currentLineIndex]]);
        setCurrentLineIndex(prev => prev + 1);
      }, 50); // time each line

      return () => clearTimeout(timer);
    } else if (phase === 'startup' && currentLineIndex >= startupCodeSequence.length) {
      const transitionTimer = setTimeout(() => {
        setDisplayLines([]);
        setCurrentLineIndex(0);
        setPhase('boot');
      }, 250); // until boot phase

      return () => clearTimeout(transitionTimer);
    }
  }, [phase, currentLineIndex]);

  // Boot sequence phase
  useEffect(() => {
    if (phase === 'boot' && currentLineIndex < bootSequence.length) {
      const timer = setTimeout(() => {
        setDisplayLines(prev => [...prev, bootSequence[currentLineIndex].text]);
        setCurrentLineIndex(prev => prev + 1);
      }, bootSequence[currentLineIndex].delay);

      return () => clearTimeout(timer);
    }
  }, [phase, currentLineIndex]);

  const getRandomGlitchChar = () => glitchChars[Math.floor(Math.random() * glitchChars.length)];

  const startGlitchAnimation = (index: number, finalChar: string) => {
    let glitchCount = 0;
    const maxGlitches = 8;
    const glitchInterval = 20;

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

  // Final text animation effect
  useEffect(() => {
    if (phase === 'boot' && currentLineIndex >= bootSequence.length) {
      const typingDelay = 60;
      const translationDelay = 3000;
      const glitchTimers: NodeJS.Timeout[] = [];
      const timeouts: NodeJS.Timeout[] = [];

      for (let i = 0; i < fullText.length; i++) {
        if (i < chineseCharsArray.length) {
          const chineseTimeout = setTimeout(() => {
            setCharStates((prev) => {
              const newStates = [...prev];
              newStates[i] = { char: chineseCharsArray[i], isGlitching: false };
              return newStates;
            });
          }, i * typingDelay);

          timeouts.push(chineseTimeout);

          const englishTimeout = setTimeout(() => {
            const timer = startGlitchAnimation(i, fullText[i]);
            glitchTimers.push(timer);
          }, i * typingDelay + translationDelay);

          timeouts.push(englishTimeout);
        } else {
          const extraDelay = chineseCharsArray.length * typingDelay + translationDelay;
          const englishTimeout = setTimeout(() => {
            const timer = startGlitchAnimation(i, fullText[i]);
            glitchTimers.push(timer);
          }, extraDelay + (i - chineseCharsArray.length) * typingDelay);

          timeouts.push(englishTimeout);
        }
      }

      return () => {
        timeouts.forEach((timeout) => clearTimeout(timeout));
        glitchTimers.forEach(clearInterval);
      };
    }
  }, [phase, currentLineIndex]);

  // Key press handler
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

  // Spinner animation
  useEffect(() => {
    if (!isTyping && phase === 'boot' && currentLineIndex >= bootSequence.length) {
      const spinnerInterval = setInterval(() => {
        setFrame((f) => (f + 1) % spinnerFrames.length);
      }, 200);
      return () => clearInterval(spinnerInterval);
    }
  }, [isTyping, phase, currentLineIndex]);

  // Completion handler
  useEffect(() => {
    if (!isTyping && phase === 'boot' && currentLineIndex >= bootSequence.length) {
      const completeTimeout = setTimeout(() => {
        onComplete();
      }, 2000);
      return () => clearTimeout(completeTimeout);
    }
  }, [isTyping, phase, currentLineIndex, onComplete]);

  const displayText = charStates.map((state) => state.char || '').join('');

  return (
    <div className="font-mono text-dark-green">
      <div className="opacity-75 text-xs">
        {displayLines.map((line, index) => (
          <div key={`line-${index}`} className="whitespace-pre">
            {line}
          </div>
        ))}
      </div>
      {phase === 'boot' && currentLineIndex >= bootSequence.length && (
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
