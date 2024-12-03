import React from 'react';
import '../styles/global.css';
import Head from 'next/head';
import TerminalContainer from '../components/terminal-contianer';

const App = ({ Component, pageProps }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [showEffect, setShowEffect] = React.useState(false);

  const [isBooting, setIsBooting] = React.useState(true);

  React.useEffect(() => {
    // Only need one state change after boot sequence
    const bootTimeout = setTimeout(() => {
      setIsBooting(false);
    }, 1500);

    return () => clearTimeout(bootTimeout);
  }, []);

  const onClickAnywhere = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const triggerEffect = () => {
    setShowEffect(true);
    setTimeout(() => setShowEffect(false), 1600);
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
          maximum-scale="1"
        />
      </Head>
      <div
        className={` crt-text crt-effect 
          ${isBooting ? 'crt-boot-sequence' : 'crt-glow'}
          text-light-foreground dark:text-dark-foreground min-w-max text-xs md:min-w-full md:text-s`}
        onClick={onClickAnywhere}
      >
        <main className="bg-light-background dark:bg-dark-background w-full h-full p-2">
          <Component
            {...pageProps}
            inputRef={inputRef}
            triggerEffect={triggerEffect}
            showEffect={showEffect}
          />
        </main>
      </div>
    </>
  );
};

export default App;
