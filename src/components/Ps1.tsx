import React, { useEffect, useState } from 'react';
import config from '../../config.json';
import { getCurrentPath } from '../utils/bin';
import { generateRandomHostname } from '../utils/hostname';

interface Props {
  path?: string;
}

const hostnameCache: { value: string | null } = { value: null }; // Persistent
export const Ps1: React.FC<Props> = ({ path }) => {
  const currentPath = path || getCurrentPath();
  const currentDir = currentPath.split('/').pop() || '~';
  const displayPath = currentDir === 'stanley' ? '~' : currentDir;

  const [hostname, setHostname] = useState<string>(() => {
    if (!hostnameCache.value) {
      hostnameCache.value = generateRandomHostname(); // Generate only once
    }
    return hostnameCache.value;
  });

  return (
    <div>
      <span className="text-light-yellow dark:text-dark-blue">
        {config.ps1_username}
      </span>
      <span className="text-light-gray dark:text-dark-gray">@</span>
      <span className="text-light-green dark:text-dark-purple">
        {hostname}:
      </span>
      <span className="text-light-gray dark:text-dark-gray">
        {' '}
        {displayPath} $
      </span>
    </div>
  );
};

export default Ps1;
