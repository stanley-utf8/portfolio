import config from '../../config.json';
export const generateRandomHostname = (): string => {
  const randomNum = Math.floor(Math.random() * 100) + 1; // Generates a number between 1-100
  return `${config.ps1_hostname}-${randomNum.toString().padStart(2, '0')}`;
};
