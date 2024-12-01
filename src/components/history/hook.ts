import React from 'react';
import { History } from './interface';

export const useHistory = (defaultValue: Array<History>) => {
  const [history, setHistory] = React.useState<Array<History>>(defaultValue);
  const [command, setCommand] = React.useState<string>('');
  const [lastCommandIndex, setLastCommandIndex] = React.useState<number>(0);
  const [newestId, setNewestId] = React.useState<number | null>(null);

  return {
    history,
    command,
    lastCommandIndex,
    newestId,
    setHistory: (value: string) => {
      const newId = history.length;
      setNewestId(newId);
      setHistory([
        ...history,
        {
          id: newId,
          date: new Date(),
          command,
          output: value,
        },
      ]);
      // Reset newestId after animation duration
      setTimeout(() => setNewestId(null), 1600);
    },
    setCommand,
    setLastCommandIndex,
    clearHistory: () => {
      setHistory([]);
      setNewestId(null);
    },
  };
};
