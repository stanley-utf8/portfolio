import Head from 'next/head';
import React from 'react';
import config from '../../config.json';
import { Input } from '../components/input';
import { useHistory } from '../components/history/hook';
import { History } from '../components/history/History';
import { banner } from '../utils/bin';
import { triggerAsyncId } from 'async_hooks';
import BootSequence from '../components/boot';

interface IndexPageProps {
  inputRef: React.MutableRefObject<HTMLInputElement>;
  triggerEffect: () => void;
  showEffect: boolean;
}

const IndexPage: React.FC<IndexPageProps> = ({
  inputRef,
  triggerEffect,
  showEffect,
}) => {
  const containerRef = React.useRef(null);
  const [isBooting, setIsBooting] = React.useState(true);
  const {
    history,
    command,
    lastCommandIndex,
    newestId,
    setCommand,
    setHistory,
    clearHistory,
    setLastCommandIndex,
  } = useHistory([]);

  const init = React.useCallback(() => setHistory(banner()), []);

  React.useEffect(() => {
    if (!isBooting) {
      init();
    }
  }, [init, isBooting]);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView();
      inputRef.current.focus({ preventScroll: true });
    }
  }, [history]);

  if (isBooting) {
    return (
      <div className="p-2 overflow-hidden h-full rounded border-light-yellow dark:border-dark-yellow">
        <BootSequence onComplete={() => setIsBooting(false)} />
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>{config.title}</title>
      </Head>

      <div className="p-2 overflow-hidden h-full rounded border-light-yellow dark:border-dark-yellow">
        <div ref={containerRef} className="overflow-y-auto h-full">
          <History
            history={history}
            showEffect={showEffect}
            newestId={newestId}
          />
          <Input
            inputRef={inputRef}
            containerRef={containerRef}
            command={command}
            history={history}
            lastCommandIndex={lastCommandIndex}
            setCommand={setCommand}
            setHistory={setHistory}
            setLastCommandIndex={setLastCommandIndex}
            clearHistory={clearHistory}
            triggerEffect={triggerEffect}
          />
        </div>
      </div>
    </>
  );
};

export default IndexPage;
