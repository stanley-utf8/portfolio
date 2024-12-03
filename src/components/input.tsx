import React from 'react';
import { commandExists } from '../utils/commandExists';
import { shell } from '../utils/shell';
import { handleTabCompletion } from '../utils/tabCompletion';
import { Ps1 } from './Ps1';

export const Input = ({
  inputRef,
  containerRef,
  command,
  history,
  lastCommandIndex,
  setCommand,
  setHistory,
  setLastCommandIndex,
  clearHistory,
  triggerEffect,
  setShowWaves,
}) => {
  const onSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    const uniqueCommands = history
      .map(({ command }) => command)
      .filter((command: string) => command)
      .filter((cmd, index, array) => cmd !== array[index - 1]);

    if (event.key === 'c' && event.ctrlKey) {
      event.preventDefault();
      setCommand('');
      setHistory('');
      setLastCommandIndex(0);
    }

    if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault();
      clearHistory();
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      handleTabCompletion(command, setCommand);
    }

    if (event.key === 'Enter' || event.code === '13') {
      event.preventDefault();
      setLastCommandIndex(0);
      triggerEffect();
      await shell(command, setHistory, clearHistory, setCommand, setShowWaves);
      setTimeout(() => {
        if (containerRef.current) {
          const scrollOptions: ScrollToOptions = {
            top: containerRef.current.scrollHeight,
            behavior: 'smooth',
          };

          // Use requestAnimationFrame to ensure the new content is rendered
          requestAnimationFrame(() => {
            containerRef.current?.scrollTo(scrollOptions);
          });
        }
      }, 100);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!uniqueCommands.length) {
        return;
      }
      const index: number = lastCommandIndex + 1;
      if (index <= uniqueCommands.length) {
        setLastCommandIndex(index);
        setCommand(uniqueCommands[uniqueCommands.length - index]);
      }
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!uniqueCommands.length) {
        return;
      }
      const index: number = lastCommandIndex - 1;
      if (index > 0) {
        setLastCommandIndex(index);
        setCommand(uniqueCommands[uniqueCommands.length - index]);
      } else {
        setLastCommandIndex(0);
        setCommand('');
      }
    }
  };

  const onChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(value);
  };

  return (
    <div className="flex flex-row space-x-2">
      <label htmlFor="prompt" className="flex-shrink">
        <Ps1 />
      </label>

      <input
        ref={inputRef}
        id="prompt"
        type="text"
        className={`bg-light-background dark:bg-dark-background focus:outline-none flex-grow crt-text ${commandExists(command) || command === ''
            ? 'text-dark-green'
            : 'text-dark-red'
          }`}
        value={command}
        onChange={onChange}
        autoFocus
        onKeyDown={onSubmit}
        autoComplete="off"
        spellCheck="false"
      />
    </div>
  );
};

export default Input;
