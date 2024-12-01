// List of commands that do not require API calls

import * as bin from './index';
import * as filesystem from './filesystem';
import config from '../../../config.json';

// Help
export const help = async (args: string[]): Promise<string> => {
  const commandMap = {
    // Navigation & Info
    about: 'display information about me',
    help: 'show this help message',
    resume: 'open my resume',
    projects: 'show my most recent projects',
    work: 'show my field experience',

    // Contact & Social
    email: 'send me an email',
    github: 'visit my github profile',
    linkedin: 'view my linkedin profile',

    // Search
    google: 'search google',
    reddit: 'search reddit',

    // Utils
    date: 'display current date',
    echo: 'print text to terminal',
    whoami: 'display current user',
  };

  const sections = {
    'Navigation & Info': [
      'about',
      'help',
      'resume',
      'projects',
      'work',
      'school',
    ],
    'Contact & Social': ['email', 'github', 'linkedin'],
    Utils: ['date', 'echo', 'whoami'],
  };

  let helpText = 'Available commands:\n\n';

  Object.entries(sections).forEach(([section, commands]) => {
    commands.forEach((cmd) => {
      helpText += `  <span class="text-light-yellow dark:text-dark-red">${cmd}</span>${' '.repeat(
        15 - cmd.length,
      )} - ${commandMap[cmd]}\n`;
    });
    helpText += '\n';
  });

  return `${helpText}
[tab]: trigger completion
[ctrl+l]/clear: clear terminal\n

Type 'sumfetch' to display summary.`;
};

// About
export const about = async (args: string[]): Promise<string> => {
  return `Hi, I am ${config.name}. 
Welcome to my website!
More about me:
'sumfetch' - short summary.
'resume' - my latest resume.
'readme' - my github readme.`;
};

export const resume = (args: string[]): string => {
  const message = 'Opening resume...';
  setTimeout(() => {
    window.open(`${config.resume_url}`);
  }, 500);
  return message;
};

// Contact
export const email = (args: string[]): string => {
  const message = `Opening mailto:${config.email}...`;
  setTimeout(() => {
    window.open(`mailto:${config.email}`);
  }, 500);
  return message;
};

export const github = (args: string[]): string => {
  const message = 'Opening github...';
  setTimeout(() => {
    window.open(`https://github.com/${config.social.github}/`);
  }, 500);
  return message;
};

export const linkedin = async (args: string[]): Promise<string> => {
  const message = 'Opening linkedin...';
  setTimeout(() => {
    window.open(`https://www.linkedin.com/in/${config.social.linkedin}/`);
  }, 500);

  return message;
};

// Search
export const google = (args: string[]): string => {
  const message = `Searching google for ${args.join(' ')}...`;
  setTimeout(() => {
    window.open(`https://google.com/search?q=${args.join(' ')}`);
  }, 500);
  return message;
};

export const reddit = (args: string[]): string => {
  const message = `Searching reddit for ${args.join(' ')}...`;
  setTimeout(() => {
    window.open(`https://www.reddit.com/search/?q=${args.join(' ')}`);
  }, 500);
  return message;
};

// Typical linux commands
export const echo = async (args: string[]): Promise<string> => {
  return args.join(' ');
};

export const whoami = async (args: string[]): Promise<string> => {
  return `${config.ps1_username}`;
};

// implement

export const date = async (args: string[]): Promise<string> => {
  const date = new Date();
  return date
    .toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    })
    .replace(/\//g, '.');
};

// Banner
export const banner = (args?: string[]): string => {
  return `
Type 'help' to see the list of available commands.
Type 'sumfetch' to display summary.
Type 'repo' or click <u><a class="text-light-blue dark:text-dark-blue underline" href="${config.repo}" target="_blank">here</a></u> for the Github repository.\n
`;
};

export const mkdir = async (args: string[]): Promise<string> => {
  if (!args.length) return 'mkdir: missing operand';
  return `mkdir: cannot create directory '${args[0]}': Permission denied`;
};

export const rm = async (args: string[]): Promise<string> => {
  if (!args.length) return 'rm: missing operand';
  return `rm: cannot remove '${args[0]}': Permission denied`;
};

export const touch = async (args: string[]): Promise<string> => {
  if (!args.length) return 'touch: missing operand';
  return `touch: cannot touch '${args[0]}': Permission denied`;
};

export const sudo = async (args: string[]): Promise<string> => {
  return 'hah! nice try';
};
