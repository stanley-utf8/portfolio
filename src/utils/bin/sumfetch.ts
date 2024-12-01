import config from '../../../config.json';

const sumfetch = async (args: string[]): Promise<string> => {
  return `
 ABOUT
-----------
 ${config.name}
 <u><a href="${config.resume_url}" target="_blank">resume</a></u>
 <u><a href="mailto:${config.email}" target="_blank">${config.email}</a></u>
 <u><a href="https://github.com/${config.social.github}" target="_blank">github.com/${config.social.github}</a></u>
 <u><a href="https://linkedin.com/in/${config.social.linkedin}" target="_blank">linkedin.com/in/${config.social.linkedin}</a></u>
 <u><a href="https://www.instagram.com/lydia.lepki/" target="_blank">my girlfriend</a></u>

`;
};

export default sumfetch;
