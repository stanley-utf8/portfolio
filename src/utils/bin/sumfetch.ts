import config from '../../../config.json';

const sumfetch = async (args: string[]): Promise<string> => {
  return `
 About 

 ${config.name}
   
<a href="https://github.com/${config.social.github}" target="_blank" style="text-decoration: none; "> GitHub</a>
<a href="https://linkedin.com/in/${config.social.linkedin}" target="_blank" style="text-decoration: none; "> LinkedIn</a>
<a href="${config.resume_url}" target="_blank" style="text-decoration: none; "> Resume</a>
<a href="mailto:${config.email}" target="_blank" style="text-decoration: none; "> ${config.email}</a>

`;
};

export default sumfetch;
