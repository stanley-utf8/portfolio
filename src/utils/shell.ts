import React from 'react';
import * as bin from './bin';
import { getCurrentPath, getNodeAtPath, resolvePath } from './bin/filesystem';

export const shell = async (
  command: string,
  setHistory: (value: string) => void,
  clearHistory: () => void,
  setCommand: React.Dispatch<React.SetStateAction<string>>,
  setShowWaves: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const args = command.split(' ');
  const cmd = args[0].toLowerCase();

  if (cmd.startsWith('./')) {
    const path = getCurrentPath();
    const targetPath = resolvePath(cmd.slice(2));
    const node = getNodeAtPath(targetPath);

    if (node?.isExecutable && node.name === 'waves.exe') {
      setShowWaves(true);
      setHistory('Running waves.exe...');
      setCommand('');
      return;
    }

    setHistory(`${cmd}: Permission denied or not an executable`);
    setCommand('');
    return;
  }

  if (command === 'waves') {
    setShowWaves(true);
    setCommand('');
    return;
  }
  if (args[0] === 'clear') {
    clearHistory();
  } else if (command === '') {
    setHistory('');
  } else if (Object.keys(bin).indexOf(args[0]) === -1) {
    setHistory(
      `shell: command not found: ${args[0]}. Try 'help' to get started.`,
    );
  } else {
    const output = await bin[args[0]](args.slice(1));
    setHistory(output);
  }

  setCommand('');
};
