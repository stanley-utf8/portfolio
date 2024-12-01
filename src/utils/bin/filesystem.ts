type FileSystemNode = {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: { [key: string]: FileSystemNode };
};

let fileSystem: FileSystemNode = {
  name: '/',
  type: 'directory',
  children: {
    home: {
      name: 'home',
      type: 'directory',
      children: {
        guest: {
          name: 'guest',
          type: 'directory',
          children: {
            'about.txt': {
              name: 'about.txt',
              type: 'file',
              content: 'Welcome to my terminal website!',
            },
            documents: {
              name: 'documents',
              type: 'directory',
              children: {},
            },
            projects: {
              name: 'projects',
              type: 'directory',
              children: {
                'readme.md': {
                  name: 'readme.md',
                  type: 'file',
                  content:
                    '# My Projects\nThis directory contains all my project files.',
                },
              },
            },
          },
        },
      },
    },
  },
};

let currentPath: string[] = ['/', 'home', 'guest'];

export const getCurrentPath = () => {
  return currentPath.join('/').replace('//', '/');
};

// Helper functions
export const getNodeAtPath = (path: string[]): FileSystemNode | null => {
  let current = fileSystem;

  // Handle root directory case
  if (path.length === 1 && path[0] === '/') return fileSystem;

  // Skip the first empty string from split('/')
  for (let i = 1; i < path.length; i++) {
    if (!current.children || !current.children[path[i]]) return null;
    current = current.children[path[i]];
  }
  return current;
};

export const resolvePath = (targetPath: string): string[] => {
  // Handle absolute paths
  if (targetPath.startsWith('/')) {
    return ['/', ...targetPath.slice(1).split('/').filter(Boolean)];
  }

  // Handle . and ..
  const resolvedPath = [...currentPath];
  const parts = targetPath.split('/').filter(Boolean);

  for (const part of parts) {
    if (part === '.') continue;
    if (part === '..') {
      if (resolvedPath.length > 1) resolvedPath.pop();
      continue;
    }
    resolvedPath.push(part);
  }

  return resolvedPath;
};

// Command implementations
export const pwd = async (args: string[]): Promise<string> => {
  return currentPath.join('/').replace('//', '/');
};

export const cd = async (args: string[]): Promise<string> => {
  if (args.length === 0) {
    currentPath = ['/', 'home', 'guest'];
    return '';
  }

  const targetPath = resolvePath(args[0]);
  const targetNode = getNodeAtPath(targetPath);

  if (!targetNode) {
    return `cd: no such directory: ${args[0]}`;
  }

  if (targetNode.type !== 'directory') {
    return `cd: not a directory: ${args[0]}`;
  }

  currentPath = targetPath;
  return '';
};

export const ls = async (args: string[]): Promise<string> => {
  // Default to current directory if no path specified
  const targetPath = args.length > 0 ? resolvePath(args[0]) : currentPath;
  const node = getNodeAtPath(targetPath);

  if (!node) {
    return `ls: cannot access '${args[0]}': No such file or directory`;
  }

  if (node.type === 'file') {
    return node.name;
  }

  if (!node.children) {
    return '';
  }

  // Format output similar to real ls
  const output: string[] = [];
  const entries = Object.values(node.children);

  // Sort directories first, then files, both alphabetically
  entries.sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === 'directory' ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });

  entries.forEach((entry) => {
    const name = entry.type === 'directory' ? `${entry.name}/` : entry.name;
    output.push(name);
  });

  return output.join('\n');
};

// Optional: Add cat command to read files
export const cat = async (args: string[]): Promise<string> => {
  if (args.length === 0) return 'Usage: cat <file>';

  const targetPath = resolvePath(args[0]);
  const node = getNodeAtPath(targetPath);

  if (!node) {
    return `cat: ${args[0]}: No such file or directory`;
  }

  if (node.type === 'directory') {
    return `cat: ${args[0]}: Is a directory`;
  }

  return node.content || '';
};

export const tree = async (args: string[]): Promise<string> => {
  const path = args.length > 0 ? resolvePath(args[0]) : currentPath;
  const node = getNodeAtPath(path);

  if (!node) {
    return `tree: '${args[0]}': No such file or directory`;
  }

  if (node.type === 'file') {
    return `tree: '${args[0]}': Not a directory`;
  }

  const buildTree = (
    node: FileSystemNode,
    prefix: string = '',
    isLast: boolean = true,
  ): string => {
    let result = '';

    // Add the current node with proper prefix
    if (prefix) {
      result =
        prefix +
        (isLast ? '└── ' : '├── ') +
        node.name +
        (node.type === 'directory' ? '/' : '') +
        '\n';
    } else {
      // Start with a vertical line for root
      result = '    .' + (node.type === 'directory' ? '/' : '') + '\n';
    }

    if (node.type === 'directory' && node.children) {
      const entries = Object.entries(node.children);
      entries.forEach(([_, child], index) => {
        const isLastChild = index === entries.length - 1;
        // For children of root, start with proper indentation
        const newPrefix = prefix ? prefix + (isLast ? '    ' : '│   ') : '    ';
        result += buildTree(child, newPrefix, isLastChild);
      });
    }

    return result;
  };

  const treeOutput = buildTree(node);
  const dirs = treeOutput.match(/\//g)?.length || 0;
  const files = (treeOutput.match(/[^/]\n/g)?.length || 0) - 1; // Subtract 1 for the root line

  return `${treeOutput}\n${dirs} directories, ${files} files`;
};
