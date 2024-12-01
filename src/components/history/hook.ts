import React from 'react';
import { getCurrentPath } from '../../utils/bin';
import { History } from './interface';

export const useHistory = (defaultValue: Array<History>) => {
  const [history, setHistory] = React.useState<Array<History>>(defaultValue);
  const [command, setCommand] = React.useState<string>('');
  const [lastCommandIndex, setLastCommandIndex] = React.useState<number>(0);
  const [newestId, setNewestId] = React.useState<number | null>(null);
  const [lastKnownPath, setLastKnownPath] = React.useState(getCurrentPath());

  return {
    history,
    command,
    lastCommandIndex,
    newestId,
    setHistory: (value: string) => {
      const newId = history.length;
      const currentPath = getCurrentPath();

      // Update our last known path if this is a cd command
      if (command.startsWith('cd ')) {
        setLastKnownPath(currentPath);
      }

      setNewestId(newId);
      setHistory([
        ...history,
        {
          id: newId,
          date: new Date(),
          command,
          output: value,
          path: lastKnownPath,
        },
      ]);
      setTimeout(() => setNewestId(null), 1600);
    },
    setCommand,
    setLastCommandIndex,
    clearHistory: () => {
      setHistory([]);
      setNewestId(null);
      setLastKnownPath(getCurrentPath());
    },
  };
};
