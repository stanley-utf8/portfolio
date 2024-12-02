import React from 'react';

// Utility function for styled span
const span = (content: string, classes: string, styles?: string) =>
  `<span class="${classes}" ${
    styles ? `style="${styles}"` : ''
  }>${content}</span>`;

// Utility function for link
const link = (url: string, content: string) =>
  `<a href="${url}" target="_blank" >${content}</a>`;

// Utility function for tags
const tag = (content: string) => {
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?`~©®₿¥€£¢₹§¶∆×÷¿¡';

  return `<span 
    class="inline-block cursor-pointer vertical-align: center" 
    style="background: rgba(206,165,94,0.1); color: rgb(206,165,94); border-radius: 4px; padding: 0 0.5em; margin: 0 0.25em; display:inline-flex;  align-items: center; font-size: 0.9em; height:1.35em; line-height: 1.35em "
    onmouseover="
      const originalText = this.textContent;
      this.glitchTimer = setInterval(() => {
        this.textContent = [...originalText]
          .map(() => '${glitchChars}'[Math.floor(Math.random() * ${glitchChars.length})])
          .join('');
      }, 35);
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
          [...originalText.slice(currentIdx + 1)]
            .map(() => '${glitchChars}'[Math.floor(Math.random() * ${glitchChars.length})])
            .join('');
        currentIdx++;
      }, 50);
    "
  >${content}</span>`;
};

interface CaseStudy {
  challenge: string;
  approach: string[];
  impact: string;
  techStack: {
    languages: string[];
    tools: string[];
    libraries: string[];
  };
  metrics?: {
    before: Record<string, string>;
    after: Record<string, string>;
  };
}

const companyColor = 'text-dark-yellow';
const positionColor = 'text-dark-foreground';

// Work experience data
export const workExperience = [
  {
    year: '2025',
    jobs: [
      {
        id: 'autodesk',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="100 50 280 200" style="height: 1.35vh; display: inline-block; vertical-align: middle; margin-right: 0.5rem" fill="currentColor"; class=${companyColor} >
         <path d="M130.299 222.384L278.52 130.269H355.413C357.785 130.269 359.902 132.159 359.902 134.755C359.902 136.871 358.971 137.83 357.785 138.535L284.959 182.124C280.215 184.974 278.577 190.645 278.577 194.877L278.492 222.356H371V62.6708C371 59.5956 368.628 57 365.098 57H276.854L129 148.692V222.356H130.299V222.384Z"></path>
         </svg>`,
        company: span(
          link('https://www.autodesk.com', 'Autodesk'),
          companyColor,
          `style="text-decoration: underline"`,
        ),
        position: span('Software Engineering Intern', positionColor),
        duration: 'May - August',
        details: ['Incoming Autodesk EMS Team'],
      },
      {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" style="height: 1.5vh; display: inline-block; vertical-align: middle; margin-right: 0.5rem;transform: translateY(-0.1em);" fill="currentColor"; class=${companyColor} >
          <path d="M117.81,67.43c7.38-4.15,17.54-8.77,20.77-23.54,3.23-14.77-6.46-29.08-26.77-29.08H31.5L9.81,137.59H84.58c22.62,0,42.92-9.69,47.54-34.62,4.15-19.39-7.38-32.31-14.31-35.54Zm-13.39,3.23c-12.78,14.56-48.46,60.46-48.46,60.46-.92,.92-1.85,.92-2.77,.46-.46-.46-.92-1.38-.46-2.31l14.31-47.54h-24c-1.52-.04-2.51-2.05-1.38-3.23L89.2,19.43c.92-.92,1.85-.92,2.77-.46,.46,.92,.92,1.85,.46,2.77l-13.85,45.69h24c3.47,0,3.04,1.87,1.85,3.23Z"/>
        </svg>`,
        company: span(
          link('https://www.beta.team', 'BETA Technologies'),
          companyColor,
          `style="text-decoration: underline"`,
        ),
        position: span('Software Engineering Intern', positionColor),
        duration: 'January - April',
        details: ['Incoming Structures Team'],
      },
    ],
  },
  {
    year: '2024',
    jobs: [
      {
        company: span('McGill AI Ethics Lab', companyColor),
        position: span('Lead Undergraduate Researcher', 'text-dark-green'),
        duration: 'April - Present',
        details: [
          'Led a team of eight developing solutions for filter bubbles and disinformation',
          'Created Golang API library with C wrappers for Python integration',
          'Leveraged multi-thread optimization, improving performance by 70%',
          'Developed video content analyzer using TextRank algorithm',
        ],
        tags: [
          'golang',
          'c',
          'python',
          'nlp',
          'machine-learning',
          'parallel-computing',
          'ai-ethics',
        ],
        links: [
          link('https://github.com/stanley-utf8/HealthyUI', 'Code'),
          link(
            'https://www.linkedin.com/posts/stanley-utf8_im-so-grateful-to-have-had-the-opportunity-activity-7241504422046957569-6VWO?utm_source=share&utm_medium=member_desktop',
            'UCORE Presentation',
          ),
        ],
      },
      {
        company: span('McGill CSUS', companyColor),
        position: span('Computer Science Tutor', 'text-dark-green'),
        duration: 'August - Present',
      },
    ],
  },
  {
    year: '2022',
    jobs: [
      {
        id: 'm2m-tech',
        company: span('M2M Tech', companyColor),
        position: span('Software Engineering Intern', positionColor),
        duration: 'September - January 2023',
        details: [
          'Co-engineered Market Sentiment Analysis tool with LSTM and NLP',
          'Developed A* pathfinding algorithm with Manhattan distance heuristic',
          'Reduced path length by 20% and improved convergence speed by 15%',
          'Collaborated with scrum coordinators on weekly progress report',
        ],
        tags: ['python', 'pandas', 'algorithms', 'path-finding'],
      },
    ],
  },
];

// Function to render a case study
const renderCaseStudy = (caseStudy: CaseStudy): string => {
  let result = `  │   -----
  │   
  │   ${span(`<i>Details</i>`, 'text-light-yellow dark:text-dark-yellow')}
  │   
  │     ${span('Challenge:', 'text-light-blue dark:text-dark-blue')}
  │   
  │       • ${caseStudy.challenge}
  │   
  │     ${span('Approach:', 'text-light-blue dark:text-dark-blue')}`;

  caseStudy.approach.forEach((step) => {
    result += `
  │       • ${step}`;
  });
  result += `
  │   
  │     ${span('Impact:', 'text-light-blue dark:text-dark-blue')}
  │   
  │       • ${caseStudy.impact}
  │   
  │     ${span('Tech Stack:', 'text-light-blue dark:text-dark-blue')}
  │   
  │       • Languages: ${caseStudy.techStack.languages.join(', ')}
  │       • Tools: ${caseStudy.techStack.tools.join(', ')}
  │       • Libraries: ${caseStudy.techStack.libraries.join(', ')}`;

  if (caseStudy.metrics) {
    result += `
  │   
  │     ${span('Metrics:', 'text-light-blue dark:text-dark-blue')}
  │`;
    Object.entries(caseStudy.metrics.before).forEach(([key, value], index) => {
      const afterValue = caseStudy.metrics?.after[key];
      result += `
  │       • ${key}: ${value} → ${afterValue}`;
    });
  }

  return `${result}
  │   
  │   -----
  │   
`;
};

// Function to render work experience
export const workOutput = async (): Promise<string> => {
  let result = `
┌──────────────────────────────────────────────────────────────┐
│                      Work Experience                         │
└──────────────────────────────────────────────────────────────┘
  │
`;

  workExperience.forEach((entry) => {
    result += `  
 ${span(entry.year, '')}

  │
`;
    entry.jobs.forEach((job) => {
      result += `  ├─ ${
        job.svg
          ? `${job.svg}<b >${job.company}</b> | ${job.position} | <i class='text-dark-gray'>${job.duration}</i>`
          : `<b >${job.company}</b> | ${job.position} | <i class='text-dark-gray'>${job.duration}</i>`
      }${
        job.details
          ? `
  │
  │     • ${job.details.join('\n  │     • ')} `
          : ''
      }${
        job.tags
          ? `
  │ 
  │ ${job.tags.map((t) => tag(t)).join('')}`
          : ''
      }${
        job.links
          ? `
  │ 
  │  More: ${job.links.join(' | ')}`
          : ''
      }
  │ 
`;
      if (job.expanded && job.caseStudy) {
        result += renderCaseStudy(job.caseStudy);
      }
    });
  });

  return result;
};

export default workOutput;
