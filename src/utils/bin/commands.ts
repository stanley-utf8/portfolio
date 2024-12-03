// List of commands that do not require API calls

import * as bin from './index';
import * as filesystem from './filesystem';
import config from '../../../config.json';
//import symbol1 from '../../../public/work images/symbol-1.svg';
import { workOutput, workExperience } from '../../components/work';

const tag = (content: string) => {
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?`~©®₿¥€£¢₹§¶∆×÷¿¡StanleyWang';


return `<span 
      class="cursor-pointer"
    style="color: rgb(206,165,94); font-size: 1em; height:1.35em; line-height: 1.35em"
      onmouseover="
        const originalText = this.textContent;
        this.glitchTimer = setInterval(() => {
          this.textContent = originalText
            .split('')
            .map(() => '${glitchChars}'[Math.floor(Math.random() * ${glitchChars.length})])
            .join('');
        }, 50);
      "
      onmouseout="
        clearInterval(this.glitchTimer);
        const originalText = '${content}';
        let currentIdx = 0;
        const restoreInterval = setInterval(() => {
          if (currentIdx >= originalText.length) {
            clearInterval(restoreInterval);
            return;
          }
          this.textContent = 
            originalText.slice(0, currentIdx + 1) + 
            originalText.slice(currentIdx + 1)
              .split('')
              .map(() => '${glitchChars}'[Math.floor(Math.random() * ${glitchChars.length})])
              .join('');
          currentIdx++;
        }, 50);
      "
    >${content}</span>`;
};
// Help
export const help = async (args: string[]): Promise<string> => {
  const commandMap = {
    // Navigation & Info
    about: 'display information about me',
    help: 'show this help message',
    projects: 'show my most recent projects',
    work: 'show my field experience',

    // Contact & Social
    github: 'visit my github profile',
    linkedin: 'view my linkedin profile',
    resume: 'open my resume',

    // Utils
    cd: 'change directory',
    ls: 'lists content of current directory',
    tree: 'display directory structure in a tree-like format',

  };

  const sections = {
    'Navigation & Info': [
      'about',
      'help',
      'projects',
      'work',
      'school',
    ],
    'Contact & Social': ['github', 'linkedin', 'resume'],
    Utils: ['cd', 'ls', 'tree'],
  };

  let helpText = '\nAvailable commands:\n\n';

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
`;
};

// About
export const about = async (args: string[]): Promise<string> => {
  return `Hi, I am ${config.name}. 
`;
};

export const resume = (args: string[]): string => {
  const message = 'Opening resume...';
  setTimeout(() => {
    window.open(`${config.resume_url}`);
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


const openNeovimRepo = (args?: string[]): string => {
  const message = 'nerd';
  setTimeout(() => {
    window.open(`https://github.com/stanley-utf8/...nvim`);
  }, 500);
  return message;
};
export const vim = openNeovimRepo;
export const nvim = openNeovimRepo;
export const vi = openNeovimRepo;

// Banner
export const banner = (args?: string[]): string => {
  // 

  // 
  return `
${tag(config.name)} <a href="https://github.com/${config.social.github
    }" target="_blank" style="text-decoration: none;font-size: 1.2em; "> </a><a href="https://linkedin.com/in/${config.social.linkedin
    }" target="_blank" style="text-decoration: none;font-size: 1.2em; "> </a>

<a href="${config.resume_url
    }" target="_blank" style="text-decoration: none; "> Resume</a>
<a href="mailto:${config.email
    }" target="_blank" style="text-decoration: none; "> ${config.email}</a>

Type <span class='text-dark-green'>'help'</span> to see the list of available commands.
Type <span class='text-dark-green'>'work'</span> to see my relevant experience.
Type <span class='text-dark-green'>'repo'</span> to see my relevant experience or click <u><a class="text-light-blue dark:text-dark-blue underline" href="${config.repo
    }" target="_blank">here</a></u> to see this site's code.
Type <span class='text-dark-green'>'banner'</span> to repeat this output.\n
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

export const expand = async (args: string[]): Promise<string> => {
  if (!args.length) {
    return 'Usage: expand <company-id> (e.g., expand autodesk)';
  }

  const targetId = args[0].toLowerCase();
  let found = false;

  workExperience.forEach((entry) => {
    entry.jobs.forEach((job) => {
      if (job.id === targetId) {
        job.expanded = true;
        found = true;
      }
    });
  });

  if (!found) {
    return `Company "${targetId}" not found. Available options: autodesk, beta, mcgill`;
  }

  return 'Case study expanded. Type "work" to see the updated view.';
};

export const collapse = async (args: string[]): Promise<string> => {
  if (!args.length) {
    return 'Usage: collapse <company-id> (e.g., collapse autodesk)';
  }

  const targetId = args[0].toLowerCase();
  let found = false;

  workExperience.forEach((entry) => {
    entry.jobs.forEach((job) => {
      if (job.id === targetId) {
        job.expanded = false;
        found = true;
      }
    });
  });

  if (!found) {
    return `Company "${targetId}" not found. Available options: autodesk, beta, mcgill`;
  }

  return 'Case study collapsed. Type "work" to see the updated view.';
};

export const work = async (args: string[]): Promise<string> => {
  return await workOutput();
  //  return `
  //┌──────────────────────────────────────────────────────────────┐
  //│                      Work Experience                         │
  //└──────────────────────────────────────────────────────────────┘
  //  │
  //
  // <span class="text-light-yellow dark:text-dark-yellow">2025</span>
  //
  //  │
  //  ├─ <svg xmlns="http://www.w3.org/2000/svg" viewBox="100 50 280 200" style="height: 1.3vh; display:inline-block;vertical-align: middle;" fill="white">
  //  │   <path d="M130.299 222.384L278.52 130.269H355.413C357.785 130.269 359.902 132.159 359.902 134.755C359.902 136.871 358.971 137.83 357.785 138.535L284.959 182.124C280.215 184.974 278.577 190.645 278.577 194.877L278.492 222.356H371V62.6708C371 59.5956 368.628 57 365.098 57H276.854L129 148.692V222.356H130.299V222.384Z"></path>
  //  │   </svg> <a href="https://www.autodesk.com" target="_blank">Autodesk</a> | Software Engineering Intern | <i>May - August</i>
  //  │
  //  │   • Incoming Autodesk EMS Team
  //  │
  //  │
  //  ├─ <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" style="height: 1.2em; display:inline-block;vertical-align: middle;" fill="white">
  //  │        <path d="M117.81,67.43c7.38-4.15,17.54-8.77,20.77-23.54,3.23-14.77-6.46-29.08-26.77-29.08H31.5L9.81,137.59H84.58c22.62,0,42.92-9.69,47.54-34.62,4.15-19.39-7.38-32.31-14.31-35.54Zm-13.39,3.23c-12.78,14.56-48.46,60.46-48.46,60.46-.92,.92-1.85,.92-2.77,.46-.46-.46-.92-1.38-.46-2.31l14.31-47.54h-24c-1.52-.04-2.51-2.05-1.38-3.23L89.2,19.43c.92-.92,1.85-.92,2.77-.46,.46,.92,.92,1.85,.46,2.77l-13.85,45.69h24c3.47,0,3.04,1.87,1.85,3.23Z"/>
  //  │        </svg> <a href="https://www.beta.team" target="_blank" style="text-decoration: underline">BETA Technologies</a> | Software Engineering Intern | <i>January - April</i>
  //  │
  //  │   • Incoming Structures Team
  //  │
  //
  // <span class="text-light-yellow dark:text-dark-yellow">2024</span>
  //
  //  │
  //  ├─ McGill AI Ethics Lab | <b class="text-dark-green">Lead Undergraduate Researcher</b> | <i>April - Present</i>
  //  │
  //  │   • Led a team of eight developing solutions for filter bubbles and disinformation
  //  │   • Created Golang API library with C wrappers for Python integration
  //  │   • Leveraged multi-thread optimization, improving performance by 70%
  //  │   • Developed video content analyzer using TextRank algorithm
  //  │
  //
  // <span class="text-light-yellow dark:text-dark-yellow">2022</span>
  //
  //  │
  //  ├─ M2M Tech | Software Engineer Intern (September - January 2023)
  //  │
  //  │   • Co-engineered Market Sentiment Analysis tool with LSTM and NLP
  //  │   • Developed A* pathfinding algorithm with Manhattan distance heuristic
  //  │   • Reduced path length by 20% and improved convergence speed by 15%
  //  │   • Collaborated with scrum coordinators on weekly progress report
  //\n`;
};
