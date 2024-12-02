import * as bin from './bin';
import { getCurrentPath, getNodeAtPath, resolvePath } from './bin/filesystem';
export const handleTabCompletion = (
  command: string,
  setCommand: React.Dispatch<React.SetStateAction<string>>,
) => {
  const parts = command.split(' ');
  const firstWord = parts[0];

  if (firstWord.startsWith('./')) {
    const currentPath = getCurrentPath();
    const partial = firstWord.slice(2);

    const currentNode = getNodeAtPath(resolvePath(currentPath));
    if (!currentNode || !currentNode.children) return;

    const possibilities = Object.keys(currentNode.children).filter(
      (name) =>
        name.startsWith(partial) && currentNode.children[name].isExecutable,
    );

    if (possibilities.length === 1) {
      setCommand(`./${possibilities[0]}`);
    }
    return;
  }
  if (parts.length === 1) {
    const commands = Object.keys(bin).filter((entry) =>
      entry.startsWith(command),
    );
    if (commands.length === 1) {
      setCommand(commands[0]);
    }
    return;
  }

  if (['cd', 'ls', 'cat'].includes(firstWord)) {
    const currentPath = getCurrentPath();
    const partial = parts[1] || '';

    // Get current directory's contents
    const currentNode = getNodeAtPath(resolvePath(currentPath));
    if (!currentNode || !currentNode.children) return;

    // Filter possible completions
    const possibilities = Object.keys(currentNode.children).filter((name) =>
      name.startsWith(partial),
    );

    if (possibilities.length === 1) {
      // For directories, add a trailing slash
      const completion = possibilities[0];
      const isDirectory = currentNode.children[completion].type === 'directory';
      setCommand(`${firstWord} ${completion}${isDirectory ? '/' : ''}`);
    }
  }
};
