import React from 'react';
import '../styles/global.css';
import Head from 'next/head';

const App = ({ Component, pageProps }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [showEffect, setShowEffect] = React.useState(false);

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
        className={` crt-text crt-effect crt-glow crt-curvature text-light-foreground dark:text-dark-foreground min-w-max text-xs md:min-w-full md:text-s`}
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
