import * as bin from './bin';
import { getCurrentPath, getNodeAtPath, resolvePath } from './bin/filesystem';

export const commandExists = (command: string) => {
  const cmd = command.split(' ')[0].toLowerCase();

  // Check for executables when using ./
  if (cmd.startsWith('./')) {
    const targetPath = resolvePath(cmd.slice(2));
    const node = getNodeAtPath(targetPath);
    return node?.isExecutable ?? false;
  }

  const commands = ['clear', ...Object.keys(bin)];
  return commands.indexOf(cmd) !== -1;
};
