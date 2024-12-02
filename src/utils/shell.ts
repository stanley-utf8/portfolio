import { get } from 'http';
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
    const targetPath = resolvePath(cmd.slice(2));
    const node = getNodeAtPath(targetPath);

    if (node?.isExecutable) {
      setHistory(`Running ${node.name}...`);
      if (node.name === 'waves.exe') {
        setTimeout(() => {
          setShowWaves(true);
        }, 500);
      }
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
